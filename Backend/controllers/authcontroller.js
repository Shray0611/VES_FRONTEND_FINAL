const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const standardResponse = (success, message, data = null) => ({
  success,
  message,
  ...(data && { data })
});

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