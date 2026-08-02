import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { getSelectedProfile } from '../utils/session';
import { findMovieById } from '../data/streamingData';
import Navbar from '../components/Navbar';
import LoadingScreen from '../components/LoadingScreen';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = movie ? `${movie.title} | Netflix` : 'Netflix';
  }, [movie]);

  useEffect(() => {
    const selectedMovie = findMovieById(id);
    setMovie(selectedMovie);
    setLoading(false);
  }, [id]);

  const handleWatchNow = async () => {
    if (!movie) return;

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId: movie.id, plan: 'standard' })
      });

      const data = await response.json();
      if (!data.order_id) {
        throw new Error('Order creation failed');
      }

      navigate(`/checkout/${movie.id}?orderId=${data.order_id}`);
    } catch (err) {
      console.error(err);
      setError('Unable to create order. Please try again.');
      setSubmitting(false);
    }
  };

  if (!getSelectedProfile()) {
    navigate('/profiles', { replace: true });
    return null;
  }

  if (loading) return <LoadingScreen />;

  if (!movie) {
    return (
      <div className="min-h-screen bg-background text-white">
        <Navbar profile={getSelectedProfile()} onLogout={() => navigate('/login')} />
        <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-4 text-center text-white sm:px-6">
          <h1 className="text-3xl font-semibold">Title not found</h1>
          <p className="mt-3 text-sm text-slate-400">Please return to the homepage and choose a different title.</p>
          <button onClick={() => navigate('/browse')} className="mt-8 rounded-md bg-netflix px-6 py-3 text-sm font-semibold text-white transition hover:bg-netflix-hover">
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  const match = movie.rating ? Math.min(99, Math.round(Number(movie.rating) * 10 + 8)) : 97;

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar profile={getSelectedProfile()} onLogout={() => navigate('/login')} />

      <section className="relative min-h-[85vh] overflow-hidden">
        <div
          className="absolute inset-0 animate-kenburns bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />

        <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-6"
          >
            <button
              onClick={() => navigate('/browse')}
              className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-black/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 backdrop-blur-sm transition hover:border-white hover:text-white"
            >
              <HiOutlineArrowLeft className="h-4 w-4" />
              Back to Browse
            </button>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-sm border border-white/50 px-2 py-0.5 text-xs font-semibold text-white">
                {movie.maturity}
              </span>
              <span className="font-medium text-slate-200">{movie.year}</span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span className="font-medium text-slate-200">{movie.runtime} min</span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span className="font-semibold text-emerald-400">{match}% Match</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] sm:text-6xl lg:text-7xl">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-lg font-medium italic text-slate-100">{movie.tagline}</p>
            )}

            <p className="max-w-xl text-sm leading-7 text-slate-200 sm:text-base">{movie.description}</p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={handleWatchNow}
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-md bg-netflix px-8 py-3 text-base font-bold text-white transition-all duration-200 hover:bg-netflix-hover hover:shadow-glow-red-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <BsFillPlayFill className="h-6 w-6" />
                {submitting ? 'Starting...' : 'Watch Now'}
              </button>
              <button
                onClick={() => navigate('/browse')}
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-slate-500/40 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-slate-400/40 active:scale-[0.98]"
              >
                More Info
              </button>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <div className="flex flex-wrap items-center gap-2 pt-2 text-sm text-slate-300">
              <span className="font-semibold uppercase tracking-[0.2em] text-slate-500">Genres</span>
              {movie.genres.map((genre) => (
                <span key={genre} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                  {genre}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-6 px-4 pb-16 sm:px-6 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 rounded-md border border-white/10 bg-surface p-8"
          >
            <h2 className="text-xl font-bold text-white">Synopsis</h2>
            <p className="leading-7 text-slate-300">{movie.description}</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-md bg-slate-800/60 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Runtime</p>
                <p className="mt-2 text-lg font-semibold">{movie.runtime} min</p>
              </div>
              <div className="rounded-md bg-slate-800/60 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Rating</p>
                <p className="mt-2 text-lg font-semibold">{movie.rating} / 10</p>
              </div>
              <div className="rounded-md bg-slate-800/60 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Languages</p>
                <p className="mt-2 text-sm font-semibold leading-6">{movie.languages.join(', ')}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8 rounded-md border border-white/10 bg-surface p-8 text-sm leading-6"
          >
            <div>
              <h3 className="mb-2 font-bold text-white">Cast</h3>
              <p className="text-slate-400">{movie.cast ? movie.cast.join(', ') : '—'}</p>
            </div>
            <div>
              <h3 className="mb-2 font-bold text-white">Genres</h3>
              <p className="text-slate-400">{movie.genres.join(', ')}</p>
            </div>
            <div>
              <h3 className="mb-2 font-bold text-white">This movie is</h3>
              <p className="text-slate-400">{movie.genres.map((g) => g.toLowerCase()).join(', ')}</p>
            </div>
            <div>
              <h3 className="mb-2 font-bold text-white">Languages</h3>
              <p className="text-slate-400">{movie.languages.join(', ')}</p>
            </div>
            <div>
              <h3 className="mb-2 font-bold text-white">Audio</h3>
              <p className="text-slate-400">{movie.languages.join(', ')} [Original]</p>
            </div>
            <div>
              <h3 className="mb-2 font-bold text-white">Subtitles</h3>
              <p className="text-slate-400">{movie.languages.join(', ')} [CC]</p>
            </div>

            <div className="rounded-md border border-white/15 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                Maturity rating
              </p>
              <p className="mt-1.5 text-base font-bold text-white">{movie.maturity}</p>
              <p className="mt-1 text-xs text-slate-500">
                {Number(movie.maturity.replace('+', '')) >= 16
                  ? 'Graphic violence, strong language, and mature themes.'
                  : 'Some language, mild violence, and suggestive content.'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
