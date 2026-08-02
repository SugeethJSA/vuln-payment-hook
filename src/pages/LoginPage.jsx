import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown, HiChevronUp, HiOutlineGlobe, HiOutlineLockClosed, HiOutlineMail, HiOutlineShieldCheck } from 'react-icons/hi';
import NetflixLogo from '../components/NetflixLogo';
import { setAuthenticated, getSelectedProfile, isAuthenticated } from '../utils/session';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [getHelpExpanded, setGetHelpExpanded] = useState(false);
  const [language, setLanguage] = useState('en');
  const [recaptchaLearnMore, setRecaptchaLearnMore] = useState(false);

  useEffect(() => {
    document.title = 'Netflix';
    if (isAuthenticated() && getSelectedProfile()) {
      navigate('/browse', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setAuthenticated(true);
    navigate('/profiles');
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-black text-white select-none">
      {/* BACKGROUND IMAGE WITH OVERLAY */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: 'url(https://assets.nflxext.com/ffe/siteui/vlv3/435e8bb8-7f1b-49cb-8da8-bff997124294/web/IN-en-20260511-TRIFECTA-perspective_ec39852e-0b48-4e8a-b415-dd8376cd83ce_large.jpg)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />

      {/* HEADER */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-14 lg:px-16">
        <button onClick={() => navigate('/')} className="transition transform hover:scale-105">
          <NetflixLogo className="h-10 sm:h-12 w-auto" variant="wordmark" />
        </button>
      </header>

      {/* MAIN CONTENT CARD */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-[450px] rounded-lg border border-white/10 bg-black/75 px-8 py-12 shadow-2xl backdrop-blur-md sm:px-14 sm:py-14"
        >
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-3.5xl">
            Sign In
          </h1>
          <p className="mt-1.5 text-xs text-slate-400">
            Enter your info to sign in or get started with a new account.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
            <div className="relative">
              <input
                type="text"
                id="userLoginId"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder=" "
                className="peer w-full rounded border border-slate-600 bg-zinc-800/90 px-4 pt-5 pb-2 text-sm text-white outline-none transition focus:border-white focus:ring-1 focus:ring-white"
              />
              <label
                htmlFor="userLoginId"
                className="pointer-events-none absolute left-4 top-3.5 text-xs text-slate-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-slate-300 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-slate-300"
              >
                Email or mobile number
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                placeholder=" "
                className="peer w-full rounded border border-slate-600 bg-zinc-800/90 px-4 pt-5 pb-2 text-sm text-white outline-none transition focus:border-white focus:ring-1 focus:ring-white"
              />
              <label
                htmlFor="password"
                className="pointer-events-none absolute left-4 top-3.5 text-xs text-slate-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-slate-300 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-slate-300"
              >
                Password
              </label>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded bg-netflix py-3 text-base font-semibold text-white transition hover:bg-netflix-hover active:scale-[0.99]"
            >
              Sign In
            </button>
          </form>

          {/* HELP DROPDOWN */}
          <div className="mt-5 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => setGetHelpExpanded((prev) => !prev)}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition"
            >
              <span>Get Help</span>
              {getHelpExpanded ? <HiChevronUp className="h-4 w-4" /> : <HiChevronDown className="h-4 w-4" />}
            </button>

            <AnimatePresence>
              {getHelpExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden space-y-2 pt-3 text-xs text-slate-400"
                >
                  <p className="hover:underline cursor-pointer">Forgot email or mobile number?</p>
                  <p className="hover:underline cursor-pointer">Learn more about sign-in</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="mt-6 text-xs text-slate-400">
            New to Netflix?{' '}
            <button onClick={handleSubmit} className="font-semibold text-white hover:underline">
              Sign up now.
            </button>
          </p>

          <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
            <button
              type="button"
              onClick={() => setRecaptchaLearnMore((prev) => !prev)}
              className="text-blue-500 hover:underline"
            >
              Learn more.
            </button>
          </p>
          {recaptchaLearnMore && (
            <p className="mt-2 text-[10px] text-slate-500 leading-normal">
              The information collected by Google reCAPTCHA is subject to the Google Privacy Policy and Terms of Service.
            </p>
          )}

          {/* EDUCATIONAL DEMO INFO */}
          <div className="mt-6 rounded-md bg-white/5 p-3.5 text-xs text-slate-400 space-y-2 border border-white/5">
            <p className="flex items-start gap-2 text-slate-300 font-medium">
              <HiOutlineShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-netflix" />
              Educational Lab: Any credentials will sign you in for demonstration purposes.
            </p>
          </div>
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-black/90 px-6 py-8 text-xs text-slate-400 sm:px-14 lg:px-16">
        <div className="mx-auto max-w-6xl space-y-6">
          <p>
            Questions? Call{' '}
            <a href="tel:000-800-919-1743" className="hover:underline text-slate-300">
              000-800-919-1743 (Toll-Free)
            </a>
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <a href="#" className="hover:underline">FAQ</a>
            <a href="#" className="hover:underline">Help Centre</a>
            <a href="#" className="hover:underline">Terms of Use</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Cookie Preferences</a>
            <a href="#" className="hover:underline">Corporate Information</a>
          </div>

          <div className="relative inline-block">
            <div className="flex items-center gap-2 rounded border border-slate-700 bg-black/80 px-3 py-1.5 text-xs text-white">
              <HiOutlineGlobe className="h-4 w-4 text-slate-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-white outline-none cursor-pointer"
              >
                <option value="en" className="bg-slate-900 text-white">English</option>
                <option value="hi" className="bg-slate-900 text-white">हिन्दी</option>
              </select>
            </div>
          </div>

          <p className="text-[11px] text-slate-600">Netflix Educational Clone & CyberSec Webhook Lab</p>
        </div>
      </footer>
    </div>
  );
}
