require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bcrypt = require("bcryptjs");
const auth = require("./middlewares/auth");
const authController = require("./controllers/authcontroller");
const certificateController = require("./controllers/certificatecontroller");
const collectionController = require("./controllers/collectionController");
const templateController = require("./controllers/templateController");
const userController = require("./controllers/userController");
const complaintController = require("./controllers/complaintController");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));

// Database Connection
connectDB();

// Routes
app.post("/api/login", authController.login);
app.post("/api/register", authController.register);
app.post("/api/auth/google", authController.googleAuth);
// app.post('/api/auth/google', authController.googleAuth);

// Template Routes
app.post("/api/templates", auth(["admin"]), templateController.createTemplate);

// Certificate Routes
app.get(
  "/api/certificates/:id",
  auth(),
  certificateController.generateCertificateImage
);
app.get("/api/verify/:code", certificateController.verifyCertificate);
app.get("/api/certificates", auth(), certificateController.getUserCertificates);
app.put(
  "/api/certificates/:id",
  auth(["admin"]),
  certificateController.updateCertificate
);
app.delete(
  "/api/certificates/:id",
  auth(["admin"]),
  certificateController.deleteCertificate
);
app.get(
  "/api/admin/certificates",
  auth(["admin"]),
  certificateController.getAdminCertificates
);
app.post(
  "/api/certificates",
  auth(["admin"]),
  certificateController.createCertificate
);

// Complaint Routes
app.post("/api/complaints", auth(), complaintController.createComplaint);
app.get("/api/complaints/user", auth(), complaintController.getUserComplaints);
app.get(
  "/api/complaints/issuer",
  auth(["admin", "superadmin"]),
  complaintController.getIssuerComplaints
);
app.put(
  "/api/complaints/:complaintId/status",
  auth(["admin", "superadmin"]),
  complaintController.updateComplaintStatus
);
app.post(
  "/api/collections",
  auth(["admin"]),
  collectionController.createCollection
);
app.get(
  "/api/collections",
  auth(["admin"]),
  collectionController.getCollections
);
app.get(
  "/api/collections/:id",
  auth(["admin"]),
  collectionController.getCollectionById
);
app.delete(
  "/api/collections/:id",
  auth(["admin"]),
  collectionController.deleteCollection
);
// Route to download all certificates in a collection
app.get(
  "/api/collections/:id/certificates/download",
  auth(["admin"]),
  collectionController.downloadCollectionCertificates
);
// Route to add certificates to an existing collection
app.post(
  "/api/collections/:id/add-certificates",
  auth(["admin"]),
  collectionController.addCertificatesToCollection
);
//superadmin routes
app.post("/api/auth/login-superadmin", userController.loginSuperAdmin);
app.post("/api/auth/create-superadmin", userController.createSuperAdmin);
app.get("/api/auth/me", auth(["superadmin"]), authController.getMe);
app.delete("/api/admin/:id", auth(["superadmin"]), userController.deleteAdmin);

//adding of the admins
app.post("/api/admin/create", auth(["superadmin"]), userController.createAdmin);
app.get("/api/admin/list", auth(["superadmin"]), userController.getAllAdmins);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
