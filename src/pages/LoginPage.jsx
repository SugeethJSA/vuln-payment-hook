import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineLockClosed, HiOutlineMail, HiOutlineShieldCheck } from 'react-icons/hi';
import NetflixLogo from '../components/NetflixLogo';
import { setAuthenticated, getSelectedProfile, isAuthenticated } from '../utils/session';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <div className="relative min-h-screen overflow-hidden bg-background text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=1920&q=80)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
      <div className="pointer-events-none absolute inset-0 bg-glow-radial" />

      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-12">
        <div className="flex items-center gap-3">
          <NetflixLogo className="h-10 w-10 drop-shadow-lg" />
          <span className="logo-3d select-none text-2xl font-black tracking-[-0.08em] text-white">
            NETFLIX
          </span>
        </div>
      </header>

      <main className="relative z-10 flex min-h-[calc(100vh-96px)] items-center justify-center px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-[440px] rounded-lg border border-white/10 bg-black/75 px-10 py-14 shadow-2xl shadow-black/80 backdrop-blur-md"
        >
          <h1 className="text-[2rem] font-medium leading-tight text-white">Sign In</h1>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
            <label className="grid gap-1.5 text-sm text-slate-300">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-md border border-slate-600 bg-slate-800/80 px-4 py-3.5 text-white outline-none transition focus:border-white focus:ring-2 focus:ring-netflix/50"
              />
            </label>

            <label className="grid gap-1.5 text-sm text-slate-300">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                placeholder="Enter password"
                className="w-full rounded-md border border-slate-600 bg-slate-800/80 px-4 py-3.5 text-white outline-none transition focus:border-white focus:ring-2 focus:ring-netflix/50"
              />
            </label>

            <button
              type="submit"
              className="mt-2 w-full rounded-md bg-netflix py-3.5 text-base font-semibold text-white transition hover:bg-netflix-hover hover:shadow-glow-red active:scale-[0.99]"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-400">
            New to Netflix?{' '}
            <button className="font-medium text-white hover:underline">Sign up now.</button>
          </p>

          <div className="mt-8 space-y-3 border-t border-white/10 pt-6 text-xs leading-5 text-slate-400">
            <p className="flex items-start gap-2">
              <HiOutlineShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-netflix" />
              Educational demo: any email and password sign you in. No real account is created.
            </p>
            <p className="flex items-start gap-2">
              <HiOutlineLockClosed className="mt-0.5 h-4 w-4 shrink-0 text-netflix" />
              Session is stored locally in your browser only.
            </p>
            <p className="flex items-start gap-2">
              <HiOutlineMail className="mt-0.5 h-4 w-4 shrink-0 text-netflix" />
              This page protects no data — it exists to demonstrate the webhook payment flow.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
