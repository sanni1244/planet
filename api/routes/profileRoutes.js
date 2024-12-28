const express = require('express');
const router = express.Router();
const User = require("../models/user");
const { UserGame, GameStats } = require("../models/game");
const fs = require('fs');
const path = require('path');
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Set in your .env file
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer to use Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
      const username = req.params.username; // Access username from the route parameter
      return {
          folder: 'profile_pictures', // Cloudinary folder name
          format: 'jpg', // Force the file format to JPG
          public_id: username, // Rename the file to $username
      };
  },
});

const upload = multer({ storage });

// Upload route using Cloudinary
router.post('/upload-profile-picture/:username', upload.single('profilePicture'), async (req, res) => {
  try {
      if (!req.file || !req.file.path) {
          return res.status(400).json({ message: 'No file uploaded' });
      }

      const imageUrl = req.file.path; // Cloudinary URL

      // Update the user's profile in your database
      const updatedUser = await User.findOneAndUpdate(
          { username: req.params.username },
          { profilePicture: imageUrl },
          { new: true }
      );

      if (!updatedUser) return res.status(404).json({ message: 'User not found' });

      res.json({ profilePicture: imageUrl });
  } catch (err) {
      console.error('Error uploading profile picture:', err);
      res.status(500).json({ message: 'Error uploading profile picture' });
  }
});

































// Get user profile by username
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error("Error fetching user data:", err.message);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// Update username
router.put('/:username', async (req, res) => {
  try {
    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists && usernameExists.username !== req.params.username) {
      return res.status(409).json({ message: 'Username already in use' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      { username: req.body.username },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    await UserGame.updateMany(
      { username: req.params.username },
      { $set: { userId: req.body.username, username: req.body.username } }
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

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating country:", err.message);
    res.status(500).json({ message: 'Error updating country' });
  }
});

// Update email
router.put('/update-email/:username', async (req, res) => {
  try {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists && emailExists.username !== req.params.username) {
      return res.status(409).json({ message: 'Email already in use' });
    }

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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Password updated successfully!' });
  } catch (err) {
    console.error("Error updating password:", err.message);
    res.status(500).json({ message: 'Error updating password' });
  }
});

// Delete zero scores
router.delete('/delete-zero-scores/:username', async (req, res) => {
  try {
    const deletedUsers = await GameStats.deleteMany({
      userId: req.params.username,
      score: 0,
    });

    if (deletedUsers.deletedCount === 0) {
      return res.status(404).json({ message: 'No users with a score of 0 found' });
    }

    res.status(200).json({ message: 'Users with a score of 0 successfully deleted', deletedCount: deletedUsers.deletedCount });
  } catch (err) {
    console.error("Error deleting scores:", err.message);
    res.status(500).json({ message: 'Error deleting scores' });
  }
});

// Delete user account
router.delete('/delete/:username', async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ username: req.params.username });
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    if (deletedUser.profilePicture) {
      const filePath = path.join(uploadDir, deletedUser.profilePicture.split('/').pop());
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    res.json({ message: 'User account deleted successfully' });
  } catch (err) {
    console.error("Error deleting user account:", err.message);
    res.status(500).json({ message: 'Error deleting user account' });
  }
});

// Reset user score
router.delete('/reset-score/:username', async (req, res) => {
  try {
    const deletedUsers = await GameStats.deleteMany({ userId: req.params.username });
    if (deletedUsers.deletedCount === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json({ message: 'Score reset successfully!' });
  } catch (err) {
    console.error("Error resetting score:", err.message);
    res.status(500).json({ message: 'Error resetting score' });
  }
});

module.exports = router;
