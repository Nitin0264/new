
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  BriefcaseBusiness,
  Clock,
  IndianRupee,
  Building2,
  CheckCircle2,
  ExternalLink,
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
    posted: '2 days ago',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    description:
      'We are looking for a motivated MERN Stack Developer to build modern, responsive web applications. You will work with a team of developers to develop features, integrate APIs, and improve application performance.',
    responsibilities: [
      'Build responsive web applications using React.js.',
      'Develop backend APIs using Node.js and Express.',
      'Work with MongoDB databases and data models.',
      'Integrate frontend components with REST APIs.',
      'Debug issues and improve application performance.',
    ],
    requirements: [
      'Knowledge of JavaScript and modern ES6+ features.',
      'Experience with React.js and component-based development.',
      'Understanding of Node.js and Express.js.',
      'Basic knowledge of MongoDB.',
      'Understanding of Git and REST APIs.',
    ],
  },
  {
    id: 2,
    title: 'Frontend React Developer',
    company: 'PixelCraft Technologies',
    location: 'Bengaluru',
    type: 'Full-time',
    experience: 'Fresher',
    salary: '₹3–5 LPA',
    posted: '1 day ago',
    skills: ['React', 'JavaScript', 'Tailwind CSS'],
    description:
      'Join our frontend team to create clean, accessible, and responsive user interfaces. You will collaborate with designers and backend developers to deliver quality web experiences.',
    responsibilities: [
      'Develop reusable React components.',
      'Convert UI designs into responsive pages.',
      'Integrate REST APIs into frontend applications.',
      'Write maintainable and readable code.',
    ],
    requirements: [
      'Good understanding of HTML, CSS, and JavaScript.',
      'Knowledge of React.js and React Hooks.',
      'Basic understanding of responsive design.',
      'Familiarity with Git and GitHub.',
    ],
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'CloudBridge',
    location: 'Remote',
    type: 'Full-time',
    experience: '1–2 years',
    salary: '₹5–8 LPA',
    posted: '3 days ago',
    skills: ['React', 'Node.js', 'MongoDB'],
    description:
      'CloudBridge is looking for a full-stack developer who can contribute to both frontend and backend development while working with a collaborative engineering team.',
    responsibilities: [
      'Develop frontend and backend features.',
      'Create and maintain REST APIs.',
      'Manage database operations.',
      'Collaborate with the engineering team.',
    ],
    requirements: [
      'Experience with JavaScript.',
      'Knowledge of React and Node.js.',
      'Understanding of databases and APIs.',
      'Problem-solving and communication skills.',
    ],
  },
  {
    id: 4,
    title: 'JavaScript Developer',
    company: 'CodeOrbit',
    location: 'Dehradun',
    type: 'Internship',
    experience: 'Fresher',
    salary: '₹10–18K/month',
    posted: 'Today',
    skills: ['JavaScript', 'HTML', 'CSS'],
    description:
      'An opportunity for aspiring developers to gain practical experience building web applications with JavaScript and modern frontend technologies.',
    responsibilities: [
      'Work on frontend development tasks.',
      'Build interactive user interfaces.',
      'Fix bugs and test application features.',
      'Learn and collaborate with senior developers.',
    ],
    requirements: [
      'Basic knowledge of HTML and CSS.',
      'Understanding of JavaScript fundamentals.',
      'Willingness to learn and work in a team.',
    ],
  },
  {
    id: 5,
    title: 'Backend Node.js Developer',
    company: 'DataSphere',
    location: 'Noida',
    type: 'Full-time',
    experience: '1–3 years',
    salary: '₹4–6 LPA',
    posted: '4 days ago',
    skills: ['Node.js', 'Express', 'MongoDB'],
    description:
      'We are seeking a backend developer to build reliable APIs and maintain server-side application functionality.',
    responsibilities: [
      'Develop REST APIs using Node.js and Express.',
      'Design and maintain MongoDB collections.',
      'Implement authentication and authorization.',
      'Write clean, secure, and maintainable backend code.',
    ],
    requirements: [
      'Knowledge of JavaScript and Node.js.',
      'Understanding of Express.js.',
      'Knowledge of MongoDB.',
      'Understanding of API security and authentication.',
    ],
  },
]

function JobDetails() {
  const { id } = useParams()
  const job = jobsData.find((item) => item.id === Number(id))

  if (!job) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-5 text-center">
        <h1 className="text-3xl font-bold">Job not found</h1>
        <p className="mt-2 text-slate-500">
          This job may have been removed or the link is incorrect.
        </p>
        <Link
          to="/jobs"
          className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
        >
          Back to jobs
        </Link>
      </div>
    )
  }

  const handleApply = () => {
    alert('The application feature will be connected to the backend later.')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="text-2xl font-black text-indigo-600">
            CareerAI<span className="text-slate-900">.</span>
          </Link>
          <Link to="/login" className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white">
            Sign in
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-5 py-8">
        <Link
          to="/jobs"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600"
        >
          <ArrowLeft size={17} /> Back to jobs
        </Link>

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
          <section className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl font-black text-indigo-600">
                    {job.company.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-500">{job.company}</p>
                    <h1 className="mt-1 text-2xl font-black sm:text-3xl">
                      {job.title}
                    </h1>
                  </div>
                </div>

                <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                  <Sparkles className="mr-1 inline" size={14} />
                  Demo opportunity
                </span>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-100 pt-5 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                  <MapPin size={17} /> {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <BriefcaseBusiness size={17} /> {job.experience}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={17} /> {job.posted}
                </span>
                <span className="flex items-center gap-2">
                  <Building2 size={17} /> {job.type}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span key={skill} className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold">Job description</h2>
              <p className="mt-4 leading-7 text-slate-600">{job.description}</p>

              <h3 className="mt-8 text-lg font-bold">Responsibilities</h3>
              <ul className="mt-4 space-y-3">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="mt-8 text-lg font-bold">Requirements</h3>
              <ul className="mt-4 space-y-3">
                {job.requirements.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 lg:sticky lg:top-6">
            <p className="text-sm font-medium text-slate-500">Expected salary</p>
            <div className="mt-2 flex items-center gap-1 text-2xl font-black">
              <IndianRupee size={22} />
              {job.salary.replace('₹', '')}
            </div>

            <p className="mt-2 text-sm text-slate-500">
              {job.type} · {job.experience}
            </p>

            <button
              onClick={handleApply}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Apply for this job <ExternalLink size={17} />
            </button>

            <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
              This is sample project data. Applications will be enabled after we connect the backend and real job sources.
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default JobDetails
