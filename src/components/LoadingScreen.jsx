import { motion } from 'framer-motion';
import NetflixLogo from './NetflixLogo';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-glow-radial" />
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative"
      >
        <NetflixLogo className="h-28 w-28 animate-pulse-glow drop-shadow-2xl" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="logo-3d mt-8 select-none text-xl font-black tracking-[0.45em] text-white"
      >
        NETFLIX
      </motion.p>
      <div className="mt-8 h-[3px] w-44 overflow-hidden rounded-full bg-white/10">
        <div className="netflix-shimmer h-full w-full rounded-full" />
      </div>
    </motion.div>
  );
}
