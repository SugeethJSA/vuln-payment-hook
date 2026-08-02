import { useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import MovieCard from './MovieCard';

const TOP10_LIMIT = 10;
const ITEMS_PER_PAGE = 5;

export default function MovieRow({ title, movies = [], category = '' }) {
  const [pageIndex, setPageIndex] = useState(0);
  const isTop10 = category === 'top_movies' || category === 'top_shows' || category === 'trending';
  const isContinue = category === 'continue';

  const totalItems = isTop10 ? Math.min(movies.length, TOP10_LIMIT) : movies.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  const handlePrev = () => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setPageIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <div className="group/row relative mb-8 sm:mb-12 z-10 hover:z-30">
      {/* Row Header with Title & Page Indicators */}
      <div className="mb-3 flex items-center justify-between px-4 sm:px-12">
        <h2 className="group/title flex items-center gap-2 text-lg font-extrabold tracking-wide text-slate-100 transition-colors duration-200 group-hover/row:text-white sm:text-xl md:text-2xl">
          <span>{title}</span>
          <span className="text-xs font-bold text-netflix opacity-0 transition-opacity duration-300 group-hover/title:opacity-100">
            Explore all &rsaquo;
          </span>
        </h2>

        {/* Carousel Page Indicators */}
        {totalPages > 1 && (
          <div className="hidden items-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover/row:flex">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <div
                key={idx}
                className={`h-[2px] transition-all duration-300 ${
                  idx === pageIndex ? 'w-4 bg-netflix' : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Row Track Wrapper with Overflow Visible */}
      <div className="relative px-4 sm:px-12 overflow-visible">
        {/* Left Arrow Button */}
        {totalPages > 1 && (
          <button
            onClick={handlePrev}
            aria-label="See previous titles"
            className="absolute left-0 top-0 bottom-0 z-40 hidden w-10 sm:w-12 items-center justify-center bg-black/75 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/90 group-hover/row:flex group-hover/row:opacity-100"
          >
            <HiChevronLeft className="h-9 w-9 text-white drop-shadow-md" />
          </button>
        )}

        {/* Right Arrow Button */}
        {totalPages > 1 && (
          <button
            onClick={handleNext}
            aria-label="See more titles"
            className="absolute right-0 top-0 bottom-0 z-40 hidden w-10 sm:w-12 items-center justify-center bg-black/75 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/90 group-hover/row:flex group-hover/row:opacity-100"
          >
            <HiChevronRight className="h-9 w-9 text-white drop-shadow-md" />
          </button>
        )}

        {/* Transform Slider Track */}
        <div className="overflow-visible">
          <div
            className="flex gap-4 sm:gap-6 transition-transform duration-500 ease-out py-3"
            style={{ transform: `translateX(-${pageIndex * 100}%)` }}
          >
            {movies.length === 0
              ? Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="w-[160px] shrink-0 sm:w-[200px]">
                    <div className="netflix-shimmer aspect-[2/3] w-full bg-slate-800" />
                  </div>
                ))
              : movies.slice(0, isTop10 ? TOP10_LIMIT : undefined).map((movie, index) =>
                  isTop10 ? (
                    <div key={movie.id || movie.title} className="relative flex shrink-0 items-center overflow-visible">
                      <span
                        className="-mr-5 select-none font-black text-transparent opacity-80 transition-all duration-300 hover:opacity-100"
                        style={{
                          fontSize: '9rem',
                          lineHeight: '0.8',
                          WebkitTextStroke: '4px #595959',
                          textShadow: '0 4px 30px rgba(0,0,0,0.95)'
                        }}
                      >
                        {index + 1}
                      </span>
                      <div className="w-[135px] shrink-0 sm:w-[165px] overflow-visible">
                        <MovieCard movie={movie} />
                      </div>
                    </div>
                  ) : (
                    <div key={movie.id || movie.title} className="shrink-0 overflow-visible">
                      <MovieCard movie={movie} landscape={isContinue} />
                    </div>
                  )
                )}
          </div>
        </div>
      </div>
    </div>
  );
}
