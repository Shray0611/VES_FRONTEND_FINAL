const { v4: uuidv4 } = require("uuid");
const Complaint = require("../models/Complaint");
const Certificate = require("../models/Certificate");
const User = require("../models/User");

// Create a new complaint
exports.createComplaint = async (req, res) => {
  try {
    const { certificateId, message } = req.body;

    if (!certificateId || !message) {
      return res
        .status(400)
        .json({ error: "Certificate ID and message are required" });
    }

    // Fetch the certificate to get the issuer ID
    const certificate = await Certificate.findById(certificateId).populate({
      path: "templateId",
      select: "createdBy",
    });

    if (!certificate) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    // Get the issuer (admin) who created this certificate
    const issuerId = certificate.templateId.createdBy;

    // Create the complaint with a random UUID for complaintId
    const complaint = new Complaint({
      complaintId: `COMP-${uuidv4()}`,
      certificateId,
      userId: req.user._id,
      issuerId,
      message,
    });

    await complaint.save();

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    console.error("Create complaint error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get complaints for the currently logged in issuer/admin
exports.getIssuerComplaints = async (req, res) => {
  try {
    // Only admin can access this endpoint
    if (req.user.role !== "admin" && req.user.role !== "superadmin") {
      return res.status(403).json({ error: "Access denied" });
    }

    let query = {};

    // If user is admin, only show complaints assigned to them
    if (req.user.role === "admin") {
      query.issuerId = req.user._id;
    }
    // Superadmin can see all complaints

    const complaints = await Complaint.find(query)
      .populate({
        path: "certificateId",
        populate: { path: "collectionId" },
      })
      .populate("userId", "email")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    console.error("Get issuer complaints error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get user's complaints
exports.getUserComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.user._id })
      .populate("certificateId")
      .populate("issuerId", "email")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    console.error("Get user complaints error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update complaint status
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status } = req.body;

    if (!["open", "resolved"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    // Check if user is admin or superadmin
    if (req.user.role !== "admin" && req.user.role !== "superadmin") {
      return res.status(403).json({ error: "Access denied" });
    }

    // If admin, check if they are the issuer
    if (
      req.user.role === "admin" &&
      complaint.issuerId.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ error: "You can only update complaints assigned to you" });
    }

    complaint.status = status;
    await complaint.save();

    res.json({
      success: true,
      message: "Complaint status updated successfully",
      complaint,
    });
  } catch (error) {
    console.error("Update complaint status error:", error);
    res.status(500).json({ error: error.message });
  }
};
