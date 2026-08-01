import { motion } from 'framer-motion';

export default function HeroBanner({ hero }) {
  const background = hero?.backdrop || 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1600&q=80';

  return (
    <section className="relative min-h-[75vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      />
      <div className="absolute inset-0 bg-hero-left" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-hero-fade" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-end px-4 py-20 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl space-y-6"
        >
          {hero?.maturity && (
            <span className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-black/50 px-3 py-1 text-sm uppercase tracking-[0.2em] text-white/90">
              {hero.maturity}
            </span>
          )}
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
            {hero?.title || 'Featured Movie Title'}
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-200/95 md:text-base">
            {hero?.description || 'Watch the latest Netflix feature with an immersive story, dramatic scores, and premium cinematic style.'}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-slate-100">
              Play
            </button>
            <button className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-black/60 px-5 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10">
              More Info
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
