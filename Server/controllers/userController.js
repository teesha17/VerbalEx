const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { username, name, email, password } = req.body;
  try {
    let existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ errors: [{ msg: "Username already taken" }] });
    }
    existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ errors: [{ msg: "Email already in use" }] });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({username,name,email,password: hashedPassword});
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

const loginUser = async (req, res) => {
    const { emailOrUsername, password } = req.body;
    try {
      // Determine if the input is an email or username
      const isEmail = emailOrUsername.includes("@");
      const userData = await User.findOne(isEmail ? { email: emailOrUsername } : { username: emailOrUsername });
  
      // Check if user exists
      if (!userData) {
        return res.status(400).json({ errors: "Invalid credentials" });
      }
  
      // Verify the password
      const pwdCompare = await bcrypt.compare(password, userData.password);
      if (!pwdCompare) {
        return res.status(400).json({ errors: "Invalid credentials" });
      }
  
      // Generate JWT token
      const data = {
        user: {
          id: userData.id
        }
      };
      const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      // Set cookie and respond with token
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000, 
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  };
  

module.exports = {loginUser,registerUser}