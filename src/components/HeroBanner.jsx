import { motion } from 'framer-motion';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import NetflixLogo from './NetflixLogo';

export default function HeroBanner({ hero }) {
  const background = hero?.backdrop || 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1600&q=80';
  const match = hero?.rating ? Math.min(99, Math.round(Number(hero.rating) * 10 + 8)) : 97;

  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      <div
        className="absolute inset-0 animate-kenburns bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      />
      <div className="absolute inset-0 bg-hero-left" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/40 to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-end px-4 py-24 sm:px-6 lg:min-h-[80vh] lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl space-y-5"
        >
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-black/55 py-1.5 pl-2.5 pr-4 text-xs font-bold uppercase tracking-[0.3em] text-white backdrop-blur-sm">
              <NetflixLogo className="h-5 w-5" cutoutColor="#000" />
              Series
            </span>
            <span className="hidden items-center rounded-md border border-white/15 bg-black/55 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm sm:inline-flex">
              <span className="mr-1.5 font-black text-slate-300">HD</span> 5.1
            </span>
          </motion.div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex h-[74px] w-16 shrink-0 flex-col items-center justify-center rounded-md bg-netflix shadow-glow-red"
            >
              <span className="text-4xl font-black leading-none text-white">10</span>
              <span className="text-[9px] font-black tracking-[0.15em] text-white">TOP 10</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] sm:text-6xl lg:text-7xl"
            >
              {hero?.title || 'Featured Movie Title'}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="max-w-xl text-sm leading-6 text-slate-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-base"
          >
            {hero?.description || 'Watch the latest Netflix feature with an immersive story, dramatic scores, and premium cinematic style.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            <button
              onClick={() => document.getElementById('browse-rows')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-md bg-netflix px-7 py-2.5 text-base font-bold text-white transition-all duration-200 hover:bg-netflix-hover hover:shadow-glow-red-lg active:scale-[0.98]"
            >
              <BsFillPlayFill className="h-6 w-6" />
              Play
            </button>
            <button
              onClick={() => document.getElementById('browse-rows')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-slate-500/40 px-7 py-2.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-slate-400/40 active:scale-[0.98]"
            >
              <AiOutlineInfoCircle className="h-6 w-6" />
              More Info
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="pt-2 text-sm font-medium text-emerald-400"
          >
            {match}% Match · {hero?.year || '2025'} · {hero?.maturity || '16+'} · {hero?.runtime || 120} min
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
