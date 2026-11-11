
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bookmark,
  BookmarkX,
  MapPin,
  BriefcaseBusiness,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react'

const initialSavedJobs = [
  {
    id: 1,
    title: 'MERN Stack Developer',
    company: 'TechNova Solutions',
    location: 'Remote',
    type: 'Full-time',
    experience: '1–3 years',
    salary: '₹4–7 LPA',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
  },
  {
    id: 2,
    title: 'Frontend React Developer',
    company: 'PixelCraft Technologies',
    location: 'Bengaluru',
    type: 'Full-time',
    experience: 'Fresher',
    salary: '₹3–5 LPA',
    skills: ['React', 'JavaScript', 'Tailwind CSS'],
  },
  {
    id: 3,
    title: 'JavaScript Developer',
    company: 'CodeOrbit',
    location: 'Dehradun',
    type: 'Internship',
    experience: 'Fresher',
    salary: '₹10–18K/month',
    skills: ['JavaScript', 'HTML', 'CSS'],
  },
]

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState(initialSavedJobs)

  const removeJob = (id) => {
    setSavedJobs((currentJobs) =>
      currentJobs.filter((job) => job.id !== id)
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="text-2xl font-black text-indigo-600">
            CareerAI<span className="text-slate-900">.</span>
          </Link>

          <div className="flex items-center gap-5">
            <Link to="/jobs" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
              Find Jobs
            </Link>
            <Link to="/profile-setup" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
              My Profile
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600">
            <Sparkles size={15} />
            Your career shortlist
          </div>

          <h1 className="text-3xl font-black sm:text-4xl">
            Saved Jobs
          </h1>

          <p className="mt-2 text-slate-500">
            Keep track of opportunities you're interested in.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Bookmark size={23} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Total saved jobs</p>
              <p className="text-2xl font-black">{savedJobs.length}</p>
            </div>
          </div>
        </div>

        {savedJobs.length > 0 ? (
          <div className="grid gap-4">
            {savedJobs.map((job) => (
              <article
                key={job.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:shadow-md sm:p-6"
              >
                <div className="flex flex-col justify-between gap-5 sm:flex-row">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg font-black text-indigo-600">
                      {job.company.charAt(0)}
                    </div>

                    <div>
                      <h2 className="text-lg font-bold">{job.title}</h2>
                      <p className="mt-1 text-sm text-slate-600">{job.company}</p>

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <BriefcaseBusiness size={14} /> {job.experience}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeJob(job.id)}
                    className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    <BookmarkX size={17} />
                    Remove
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <div>
                    <p className="font-bold">{job.salary}</p>
                    <p className="mt-1 text-xs text-slate-500">{job.type}</p>
                  </div>

                  <Link
                    to={`/jobs/${job.id}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    View details <ArrowUpRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <BookmarkX className="mx-auto text-slate-400" size={40} />

            <h2 className="mt-4 text-xl font-bold">
              No saved jobs yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              When you find an interesting opportunity, save it here so you can review it later.
            </p>

            <Link
              to="/jobs"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Explore jobs <ArrowUpRight size={17} />
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

export default SavedJobs
