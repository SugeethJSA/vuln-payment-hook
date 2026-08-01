import { motion } from 'framer-motion';
import { AiOutlinePlus, AiOutlineInfoCircle } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const imageUrl = movie.poster || movie.image || movie.poster_path || 'https://via.placeholder.com/300x450?text=Movie';
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      whileHover={{ y: -10, scale: 1.06 }}
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="relative min-w-[170px] max-w-[170px] cursor-pointer overflow-hidden rounded-3xl border border-white/5 bg-slate-900 transition duration-300 hover:shadow-hoverCard"
    >
      <img src={imageUrl} alt={movie.title || movie.name} className="h-48 w-full object-cover transition duration-500" />
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 flex flex-col justify-between bg-black/40 p-4 opacity-0 transition duration-300"
      >
        <div className="flex items-center gap-2">
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:bg-slate-200">
            <BsFillPlayFill />
          </button>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-black/50 text-white transition hover:border-white">
            <AiOutlinePlus />
          </button>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-black/50 text-white transition hover:border-white">
            <AiOutlineInfoCircle />
          </button>
        </div>
        <div className="space-y-2 text-sm text-white/90">
          <div className="flex flex-wrap items-center gap-2 text-[0.78rem]">
            {movie.runtime && <span>{movie.runtime}m</span>}
            {movie.age_rating && <span className="rounded-sm border border-white/30 px-2 py-0.5">{movie.age_rating}</span>}
          </div>
          <p className="line-clamp-3 text-[0.82rem] text-slate-100">{movie.genres?.join(' · ') || movie.genre || movie.category || ''}</p>
        </div>
      </motion.div>
    </motion.button>
  );
}
