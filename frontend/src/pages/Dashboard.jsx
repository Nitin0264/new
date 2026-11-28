
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  UserRound,
  BriefcaseBusiness,
  Bookmark,
  FileText,
  ArrowUpRight,
  MapPin,
  Sparkles,
  Settings,
  Bell,
  Plus,
  CheckCircle2,
  TrendingUp,
  GraduationCap,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

import api from "../api/axios";

// Temporary demo recommendations.
// We will connect these to the real Jobs API in the Jobs section.
const recommendedJobs = [
  {
    id: 1,
    title: "MERN Stack Developer",
    company: "TechNova Solutions",
    location: "Remote",
    salary: "₹4–7 LPA",
    skills: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "Frontend React Developer",
    company: "PixelCraft Technologies",
    location: "Bengaluru",
    salary: "₹3–5 LPA",
    skills: ["React", "JavaScript", "Tailwind"],
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "CloudBridge",
    location: "Remote",
    salary: "₹5–8 LPA",
    skills: ["React", "Express", "MongoDB"],
  },
];

// Profile completion based on the backend's core requirements.
const calculateProfileCompletion = (profile) => {
  if (!profile) return 0;

  const requiredFields = [
    Boolean(profile.name?.trim()),
    Boolean(profile.headline?.trim()),
    Boolean(profile.location?.trim()),
    Boolean(profile.education?.length),
    Boolean(profile.skills?.length),
    Boolean(profile.preferredJobRoles?.length),
  ];

  const completedFields = requiredFields.filter(Boolean).length;

  return Math.round(
    (completedFields / requiredFields.length) * 100
  );
};

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const { data } = await api.get("/profile");

        if (isMounted && data.success) {
          setProfile(data.user);
        }
      } catch (err) {
        console.error("Dashboard profile error:", err);

        if (isMounted) {
          setError(
            err.response?.data?.message ||
              "Unable to load your profile. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const profileCompletion = calculateProfileCompletion(profile);

  const firstName =
    profile?.name?.trim()?.split(/\s+/)[0] || "there";

  const hasCompletedProfile = profile?.profileCompleted;

  const education = profile?.education?.[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <Link to="/" className="text-2xl font-black text-indigo-600">
            CareerAI<span className="text-slate-900">.</span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <Link
              to="/dashboard"
              className="text-sm font-semibold text-indigo-600"
            >
              Dashboard
            </Link>

            <Link
              to="/jobs"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600"
            >
              Find Jobs
            </Link>

            <Link
              to="/saved-jobs"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600"
            >
              Saved Jobs
            </Link>

            <Link
              to="/profile"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600"
            >
              My Profile
            </Link>
          </div>

          <div className="flex items-center gap-3">

            <button
              type="button"
              aria-label="Notifications"
              className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50"
            >
              <Bell size={19} />
            </button>

            <Link
              to="/profile"
              aria-label="Open your profile"
              className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-indigo-100 bg-indigo-100 font-bold text-indigo-700 transition hover:border-indigo-500"
            >
              {profile?.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt={profile.name || "User profile"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>
                  {profile?.name?.trim()?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
            </Link>

          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-5 py-9">

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle size={19} />
            {error}
          </div>
        )}

        {/* Welcome Section */}
        <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
              <Sparkles size={16} />
              Your career workspace
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Welcome back, {loading ? "..." : firstName}!
            </h1>

            <p className="mt-2 text-slate-500">
              Here's what's happening with your career journey.
            </p>

            {profile?.headline && (
              <p className="mt-2 text-sm font-medium text-indigo-600">
                {profile.headline}
              </p>
            )}
          </div>

          <Link
            to="/jobs"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Find opportunities <ArrowUpRight size={17} />
          </Link>
        </section>

        {/* Dashboard Stats */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* Profile Completion */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Profile completion
              </span>
              <UserRound className="text-indigo-600" size={21} />
            </div>

            <p className="mt-3 text-3xl font-black">
              {loading ? "..." : `${profileCompletion}%`}
            </p>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>

            <Link
              to="/profile-setup"
              className="mt-3 inline-block text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              {profileCompletion === 100
                ? "Review your profile →"
                : "Complete your profile →"}
            </Link>
          </div>

          {/* Recommended Jobs */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Sample recommendations
              </span>
              <BriefcaseBusiness className="text-blue-600" size={21} />
            </div>

            <p className="mt-3 text-3xl font-black">
              {recommendedJobs.length.toString().padStart(2, "0")}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Demo jobs displayed below
            </p>
          </div>

          {/* Saved Jobs */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Saved jobs</span>
              <Bookmark className="text-amber-500" size={21} />
            </div>

            <p className="mt-3 text-3xl font-black">—</p>

            <Link
              to="/saved-jobs"
              className="mt-2 inline-block text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View saved jobs →
            </Link>
          </div>

          {/* Applications */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Applications</span>
              <FileText className="text-emerald-600" size={21} />
            </div>

            <p className="mt-3 text-3xl font-black">—</p>

            <p className="mt-2 text-xs text-slate-500">
              Application tracking coming next
            </p>
          </div>

        </section>

        {/* Profile Completion Banner */}
        {!loading && profileCompletion < 100 && (
          <section className="mb-8 flex flex-col justify-between gap-5 rounded-2xl bg-indigo-600 p-6 text-white sm:flex-row sm:items-center sm:p-8">

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-indigo-100">
                <TrendingUp size={17} />
                Improve your visibility
              </div>

              <h2 className="text-2xl font-bold">
                Complete your professional profile
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100">
                Add your skills, education and career preferences to help
                CareerAI prepare more relevant job recommendations.
              </p>
            </div>

            <Link
              to="/profile-setup"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50"
            >
              Complete profile <ArrowUpRight size={17} />
            </Link>
          </section>
        )}

        {/* Profile Overview */}
        {!loading && profile && (
          <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6">

            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold">Your profile overview</h2>
                <p className="mt-1 text-sm text-slate-500">
                  A quick look at your professional information.
                </p>
              </div>

              <Link
                to="/profile"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View profile <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <UserRound size={19} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Full name</p>
                  <p className="mt-1 text-sm font-semibold">
                    {profile.name || "Not added"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <MapPin size={19} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Location</p>
                  <p className="mt-1 text-sm font-semibold">
                    {profile.location || "Not added"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                  <GraduationCap size={19} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Qualification</p>
                  <p className="mt-1 text-sm font-semibold">
                    {education?.degree || "Not added"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                  <BriefcaseBusiness size={19} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Experience level</p>
                  <p className="mt-1 text-sm font-semibold">
                    {profile.experienceLevel || "Not added"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                  <Sparkles size={19} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Preferred roles</p>
                  <p className="mt-1 text-sm font-semibold">
                    {profile.preferredJobRoles?.length
                      ? profile.preferredJobRoles.join(", ")
                      : "Not added"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-rose-50 p-3 text-rose-600">
                  <CheckCircle2 size={19} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Profile status</p>
                  <p className="mt-1 text-sm font-semibold">
                    {hasCompletedProfile ? "Completed" : "In progress"}
                  </p>
                </div>
              </div>

            </div>

            {profile.skills?.length > 0 && (
              <div className="mt-6 border-t border-slate-100 pt-5">
                <p className="mb-3 text-sm font-semibold">Your skills</p>

                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </section>
        )}

        {/* Loading Profile Overview */}
        {loading && (
          <div className="mb-8 flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-10 text-sm text-slate-500">
            <LoaderCircle size={19} className="animate-spin" />
            Loading your profile information...
          </div>
        )}

        {/* Main Dashboard Content */}
        <div className="grid items-start gap-7 lg:grid-cols-[1fr_330px]">

          {/* Recommended Jobs */}
          <section>

            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">
                  Recommended opportunities
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Sample opportunities to preview the dashboard.
                </p>
              </div>

              <Link
                to="/jobs"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View all
              </Link>
            </div>

            <div className="grid gap-4">
              {recommendedJobs.map((job) => (
                <article
                  key={job.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:shadow-md"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row">

                    <div>
                      <h3 className="font-bold">{job.title}</h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {job.company}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">

                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {job.location}
                        </span>

                        <span className="flex items-center gap-1">
                          <BriefcaseBusiness size={14} />
                          {job.salary}
                        </span>

                      </div>
                    </div>

                    <div className="flex items-start sm:flex-col sm:items-end">
                      <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
                        Demo listing
                      </span>
                    </div>

                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <Link
                      to={`/jobs/${job.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      View opportunity <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

          </section>

          {/* Right Sidebar */}
          <aside className="space-y-5">

            {/* Quick Actions */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5">

              <div className="flex items-center justify-between">
                <h2 className="font-bold">Quick actions</h2>
                <Settings size={18} className="text-slate-400" />
              </div>

              <div className="mt-4 space-y-3">

                <Link
                  to="/profile"
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50"
                >
                  <UserRound className="text-indigo-600" size={19} />
                  <span className="flex-1 text-sm font-semibold">
                    Edit profile
                  </span>
                  <ArrowUpRight size={16} className="text-slate-400" />
                </Link>

                <Link
                  to="/saved-jobs"
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50"
                >
                  <Bookmark className="text-amber-500" size={19} />
                  <span className="flex-1 text-sm font-semibold">
                    Saved jobs
                  </span>
                  <ArrowUpRight size={16} className="text-slate-400" />
                </Link>

                <Link
                  to="/resume-builder"
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50"
                >
                  <FileText className="text-emerald-600" size={19} />
                  <span className="flex-1 text-sm font-semibold">
                    Create AI resume
                  </span>
                  <ArrowUpRight size={16} className="text-slate-400" />
                </Link>

                <Link
                  to="/jobs"
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50"
                >
                  <Plus className="text-blue-600" size={19} />
                  <span className="flex-1 text-sm font-semibold">
                    Explore jobs
                  </span>
                  <ArrowUpRight size={16} className="text-slate-400" />
                </Link>

              </div>
            </section>

            {/* Career Activity */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5">

              <h2 className="font-bold">Career activity</h2>

              <div className="mt-5 space-y-5">

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    <CheckCircle2 size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Account created
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Your CareerAI account is ready.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <BriefcaseBusiness size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Explore job opportunities
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Discover opportunities that match your interests.
                    </p>
                    <Link
                      to="/jobs"
                      className="mt-2 inline-block text-xs font-semibold text-indigo-600"
                    >
                      Explore jobs →
                    </Link>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <FileText size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Build your resume
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Create a professional resume using the resume builder.
                    </p>
                    <Link
                      to="/resume-builder"
                      className="mt-2 inline-block text-xs font-semibold text-indigo-600"
                    >
                      Create resume →
                    </Link>
                  </div>
                </div>

              </div>
            </section>

            {/* AI Assistant */}
            <section className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">

              <Sparkles className="text-indigo-600" size={23} />

              <h2 className="mt-3 font-bold">
                AI Career Assistant
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Your AI career assistant will help you discover suitable jobs,
                improve your resume and plan your career.
              </p>

              <p className="mt-3 text-xs font-semibold text-indigo-600">
                AI integration coming soon
              </p>

            </section>

          </aside>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;
