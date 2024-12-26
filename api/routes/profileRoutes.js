const express = require('express');
const router = express.Router();
const User = require("../models/user");
const { UserGame, GameStats } = require("../models/game");
const multer = require('multer');
const fs = require('fs');
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');
const sharp = require('sharp');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where the images will be stored
    },
    filename: function (req, file, cb) {
        const username = req.params.username;
        // Save the file with a .jpg extension regardless of the original format
        cb(null, `${username}.jpg`);
    }
});

// Define file size limit (1MB)
const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
}).single('profilePicture');

// Upload profile picture route
router.post('/upload-profile-picture/:username', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            // Handle file size error
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: 'File size exceeds the 1MB limit.' });
            }
            return res.status(500).json({ message: 'Error uploading profile picture' });
        }

        try {
            const finalFilePath = `uploads/${req.params.username}.jpg`; // Final file path (saved as .jpg)

            // Save the path to the profile picture in the database
            const profilePicturePath = `/uploads/${req.params.username}.jpg`;

            const updatedUser = await User.findOneAndUpdate(
                { username: req.params.username },
                { profilePicture: profilePicturePath },
                { new: true }
            );

            if (!updatedUser) return res.status(404).json({ message: 'User not found' });

            // Send back the updated user with the profile picture path
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json({ message: 'Error uploading profile picture' });
        }
    });
});

// Get user profile by username
router.get('/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user data' });
    }
});

// Update username
router.put('/:username', async (req, res) => {
    try {
        // Check if the username is already being used by another account
        const usernameExists = await User.findOne({ username: req.body.username });
        
        if (usernameExists && usernameExists.username !== req.params.username) {
            return res.status(409).json({ message: 'Username already in use' });
        }

        // Update the username if it's not in use
        const updatedUser = await User.findOneAndUpdate(
            { username: req.params.username },
            { username: req.body.username },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        await UserGame.updateMany(
            { username: req.params.username },
            { $set: { userId: req.body.username } }
        );
        
        await UserGame.updateMany(
            { username: req.params.username },
            { $set: { username: req.body.username } }
        );
        
        await GameStats.updateMany(
            { userId: req.params.username },
            { $set: { userId: req.body.username } }
        );
        
        res.json(updatedUser);

    } catch (err) {
        console.error("Error updating username:", err.message);
        res.status(500).json({ message: 'Error updating username' });
    }
});



// Update country
router.put('/country/:username', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { username: req.params.username },
            { country: req.body.country },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (err) {
        console.error("Error updating country:", err.message);
        res.status(500).json({ message: 'Error updating country' });
    }
});


// Update email
router.put('/update-email/:username', async (req, res) => {
    try {
        // Check if the email is already being used by another account
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists && emailExists.username !== req.params.username) {
            return res.status(409);
        }

        // Update the email if it's not in use
        const updatedUser = await User.findOneAndUpdate(
            { username: req.params.username },
            { email: req.body.email },
            { new: true }
        );
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
        

    } catch (err) {
        console.error("Error updating email:", err.message);
        res.status(500).json({ message: 'Error updating email' });
    }
});

// Update password
router.put('/update-password/:username', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { password } = req.body;

    try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update the user's password with the hashed password
        const updatedUser = await User.findOneAndUpdate(
            { username: req.params.username },
            { password: hashedPassword },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Password updated successfully!' });
    } catch (err) {
        console.error("Error updating password:", err.message);
        res.status(500).json({ message: 'Error updating password' });
    }
});



router.delete('/delete-zero-scores/:username', async (req, res) => {
    try {
        const deletedUsers = await GameStats.deleteMany({
            userId: req.params.username,
            score: 0,
        });

        if (deletedUsers.deletedCount === 0) {
            return res.status(404).json({ message: 'No users with a score of 0 found for the specified username' });
        }

        res.status(200).json({ message: 'Users with a score of 0 successfully deleted', deletedCount: deletedUsers.deletedCount });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting users', error: err.message });
    }
});


// // Delete user account
router.delete('/delete/:username', async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ username: req.params.username });
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });

        // Optionally, delete the user's profile picture file from the file system
        if (deletedUser.profilePicture) {
            const filePath = `uploads/${deletedUser.profilePicture.split('/')[2]}`;
            fs.unlinkSync(filePath);
        }

        res.json({ message: 'User account deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user account' });
    }
});

// Reset user score (example route)
router.delete('/reset-score/:username', async (req, res) => {
    try {
        const deletedUsers = await GameStats.deleteMany({ userId: req.params.username });
        if (deletedUsers.deletedCount === 0) {
            return res.status(404).json({ message: 'No users found with the specified username' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting users' });
    }
});

module.exports = router;
