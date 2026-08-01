import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profiles } from '../data/streamingData';
import { setSelectedProfile } from '../utils/session';

export default function ProfileSelection() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Who\'s Watching?';
  }, []);

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    navigate('/browse');
  };

  return (
    <div className="min-h-screen bg-background px-5 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-12 py-12">
        <div className="flex w-full max-w-3xl flex-col items-center gap-8 text-center">
          <div className="self-start">
            <span className="inline-flex items-center gap-3 rounded-full bg-black/80 px-4 py-3 text-sm uppercase tracking-[0.35em] text-white shadow-lg shadow-black/50">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-netflix text-lg font-black tracking-[0.35em]">N</span>
              Netflix
            </span>
          </div>

          <h1 className="text-[clamp(3rem,5vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
            Who's Watching?
          </h1>
          <p className="max-w-xl text-sm text-slate-400">
            Pick a profile to continue to your Netflix homepage.
          </p>
        </div>

        <div className="grid w-full max-w-5xl grid-cols-2 gap-8 md:grid-cols-5">
          {profiles.map((profile) => (
            <motion.button
              key={profile.id}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleProfileSelect(profile)}
              className="group mx-auto flex w-full max-w-[170px] flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-5 py-5 text-center transition duration-300 hover:border-white hover:bg-white/10"
            >
              <div className="relative h-36 w-36 overflow-hidden rounded-full border-2 border-transparent bg-slate-700 transition duration-300 group-hover:border-white">
                <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
              </div>
              <span className="text-lg font-medium text-slate-300 transition duration-300 group-hover:text-white">
                {profile.name}
              </span>
            </motion.button>
          ))}
        </div>

        <button className="rounded-3xl border border-white/20 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.3em] text-slate-300 transition hover:border-white hover:text-white">
          Manage Profiles
        </button>
      </div>
    </div>
  );
}
