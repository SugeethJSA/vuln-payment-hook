import { useRef } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import MovieCard from './MovieCard';

const TOP10_LIMIT = 10;

export default function MovieRow({ title, movies = [], category = '' }) {
  const scrollerRef = useRef(null);
  const isTop10 = category === 'trending';
  const isContinue = category === 'continue';

  const scrollByAmount = (direction) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector('[data-card]');
    const width = card ? card.offsetWidth + 12 : 300;
    scroller.scrollBy({ left: direction * width * 3, behavior: 'smooth' });
  };

  return (
    <div className="group/row relative">
      <h2 className="mb-3 px-1 text-lg font-semibold text-slate-100 transition-colors duration-200 group-hover/row:text-white sm:px-2">
        {title}
      </h2>

      <div className="relative">
        <button
          onClick={() => scrollByAmount(-1)}
          aria-label="Scroll left"
          className="absolute -left-1 top-1/2 z-30 hidden h-24 w-12 -translate-y-1/2 items-center justify-center rounded-md bg-black/60 opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/80 hover:text-netflix group-hover/row:flex group-hover/row:opacity-100 lg:-left-4"
        >
          <HiChevronLeft className="h-8 w-8" />
        </button>
        <button
          onClick={() => scrollByAmount(1)}
          aria-label="Scroll right"
          className="absolute -right-1 top-1/2 z-30 hidden h-24 w-12 -translate-y-1/2 items-center justify-center rounded-md bg-black/60 opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/80 hover:text-netflix group-hover/row:flex group-hover/row:opacity-100 lg:-right-4"
        >
          <HiChevronRight className="h-8 w-8" />
        </button>

        <div
          ref={scrollerRef}
          className="flex gap-3 overflow-x-auto px-1 pb-4 pt-2 scrollbar-none scroll-smooth sm:px-2"
        >
          {movies.length === 0
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="w-[170px] shrink-0 sm:w-[190px]">
                  <div className="netflix-shimmer aspect-[2/3] w-full rounded-md bg-slate-800" />
                </div>
              ))
            : movies.slice(0, isTop10 ? TOP10_LIMIT : undefined).map((movie, index) =>
                isTop10 ? (
                  <div key={movie.id || movie.title} data-card className="flex items-center">
                    <span
                      className="-mr-5 shrink-0 select-none text-[6.5rem] font-black leading-none text-transparent transition-colors duration-300 hover:text-[#5c5c5c] sm:text-[8rem]"
                      style={{ WebkitTextStroke: '2px #595959', textShadow: '0 4px 24px rgba(0,0,0,0.6)' }}
                    >
                      {index + 1}
                    </span>
                    <div className="w-[104px] shrink-0 sm:w-[120px]">
                      <MovieCard movie={movie} />
                    </div>
                  </div>
                ) : (
                  <div key={movie.id || movie.title} data-card>
                    <MovieCard movie={movie} landscape={isContinue} />
                  </div>
                )
              )}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent" />
      </div>
    </div>
  );
}
