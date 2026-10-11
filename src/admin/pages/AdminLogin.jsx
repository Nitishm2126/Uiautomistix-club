import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Cpu, Lock, Mail, Loader2, AlertCircle, ArrowLeft } from 'lucide-react'
import { signIn } from '../../services/authService'
import { useAuth } from '../components/AuthProvider'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { session } = useAuth()

  // If already logged in, redirect to dashboard
  if (session) {
    navigate('/admin', { replace: true })
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const { data, error: authError } = await signIn(email, password)
      if (authError) {
        throw new Error(authError.message || 'Invalid email or password')
      }
      if (data?.session) {
        navigate('/admin', { replace: true })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#07090E] p-5 relative overflow-hidden">
      {/* Background radial ambient glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[55%] h-[55%] bg-[#F64124]/12 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[55%] h-[55%] bg-[#F64124]/8 blur-[140px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[420px] relative z-10">
        {/* Logo Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white p-1 flex items-center justify-center mb-4 shadow-xl shadow-white/10 border border-white/20">
            <img
              src="/assets/logo/logo.png"
              alt="Sairam UiAutomistix Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                if (!e.currentTarget.dataset.fallbackTried) {
                  e.currentTarget.dataset.fallbackTried = 'true'
                  e.currentTarget.src = '/assets/logo/logo.jpg'
                } else {
                  e.currentTarget.style.display = 'none'
                  if (e.currentTarget.nextElementSibling) {
                    e.currentTarget.nextElementSibling.style.display = 'flex'
                  }
                }
              }}
            />
            <span className="hidden items-center justify-center text-white bg-[#F64124] w-full h-full rounded-xl">
              <Cpu size={28} />
            </span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold text-white mb-1.5 tracking-tight"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            Admin Portal
          </h1>
          <p className="text-white/50 text-xs sm:text-sm">
            Sign in to manage Sairam UiAutomistix Club content
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#121620] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-400 text-xs font-medium leading-relaxed">
                  {error}
                </p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider pl-0.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/35">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#F64124] transition-colors"
                  placeholder="admin@sairam.edu.in"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider pl-0.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/35">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#F64124] transition-colors"
                  placeholder="••••••••"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#F64124] hover:bg-[#d43010] text-white font-semibold rounded-xl py-3 text-sm transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-[#F64124]/20 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          {/* Footer Back Link */}
          <div className="mt-6 pt-5 border-t border-white/8 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors no-underline font-medium"
            >
              <ArrowLeft size={13} />
              <span>Back to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
