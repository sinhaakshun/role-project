const jwtUtils = require('../utils/jwtUtils');
const User = require('../models/User');
const db  = require('../config/dbConfig');

db.sync();
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({where : {email : email}});
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new user
    const newUser = await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.login = async (req, res) => {
  try {
    // Authenticate user and generate JWT token
    const { name, email, password, role } = req.body;

    const user = await User.findOne({where : {email : email}});
    
    // Check if the user is Super Admin
    if (user && user.role === 'Super Admin') {
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      const token = jwtUtils.generateToken(payload);
      res.json({ token });
    } else {
      res.json({ error: 'Unauthorized' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.json({ error: 'Internal server error' });
  }
};





