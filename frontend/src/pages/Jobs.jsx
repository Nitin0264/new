
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Clock,
  Bookmark,
  SlidersHorizontal,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react'

const jobsData = [
  {
    id: 1,
    title: 'MERN Stack Developer',
    company: 'TechNova Solutions',
    location: 'Remote',
    type: 'Full-time',
    experience: '1–3 years',
    salary: '₹4–7 LPA',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    posted: '2 days ago',
    match: 96,
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
    posted: '1 day ago',
    match: 92,
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'CloudBridge',
    location: 'Remote',
    type: 'Full-time',
    experience: '1–2 years',
    salary: '₹5–8 LPA',
    skills: ['React', 'Node.js', 'MongoDB'],
    posted: '3 days ago',
    match: 89,
  },
  {
    id: 4,
    title: 'JavaScript Developer',
    company: 'CodeOrbit',
    location: 'Dehradun',
    type: 'Internship',
    experience: 'Fresher',
    salary: '₹10–18K/month',
    skills: ['JavaScript', 'HTML', 'CSS'],
    posted: 'Today',
    match: 87,
  },
  {
    id: 5,
    title: 'Backend Node.js Developer',
    company: 'DataSphere',
    location: 'Noida',
    type: 'Full-time',
    experience: '1–3 years',
    salary: '₹4–6 LPA',
    skills: ['Node.js', 'Express', 'MongoDB'],
    posted: '4 days ago',
    match: 84,
  },
]

function Jobs() {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [jobType, setJobType] = useState('All')
  const [savedJobs, setSavedJobs] = useState([])

  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      const searchText = `${job.title} ${job.company} ${job.skills.join(' ')}`.toLowerCase()

      const matchesSearch = searchText.includes(search.toLowerCase().trim())
      const matchesLocation = job.location.toLowerCase().includes(location.toLowerCase().trim())
      const matchesType = jobType === 'All' || job.type === jobType

      return matchesSearch && matchesLocation && matchesType
    })
  }, [search, location, jobType])

  const toggleSave = (id) => {
    setSavedJobs((current) =>
      current.includes(id)
        ? current.filter((jobId) => jobId !== id)
        : [...current, id]
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="text-2xl font-black tracking-tight text-indigo-600">
            CareerAI<span className="text-slate-900">.</span>
          </Link>

          <div className="flex items-center gap-5">
            <Link to="/" className="hidden text-sm font-medium text-slate-600 hover:text-indigo-600 sm:block">
              Home
            </Link>
            <Link to="/profile-setup" className="hidden text-sm font-medium text-slate-600 hover:text-indigo-600 sm:block">
              My Profile
            </Link>
            <Link to="/login" className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
              Sign in
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600">
            <Sparkles size={15} />
            AI-powered job discovery
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Find your next opportunity
          </h1>

          <p className="mt-2 text-slate-500">
            Discover opportunities that match your skills and career goals.
          </p>
        </div>

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4">
              <Search size={19} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title, company or skill"
                className="w-full py-3 text-sm outline-none"
              />
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4">
              <MapPin size={19} className="text-slate-400" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location or remote"
                className="w-full py-3 text-sm outline-none"
              />
            </div>

            <button
              onClick={() => {
                setSearch('')
                setLocation('')
                setJobType('All')
              }}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Clear filters
            </button>
          </div>
        </section>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">Recommended jobs</h2>
            <p className="mt-1 text-sm text-slate-500">
              {filteredJobs.length} opportunities found
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
            <SlidersHorizontal size={16} className="text-slate-500" />
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="bg-transparent text-sm font-medium outline-none"
            >
              <option value="All">All job types</option>
              <option value="Full-time">Full-time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <article
                key={job.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-200 hover:shadow-md sm:p-6"
              >
                <div className="flex flex-col justify-between gap-5 sm:flex-row">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg font-black text-indigo-600">
                      {job.company.charAt(0)}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold">{job.title}</h3>
                      <p className="mt-1 text-sm font-medium text-slate-600">
                        {job.company}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <BriefcaseBusiness size={14} /> {job.experience}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {job.posted}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-3 sm:flex-col sm:items-end">
                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                      {job.match}% demo match
                    </span>

                    <button
                      onClick={() => toggleSave(job.id)}
                      aria-label={savedJobs.includes(job.id) ? 'Unsave job' : 'Save job'}
                      className={`rounded-lg border p-2 ${
                        savedJobs.includes(job.id)
                          ? 'border-indigo-200 bg-indigo-50 text-indigo-600'
                          : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <Bookmark size={18} fill={savedJobs.includes(job.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2">
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
                    <p className="font-bold text-slate-900">{job.salary}</p>
                    <p className="mt-1 text-xs text-slate-500">{job.type}</p>
                  </div>

                  <button
                    onClick={() => alert('Job application will be connected in a later step.')}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    View opportunity <ArrowUpRight size={16} />
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
              <Search className="mx-auto text-slate-400" size={30} />
              <h3 className="mt-4 font-bold">No jobs found</h3>
              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Demo listings only. Live job data and real AI matching will be integrated later.
        </p>
      </main>
    </div>
  )
}

export default Jobs
