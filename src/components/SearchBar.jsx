export default function SearchBar({ value, onChange }) {
  return (
    <div className="mx-auto mb-8 max-w-4xl rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 shadow-xl shadow-black/30 sm:px-5">
      <label className="flex items-center gap-3">
        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Search</span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search for movies, shows, genres..."
          className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
        />
      </label>
    </div>
  );
}
