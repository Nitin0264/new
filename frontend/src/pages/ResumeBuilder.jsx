
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FileText,
  UserRound,
  GraduationCap,
  BriefcaseBusiness,
  Code2,
  Sparkles,
  Plus,
  Trash2,
  Download,
  Eye,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
} from 'lucide-react'

const initialForm = {
  name: '',
  role: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  github: '',
  summary: '',
  skills: ['React.js', 'JavaScript', 'HTML', 'CSS'],
  education: [
    {
      degree: '',
      institution: '',
      year: '',
      score: '',
    },
  ],
  experience: [
    {
      position: '',
      company: '',
      duration: '',
      description: '',
    },
  ],
  projects: [
    {
      name: '',
      technologies: '',
      description: '',
    },
  ],
}

function ResumeBuilder() {
  const [formData, setFormData] = useState(initialForm)
  const [activeTab, setActiveTab] = useState('personal')
  const [newSkill, setNewSkill] = useState('')
  const [showPreview, setShowPreview] = useState(true)

  const updateField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const updateArrayItem = (field, index, key, value) => {
    setFormData((current) => ({
      ...current,
      [field]: current[field].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item
      ),
    }))
  }

  const addArrayItem = (field, newItem) => {
    setFormData((current) => ({
      ...current,
      [field]: [...current[field], newItem],
    }))
  }

  const removeArrayItem = (field, index) => {
    setFormData((current) => ({
      ...current,
      [field]: current[field].filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  const addSkill = () => {
    const skill = newSkill.trim()

    if (!skill) return

    if (formData.skills.some((item) => item.toLowerCase() === skill.toLowerCase())) {
      alert('This skill has already been added.')
      return
    }

    updateField('skills', [...formData.skills, skill])
    setNewSkill('')
  }

  const removeSkill = (skillToRemove) => {
    updateField(
      'skills',
      formData.skills.filter((skill) => skill !== skillToRemove)
    )
  }

  const handleDownload = () => {
    window.print()
  }

  const tabs = [
    { id: 'personal', label: 'Personal', icon: UserRound },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: BriefcaseBusiness },
    { id: 'projects', label: 'Projects', icon: Code2 },
  ]

  const inputClass =
    'mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'

  const labelClass = 'text-sm font-semibold text-slate-700'

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }

            #resume-print-area,
            #resume-print-area * {
              visibility: visible;
            }

            #resume-print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              margin: 0;
              padding: 24px;
              box-shadow: none;
              border: none;
            }

            @page {
              size: A4;
              margin: 12mm;
            }
          }
        `}
      </style>

      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="text-2xl font-black text-indigo-600">
            CareerAI<span className="text-slate-900">.</span>
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600"
          >
            <ArrowLeft size={17} />
            Dashboard
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-5 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
              <Sparkles size={16} />
              AI-powered resume creation
            </div>

            <h1 className="text-3xl font-black sm:text-4xl">
              Resume Builder
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Create and preview your professional resume.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowPreview((current) => !current)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50"
            >
              <Eye size={17} />
              {showPreview ? 'Hide preview' : 'Show preview'}
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <Download size={17} />
              Print / Save PDF
            </button>
          </div>
        </div>

        <div className={`grid items-start gap-6 ${showPreview ? 'xl:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Editor */}
          <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Resume information</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Fill in the sections below.
                </p>
              </div>
              <FileText className="text-indigo-600" size={24} />
            </div>

            <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {tabs.map((tab) => {
                const Icon = tab.icon

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-xs font-semibold transition ${
                      activeTab === tab.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-50 text-slate-600 hover:bg-indigo-50'
                    }`}
                  >
                    <Icon size={19} />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {activeTab === 'personal' && (
              <div className="space-y-4">
                <h3 className="font-bold">Personal information</h3>

                <div>
                  <label className={labelClass}>Full name</label>
                  <input
                    className={inputClass}
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}>Professional title</label>
                  <input
                    className={inputClass}
                    placeholder="MERN Stack Developer"
                    value={formData.role}
                    onChange={(e) => updateField('role', e.target.value)}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      type="email"
                      className={inputClass}
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Phone</label>
                    <input
                      className={inputClass}
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Location</label>
                  <input
                    className={inputClass}
                    placeholder="City, State, Country"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>LinkedIn URL</label>
                    <input
                      className={inputClass}
                      placeholder="LinkedIn profile"
                      value={formData.linkedin}
                      onChange={(e) => updateField('linkedin', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>GitHub URL</label>
                    <input
                      className={inputClass}
                      placeholder="GitHub profile"
                      value={formData.github}
                      onChange={(e) => updateField('github', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Professional summary</label>
                  <textarea
                    rows="5"
                    className={inputClass}
                    placeholder="Write a short and honest summary of your experience, skills and career goals..."
                    value={formData.summary}
                    onChange={(e) => updateField('summary', e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}>Technical skills</label>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          aria-label={`Remove ${skill}`}
                          className="font-bold hover:text-red-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <input
                      className={inputClass + ' mt-0'}
                      placeholder="Add a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addSkill()
                        }
                      }}
                    />

                    <button
                      onClick={addSkill}
                      className="rounded-xl bg-indigo-600 px-4 text-white hover:bg-indigo-700"
                    >
                      <Plus size={19} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">Education details</h3>
                  <button
                    onClick={() =>
                      addArrayItem('education', {
                        degree: '',
                        institution: '',
                        year: '',
                        score: '',
                      })
                    }
                    className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600"
                  >
                    <Plus size={17} /> Add
                  </button>
                </div>

                {formData.education.map((item, index) => (
                  <div key={index} className="space-y-3 rounded-xl border border-slate-200 p-4">
                    <div className="flex justify-between">
                      <p className="text-sm font-bold">Education {index + 1}</p>
                      {formData.education.length > 1 && (
                        <button onClick={() => removeArrayItem('education', index)} className="text-red-500">
                          <Trash2 size={17} />
                        </button>
                      )}
                    </div>

                    {[
                      ['degree', 'Degree / Qualification', 'BCA, MCA, B.Tech...'],
                      ['institution', 'Institution', 'University or college'],
                      ['year', 'Year', '2025–2027'],
                      ['score', 'Score / CGPA', '8.2 CGPA'],
                    ].map(([key, label, placeholder]) => (
                      <div key={key}>
                        <label className={labelClass}>{label}</label>
                        <input
                          className={inputClass}
                          placeholder={placeholder}
                          value={item[key]}
                          onChange={(e) =>
                            updateArrayItem('education', index, key, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">Work experience</h3>
                  <button
                    onClick={() =>
                      addArrayItem('experience', {
                        position: '',
                        company: '',
                        duration: '',
                        description: '',
                      })
                    }
                    className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600"
                  >
                    <Plus size={17} /> Add
                  </button>
                </div>

                {formData.experience.map((item, index) => (
                  <div key={index} className="space-y-3 rounded-xl border border-slate-200 p-4">
                    <div className="flex justify-between">
                      <p className="text-sm font-bold">Experience {index + 1}</p>
                      {formData.experience.length > 1 && (
                        <button onClick={() => removeArrayItem('experience', index)} className="text-red-500">
                          <Trash2 size={17} />
                        </button>
                      )}
                    </div>

                    <div>
                      <label className={labelClass}>Position</label>
                      <input
                        className={inputClass}
                        placeholder="Frontend Developer Intern"
                        value={item.position}
                        onChange={(e) =>
                          updateArrayItem('experience', index, 'position', e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Company</label>
                      <input
                        className={inputClass}
                        placeholder="Company name"
                        value={item.company}
                        onChange={(e) =>
                          updateArrayItem('experience', index, 'company', e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Duration</label>
                      <input
                        className={inputClass}
                        placeholder="June 2025 – December 2025"
                        value={item.duration}
                        onChange={(e) =>
                          updateArrayItem('experience', index, 'duration', e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Responsibilities / achievements</label>
                      <textarea
                        rows="4"
                        className={inputClass}
                        placeholder="Describe your actual work and achievements..."
                        value={item.description}
                        onChange={(e) =>
                          updateArrayItem('experience', index, 'description', e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">Projects</h3>
                  <button
                    onClick={() =>
                      addArrayItem('projects', {
                        name: '',
                        technologies: '',
                        description: '',
                      })
                    }
                    className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600"
                  >
                    <Plus size={17} /> Add
                  </button>
                </div>

                {formData.projects.map((item, index) => (
                  <div key={index} className="space-y-3 rounded-xl border border-slate-200 p-4">
                    <div className="flex justify-between">
                      <p className="text-sm font-bold">Project {index + 1}</p>
                      {formData.projects.length > 1 && (
                        <button onClick={() => removeArrayItem('projects', index)} className="text-red-500">
                          <Trash2 size={17} />
                        </button>
                      )}
                    </div>

                    <div>
                      <label className={labelClass}>Project name</label>
                      <input
                        className={inputClass}
                        placeholder="E-commerce platform"
                        value={item.name}
                        onChange={(e) =>
                          updateArrayItem('projects', index, 'name', e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Technologies</label>
                      <input
                        className={inputClass}
                        placeholder="React, Node.js, MongoDB"
                        value={item.technologies}
                        onChange={(e) =>
                          updateArrayItem('projects', index, 'technologies', e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Project description</label>
                      <textarea
                        rows="4"
                        className={inputClass}
                        placeholder="Explain what you built and what you contributed..."
                        value={item.description}
                        onChange={(e) =>
                          updateArrayItem('projects', index, 'description', e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Resume Preview */}
          {showPreview && (
            <section className="min-w-0">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-bold">Live resume preview</h2>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Live preview
                </span>
              </div>

              <div
                id="resume-print-area"
                className="min-h-[800px] rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9"
              >
                <div className="border-b-2 border-indigo-600 pb-5">
                  <h1 className="break-words text-3xl font-black text-slate-900">
                    {formData.name || 'Your Name'}
                  </h1>

                  <p className="mt-2 font-semibold text-indigo-600">
                    {formData.role || 'Your Professional Title'}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                    {formData.email && (
                      <span className="flex items-center gap-1">
                        <Mail size={13} /> {formData.email}
                      </span>
                    )}
                    {formData.phone && (
                      <span className="flex items-center gap-1">
                        <Phone size={13} /> {formData.phone}
                      </span>
                    )}
                    {formData.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={13} /> {formData.location}
                      </span>
                    )}
                    {formData.linkedin && (
                      <span className="flex items-center gap-1 break-all">
                        <Linkedin size={13} /> {formData.linkedin}
                      </span>
                    )}
                    {formData.github && (
                      <span className="flex items-center gap-1 break-all">
                        <Github size={13} /> {formData.github}
                      </span>
                    )}
                  </div>
                </div>

                {formData.summary && (
                  <section className="mt-6">
                    <h2 className="border-b border-slate-200 pb-2 text-sm font-black uppercase tracking-wider text-indigo-700">
                      Professional Summary
                    </h2>
                    <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
                      {formData.summary}
                    </p>
                  </section>
                )}

                {formData.skills.length > 0 && (
                  <section className="mt-6">
                    <h2 className="border-b border-slate-200 pb-2 text-sm font-black uppercase tracking-wider text-indigo-700">
                      Technical Skills
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {formData.skills.map((skill) => (
                        <span key={skill} className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {formData.experience.some((item) => item.position || item.company) && (
                  <section className="mt-6">
                    <h2 className="border-b border-slate-200 pb-2 text-sm font-black uppercase tracking-wider text-indigo-700">
                      Experience
                    </h2>

                    <div className="mt-3 space-y-4">
                      {formData.experience
                        .filter((item) => item.position || item.company)
                        .map((item, index) => (
                          <div key={index}>
                            <div className="flex flex-wrap justify-between gap-2">
                              <h3 className="text-sm font-bold">{item.position}</h3>
                              <span className="text-xs text-slate-500">{item.duration}</span>
                            </div>
                            <p className="mt-1 text-xs font-semibold text-slate-600">{item.company}</p>
                            {item.description && (
                              <p className="mt-2 whitespace-pre-line text-xs leading-5 text-slate-600">
                                {item.description}
                              </p>
                            )}
                          </div>
                        ))}
                    </div>
                  </section>
                )}

                {formData.projects.some((item) => item.name) && (
                  <section className="mt-6">
                    <h2 className="border-b border-slate-200 pb-2 text-sm font-black uppercase tracking-wider text-indigo-700">
                      Projects
                    </h2>

                    <div className="mt-3 space-y-4">
                      {formData.projects
                        .filter((item) => item.name)
                        .map((item, index) => (
                          <div key={index}>
                            <h3 className="text-sm font-bold">{item.name}</h3>
                            {item.technologies && (
                              <p className="mt-1 text-xs font-semibold text-slate-500">
                                {item.technologies}
                              </p>
                            )}
                            {item.description && (
                              <p className="mt-2 whitespace-pre-line text-xs leading-5 text-slate-600">
                                {item.description}
                              </p>
                            )}
                          </div>
                        ))}
                    </div>
                  </section>
                )}

                {formData.education.some((item) => item.degree || item.institution) && (
                  <section className="mt-6">
                    <h2 className="border-b border-slate-200 pb-2 text-sm font-black uppercase tracking-wider text-indigo-700">
                      Education
                    </h2>

                    <div className="mt-3 space-y-4">
                      {formData.education
                        .filter((item) => item.degree || item.institution)
                        .map((item, index) => (
                          <div key={index}>
                            <div className="flex flex-wrap justify-between gap-2">
                              <h3 className="text-sm font-bold">{item.degree}</h3>
                              <span className="text-xs text-slate-500">{item.year}</span>
                            </div>
                            <p className="mt-1 text-xs text-slate-600">{item.institution}</p>
                            {item.score && (
                              <p className="mt-1 text-xs text-slate-500">{item.score}</p>
                            )}
                          </div>
                        ))}
                    </div>
                  </section>
                )}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

export default ResumeBuilder