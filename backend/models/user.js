
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // User Role
    role: {
      type: String,
      enum: ["job_seeker", "recruiter", "admin"],
      default: "job_seeker",
    },

    // Profile Information
    profilePicture: {
      type: String,
      default: "",
    },

    headline: {
      type: String,
      default: "",
      trim: true,
    },

    bio: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    // Education
    education: [
      {
        institution: {
          type: String,
          trim: true,
        },
        degree: {
          type: String,
          trim: true,
        },
        fieldOfStudy: {
          type: String,
          trim: true,
        },
        startYear: String,
        endYear: String,
        grade: String,
      },
    ],

    // Skills
    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    // Work Experience
    experience: [
      {
        company: String,
        position: String,
        employmentType: String,
        startDate: Date,
        endDate: Date,
        currentlyWorking: {
          type: Boolean,
          default: false,
        },
        description: String,
      },
    ],

    // Experience Level
    experienceLevel: {
      type: String,
      default: "",
    },

    // Projects
    projects: [
      {
        title: String,
        description: String,
        technologies: [String],
        projectLink: String,
      },
    ],

    // Career Preferences
    preferredJobRoles: {
      type: [String],
      default: [],
    },

    preferredLocations: {
      type: [String],
      default: [],
    },

    preferredEmploymentTypes: {
      type: [String],
      default: [],
    },

    expectedSalary: {
      type: Number,
      default: 0,
    },

    availability: {
      type: String,
      enum: [
        "immediately",
        "15-days",
        "30-days",
        "60-days",
        "not-looking",
      ],
      default: "immediately",
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
