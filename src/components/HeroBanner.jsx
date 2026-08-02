import { motion } from 'framer-motion';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import NetflixLogo from './NetflixLogo';

export default function HeroBanner({ hero }) {
  const background = hero?.backdrop || 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1600&q=80';
  const match = hero?.rating ? Math.min(99, Math.round(Number(hero.rating) * 10 + 8)) : 97;

  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden bg-[#141414]">
      {/* Background Image */}
      <div
        className="absolute inset-0 animate-kenburns bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      />

      {/* Vignette & Gradient Overlays */}
      <div className="absolute inset-0 bg-hero-left" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-end px-4 pb-36 pt-28 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl space-y-6"
        >
          {/* Top Badges */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 text-xs"
          >
            <span className="inline-flex items-center gap-2 rounded-sm border border-white/20 bg-black/60 px-3 py-1 font-bold uppercase tracking-[0.25em] text-white backdrop-blur-md">
              <NetflixLogo className="h-4 w-4" cutoutColor="#000" />
              Series
            </span>
            {hero?.episodes && (
              <span className="inline-flex items-center rounded-sm border border-white/20 bg-black/60 px-3 py-1 font-bold text-slate-200 backdrop-blur-md">
                {hero.episodes}
              </span>
            )}
            <span className="hidden items-center rounded-sm border border-white/20 bg-black/60 px-3 py-1 font-bold text-white backdrop-blur-md sm:inline-flex">
              <span className="mr-1.5 font-black text-slate-300">HD</span> 5.1
            </span>
          </motion.div>

          {/* Top 10 Badge & Title */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex h-[68px] w-14 shrink-0 flex-col items-center justify-center rounded bg-netflix shadow-glow-red"
            >
              <span className="text-3xl font-black leading-none text-white">10</span>
              <span className="text-[8px] font-black tracking-[0.15em] text-white">TOP 10</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl font-black tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] sm:text-6xl lg:text-7xl"
            >
              {hero?.title || 'Super Subbu'}
            </motion.h1>
          </div>

          {/* Description Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="max-w-xl text-sm leading-relaxed text-slate-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] sm:text-base"
          >
            {hero?.description || 'Faced with an ultimatum to get a job before marrying his girlfriend, Subbu risks his conservative father\'s anger by teaching sex ed in a hostile village.'}
          </motion.p>

          {/* Languages & Match Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300"
          >
            <span className="rounded bg-white/10 px-2.5 py-1 backdrop-blur-sm">In Tel, Tam, Hin, Mal, Kan</span>
            <span className="rounded bg-red-600/30 px-2.5 py-1 text-netflix border border-red-500/30">
              We think you'll love this!
            </span>
            <span className="font-extrabold text-emerald-400">{match}% Match</span>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('netflix-open-modal', { detail: { id: hero?.id || 'super-subbu' } }))}
              className="inline-flex items-center gap-2 rounded bg-white px-8 py-3 text-base font-bold text-black transition-all duration-200 hover:bg-slate-200 active:scale-95 shadow-lg"
            >
              <BsFillPlayFill className="h-6 w-6" />
              Play
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('netflix-open-modal', { detail: { id: hero?.id || 'super-subbu' } }))}
              className="inline-flex items-center gap-2 rounded border border-white/30 bg-slate-500/40 px-8 py-3 text-base font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-slate-400/40 active:scale-95 shadow-lg"
            >
              <AiOutlineInfoCircle className="h-6 w-6" />
              More Info
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
