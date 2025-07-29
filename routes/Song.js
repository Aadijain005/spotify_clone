const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");
const User = require("../models/User");

// ✅ Create a new song (Protected)
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { title, thumbnail, track } = req.body;

      if (!title || !thumbnail || !track) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const newSong = new Song({
        title,
        thumbnail,
        track,
        createdBy: req.user._id,
      });

      await newSong.save();
      res.status(201).json({ message: "Song created", song: newSong });
    } catch (err) {
      console.error("Error creating song:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// ✅ Get all songs created by the logged-in user (Protected)
router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const songs = await Song.find({ createdBy: req.user._id }).populate("createdBy");
      res.status(200).json({ data: songs });
    } catch (err) {
      console.error("Error fetching user's songs:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// ✅ Get all songs published by a specific artist (Protected)
router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { artistId } = req.params;

      const artist = await User.findById(artistId);
      if (!artist) {
        return res.status(404).json({ error: "Artist does not exist" });
      }

      const songs = await Song.find({ createdBy: artistId }).populate("createdBy");
      res.status(200).json({ data: songs });
    } catch (err) {
      console.error("Error fetching artist's songs:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// ✅ Get songs by title — fuzzy search (Protected)
router.get(
  "/get/songname/:songName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { songName } = req.params;

      const songs = await Song.find({
        title: { $regex: songName, $options: "i" },
      }).populate("createdBy");

      res.status(200).json({ data: songs });
    } catch (err) {
      console.error("Error searching songs by name:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;