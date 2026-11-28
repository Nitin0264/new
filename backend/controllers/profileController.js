
import User from "../models/user.js";
import cloudinary from "../config/cloudinary.js";

// Calculate profile completion status
const checkProfileCompletion = (user) => {
  return Boolean(
    user.name?.trim() &&
    user.headline?.trim() &&
    user.location?.trim() &&
    user.education?.length > 0 &&
    user.skills?.length > 0 &&
    user.preferredJobRoles?.length > 0
  );
};

// Get logged-in user's profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch profile",
    });
  }
};

// Update logged-in user's profile
export const updateProfile = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "profilePicture",
      "headline",
      "bio",
      "phone",
      "location",
      "education",
      "skills",
      "experience",
      "experienceLevel",
      "projects",
      "preferredJobRoles",
      "preferredLocations",
      "preferredEmploymentTypes",
      "expectedSalary",
      "availability",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    Object.assign(user, updates);

    user.profileCompleted = checkProfileCompletion(user);

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to update profile",
    });
  }
};

// Upload profile picture to Cloudinary
export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image to upload.",
      });
    }

    const uploadedImage = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "careerai/profile-pictures",
          resource_type: "image",
          transformation: [
            { width: 500, height: 500, crop: "limit" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(req.file.buffer);
    });

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.profilePicture = uploadedImage.secure_url;
    user.profileCompleted = checkProfileCompletion(user);

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile picture upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Profile picture upload failed.",
    });
  }
};
