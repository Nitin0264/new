
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BriefcaseBusiness,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react'

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.')
      return
    }

    if (formData.password.length < 8) {
      alert('Password must contain at least 8 characters.')
      return
    }

    alert('Registration UI is ready. Backend integration is our next step.')
  }

  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden w-1/2 flex-col justify-between bg-emerald-700 p-12 text-white lg:flex">
        <Link to="/" className="flex items-center gap-3 text-2xl font-extrabold">
          <Sparkles size={28} />
          CareerAI
        </Link>

        <div className="max-w-lg">
          <div className="mb-6 inline-flex rounded-xl bg-white/15 p-4">
            <BriefcaseBusiness size={32} />
          </div>
          <h1 className="text-5xl font-extrabold leading-tight">
            Build your future with CareerAI.
          </h1>
          <p className="mt-6 text-lg leading-8 text-emerald-100">
            Create your profile, connect with professionals and discover
            opportunities that fit your career goals.
          </p>
        </div>

        <p className="text-sm text-emerald-100">
          © {new Date().getFullYear()} CareerAI. All rights reserved.
        </p>
      </div>

      <div className="flex w-full items-center justify-center px-5 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 text-xl font-extrabold text-slate-900 lg:hidden">
            <Sparkles className="text-emerald-600" />
            CareerAI
          </Link>

          <div className="mb-7">
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
              Get started for free
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
              Create your account
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Join CareerAI and take the next step in your professional journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                minLength={2}
                maxLength={60}
                autoComplete="name"
                className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3.5 pr-12 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                required
                autoComplete="new-password"
                className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              Create Account <ArrowRight size={17} />
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-emerald-600 hover:text-emerald-700">
              Sign in
            </Link>
          </p>

          <Link to="/" className="mt-7 block text-center text-sm text-slate-400 hover:text-emerald-600">
            ← Back to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
