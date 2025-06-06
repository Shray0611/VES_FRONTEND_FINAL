const { createCanvas, loadImage } = require("canvas");
const uuid = require("uuid");
const qr = require("qr-image");
const Certificate = require("../models/Certificate");
const Template = require("../models/Template");
const Collection = require("../models/Collection");
const { generateCertificateBuffer } = require("../utils/certificateUtils");

// Helper function to generate certificate image buffer
// This function has been moved to Backend/utils/certificateUtils.js

exports.generateCertificateImage = async (req, res) => {
  try {
    const certId = req.params.id;
    console.log(`Received request for certificate ID: ${certId}`);
    const certificate = await Certificate.findById(certId)
      .populate({ path: "templateId", select: "image createdBy variables" })
      .populate("collectionId");

    console.log(`Certificate found: ${!!certificate}`);
    if (certificate) {
      console.log(`Certificate email: ${certificate.email}`);
      console.log(`User email: ${req.user.email}`);
      // Log the createdBy ID from the template
      console.log(
        `Template createdBy ID: ${certificate.templateId?.createdBy}`
      );
      console.log(`User ID: ${req.user._id}`);
      console.log(
        `Authorization check (template createdBy matches user ID): ${
          certificate.templateId?.createdBy?.toString() ===
          req.user._id?.toString()
        }`
      );
    }

    // Check if certificate exists AND if the user is the creator of the template or the recipient
    if (
      !certificate ||
      !certificate.templateId ||
      (certificate.templateId.createdBy?.toString() !==
        req.user._id?.toString() &&
        certificate.email !== req.user.email)
    ) {
      console.log(
        "Certificate not found, template not populated, or user is not authorized."
      );
      return res
        .status(404)
        .json({ error: "Certificate not found or not authorized" });
    }

    const stream = await generateCertificateBuffer(certificate);
    res.set("Content-Type", "image/png");
    stream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({
      verificationCode: req.params.code,
    })
      .populate("templateId")
      .populate("collectionId");

    if (!certificate)
      return res.status(404).json({ error: "Certificate not found" });

    res.json({
      valid: true,
      certificate: {
        studentData: certificate.studentData,
        createdAt: certificate.createdAt,
        issuedBy: certificate.templateId.createdBy,
        collection: certificate.collectionId?.name,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ email: req.user.email })
      .populate({
        path: "templateId",
        populate: { path: "createdBy", select: "email" },
      })
      .populate("collectionId");
    // Add issuerEmail to each certificate
    const certificatesWithIssuer = certificates.map((cert) => {
      const certObj = cert.toObject();
      certObj.issuerEmail = cert.templateId?.createdBy?.email || null;
      return certObj;
    });
    res.json(certificatesWithIssuer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id).populate(
      "templateId"
    );

    if (
      !certificate ||
      certificate.templateId.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    certificate.studentData = { ...certificate.studentData, ...req.body };
    await certificate.save();
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdminCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find()
      .populate({ path: "templateId", match: { createdBy: req.user._id } })
      .then((results) => results.filter((c) => c.templateId !== null));
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id).populate(
      "templateId"
    );

    if (!certificate) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    // Remove certificate reference from its collection, if any
    if (certificate.collectionId) {
      await Collection.findByIdAndUpdate(certificate.collectionId, {
        $pull: { certificates: certificate._id },
      });
    }

    // Optional: Add authorization check if needed, e.g., only the issuer who created the template can delete the certificate
    // if (certificate.templateId.createdBy.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ error: 'Not authorized to delete this certificate' });
    // }

    await certificate.deleteOne();

    res.json({ message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new certificate
exports.createCertificate = async (req, res) => {
  try {
    const { templateId, studentData, email, collectionId } = req.body;
    if (!templateId || !studentData || !email) {
      return res
        .status(400)
        .json({ error: "templateId, studentData, and email are required" });
    }
    const verificationCode = uuid.v4();
    const certificate = new Certificate({
      templateId,
      studentData,
      email,
      collectionId,
      verificationCode,
    });
    await certificate.save();
    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
