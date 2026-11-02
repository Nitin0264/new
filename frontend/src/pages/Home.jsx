
import { useMemo, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  Clock3,
  FileText,
  Globe2,
  MapPin,
  Menu,
  Search,
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
    category: 'Development',
    location: 'Remote',
    type: 'Full-time',
    experience: '1–3 years',
    salary: '₹4–7 LPA',
    posted: '2 days ago',
    logo: 'TN',
    logoColor: 'bg-blue-100 text-blue-700',
    featured: true,
    skills: ['React', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 2,
    role: 'MERN Stack Developer',
    company: 'DigitalCraft Labs',
    category: 'Development',
    location: 'Bengaluru, India',
    type: 'Full-time',
    experience: '0–2 years',
    salary: '₹3–6 LPA',
    posted: '1 day ago',
    logo: 'DC',
    logoColor: 'bg-emerald-100 text-emerald-700',
    featured: true,
    skills: ['MongoDB', 'Express', 'React', 'Node.js'],
  },
  {
    id: 3,
    role: 'UI/UX Designer',
    company: 'PixelWorks',
    category: 'Design',
    location: 'Remote',
    type: 'Full-time',
    experience: '1–2 years',
    salary: '₹3–5 LPA',
    posted: '3 days ago',
    logo: 'PW',
    logoColor: 'bg-purple-100 text-purple-700',
    featured: false,
    skills: ['Figma', 'UI Design', 'Prototyping'],
  },
  {
    id: 4,
    role: 'Backend Developer',
    company: 'CloudStack Technologies',
    category: 'Development',
    location: 'Delhi, India',
    type: 'Full-time',
    experience: '1–3 years',
    salary: '₹5–8 LPA',
    posted: '4 days ago',
    logo: 'CS',
    logoColor: 'bg-orange-100 text-orange-700',
    featured: false,
    skills: ['Node.js', 'Express', 'MongoDB', 'APIs'],
  },
]

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Job Matching',
    description:
      'Discover opportunities that match your skills, experience, qualifications and career goals.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: FileText,
    title: 'AI Resume Builder',
    description:
      'Create professional, ATS-friendly resumes with AI assistance and customizable templates.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Users,
    title: 'Professional Networking',
    description:
      'Connect with professionals, share updates and build meaningful career relationships.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: TrendingUp,
    title: 'Career Insights',
    description:
      'Understand your skills, track your progress and discover ways to improve your profile.',
    color: 'bg-orange-50 text-orange-600',
  },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a
          href="#home"
          className="flex items-center gap-2.5"
          onClick={closeMenu}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-200">
            <Sparkles size={21} />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Career<span className="text-emerald-600">AI</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#home" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">
            Home
          </a>
          <a href="#jobs" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">
            Find Jobs
          </a>
          <a href="#features" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">
            How It Works
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
            Log in
          </button>
          <button className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700">
            Get Started <ArrowRight className="ml-1 inline" size={16} />
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {[
              ['Home', '#home'],
              ['Find Jobs', '#jobs'],
              ['Features', '#features'],
              ['How It Works', '#how-it-works'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={closeMenu}
                className="font-medium text-slate-700 hover:text-emerald-600"
              >
                {label}
              </a>
            ))}
            <div className="flex gap-3 border-t border-slate-100 pt-4">
              <button className="flex-1 rounded-xl border border-slate-200 py-2.5 font-semibold text-slate-700">
                Log in
              </button>
              <button className="flex-1 rounded-xl bg-emerald-600 py-2.5 font-semibold text-white">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function HeroSection({ onSearch }) {
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')

  const submitSearch = (event) => {
    event.preventDefault()
    onSearch(keyword, location)
  }

  return (
    <section id="home" className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <Sparkles size={16} />
            Your AI-powered career partner
          </div>

          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Find the career
            <span className="block text-emerald-600">you deserve.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-500 sm:text-lg">
            Discover better opportunities, build your professional identity
            and grow your career with the power of artificial intelligence.
          </p>

          <form
            onSubmit={submitSearch}
            className="mt-9 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/60 sm:flex sm:items-center"
          >
            <div className="flex flex-1 items-center gap-3 px-3 py-3">
              <Search className="shrink-0 text-emerald-600" size={21} />
              <input
                type="text"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Job title, skills or keywords"
                className="w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex flex-1 items-center gap-3 border-t border-slate-100 px-3 py-3 sm:border-l sm:border-t-0">
              <MapPin className="shrink-0 text-emerald-600" size={21} />
              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="City or remote"
                className="w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-emerald-700 sm:mt-0 sm:w-auto"
            >
              Search Jobs
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
            <span className="mr-1 text-slate-400">Popular:</span>
            {['React Developer', 'MERN Stack', 'Remote Jobs'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setKeyword(tag)
                  onSearch(tag, '')
                }}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div>
              <div className="text-2xl font-extrabold text-slate-900">10K+</div>
              <div className="text-xs text-slate-500">Career opportunities</div>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div>
              <div className="text-2xl font-extrabold text-slate-900">5K+</div>
              <div className="text-xs text-slate-500">Active professionals</div>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div>
              <div className="text-2xl font-extrabold text-slate-900">AI</div>
              <div className="text-xs text-slate-500">Career assistance</div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-emerald-100 blur-2xl" />
          <div className="absolute -bottom-8 -left-5 h-32 w-32 rounded-full bg-blue-100 blur-2xl" />

          <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/70 sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">Your career dashboard</p>
                <h3 className="mt-1 text-xl font-bold text-slate-900">Welcome back!</h3>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <Zap size={23} />
              </div>
            </div>

            <div className="mt-7 rounded-2xl bg-slate-50 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Profile strength</p>
                  <p className="mt-1 text-xs text-slate-400">Your profile is looking great</p>
                </div>
                <span className="text-2xl font-extrabold text-emerald-600">85%</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-[85%] rounded-full bg-emerald-500" />
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Add your latest projects to reach 100%.
              </p>
            </div>

            <div className="mt-6">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-bold text-slate-900">AI job recommendations</h4>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  For you
                </span>
              </div>

              {[
                {
                  role: 'React Developer',
                  company: 'InnovateTech',
                  match: '96%',
                  color: 'bg-blue-100 text-blue-700',
                  initials: 'IT',
                },
                {
                  role: 'Full Stack Developer',
                  company: 'FutureLabs',
                  match: '92%',
                  color: 'bg-purple-100 text-purple-700',
                  initials: 'FL',
                },
                {
                  role: 'Frontend Engineer',
                  company: 'CloudWorks',
                  match: '89%',
                  color: 'bg-orange-100 text-orange-700',
                  initials: 'CW',
                },
              ].map((job) => (
                <div
                  key={job.role}
                  className="mb-3 flex items-center justify-between rounded-xl border border-slate-100 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold ${job.color}`}>
                      {job.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{job.role}</p>
                      <p className="text-xs text-slate-400">{job.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-emerald-600">{job.match}</p>
                    <p className="text-[10px] text-slate-400">Match</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl bg-emerald-50 p-4">
              <Sparkles className="shrink-0 text-emerald-600" size={20} />
              <p className="text-xs leading-5 text-emerald-800">
                <strong>AI insight:</strong> Your React and JavaScript skills
                match several new opportunities.
              </p>
            </div>
          </div>

          <div className="absolute -left-8 top-1/3 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:flex">
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Career growth</p>
              <p className="text-xs text-slate-400">Your journey starts here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  const stats = [
    ['10K+', 'Jobs discovered'],
    ['5K+', 'Professionals'],
    ['500+', 'Companies'],
    ['95%', 'Profile satisfaction'],
  ]

  return (
    <section className="border-y border-slate-100 bg-slate-50 py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 text-center md:grid-cols-4 lg:px-8">
        {stats.map(([number, label]) => (
          <div key={label}>
            <p className="text-3xl font-extrabold text-slate-900">{number}</p>
            <p className="mt-1 text-sm text-slate-500">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function JobsSection({ search, onClear }) {
  const [bookmarked, setBookmarked] = useState([])

  const filteredJobs = useMemo(() => {
    const keyword = search.keyword.trim().toLowerCase()
    const location = search.location.trim().toLowerCase()

    return jobs.filter((job) => {
      const searchableText = [
        job.role,
        job.company,
        job.category,
        job.experience,
        ...(job.skills || []),
      ]
        .join(' ')
        .toLowerCase()

      const keywordTerms = keyword.split(/\s+/).filter(Boolean)

      const matchesKeyword =
        !keyword ||
        keywordTerms.every((term) => searchableText.includes(term)) ||
        (keyword.includes('remote') && job.location.toLowerCase().includes('remote'))

      const matchesLocation =
        !location ||
        job.location.toLowerCase().includes(location) ||
        (location.includes('remote') && job.location.toLowerCase().includes('remote'))

      return matchesKeyword && matchesLocation
    })
  }, [search])

  const toggleBookmark = (id) => {
    setBookmarked((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    )
  }

  return (
    <section id="jobs" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-emerald-600">
              <BriefcaseBusiness size={17} />
              EXPLORE OPPORTUNITIES
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Find your next opportunity
            </h2>
            <p className="mt-3 max-w-xl text-slate-500">
              Discover roles that align with your skills and career ambitions.
            </p>
          </div>

          <a
            href="#jobs"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700"
          >
            Explore all jobs <ArrowUpRight size={17} />
          </a>
        </div>

        {(search.keyword || search.location) && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-emerald-50 px-4 py-3">
            <p className="text-sm text-emerald-800">
              Showing results for{' '}
              <strong>{search.keyword || 'all jobs'}</strong>
              {search.location && ` in ${search.location}`}
            </p>
            <button
              onClick={onClear}
              className="text-sm font-bold text-emerald-700 hover:text-emerald-900"
            >
              Clear search
            </button>
          </div>
        )}

        {filteredJobs.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {filteredJobs.map((job) => (
              <article
                key={job.id}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-200/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-extrabold ${job.logoColor}`}>
                      {job.logo}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 transition group-hover:text-emerald-700">
                        {job.role}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">{job.company}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleBookmark(job.id)}
                    aria-label={bookmarked.includes(job.id) ? 'Remove bookmark' : 'Bookmark job'}
                    className={`rounded-xl border p-2.5 transition ${
                      bookmarked.includes(job.id)
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                        : 'border-slate-200 text-slate-400 hover:border-emerald-200 hover:text-emerald-600'
                    }`}
                  >
                    <Bookmark
                      size={19}
                      fill={bookmarked.includes(job.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                    {job.type}
                  </span>
                  <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                    {job.experience}
                  </span>
                  <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    {job.salary}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} /> {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock3 size={14} /> {job.posted}
                    </span>
                  </div>
                  <button className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 transition hover:gap-3">
                    View Details <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">
            <Search className="mx-auto text-slate-300" size={40} />
            <h3 className="mt-4 text-lg font-bold text-slate-800">No jobs found</h3>
            <p className="mt-2 text-sm text-slate-500">
              Try another keyword or location.
            </p>
            <button
              onClick={onClear}
              className="mt-5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Clear filters
            </button>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-slate-400">
          These are sample listings for the homepage preview, not live job vacancies.
        </p>
      </div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section id="features" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-emerald-600">
            <Sparkles size={17} /> BUILT FOR YOUR FUTURE
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to grow
          </h2>
          <p className="mt-4 leading-7 text-slate-500">
            More than a job portal. A complete career platform designed to
            support every step of your professional journey.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
              >
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color}`}>
                  <Icon size={26} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {feature.description}
                </p>
                <a
                  href="#how-it-works"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:gap-3"
                >
                  Learn more <ArrowRight size={16} />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Build your profile',
      description:
        'Add your education, experience, skills and career preferences.',
    },
    {
      number: '02',
      title: 'Get AI recommendations',
      description:
        'Let AI analyze your profile and find relevant career opportunities.',
    },
    {
      number: '03',
      title: 'Apply and grow',
      description:
        'Discover opportunities, connect with professionals and move forward.',
    },
  ]

  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-3 text-sm font-bold text-emerald-600">
            SIMPLE PROCESS
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Your career journey starts here
          </h2>
          <p className="mt-4 text-slate-500">
            Three simple steps to make your next career move.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-xl font-extrabold text-emerald-600">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-slate-500">
                {step.description}
              </p>
              {index < 2 && (
                <div className="absolute right-0 top-8 hidden -translate-y-1/2 translate-x-1/2 text-slate-300 md:block">
                  <ArrowRight size={25} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="px-5 pb-24 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-emerald-600 px-7 py-16 text-center sm:px-12">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
          <Globe2 size={28} />
        </div>
        <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Ready to take the next step in your career?
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-emerald-50">
          Create your professional profile, discover opportunities and let
          CareerAI help you move toward your goals.
        </p>
        <button className="mt-8 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-emerald-700 shadow-lg transition hover:bg-emerald-50">
          Create Your Free Account <ArrowRight className="ml-2 inline" size={17} />
        </button>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 py-10 md:flex-row md:items-center lg:px-8">
        <div>
          <a href="#home" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Sparkles size={19} />
            </div>
            <span className="text-xl font-extrabold text-slate-900">
              Career<span className="text-emerald-600">AI</span>
            </span>
          </a>
          <p className="mt-3 text-sm text-slate-500">
            Empowering careers with intelligent technology.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-slate-500">
          <a href="#jobs" className="hover:text-emerald-600">Find Jobs</a>
          <a href="#features" className="hover:text-emerald-600">Features</a>
          <a href="#how-it-works" className="hover:text-emerald-600">How It Works</a>
        </div>

        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} CareerAI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

function Home() {
  const [search, setSearch] = useState({
    keyword: '',
    location: '',
  })

  const handleSearch = (keyword, location) => {
    setSearch({ keyword, location })
    document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' })
  }

  const clearSearch = () => {
    setSearch({ keyword: '', location: '' })
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroSection onSearch={handleSearch} />
        <StatsSection />
        <JobsSection search={search} onClear={clearSearch} />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

export default Home
