const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt=require('bcryptjs')
const jwt =  require('jsonwebtoken')
const { body, validationResult } = require('express-validator');

router.post("/register", [
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('name').isLength({ min: 5 }).withMessage("Name must be at least 5 characters"),
    body('username').notEmpty().withMessage("Username is required"),
    body('password').isLength({ min: 5 }).withMessage("Password must be at least 5 characters")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, name, email, password } = req.body;

    try {
        // Check if a user with the same username already exists
        let existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ errors: [{ msg: "Username already taken" }] });
        }

        // Check if a user with the same email already exists
        existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ errors: [{ msg: "Email already in use" }] });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(password, salt);

        // Create and save the new user
        await User.create({
            username,
            name,
            password: secPassword,
            email,
        });

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

router.post("/login", [
    body('emailOrUsername').notEmpty().withMessage("Email or Username is required"),
    body('password').isLength({ min: 5 }).withMessage("Password must be at least 5 characters")
], async (req, res) => {
    const { emailOrUsername, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Determine if the login input is an email or username
        const isEmail = emailOrUsername.includes("@");
        const userData = await User.findOne(isEmail ? { email: emailOrUsername } : { username: emailOrUsername });

        if (!userData) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }

        // Check password
        const pwdCompare = await bcrypt.compare(password, userData.password);
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }

        // Create and return JWT token
        const data = {
            user: {
                id: userData.id
            }
        };
        const authToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.json({ success: true, authToken: authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});


module.exports = router;

// const express = require("express");
// const { register, login } = require("../controllers/authController");

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);

// module.exports = router;
