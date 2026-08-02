import { BsFillPlayFill, BsChevronDown } from 'react-icons/bs';
import { HiPlus, HiThumbUp } from 'react-icons/hi';

export default function MovieCard({ movie, landscape = false }) {
  const imageUrl = movie.poster || movie.image || movie.poster_path || 'https://via.placeholder.com/300x450?text=Movie';
  const match = movie.rating ? Math.min(99, Math.round(Number(movie.rating) * 10 + 8)) : 95;

  const handleOpenModal = (e) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('netflix-open-modal', { detail: { id: movie.id } }));
  };

  return (
    <div
      onClick={handleOpenModal}
      className={`group/card relative shrink-0 cursor-pointer transition-all duration-300 ease-out hover:z-50 hover:scale-[1.22] hover:shadow-[0_25px_60px_rgba(0,0,0,0.95)] ${
        landscape ? 'w-[230px] sm:w-[270px]' : 'w-[145px] sm:w-[170px]'
      }`}
      style={{ transformOrigin: 'center center' }}
    >
      {/* Base Sharp Rectangular Poster Container */}
      <div className="relative overflow-hidden bg-slate-900 border border-white/10 shadow-md transition-all duration-300 group-hover/card:border-white/30">
        <img
          src={imageUrl}
          alt={movie.title || movie.name}
          className={`w-full object-cover transition-transform duration-500 group-hover/card:scale-105 ${
            landscape ? 'aspect-video' : 'aspect-[2/3]'
          }`}
          loading="lazy"
        />

        {/* Gradient Overlay for Base Title */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-2.5 pt-6 transition-opacity duration-300 group-hover/card:opacity-0">
          <p className="line-clamp-1 text-xs font-bold text-white drop-shadow sm:text-sm">
            {movie.title || movie.name}
          </p>
          {landscape && movie.progress !== undefined && (
            <p className="mt-0.5 text-[10px] font-semibold text-slate-300">
              {movie.progress}% watched
            </p>
          )}
        </div>

        {/* Progress Bar for Continue Watching */}
        {landscape && movie.progress !== undefined && (
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/25">
            <div
              className="h-full bg-netflix transition-all duration-500"
              style={{ width: `${Math.min(100, movie.progress ?? 0)}%` }}
            />
          </div>
        )}
      </div>

      {/* Popover Card Action Menu Below the Poster */}
      <div className="pointer-events-none absolute left-0 right-0 top-full z-50 overflow-hidden border-x border-b border-white/20 bg-[#181818] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.95)] opacity-0 transition-all duration-300 ease-out group-hover/card:pointer-events-auto group-hover/card:opacity-100">
        {/* Title in Popover */}
        <p className="line-clamp-1 text-xs font-extrabold text-white mb-2 sm:text-sm drop-shadow-md">
          {movie.title || movie.name}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <button
            onClick={handleOpenModal}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition hover:bg-slate-200 active:scale-95 shadow-md"
            aria-label="Play"
          >
            <BsFillPlayFill className="h-4 w-4 ml-0.5" />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/40 bg-[#2a2a2a]/80 text-white transition hover:border-white hover:bg-white/20 active:scale-95"
            aria-label="My List"
          >
            <HiPlus className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/40 bg-[#2a2a2a]/80 text-white transition hover:border-white hover:bg-white/20 active:scale-95"
            aria-label="Like"
          >
            <HiThumbUp className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleOpenModal}
            className="ml-auto flex h-7 w-7 items-center justify-center rounded-full border border-white/40 bg-[#2a2a2a]/80 text-white transition hover:border-white hover:bg-white/20 active:scale-95"
            aria-label="More info"
          >
            <BsChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Card Metadata */}
        <div className="space-y-0.5 text-[10px] leading-tight">
          <div className="flex flex-wrap items-center gap-1.5 font-bold">
            <span className="text-emerald-400 font-extrabold">{match}% Match</span>
            {movie.maturity && (
              <span className="border border-white/40 px-1 py-0.2 text-[9px] font-semibold text-slate-300">
                {movie.maturity}
              </span>
            )}
            <span className="border border-white/30 px-1 py-0.2 text-[9px] font-semibold text-slate-400">HD</span>
          </div>
          {movie.genres && (
            <p className="line-clamp-1 text-slate-300 font-medium text-[9.5px] pt-0.5">
              {movie.genres.join(' · ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
