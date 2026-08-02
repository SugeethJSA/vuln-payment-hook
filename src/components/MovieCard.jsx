import { useNavigate } from 'react-router-dom';
import { BsFillPlayFill, BsChevronDown } from 'react-icons/bs';
import { HiPlus, HiThumbUp } from 'react-icons/hi';

export default function MovieCard({ movie, landscape = false }) {
  const imageUrl = movie.poster || movie.image || movie.poster_path || 'https://via.placeholder.com/300x450?text=Movie';
  const navigate = useNavigate();
  const match = movie.rating ? Math.min(99, Math.round(Number(movie.rating) * 10 + 8)) : 95;

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className={`group/card relative shrink-0 cursor-pointer transition-all duration-300 ease-out hover:z-20 hover:scale-[1.3] hover:shadow-[0_20px_50px_rgba(0,0,0,0.85)] ${
        landscape ? 'w-[260px] sm:w-[300px]' : 'w-[170px] sm:w-[190px]'
      }`}
      style={{ transformOrigin: 'center bottom' }}
    >
      <div className="relative overflow-hidden rounded-md bg-slate-900">
        <img
          src={imageUrl}
          alt={movie.title || movie.name}
          className={`w-full object-cover transition-transform duration-500 group-hover/card:scale-105 ${
            landscape ? 'aspect-video' : 'aspect-[2/3]'
          }`}
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent ${landscape ? 'opacity-90' : 'opacity-80'}`} />

        <div className="absolute inset-x-0 bottom-0 px-3 pb-2.5">
          <p className="line-clamp-1 text-sm font-semibold text-white drop-shadow">
            {movie.title || movie.name}
          </p>
          {landscape && movie.progress !== undefined && (
            <p className="mt-0.5 text-[10px] font-medium text-slate-300">
              {movie.progress}% watched
            </p>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/25">
          <div
            className="h-full bg-netflix transition-all duration-500"
            style={{ width: `${Math.min(100, movie.progress ?? 0)}%` }}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute left-0 right-0 top-full z-10 overflow-hidden rounded-md bg-surface shadow-[0_20px_50px_rgba(0,0,0,0.9)] opacity-0 transition-all duration-300 ease-out group-hover/card:opacity-100">
        <div className="p-3">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/movie/${movie.id}`); }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition hover:bg-slate-200"
              aria-label="Play"
            >
              <BsFillPlayFill className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-black/50 text-white transition hover:border-white hover:bg-white/10"
              aria-label="My List"
            >
              <HiPlus className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-black/50 text-white transition hover:border-white hover:bg-white/10"
              aria-label="Like"
            >
              <HiThumbUp className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/movie/${movie.id}`); }}
              className="ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-black/50 text-white transition hover:border-white hover:bg-white/10"
              aria-label="More info"
            >
              <BsChevronDown className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 space-y-1.5 text-[11px] leading-4">
            <div className="flex flex-wrap items-center gap-2 font-medium">
              <span className="text-emerald-400">{match}% Match</span>
              {movie.maturity && (
                <span className="rounded-sm border border-white/40 px-1.5 text-[10px] text-slate-300">
                  {movie.maturity}
                </span>
              )}
              {movie.runtime && <span className="text-slate-300">{movie.runtime} min</span>}
            </div>
            {movie.genres && (
              <p className="line-clamp-2 text-slate-300">
                {movie.genres.join(' · ')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
