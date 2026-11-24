
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BriefcaseBusiness,
  Eye,
  EyeOff,
  Sparkles,
  LoaderCircle,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import api from '../api/axios'

function Login() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({
    type: '',
    text: '',
  })

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })

    setMessage({ type: '', text: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage({ type: '', text: '' })

    try {
      setLoading(true)

      const response = await api.post('/auth/login', {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      })

      const { token, user } = response.data

      if (!token || !user) {
        throw new Error('Login response is missing authentication details.')
      }

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      setMessage({
        type: 'success',
        text: 'Login successful! Redirecting...',
      })

      navigate('/dashboard', { replace: true })
    } catch (error) {
      console.error('Login error:', error)

      setMessage({
        type: 'error',
        text:
          error.response?.data?.message ||
          error.message ||
          'Unable to log in. Please try again.',
      })
    } finally {
      setLoading(false)
    }
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
            Your next opportunity starts here.
          </h1>
          <p className="mt-6 text-lg leading-8 text-emerald-100">
            Find relevant jobs, build your professional identity and grow
            your career with intelligent AI assistance.
          </p>
        </div>

        <p className="text-sm text-emerald-100">
          © {new Date().getFullYear()} CareerAI. All rights reserved.
        </p>
      </div>

      <div className="flex w-full items-center justify-center px-5 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="mb-10 flex items-center gap-2 text-xl font-extrabold text-slate-900 lg:hidden"
          >
            <Sparkles className="text-emerald-600" />
            CareerAI
          </Link>

          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
              Welcome back
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
              Sign in to CareerAI
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter your account details to continue your career journey.
            </p>
          </div>

          {message.text && (
            <div
              role="alert"
              className={`mb-5 flex items-start gap-3 rounded-xl p-4 text-sm ${
                message.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle size={19} className="mt-0.5 shrink-0" />
              ) : (
                <AlertCircle size={19} className="mt-0.5 shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 disabled:bg-slate-100"
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
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3.5 pr-12 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 disabled:bg-slate-100"
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

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setMessage({
                  type: 'error',
                  text: 'Password recovery is not available yet.',
                })}
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-emerald-600 hover:text-emerald-700">
              Create account
            </Link>
          </p>

          <Link
            to="/"
            className="mt-8 block text-center text-sm text-slate-400 hover:text-emerald-600"
          >
            ← Back to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
