import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { setAuthenticated, getSelectedProfile, isAuthenticated } from '../utils/session';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = 'Netflix Login';
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
    <div className="min-h-screen bg-background px-4 py-10 text-white sm:px-6 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-netflix backdrop-blur-xl sm:p-12">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-black tracking-[0.35em] text-netflix">NETFLIX</div>
          <div className="text-right text-sm uppercase tracking-[0.25em] text-slate-500">Stream anywhere, anytime</div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Sign In</h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Log in to continue to a Netflix-inspired streaming experience built around your demo backend.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          onSubmit={handleSubmit}
          className="grid gap-5"
        >
          <label className="grid gap-2 text-sm text-slate-300">
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="you@example.com"
              className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-white focus:ring-2 focus:ring-netflix/30"
            />
          </label>

          <label className="grid gap-2 text-sm text-slate-300">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              placeholder="Enter password"
              className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-white focus:ring-2 focus:ring-netflix/30"
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-3xl bg-netflix px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#f40612]"
          >
            Continue
          </button>
        </motion.form>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-400">
          <p className="font-semibold text-white">Demo flow</p>
          <p className="mt-2">Log in, pick a profile, browse the Netflix home experience, choose a movie, select a plan, then complete payment using the existing webhook demo backend.</p>
        </div>
      </div>
    </div>
  );
}
