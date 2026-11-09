
import { useState } from 'react'
import { Link } from 'react-router-dom'
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
} from 'lucide-react'

const initialData = {
  name: '',
  headline: '',
  location: '',
  education: '',
  qualification: '',
  experience: '',
  skills: [],
  skillInput: '',
  preferredRole: '',
  preferredLocation: '',
  employmentType: 'Full-time',
}

function ProfileSetup() {
  const [formData, setFormData] = useState(initialData)
  const [currentStep, setCurrentStep] = useState(1)

  const updateField = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const addSkill = (event) => {
    event.preventDefault()

    const skill = formData.skillInput.trim()

    if (
      !skill ||
      formData.skills.some(
        (item) => item.toLowerCase() === skill.toLowerCase(),
      )
    ) {
      return
    }

    setFormData((previous) => ({
      ...previous,
      skills: [...previous.skills, skill],
      skillInput: '',
    }))
  }

  const removeSkill = (skillToRemove) => {
    setFormData((previous) => ({
      ...previous,
      skills: previous.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const nextStep = () => {
    setCurrentStep((previous) => Math.min(previous + 1, 3))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const previousStep = () => {
    setCurrentStep((previous) => Math.max(previous - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log('Profile information:', formData)
    alert('Profile setup UI completed. We will connect it to MongoDB later.')
  }

  const steps = [
    { number: 1, label: 'Personal', icon: UserRound },
    { number: 2, label: 'Professional', icon: BriefcaseBusiness },
    { number: 3, label: 'Career goals', icon: GraduationCap },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-slate-900">
            <Sparkles className="text-emerald-600" />
            Career<span className="text-emerald-600">AI</span>
          </Link>

          <span className="text-sm font-medium text-slate-500">
            Profile setup
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-12">
        <div className="mb-9 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <Sparkles size={27} />
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900">
            Build your professional profile
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Help CareerAI understand your background and discover opportunities
            that match your career goals.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-3">
          {steps.map((step) => {
            const Icon = step.icon
            const active = currentStep >= step.number

            return (
              <div key={step.number} className="text-center">
                <div
                  className={`mx-auto flex h-11 w-11 items-center justify-center rounded-xl ${
                    active
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  <Icon size={20} />
                </div>
                <p className={`mt-2 text-xs font-semibold ${
                  active ? 'text-emerald-700' : 'text-slate-400'
                }`}>
                  {step.label}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mb-7 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9"
        >
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
                    Full name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={updateField}
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
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
                    Highest qualification
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
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="PhD">PhD</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Education details
                  </label>
                  <input
                    name="education"
                    value={formData.education}
                    onChange={updateField}
                    placeholder="Degree, college and graduation year"
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
                    <option value="Less than 1 year">Less than 1 year</option>
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
                      placeholder="e.g. React, Node.js, MongoDB"
                      className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="rounded-xl bg-emerald-600 px-4 text-white hover:bg-emerald-700"
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
                    Preferred job role
                  </label>
                  <input
                    name="preferredRole"
                    value={formData.preferredRole}
                    onChange={updateField}
                    placeholder="e.g. Full Stack Developer"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                  />
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
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                    <option>Contract</option>
                    <option>Freelance</option>
                  </select>
                </div>

                <div className="rounded-xl bg-emerald-50 p-4">
                  <div className="flex gap-3">
                    <Sparkles className="shrink-0 text-emerald-600" size={21} />
                    <p className="text-sm leading-6 text-emerald-800">
                      CareerAI will use your profile information to suggest
                      relevant jobs. You can update your preferences later.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          <div className="mt-9 flex items-center justify-between border-t border-slate-100 pt-6">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={previousStep}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <ArrowLeft size={17} /> Back
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
                Continue <ArrowRight size={17} />
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700"
              >
                Complete Profile <Sparkles size={17} />
              </button>
            )}
          </div>
        </form>

        <p className="mt-5 text-center text-xs text-slate-400">
          Your information will be used to personalize your career experience.
        </p>
      </main>
    </div>
  )
}

export default ProfileSetup
