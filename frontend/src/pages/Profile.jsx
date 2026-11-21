
import { useEffect, useState } from "react";
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
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/profile");
        setProfile({ ...emptyProfile, ...data.user });
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Unable to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const { data } = await api.put("/profile/update", profile);

      setProfile({ ...emptyProfile, ...data.user });
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Profile update failed."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="font-semibold text-blue-600">CAREERAI</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Build Your Professional Profile
          </h1>
          <p className="mt-2 text-slate-500">
            Complete your profile to receive better AI-powered job matches.
          </p>
        </div>
            <ProfileProgress profile={profile} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold">
              Personal Information
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                ["name", "Full Name"],
                ["headline", "Professional Headline"],
                ["phone", "Phone Number"],
                ["location", "Current Location"],
                ["profilePicture", "Profile Image URL"],
              ].map(([name, label]) => (
                <div key={name}>
                  <label className="mb-2 block text-sm font-medium">
                    {label}
                  </label>
                  <input
                    name={name}
                    value={profile[name] || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              ))}
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium">
                About You
              </label>
              <textarea
                name="bio"
                value={profile.bio || ""}
                onChange={handleChange}
                rows="4"
                className="w-full rounded-lg border border-slate-200 p-4 outline-none focus:border-blue-500"
                placeholder="Describe your professional background..."
              />
            </div>
          </section>

  
<Experience
  experience={profile.experience || []}
  setExperience={(experience) =>
    setProfile((prev) => ({ ...prev, experience }))
  }
/>

<Projects
  projects={profile.projects || []}
  setProjects={(projects) =>
    setProfile((prev) => ({ ...prev, projects }))
  }
/>


          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold">
              Skills & Career Preferences
            </h2>

            {[
              ["skills", "Skills (comma separated)"],
              ["preferredJobRoles", "Preferred Job Roles"],
              ["preferredLocations", "Preferred Locations"],
            ].map(([name, label]) => (
              <div key={name} className="mb-5">
                <label className="mb-2 block text-sm font-medium">
                  {label}
                </label>
                <input
                  value={(profile[name] || []).join(", ")}
                  onChange={(e) =>
                    handleArrayChange(name, e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 p-3"
                  placeholder="React, JavaScript, Node.js..."
                />
              </div>
            ))}

            <label className="mb-2 block text-sm font-medium">
              Expected Annual Salary
            </label>
            <input
              type="number"
              name="expectedSalary"
              value={profile.expectedSalary || 0}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 p-3"
            />

            <label className="mb-2 mt-5 block text-sm font-medium">
              Availability
            </label>
            <select
              name="availability"
              value={profile.availability}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 p-3"
            >
              <option value="immediately">Immediately</option>
              <option value="15-days">Within 15 days</option>
              <option value="30-days">Within 30 days</option>
              <option value="60-days">Within 60 days</option>
              <option value="not-looking">Not looking</option>
            </select>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold">
              Experience & Projects
            </h2>

            <p className="text-sm text-slate-500">
              We'll add dedicated experience and project editors in the
              next iteration. Your existing records will be preserved.
            </p>
          </section>

          {message && (
            <p className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Professional Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
