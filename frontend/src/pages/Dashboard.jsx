
import { Link } from 'react-router-dom'
import {
  UserRound,
  BriefcaseBusiness,
  Bookmark,
  FileText,
  ArrowUpRight,
  MapPin,
  Clock,
  Sparkles,
  Settings,
  Bell,
  Plus,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react'

const recommendedJobs = [
  {
    id: 1,
    title: 'MERN Stack Developer',
    company: 'TechNova Solutions',
    location: 'Remote',
    salary: '₹4–7 LPA',
    match: 96,
    skills: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 2,
    title: 'Frontend React Developer',
    company: 'PixelCraft Technologies',
    location: 'Bengaluru',
    salary: '₹3–5 LPA',
    match: 92,
    skills: ['React', 'JavaScript', 'Tailwind'],
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'CloudBridge',
    location: 'Remote',
    salary: '₹5–8 LPA',
    match: 89,
    skills: ['React', 'Express', 'MongoDB'],
  },
]

const activities = [
  {
    title: 'Profile created',
    description: 'Your CareerAI profile is ready to be completed.',
    time: 'Recently',
  },
  {
    title: 'Explore job opportunities',
    description: 'Discover roles that match your skills.',
    time: 'Next step',
  },
  {
    title: 'Build your resume',
    description: 'Create a professional resume with AI assistance.',
    time: 'Coming up',
  },
]

function Dashboard() {
  const profileCompletion = 65

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="text-2xl font-black text-indigo-600">
            CareerAI<span className="text-slate-900">.</span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <Link to="/dashboard" className="text-sm font-semibold text-indigo-600">
              Dashboard
            </Link>
            <Link to="/jobs" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
              Find Jobs
            </Link>
            <Link to="/saved-jobs" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
              Saved Jobs
            </Link>
            <Link to="/profile-setup" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
              My Profile
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="Notifications"
              className="rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50"
            >
              <Bell size={19} />
            </button>

            <Link
              to="/profile-setup"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700"
            >
              U
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-5 py-9">
        {/* Welcome */}
        <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
              <Sparkles size={16} />
              Your career workspace
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Welcome back!
            </h1>

            <p className="mt-2 text-slate-500">
              Here's what's happening with your career journey.
            </p>
          </div>

          <Link
            to="/jobs"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Find opportunities <ArrowUpRight size={17} />
          </Link>
        </section>

        {/* Stats */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Profile completion</span>
              <UserRound className="text-indigo-600" size={21} />
            </div>
            <p className="mt-3 text-3xl font-black">{profileCompletion}%</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-indigo-600"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
            <Link to="/profile-setup" className="mt-3 inline-block text-xs font-semibold text-indigo-600">
              Complete your profile →
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Recommended jobs</span>
              <BriefcaseBusiness className="text-blue-600" size={21} />
            </div>
            <p className="mt-3 text-3xl font-black">24</p>
            <p className="mt-2 text-xs text-slate-500">Demo recommendation count</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Saved jobs</span>
              <Bookmark className="text-amber-500" size={21} />
            </div>
            <p className="mt-3 text-3xl font-black">03</p>
            <Link to="/saved-jobs" className="mt-2 inline-block text-xs font-semibold text-indigo-600">
              View saved jobs →
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Applications</span>
              <FileText className="text-emerald-600" size={21} />
            </div>
            <p className="mt-3 text-3xl font-black">00</p>
            <p className="mt-2 text-xs text-slate-500">No applications tracked yet</p>
          </div>
        </section>

        {/* Profile completion banner */}
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
              Add your skills, education and experience to help CareerAI find more relevant opportunities.
            </p>
          </div>

          <Link
            to="/profile-setup"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 hover:bg-indigo-50"
          >
            Complete profile <ArrowUpRight size={17} />
          </Link>
        </section>

        <div className="grid items-start gap-7 lg:grid-cols-[1fr_330px]">
          {/* Recommended jobs */}
          <section>
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">Recommended opportunities</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Explore these sample job matches.
                </p>
              </div>

              <Link to="/jobs" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
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
                      <p className="mt-1 text-sm text-slate-500">{job.company}</p>

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <BriefcaseBusiness size={14} /> {job.salary}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:flex-col sm:items-end">
                      <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                        {job.match}% demo match
                      </span>
                      <span className="text-xs text-slate-400">Sample score</span>
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

          {/* Right sidebar */}
          <aside className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">Quick actions</h2>
                <Settings size={18} className="text-slate-400" />
              </div>

              <div className="mt-4 space-y-3">
                <Link
                  to="/profile-setup"
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 hover:bg-slate-50"
                >
                  <UserRound className="text-indigo-600" size={19} />
                  <span className="flex-1 text-sm font-semibold">Edit profile</span>
                  <ArrowUpRight size={16} className="text-slate-400" />
                </Link>

                <Link
                  to="/saved-jobs"
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 hover:bg-slate-50"
                >
                  <Bookmark className="text-amber-500" size={19} />
                  <span className="flex-1 text-sm font-semibold">Saved jobs</span>
                  <ArrowUpRight size={16} className="text-slate-400" />
                </Link>

                <Link
                  to="/resume-builder"
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 hover:bg-slate-50"
                >
                  <FileText className="text-emerald-600" size={19} />
                  <span className="flex-1 text-sm font-semibold">Create AI resume</span>
                  <ArrowUpRight size={16} className="text-slate-400" />
                </Link>

                <Link
                  to="/jobs"
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 hover:bg-slate-50"
                >
                  <Plus className="text-blue-600" size={19} />
                  <span className="flex-1 text-sm font-semibold">Explore jobs</span>
                  <ArrowUpRight size={16} className="text-slate-400" />
                </Link>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="font-bold">Career activity</h2>

              <div className="mt-5 space-y-5">
                {activities.map((activity, index) => (
                  <div key={activity.title} className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                      {index === 0 ? (
                        <CheckCircle2 size={17} />
                      ) : index === 1 ? (
                        <BriefcaseBusiness size={17} />
                      ) : (
                        <FileText size={17} />
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-semibold">{activity.title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {activity.description}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
              <Sparkles className="text-indigo-600" size={23} />
              <h2 className="mt-3 font-bold">AI Career Assistant</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Your AI career assistant will help you discover jobs and improve your resume.
              </p>
              <p className="mt-3 text-xs font-semibold text-indigo-600">
                AI integration coming soon
              </p>
            </section>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
