
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProfileSetup from './pages/ProfileSetup'
import Jobs from './pages/Jobs'
import JobDetails from './pages/JobDetails'
import SavedJobs from './pages/SavedJobs'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import ResumeEnhancer from './pages/ResumeEnhancer'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />

      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/saved-jobs" element={<SavedJobs />} />

      <Route path="/resume-builder" element={<ResumeBuilder />} />
      <Route path="/resume-enhancer" element={<ResumeEnhancer />} />
    </Routes>
  )
}

export default App
