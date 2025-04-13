const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Template' },
  collectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection' },
  studentData: Object,
  email: String,
  verificationCode: String,
  createdAt: { type: Date, default: Date.now }
});

// Export as a named export to prevent double registration
const Certificate = mongoose.model('Certificate', CertificateSchema);
module.exports = Certificate;