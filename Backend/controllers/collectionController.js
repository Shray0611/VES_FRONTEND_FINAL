const Collection = require("../models/Collection");
const Certificate = require("../models/Certificate");
const archiver = require("archiver");
const { generateCertificateBuffer } = require("../utils/certificateUtils");

exports.createCollection = async (req, res) => {
  try {
    const { name, certificateIds } = req.body;
    const collection = new Collection({
      name,
      certificates: certificateIds,
      createdBy: req.user._id,
    });
    await collection.save();

    await Certificate.updateMany(
      { _id: { $in: certificateIds } },
      { $set: { collectionId: collection._id } }
    );

    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCollections = async (req, res) => {
  try {
    const collections = await Collection.find({ createdBy: req.user._id })
      .populate("certificates")
      .populate("createdBy");
    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id).populate({
      path: "certificates",
      populate: { path: "templateId", match: { createdBy: req.user._id } },
    });

    if (!collection)
      return res.status(404).json({ error: "Collection not found" });

    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    // Optional: Add authorization check if needed
    // if (collection.createdBy.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ error: 'Not authorized to delete this collection' });
    // }

    // Delete all certificates associated with this collection
    await Certificate.deleteMany({ collectionId: collection._id });

    // Delete the collection itself
    await collection.deleteOne();

    res.json({
      message: "Collection and associated certificates deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.downloadCollectionCertificates = async (req, res) => {
  try {
    const collectionId = req.params.id;

    const collection = await Collection.findById(collectionId).populate({
      path: "certificates",
      populate: { path: "templateId", select: "image createdBy variables" },
    });

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    // Authorization check: Ensure the logged-in user created this collection
    if (collection.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "Not authorized to download this collection" });
    }

    if (!collection.certificates || collection.certificates.length === 0) {
      return res
        .status(404)
        .json({ error: "No certificates found in this collection" });
    }

    const archive = archiver("zip", {
      zlib: { level: 9 }, // Sets the compression level.
    });

    // Set the archive name
    const archiveName = `${collection.name.replace(
      /\s+/g,
      "_"
    )}_certificates.zip`;
    res.attachment(archiveName);

    // Pipe the archive data to the response
    archive.pipe(res);

    for (const certificate of collection.certificates) {
      // Ensure templateId is populated and the user is authorized for each certificate
      if (
        certificate.templateId &&
        certificate.templateId.createdBy?.toString() ===
          req.user._id?.toString()
      ) {
        const certificateStream = await generateCertificateBuffer(certificate);
        archive.append(certificateStream, {
          name: `certificate_${certificate._id}.png`,
        });
      }
    }

    // Finalize the archive (this is where the ZIP file is created and sent)
    await archive.finalize();
  } catch (error) {
    console.error("Error downloading collection certificates:", error);
    res.status(500).json({ error: "Failed to generate collection zip file." });
  }
};
