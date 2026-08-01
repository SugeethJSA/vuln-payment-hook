import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen items-center justify-center bg-background px-6"
    >
      <div className="space-y-3 text-center">
        <div className="h-20 w-20 animate-pulse rounded-full bg-slate-700"></div>
        <div className="space-y-2">
          <div className="mx-auto h-4 w-40 animate-pulse rounded-full bg-slate-700"></div>
          <div className="mx-auto h-4 w-32 animate-pulse rounded-full bg-slate-700"></div>
        </div>
      </div>
    </motion.div>
  );
}
