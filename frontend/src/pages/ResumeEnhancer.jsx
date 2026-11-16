
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  FileText,
  ArrowLeft,
  WandSparkles,
  Copy,
  RefreshCw,
  CheckCircle2,
  Lightbulb,
  AlertCircle,
} from 'lucide-react'

function ResumeEnhancer() {
  const [section, setSection] = useState('summary')
  const [experienceLevel, setExperienceLevel] = useState('Fresher')
  const [inputText, setInputText] = useState('')
  const [jobRole, setJobRole] = useState('')
  const [enhancedText, setEnhancedText] = useState('')
  const [copied, setCopied] = useState(false)

  const sectionOptions = [
    { value: 'summary', label: 'Professional Summary' },
    { value: 'experience', label: 'Work Experience' },
    { value: 'project', label: 'Project Description' },
    { value: 'skills', label: 'Skills Presentation' },
  ]

  const sampleText = {
    summary:
      'I am a web developer. I know React, JavaScript and Node.js. I have made some projects and want to work in a good company.',
    experience:
      'Worked on frontend pages using React. Created components and connected APIs. Fixed some bugs.',
    project:
      'I made an ecommerce website using React and Node.js. Users can see products and buy products.',
    skills:
      'I know React, JavaScript, HTML, CSS, Node.js, MongoDB and Git.',
  }

  const handleSample = () => {
    setInputText(sampleText[section])
    setEnhancedText('')
  }

  // Temporary demo enhancement.
  // Replace this function with the backend Gemini API call later.
  const handleEnhance = () => {
    if (!inputText.trim()) {
      alert('Please enter your existing resume content first.')
      return
    }

    if (inputText.trim().length < 15) {
      alert('Please provide a little more information to improve your resume.')
      return
    }

    const improved = `Improved ${sectionOptions.find((item) => item.value === section)?.label} (DEMO)\n\n${inputText.trim()}\n\nSuggested improvements:\n• Use specific action verbs to describe your actual contributions.\n• Include measurable results only when you can verify them.\n• Highlight the technologies and responsibilities relevant to ${jobRole.trim() || 'your target role'}.\n• Remove vague statements and explain what you personally accomplished.\n\nNote: This is a demonstration, not AI-generated content. Review and edit it before using it in your resume.`

    setEnhancedText(improved)
    setCopied(false)
  }

  const handleCopy = async () => {
    if (!enhancedText) return

    try {
      await navigator.clipboard.writeText(enhancedText)
      setCopied(true)
    } catch {
      alert('Unable to copy automatically. Please select and copy the text.')
    }
  }

  const handleReset = () => {
    setInputText('')
    setEnhancedText('')
    setJobRole('')
    setCopied(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
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

      <main className="mx-auto max-w-7xl px-5 py-9">
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600">
            <Sparkles size={15} />
            AI resume assistant
          </div>

          <h1 className="text-3xl font-black sm:text-4xl">
            Improve your resume
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Turn your existing experience and achievements into clear,
            professional resume content.
          </p>
        </div>

        <div className="mb-7 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <FileText className="text-indigo-600" size={23} />
            <h3 className="mt-3 font-bold">Professional writing</h3>
            <p className="mt-1 text-sm text-slate-500">
              Improve clarity and structure.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <WandSparkles className="text-purple-600" size={23} />
            <h3 className="mt-3 font-bold">Role-focused content</h3>
            <p className="mt-1 text-sm text-slate-500">
              Align wording with your target job.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <CheckCircle2 className="text-emerald-600" size={23} />
            <h3 className="mt-3 font-bold">Honest improvements</h3>
            <p className="mt-1 text-sm text-slate-500">
              Keep your real qualifications intact.
            </p>
          </div>
        </div>

        <div className="grid items-start gap-6 xl:grid-cols-2">
          {/* Input section */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
            <div className="mb-6">
              <h2 className="text-xl font-bold">Your resume content</h2>
              <p className="mt-1 text-sm text-slate-500">
                Select a section and enter your existing information.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Section to improve
                </label>

                <select
                  value={section}
                  onChange={(e) => {
                    setSection(e.target.value)
                    setEnhancedText('')
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
                >
                  {sectionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Target job role
                </label>

                <input
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  placeholder="e.g. MERN Stack Developer"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Experience level
                </label>

                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
                >
                  <option>Fresher</option>
                  <option>Intern</option>
                  <option>1–2 years</option>
                  <option>3–5 years</option>
                  <option>5+ years</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <label className="text-sm font-semibold text-slate-700">
                    Existing resume content
                  </label>

                  <button
                    onClick={handleSample}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Load sample
                  </button>
                </div>

                <textarea
                  rows={11}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your actual professional summary, work experience, project details or skills here..."
                  className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none focus:border-indigo-500"
                />

                <p className="mt-2 text-xs text-slate-400">
                  {inputText.length} characters
                </p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex gap-2">
                  <AlertCircle size={18} className="shrink-0 text-amber-600" />
                  <p className="text-xs leading-5 text-amber-800">
                    Enter genuine information only. Never include passwords,
                    private account details or confidential company information.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleEnhance}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                  <Sparkles size={18} />
                  Improve resume
                </button>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <RefreshCw size={16} />
                  Reset
                </button>
              </div>
            </div>
          </section>

          {/* Output section */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">Improved content</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Your result will appear here.
                </p>
              </div>

              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <Sparkles size={22} />
              </div>
            </div>

            {enhancedText ? (
              <div>
                <div className="mb-4 flex items-center gap-2 rounded-xl bg-amber-50 p-3 text-xs font-semibold text-amber-800">
                  <AlertCircle size={16} />
                  Demo output — Gemini AI is not connected yet.
                </div>

                <textarea
                  rows={17}
                  value={enhancedText}
                  onChange={(e) => setEnhancedText(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 outline-none focus:border-indigo-500"
                />

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    <Copy size={16} />
                    {copied ? 'Copied' : 'Copy content'}
                  </button>

                  <Link
                    to="/resume-builder"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Open Resume Builder
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[430px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                  <WandSparkles size={30} />
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  Ready to improve your resume?
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Add your existing content and select Improve Resume to see the demonstration output.
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
                  <Lightbulb size={15} />
                  Tip: Include real responsibilities and achievements.
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

export default ResumeEnhancer
