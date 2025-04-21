const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const standardResponse = (success, message, data = null) => ({
  success,
  message,
  ...(data && { data })
});

const generateToken = (user) => {
    return jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );
  };

const determineRedirectPath = (role) => {
  const routes = {
    superadmin: "/superadmin/dashboard",
    admin: "/issuer-home",
    student: "/user-home",
  };
  return routes[role] || "/";
};

exports.googleAuth = async (req, res) => {
  try {
    const { tokenId } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email } = ticket.getPayload();

    if (!email.endsWith("@ves.ac.in")) {
      return res.status(403).json(
        standardResponse(false, "Only VES email addresses are allowed")
      );
    }

    let user = await User.findOne({ email });
    if (!user) {
      // Create a new user with authMethod set to 'google'
      user = await User.create({
        email,
        role: "student",
        authMethod: "google", 
      });
    } 

    const token = generateToken(user);

    res.status(200).json(
      standardResponse(true, "Authentication successful", {
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        redirectTo: determineRedirectPath(user.role),
      })
    );
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json(
      standardResponse(false, "Authentication failed", { error: error.message })
    );
  }
};


// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json(
        standardResponse(false, 'Invalid credentials')
      );
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );

    res.status(200).json(
      standardResponse(true, 'Login successful', {
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role
        }
      })
    );

  } catch (error) {
    console.error('Login error:', error);
    
    res.status(500).json(
      standardResponse(false, 'Server error', { error: error.message })
    );
  }
};

// Registration Controller
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const emailRegex = /^[a-zA-Z0-9._-]+@ves\.ac\.in$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json(
        standardResponse(false, 'Email must be in the ves.ac.in domain')
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json(
        standardResponse(false, 'User already exists')
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: 'student'
    });

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );

    res.status(201).json(
      standardResponse(true, 'Registration successful', {
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
          role: newUser.role
        }
      })
    );

  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json(
      standardResponse(false, error.message)
    );
  }
};

// Get Current User Controller
exports.getMe = async (req, res) => {
  try {
    res.status(200).json(
      standardResponse(true, 'User retrieved', {
        id: req.user._id,
        email: req.user.email,
        role: req.user.role
      })
    );
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json(
      standardResponse(false, 'Server error')
    );
  }
};

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { OAuth2Client } = require('google-auth-library');
// const User = require('../models/User');

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const standardResponse = (success, message, data = null) => ({
//   success,
//   message,
//   ...(data && { data })
// });

// // Helper function to generate token
// const generateToken = (user) => {
//   return jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRE || '30d' }
//   );
// };

// // Google Authentication Controller
// exports.googleAuth = async (req, res) => {
//   try {
//     const { token } = req.body;
    
//     // Verify Google token
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID
//     });

//     const { email, name, picture } = ticket.getPayload();

//     // Domain validation
//     if (!email.endsWith('@ves.ac.in')) {
//       return res.status(403).json(
//         standardResponse(false, 'Only VES email addresses are allowed', {
//           requiresDomain: true
//         })
//       );
//     }

//     // Check user existence
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json(
//         standardResponse(false, 'Account not found. Please register first', {
//           requiresRegistration: true,
//           email // Send email for pre-fill
//         })
//       );
//     }

//     // Handle auth method mismatch
//     if (!user.isGoogleAuth) {
//       return res.status(400).json(
//         standardResponse(false, 'This account uses password login', {
//           requiresPasswordLogin: true
//         })
//       );
//     }

//     // Successful authentication
//     const authToken = generateToken(user);
    
//     res.status(200).json(
//       standardResponse(true, 'Authentication successful', {
//         token: authToken,
//         user: {
//           id: user._id,
//           email: user.email,
//           name: user.name || name,
//           role: user.role
//         },
//         redirectTo: determineRedirectPath(user.role)
//       })
//     );

//   } catch (error) {
//     console.error('Google auth error:', error);
//     res.status(500).json(
//       standardResponse(false, 'Authentication failed', { 
//         error: error.message,
//         isServerError: true 
//       })
//     );
//   }
// };

// // Login Controller (existing, no changes needed)
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     // Basic validation
//     if (!email || !password) {
//       return res.status(400).json(
//         standardResponse(false, 'Email and password are required')
//       );
//     }

//     const user = await User.findOne({ email });
    
//     // User not found
//     if (!user) {
//       return res.status(404).json(
//         standardResponse(false, 'Account not found', {
//           requiresRegistration: true,
//           email
//         })
//       );
//     }

//     // Check credentials
//     if (!(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json(
//         standardResponse(false, 'Invalid credentials', {
//           invalidCredentials: true
//         })
//       );
//     }

//     // Auth method check
//     if (user.isGoogleAuth) {
//       return res.status(400).json(
//         standardResponse(false, 'Please use Google login', {
//           requiresGoogleLogin: true
//         })
//       );
//     }

//     // Successful login
//     const token = generateToken(user);
    
//     res.status(200).json(
//       standardResponse(true, 'Login successful', {
//         token,
//         user: {
//           id: user._id,
//           email: user.email,
//           role: user.role
//         },
//         redirectTo: determineRedirectPath(user.role)
//       })
//     );

//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json(
//       standardResponse(false, 'Server error', {
//         isServerError: true
//       })
//     );
//   }
// };

// // Helper function for role-based redirects
// function determineRedirectPath(role) {
//   const routes = {
//     'superadmin': '/superadmin-dashboard',
//     'admin': '/issuer-home',
//     'student': '/user-dashboard',
//     'default': '/dashboard'
//   };
//   return routes[role] || routes.default;
// }

// // Registration Controller (updated to check for Google users)
// exports.register = async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     const emailRegex = /^[a-zA-Z0-9._-]+@ves\.ac\.in$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json(
//         standardResponse(false, 'Email must be in the ves.ac.in domain')
//       );
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       if (existingUser.isGoogleAuth) {
//         return res.status(400).json(
//           standardResponse(false, 'This email is already registered with Google. Please use Google login.')
//         );
//       }
//       return res.status(400).json(
//         standardResponse(false, 'User already exists')
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({
//       email,
//       password: hashedPassword,
//       role: 'student',
//       isGoogleAuth: false
//     });

//     const token = generateToken(newUser);

//     res.status(201).json(
//       standardResponse(true, 'Registration successful', {
//         token,
//         user: {
//           id: newUser._id,
//           email: newUser.email,
//           role: newUser.role
//         }
//       })
//     );

//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(400).json(
//       standardResponse(false, error.message)
//     );
//   }
// };

// // Get Current User Controller (no changes needed)
// exports.getMe = async (req, res) => {
//   try {
//     res.status(200).json(
//       standardResponse(true, 'User retrieved', {
//         id: req.user._id,
//         email: req.user.email,
//         role: req.user.role
//       })
//     );
//   } catch (error) {
//     console.error('GetMe error:', error);
//     res.status(500).json(
//       standardResponse(false, 'Server error')
//     );
//   }
// };