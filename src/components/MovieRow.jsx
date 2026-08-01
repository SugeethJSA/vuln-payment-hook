import { motion } from 'framer-motion';
import MovieCard from './MovieCard';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export default function MovieRow({ title, movies = [] }) {
  return (
    <div className="group relative">
      <div className="mb-4 flex items-center justify-between px-1 sm:px-2">
        <h2 className="text-lg font-semibold tracking-wide text-white">{title}</h2>
        <div className="hidden items-center gap-2 text-white/70 transition group-hover:flex">
          <button className="rounded-full bg-black/60 p-2 hover:bg-white/10"><HiChevronLeft className="h-5 w-5" /></button>
          <button className="rounded-full bg-black/60 p-2 hover:bg-white/10"><HiChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1 pl-1 pr-3 scrollbar-none scroll-smooth">
        {movies.length === 0 ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-48 min-w-[170px] rounded-3xl bg-slate-800/90" />
          ))
        ) : (
          movies.map((movie) => <MovieCard key={movie.id || movie.title} movie={movie} />)
        )}
      </div>
    </div>
  );
}
