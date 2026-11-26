
import { useEffect, useState } from "react";
import { Camera, Upload, UserCircle, CheckCircle2 } from "lucide-react";

import api from "../api/axios";
import Experience from "../components/profile/Experience";
import Projects from "../components/profile/Projects";
import ProfileProgress from "../components/profile/ProfileProgress";

const emptyProfile = {
  name: "",
  profilePicture: "",
  headline: "",
  bio: "",
  phone: "",
  location: "",
  education: [],
  skills: [],
  experience: [],
  projects: [],
  preferredJobRoles: [],
  preferredLocations: [],
  expectedSalary: 0,
  availability: "immediately",
};

function Profile() {
  const [profile, setProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/profile");
        setProfile({ ...emptyProfile, ...data.user });
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Unable to load profile."
        );
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Clean up temporary preview URL
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (name, value) => {
    setProfile((prev) => ({
      ...prev,
      [name]: value.split(",").map((item) => item.trim()).filter(Boolean),
    }));
  };

  // Select profile picture
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image.");
      setMessageType("error");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image size must be less than 5 MB.");
      setMessageType("error");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setMessage("");
  };

  // Upload picture to Cloudinary
  const handlePictureUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select an image first.");
      setMessageType("error");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    setUploading(true);
    setMessage("");

    try {
      const { data } = await api.post(
        "/profile/upload-picture",
        formData
      );

      setProfile((prev) => ({
        ...prev,
        profilePicture: data.user.profilePicture,
      }));

      setSelectedFile(null);
      setPreview("");

      setMessage("Profile picture uploaded successfully!");
      setMessageType("success");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Unable to upload profile picture."
      );
      setMessageType("error");
    } finally {
      setUploading(false);
    }
  };

  // Save professional profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const { data } = await api.put("/profile/update", profile);

      setProfile({ ...emptyProfile, ...data.user });
      setMessage("Profile updated successfully!");
      setMessageType("success");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Profile update failed."
      );
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500 font-medium">Loading profile...</p>
      </div>
    );
  }

  const displayedPicture = preview || profile.profilePicture;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <p className="font-bold tracking-widest text-blue-600">
            CAREERAI
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Build Your Professional Profile
          </h1>

          <p className="mt-2 text-slate-500">
            Complete your profile to receive better AI-powered job matches.
          </p>
        </div>

        <ProfileProgress profile={profile} />

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          {/* Personal Information */}
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">

            <h2 className="mb-6 text-xl font-bold text-slate-900">
              Personal Information
            </h2>

            {/* Profile Picture Upload */}
            <div className="mb-8 flex flex-col items-center gap-5 rounded-xl bg-slate-50 p-6 sm:flex-row">

              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-blue-100 shadow-md">

                  {displayedPicture ? (
                    <img
                      src={displayedPicture}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserCircle className="h-20 w-20 text-blue-400" />
                  )}

                </div>

                <div className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white shadow">
                  <Camera size={17} />
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-semibold text-slate-900">
                  Profile Picture
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Add a professional photo to make your profile stand out.
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">

                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600">
                    <Camera size={17} />
                    Choose Image

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  {selectedFile && (
                    <button
                      type="button"
                      onClick={handlePictureUpload}
                      disabled={uploading}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Upload size={17} />
                      {uploading ? "Uploading..." : "Upload Picture"}
                    </button>
                  )}

                </div>

                <p className="mt-3 text-xs text-slate-400">
                  JPG, PNG or WebP · Maximum 5 MB
                </p>
              </div>
            </div>

            {/* Personal Details */}
            <div className="grid gap-5 sm:grid-cols-2">

              {[
                ["name", "Full Name"],
                ["headline", "Professional Headline"],
                ["phone", "Phone Number"],
                ["location", "Current Location"],
              ].map(([name, label]) => (
                <div key={name}>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    {label}
                  </label>

                  <input
                    name={name}
                    value={profile[name] || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              ))}

            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                About You
              </label>

              <textarea
                name="bio"
                value={profile.bio || ""}
                onChange={handleChange}
                rows="4"
                className="w-full rounded-lg border border-slate-200 p-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Describe your professional background..."
              />
            </div>
          </section>

          {/* Experience */}
          <Experience
            experience={profile.experience || []}
            setExperience={(experience) =>
              setProfile((prev) => ({ ...prev, experience }))
            }
          />

          {/* Projects */}
          <Projects
            projects={profile.projects || []}
            setProjects={(projects) =>
              setProfile((prev) => ({ ...prev, projects }))
            }
          />

          {/* Skills and Career Preferences */}
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">

            <h2 className="mb-6 text-xl font-bold text-slate-900">
              Skills & Career Preferences
            </h2>

            {[
              ["skills", "Skills (comma separated)"],
              ["preferredJobRoles", "Preferred Job Roles"],
              ["preferredLocations", "Preferred Locations"],
            ].map(([name, label]) => (
              <div key={name} className="mb-5">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {label}
                </label>

                <input
                  value={(profile[name] || []).join(", ")}
                  onChange={(e) =>
                    handleArrayChange(name, e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
                  placeholder="React, JavaScript, Node.js..."
                />
              </div>
            ))}

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Expected Annual Salary
            </label>

            <input
              type="number"
              name="expectedSalary"
              min="0"
              value={profile.expectedSalary ?? 0}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
            />

            <label className="mb-2 mt-5 block text-sm font-medium text-slate-700">
              Availability
            </label>

            <select
              name="availability"
              value={profile.availability || "immediately"}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
            >
              <option value="immediately">Immediately</option>
              <option value="15-days">Within 15 days</option>
              <option value="30-days">Within 30 days</option>
              <option value="60-days">Within 60 days</option>
              <option value="not-looking">Not looking</option>
            </select>

          </section>

          {/* Status Message */}
          {message && (
            <div
              className={`flex items-center gap-3 rounded-xl p-4 text-sm ${
                messageType === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {messageType === "success" && (
                <CheckCircle2 size={19} />
              )}
              {message}
            </div>
          )}

          {/* Save Profile */}
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving Profile..." : "Save Professional Profile"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Profile;
