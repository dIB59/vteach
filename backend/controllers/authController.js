const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Teacher = require('../models/teacher');
const Student = require('../models/student');

// Generate JWT Token
const generateToken = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    return { accessToken, refreshToken };
};

const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        // Check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check password format (at least 8 characters, containing letters and numbers)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Invalid password format' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName, lastName, email, password: hashedPassword, role });

        let profile;

        if (role === 'teacher') {
            const { educationalCredentials } = req.body;
            profile = await Teacher.create({ user: user._id, educationalCredentials });
        } else if (role === 'student') {
            const { educationalLevel, subjectsOfInterest } = req.body;
            profile = await Student.create({ user: user._id, educationalLevel, subjectsOfInterest });
        }

        const tokens = generateToken(user._id);
    
        res.json(tokens);
    } catch (error) {
        console.error(error);

        // Check for duplicate email error (code 11000)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const tokens = generateToken(user._id);
        res.json(tokens);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
//refresh token when access token expire
const refreshTokens = (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not provided' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const accessToken = jwt.sign({ userId: user.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

        res.json({ accessToken });
    });
};

module.exports = {
    signup,
    login,
    refreshTokens,
};
