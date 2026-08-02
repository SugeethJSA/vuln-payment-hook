import { HiOutlineSearch, HiX } from 'react-icons/hi';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative mx-auto mb-8 flex max-w-2xl items-center gap-3 rounded-md border border-white/20 bg-black/60 px-4 py-2.5 backdrop-blur-sm transition-all duration-300 focus-within:border-white/60 focus-within:shadow-[0_0_0_1px_rgba(255,255,255,0.2)]">
      <HiOutlineSearch className="h-5 w-5 shrink-0 text-slate-400 transition-colors focus-within:text-white" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search for movies, shows, genres..."
        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="shrink-0 rounded-full p-1 text-slate-400 transition-colors hover:text-white"
        >
          <HiX className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
