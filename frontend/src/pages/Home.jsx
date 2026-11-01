
import { useMemo, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  Globe2,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  X,
  Zap,
} from 'lucide-react'

const jobs = [
  {
    id: 1,
    role: 'Frontend Developer',
    company: 'TechNova Solutions',
    location: 'Bangalore, India',
    type: 'Full-time',
    experience: '1–3 years',
    salary: '₹5–8 LPA',
    category: 'Technology',
    logo: 'T',
    color: 'bg-blue-100 text-blue-700',
    posted: '2 days ago',
    featured: true,
  },
  {
    id: 2,
    role: 'MERN Stack Developer',
    company: 'Innovate Labs',
    location: 'Remote, India',
    type: 'Full-time',
    experience: '1–2 years',
    salary: '₹4–7 LPA',
    category: 'Technology',
    logo: 'I',
    color: 'bg-purple-100 text-purple-700',
    posted: '1 day ago',
    featured: true,
  },
  {
    id: 3,
    role: 'UI/UX Designer',
    company: 'PixelCraft Studio',
    location: 'Delhi, India',
    type: 'Full-time',
    experience: '2–4 years',
    salary: '₹6–9 LPA',
    category: 'Design',
    logo: 'P',
    color: 'bg-pink-100 text-pink-700',
    posted: '3 days ago',
    featured: false,
  },
  {
    id: 4,
    role: 'Backend Developer',
    company: 'CloudBridge',
    location: 'Hyderabad, India',
    type: 'Full-time',
    experience: '1–3 years',
    salary: '₹5–9 LPA',
    category: 'Technology',
    logo: 'C',
    color: 'bg-emerald-100 text-emerald-700',
    posted: 'Today',
    featured: false,
  },
]

const features = [
  {
    icon: Sparkles,
    number: '01',
    title: 'AI-powered job matching',
    description:
      'Discover opportunities that align with your skills, experience and career goals.',
  },
  {
    icon: FileText,
    number: '02',
    title: 'Smart resume builder',
    description:
      'Create professional resumes with AI assistance and customizable templates.',
  },
  {
    icon: Users,
    number: '03',
    title: 'Professional networking',
    description:
      'Connect with professionals, share knowledge and grow your career network.',
  },
  {
    icon: TrendingUp,
    number: '04',
    title: 'Career growth insights',
    description:
      'Identify skill gaps and discover what you need to reach your next career milestone.',
  },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    ['Home', '#home'],
    ['Find Jobs', '#jobs'],
    ['How It Works', '#how-it-works'],
    ['Features', '#features'],
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#home" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-200">
            <Sparkles size={22} />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Career<span className="text-emerald-600">AI</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium text-slate-600 transition hover:text-emerald-600"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#jobs"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Sign in
          </a>
          <a
            href="#jobs"
            className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-700"
          >
            Get started <ArrowRight className="ml-1 inline" size={16} />
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-slate-700 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="font-medium text-slate-700"
              >
                {label}
              </a>
            ))}
            <a
              href="#jobs"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl bg-emerald-600 px-5 py-3 text-center font-semibold text-white"
            >
              Get started
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

function Hero({ onSearch }) {
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch(keyword, location)
  }

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50"
    >
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-teal-100/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
            <Sparkles size={16} />
            Your career, powered by AI
            <ArrowUpRight size={15} />
          </div>

          <h1 className="max-w-2xl text-5xl leading-[1.12] font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Find work that
            <span className="block text-emerald-600">moves you</span>
            forward.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
            Discover meaningful opportunities, build your professional
            identity and let AI help you take the next step in your career.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-9 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/60"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 px-3">
                <Search className="shrink-0 text-emerald-600" size={21} />
                <input
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="Job title or skill"
                  className="w-full min-w-0 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center gap-3 border-slate-100 px-3 sm:border-l">
                <MapPin className="shrink-0 text-emerald-600" size={21} />
                <input
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="City or remote"
                  className="w-full min-w-0 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white transition hover:bg-emerald-700 sm:mt-1"
            >
              <Search size={18} />
              Search opportunities
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="font-medium">Popular:</span>
            {['React Developer', 'MERN Stack', 'UI/UX', 'Remote Jobs'].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => {
                    setKeyword(item)
                    onSearch(item, '')
                  }}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 transition hover:border-emerald-300 hover:text-emerald-700"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="rounded-3xl border border-white bg-white p-5 shadow-2xl shadow-emerald-900/10 sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Your career dashboard
                </p>
                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  Welcome back!
                </h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <TrendingUp size={24} />
              </div>
            </div>

            <div className="mt-7 rounded-2xl bg-emerald-50 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                <Sparkles size={17} />
                AI career insights
              </div>
              <h4 className="mt-3 text-2xl font-bold text-slate-900">
                Your next opportunity is waiting.
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Build your profile to discover opportunities that match your
                professional skills.
              </p>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-emerald-100">
                <div className="h-full w-3/4 rounded-full bg-emerald-500" />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Profile completion preview
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <BriefcaseBusiness size={17} />
                  <span className="text-xs">Job discovery</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  AI-powered
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Skills-based matching
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <FileText size={17} />
                  <span className="text-xs">Resume tools</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  Smart AI
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Career-ready profiles
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -right-3 -top-5 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:flex lg:-right-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Built around you
              </p>
              <p className="text-xs text-slate-500">
                Your skills. Your goals.
              </p>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:flex lg:-left-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <Zap size={21} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Smarter career moves
              </p>
              <p className="text-xs text-slate-500">
                One platform, more possibilities
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const stats = [
    { value: 'AI', label: 'Smarter job discovery', icon: Sparkles },
    { value: '24/7', label: 'Career tools access', icon: Clock3 },
    { value: '1', label: 'Connected career space', icon: Globe2 },
    { value: '360°', label: 'Career development', icon: TrendingUp },
  ]

  return (
    <section className="border-y border-slate-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-9 sm:grid-cols-4 lg:px-8">
        {stats.map(({ value, label, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Icon size={21} />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900">
                {value}
              </p>
              <p className="text-xs text-slate-500 sm:text-sm">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function JobCard({ job, saved, onToggleSave }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-200/50">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl font-extrabold ${job.color}`}
          >
            {job.logo}
          </div>
          <div>
            <h3 className="font-bold text-slate-900">{job.company}</h3>
            <p className="text-xs text-slate-500">{job.posted}</p>
          </div>
        </div>

        <button
          onClick={() => onToggleSave(job.id)}
          aria-label={saved ? 'Remove saved job' : 'Save job'}
          aria-pressed={saved}
          className={`rounded-lg border p-2 transition ${
            saved
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border-slate-200 text-slate-500 hover:bg-slate-50'
          }`}
        >
          <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <h3 className="mt-6 text-lg font-bold text-slate-900">
        {job.role}
      </h3>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
          {job.type}
        </span>
        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
          {job.experience}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
        <span className="flex items-center gap-1.5">
          <MapPin size={15} /> {job.location}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <p className="font-bold text-slate-900">{job.salary}</p>
          <p className="text-xs text-slate-500">Estimated salary</p>
        </div>
        <button className="flex items-center gap-1.5 text-sm font-bold text-emerald-700 transition hover:text-emerald-800">
          View details <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  )
}

function JobsSection({ search }) {
  const [savedJobs, setSavedJobs] = useState([])

  const filteredJobs = useMemo(() => {
    const keyword = search.keyword.toLowerCase().trim()
    const location = search.location.toLowerCase().trim()

    return jobs.filter((job) => {
      const searchable = [
        job.role,
        job.company,
        job.category,
        job.experience,
      ].join(' ').toLowerCase()

      const matchesKeyword =
        !keyword ||
        searchable.includes(keyword) ||
        (keyword.includes('remote') && job.location.toLowerCase().includes('remote')) ||
        (keyword.includes('mern') && job.role.toLowerCase().includes('mern'))

      const matchesLocation =
        !location || job.location.toLowerCase().includes(location)

      return matchesKeyword && matchesLocation
    })
  }, [search])

  const toggleSave = (id) => {
    setSavedJobs((previous) =>
      previous.includes(id)
        ? previous.filter((jobId) => jobId !== id)
        : [...previous, id]
    )
  }

  return (
    <section id="jobs" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-bold tracking-wider text-emerald-700 uppercase">
              Explore opportunities
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Find your next opportunity
            </h2>
            <p className="mt-3 text-slate-500">
              Explore opportunities from companies looking for talent.
            </p>
          </div>

          <span className="text-sm font-semibold text-slate-500">
            {filteredJobs.length} sample opportunities
          </span>
        </div>

        {search.keyword || search.location ? (
          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-slate-600">
            Showing results for:
            {search.keyword && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-800">
                {search.keyword}
              </span>
            )}
            {search.location && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-800">
                {search.location}
              </span>
            )}
            <button
              onClick={() => window.dispatchEvent(new Event('clear-job-search'))}
              className="font-semibold text-emerald-700 underline"
            >
              Clear search
            </button>
          </div>
        ) : null}

        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              saved={savedJobs.includes(job.id)}
              onToggleSave={toggleSave}
            />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <Search className="mx-auto text-slate-400" size={32} />
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              No matching sample jobs found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try a different keyword or location.
            </p>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-slate-400">
          These are demonstration listings for the homepage. Live job data
          will be connected later.
        </p>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wider text-emerald-700 uppercase">
            Everything in one place
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            More than a job search platform
          </h2>
          <p className="mt-4 leading-7 text-slate-500">
            The tools, connections and insights you need to build a career
            with confidence.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, number, title, description }) => (
            <article
              key={number}
              className="group rounded-2xl border border-slate-100 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon size={23} />
                </div>
                <span className="text-sm font-bold text-slate-300">
                  {number}
                </span>
              </div>
              <h3 className="mt-7 text-lg font-bold text-slate-900">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                {description}
              </p>
              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-700">
                Explore feature <ArrowRight size={15} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Create your profile',
      description:
        'Tell us about your education, experience, skills and career goals.',
    },
    {
      number: '02',
      title: 'Discover your matches',
      description:
        'Explore relevant career opportunities based on your professional profile.',
    },
    {
      number: '03',
      title: 'Take your next step',
      description:
        'Apply for jobs, build your resume and connect with professionals.',
    },
  ]

  return (
    <section id="how-it-works" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold tracking-wider text-emerald-700 uppercase">
              Simple process
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Your career journey, simplified.
            </h2>
            <p className="mt-5 max-w-lg leading-7 text-slate-500">
              One connected platform to help you move from discovering
              opportunities to growing your professional network.
            </p>

            <div className="mt-9 space-y-7">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 font-bold text-emerald-700">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-10">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Sparkles size={24} />
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                CareerAI
              </span>
            </div>

            <h3 className="mt-8 text-2xl font-extrabold text-slate-900">
              Build a career that reflects your potential.
            </h3>
            <p className="mt-3 leading-7 text-slate-500">
              Bring your skills, experience and ambitions together in one
              professional space.
            </p>

            <div className="mt-7 space-y-4">
              {[
                'Professional profile and skills',
                'AI-assisted resume creation',
                'Personalized job discovery',
                'Professional networking',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="shrink-0 text-emerald-600" size={19} />
                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#jobs"
              className="mt-9 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white transition hover:bg-emerald-700"
            >
              Explore opportunities <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="bg-white px-5 py-20 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-emerald-700 px-7 py-16 text-center sm:px-12">
        <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-emerald-500/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-teal-400/30 blur-3xl" />

        <div className="relative mx-auto max-w-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
            <Sparkles size={27} />
          </div>
          <h2 className="mt-7 text-3xl leading-tight font-extrabold text-white sm:text-4xl">
            Ready to make your next career move?
          </h2>
          <p className="mt-5 leading-7 text-emerald-50">
            Start building your professional future with CareerAI.
          </p>
          <a
            href="#jobs"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-emerald-800 transition hover:bg-emerald-50"
          >
            Explore CareerAI <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="footer" className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2">
          <a href="#home" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600">
              <Sparkles size={21} />
            </div>
            <span className="text-2xl font-extrabold">
              Career<span className="text-emerald-400">AI</span>
            </span>
          </a>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
            A connected career platform designed to help people discover
            opportunities, grow professionally and build meaningful
            connections.
          </p>
        </div>

        <div>
          <h3 className="font-bold">Explore</h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
            <a href="#jobs" className="hover:text-emerald-400">Find jobs</a>
            <a href="#features" className="hover:text-emerald-400">AI features</a>
            <a href="#how-it-works" className="hover:text-emerald-400">How it works</a>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Platform</h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
            <a href="#features" className="hover:text-emerald-400">Resume builder</a>
            <a href="#features" className="hover:text-emerald-400">Networking</a>
            <a href="#footer" className="hover:text-emerald-400">About us</a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 py-6 text-xs text-slate-500 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} CareerAI. All rights reserved.</p>
          <p>Built to move careers forward.</p>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  const [search, setSearch] = useState({
    keyword: '',
    location: '',
  })

  const handleSearch = (keyword, location) => {
    setSearch({ keyword, location })
    document.getElementById('jobs')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <main>
        <Hero onSearch={handleSearch} />
        <Stats />
        <JobsSection search={search} />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
