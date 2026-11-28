
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  Plus,
  Sparkles,
  UserRound,
  X,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import api from "../api/axios";

const initialData = {
  name: "",
  headline: "",
  location: "",
  education: "",
  qualification: "",
  experience: "",
  skills: [],
  skillInput: "",
  preferredRole: "",
  preferredLocation: "",
  employmentType: "Full-time",
};

function ProfileSetup() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [formData, setFormData] = useState(initialData);
  const [currentStep, setCurrentStep] = useState(1);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load existing user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/profile");

        const user = data.user;

        if (!user) {
          throw new Error("Unable to load your profile.");
        }

        const educationDetails = user.education?.[0] || {};

        setFormData({
          name: user.name || "",
          headline: user.headline || "",
          location: user.location || "",
          qualification: educationDetails.degree || "",
          education: educationDetails.institution || "",
          experience: user.experienceLevel || "",
          skills: user.skills || [],
          skillInput: "",
          preferredRole: (user.preferredJobRoles || []).join(", "),
          preferredLocation: (user.preferredLocations || []).join(", "),
          employmentType:
            user.preferredEmploymentTypes?.[0] || "Full-time",
        });
      } catch (err) {
        console.error("Profile loading error:", err);

        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to load your profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Update form fields
  const updateField = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Add skill
  const addSkill = (event) => {
    event.preventDefault();

    const skill = formData.skillInput.trim();

    if (!skill) return;

    const alreadyExists = formData.skills.some(
      (item) => item.toLowerCase() === skill.toLowerCase()
    );

    if (alreadyExists) return;

    setFormData((previous) => ({
      ...previous,
      skills: [...previous.skills, skill],
      skillInput: "",
    }));
  };

  // Remove skill
  const removeSkill = (skillToRemove) => {
    setFormData((previous) => ({
      ...previous,
      skills: previous.skills.filter(
        (skill) => skill !== skillToRemove
      ),
    }));
  };

  // Validate current step before continuing
  const nextStep = () => {
    if (!formRef.current?.reportValidity()) return;

    setError("");
    setSuccess("");

    setCurrentStep((previous) => Math.min(previous + 1, 3));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Go back
  const previousStep = () => {
    setError("");
    setSuccess("");

    setCurrentStep((previous) => Math.max(previous - 1, 1));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Convert comma-separated text into arrays
  const convertToArray = (value) => {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  // Submit profile to backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formRef.current?.reportValidity()) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      // Fetch existing profile to preserve other education records
      const { data: profileData } = await api.get("/profile");

      const existingEducation = profileData.user?.education || [];

      const educationEntry = {
        ...(existingEducation[0]?.toObject?.() ||
          existingEducation[0] ||
          {}),
        institution: formData.education.trim(),
        degree: formData.qualification,
      };

      const payload = {
        name: formData.name.trim(),
        headline: formData.headline.trim(),
        location: formData.location.trim(),

        education: [
          educationEntry,
          ...existingEducation.slice(1),
        ],

        experienceLevel: formData.experience,

        skills: formData.skills,

        preferredJobRoles: convertToArray(
          formData.preferredRole
        ),

        preferredLocations: convertToArray(
          formData.preferredLocation
        ),

        preferredEmploymentTypes: [
          formData.employmentType,
        ],
      };

      const { data } = await api.put(
        "/profile/update",
        payload
      );

      if (!data.success) {
        throw new Error(
          data.message || "Profile update failed."
        );
      }

      setSuccess("Your profile has been saved successfully!");

      // Navigate to dashboard after successful save
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      console.error("Profile submission error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong while saving your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const steps = [
    {
      number: 1,
      label: "Personal",
      icon: UserRound,
    },
    {
      number: 2,
      label: "Professional",
      icon: BriefcaseBusiness,
    },
    {
      number: 3,
      label: "Career goals",
      icon: GraduationCap,
    },
  ];

  // Loading screen
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <LoaderCircle
            size={38}
            className="mx-auto animate-spin text-emerald-600"
          />
          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-extrabold text-slate-900"
          >
            <Sparkles className="text-emerald-600" />
            Career<span className="text-emerald-600">AI</span>
          </Link>

          <span className="text-sm font-medium text-slate-500">
            Profile setup
          </span>

        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-12">

        {/* Introduction */}
        <div className="mb-9 text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <Sparkles size={27} />
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900">
            Build your professional profile
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Help CareerAI understand your background and discover
            opportunities that match your career goals.
          </p>

        </div>

        {/* Step indicators */}
        <div className="mb-8 grid grid-cols-3 gap-3">

          {steps.map((step) => {
            const Icon = step.icon;
            const active = currentStep >= step.number;

            return (
              <div key={step.number} className="text-center">

                <div
                  className={`mx-auto flex h-11 w-11 items-center justify-center rounded-xl ${
                    active
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  <Icon size={20} />
                </div>

                <p
                  className={`mt-2 text-xs font-semibold ${
                    active
                      ? "text-emerald-700"
                      : "text-slate-400"
                  }`}
                >
                  {step.label}
                </p>

              </div>
            );
          })}

        </div>

        {/* Progress bar */}
        <div className="mb-7 h-2 overflow-hidden rounded-full bg-slate-200">

          <div
            className="h-full rounded-full bg-emerald-600 transition-all duration-300"
            style={{
              width: `${(currentStep / 3) * 100}%`,
            }}
          />

        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9"
        >

          {/* Error message */}
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <AlertCircle size={19} className="shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
              <CheckCircle2 size={19} />
              <p>{success}</p>
            </div>
          )}

          {/* STEP 1: PERSONAL */}
          {currentStep === 1 && (
            <section>

              <h2 className="text-xl font-bold text-slate-900">
                Personal information
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Let's start with the basic details about you.
              </p>

              <div className="mt-7 space-y-5">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full name *
                  </label>

                  <input
                    name="name"
                    value={formData.name}
                    onChange={updateField}
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Professional headline
                  </label>

                  <input
                    name="headline"
                    value={formData.headline}
                    onChange={updateField}
                    placeholder="e.g. MERN Stack Developer"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    <MapPin className="mr-1 inline" size={16} />
                    Current location
                  </label>

                  <input
                    name="location"
                    value={formData.location}
                    onChange={updateField}
                    placeholder="City, state or country"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                  />
                </div>

              </div>
            </section>
          )}

          {/* STEP 2: PROFESSIONAL */}
          {currentStep === 2 && (
            <section>

              <h2 className="text-xl font-bold text-slate-900">
                Education and professional skills
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Tell us about your qualifications and experience.
              </p>

              <div className="mt-7 space-y-5">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Highest qualification *
                  </label>

                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={updateField}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                  >
                    <option value="">Select qualification</option>
                    <option value="High School">High School</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor's Degree">
                      Bachelor's Degree
                    </option>
                    <option value="Master's Degree">
                      Master's Degree
                    </option>
                    <option value="PhD">PhD</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    College / institution
                  </label>

                  <input
                    name="education"
                    value={formData.education}
                    onChange={updateField}
                    placeholder="Enter your college or institution name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Work experience
                  </label>

                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={updateField}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                  >
                    <option value="">Select experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="Less than 1 year">
                      Less than 1 year
                    </option>
                    <option value="1–2 years">1–2 years</option>
                    <option value="3–5 years">3–5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Skills
                  </label>

                  <div className="flex gap-2">

                    <input
                      name="skillInput"
                      value={formData.skillInput}
                      onChange={updateField}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          addSkill(event);
                        }
                      }}
                      placeholder="e.g. React, Node.js, MongoDB"
                      className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                    />

                    <button
                      type="button"
                      onClick={addSkill}
                      className="rounded-xl bg-emerald-600 px-4 text-white transition hover:bg-emerald-700"
                      aria-label="Add skill"
                    >
                      <Plus size={20} />
                    </button>

                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">

                    {formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700"
                      >
                        {skill}

                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          aria-label={`Remove ${skill}`}
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}

                  </div>

                </div>

              </div>
            </section>
          )}

          {/* STEP 3: CAREER GOALS */}
          {currentStep === 3 && (
            <section>

              <h2 className="text-xl font-bold text-slate-900">
                Your career goals
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Tell us what kind of opportunities you are looking for.
              </p>

              <div className="mt-7 space-y-5">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Preferred job role *
                  </label>

                  <input
                    name="preferredRole"
                    value={formData.preferredRole}
                    onChange={updateField}
                    placeholder="e.g. Full Stack Developer, React Developer"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                  />

                  <p className="mt-1 text-xs text-slate-400">
                    Separate multiple roles with commas.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Preferred location
                  </label>

                  <input
                    name="preferredLocation"
                    value={formData.preferredLocation}
                    onChange={updateField}
                    placeholder="e.g. Remote, Bengaluru, Delhi"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                  />

                  <p className="mt-1 text-xs text-slate-400">
                    Separate multiple locations with commas.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Employment type
                  </label>

                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={updateField}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>

                <div className="rounded-xl bg-emerald-50 p-4">

                  <div className="flex gap-3">

                    <Sparkles
                      className="shrink-0 text-emerald-600"
                      size={21}
                    />

                    <p className="text-sm leading-6 text-emerald-800">
                      CareerAI will use your profile information to suggest
                      relevant jobs. You can update your preferences later.
                    </p>

                  </div>

                </div>

              </div>
            </section>
          )}

          {/* Navigation buttons */}
          <div className="mt-9 flex items-center justify-between border-t border-slate-100 pt-6">

            {currentStep > 1 ? (
              <button
                type="button"
                onClick={previousStep}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                <ArrowLeft size={17} />
                Back
              </button>
            ) : (
              <Link
                to="/"
                className="text-sm font-semibold text-slate-500 hover:text-emerald-600"
              >
                Cancel
              </Link>
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700"
              >
                Continue
                <ArrowRight size={17} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <LoaderCircle size={17} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Complete Profile
                    <Sparkles size={17} />
                  </>
                )}
              </button>
            )}

          </div>

        </form>

        <p className="mt-5 text-center text-xs text-slate-400">
          Your information will be used to personalize your career experience.
        </p>

      </main>
    </div>
  );
}

export default ProfileSetup;
