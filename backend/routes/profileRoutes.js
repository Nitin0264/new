
import express from "express";

import {
  getProfile,
  updateProfile,
  uploadProfilePicture,
} from "../controllers/profileController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Get profile
router.get("/", protect, getProfile);

// Update profile
router.put("/update", protect, updateProfile);

// Upload profile picture
router.post(
  "/upload-picture",
  protect,
  upload.single("profilePicture"),
  uploadProfilePicture
);

export default router;
