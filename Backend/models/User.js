const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String},
  role: { type: String, enum: ["admin", "student", "superadmin"], default: "student" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);

// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   email: { 
//     type: String, 
//     required: true, 
//     unique: true,
//     match: [/^[a-zA-Z0-9._-]+@ves\.ac\.in$/, 'Please use a VES email address'] 
//   },
//   password: { 
//     type: String, 
//     required: function() { return !this.isGoogleAuth; } // Only required for non-Google users
//   },
//   role: { 
//     type: String, 
//     enum: ["admin", "student", "superadmin"], 
//     default: "student" 
//   },
//   name: { type: String }, // Added for Google users
//   avatar: { type: String }, // Added for Google profile picture
//   isGoogleAuth: { 
//     type: Boolean, 
//     default: false 
//   },
//   createdAt: { type: Date, default: Date.now },
// }, {
//   timestamps: true // Better than manual createdAt
// });

// // Index for better query performance
// UserSchema.index({ email: 1, isGoogleAuth: 1 });

// module.exports = mongoose.model('User', UserSchema);