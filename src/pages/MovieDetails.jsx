import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    document.title = movie ? `${movie.title} | Netflix` : 'Movie Details';
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
          <h1 className="text-3xl font-semibold">Movie not found</h1>
          <p className="mt-3 text-sm text-slate-400">Please return to the homepage and choose a different title.</p>
          <button onClick={() => navigate('/browse')} className="mt-8 rounded-3xl bg-netflix px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#f40612]">
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar profile={getSelectedProfile()} onLogout={() => navigate('/login')} />

      <section className="relative min-h-[80vh] overflow-hidden bg-black/30">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />

        <div className="relative mx-auto flex max-w-7xl flex-col justify-end px-4 pb-20 pt-24 sm:px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm uppercase tracking-[0.25em] text-white/80">
              {movie.maturity}
              <span className="hidden sm:inline">•</span>
              <span>{movie.year}</span>
              <span className="hidden sm:inline">•</span>
              <span>{movie.runtime}m</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{movie.title}</h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">{movie.description}</p>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={handleWatchNow} className="inline-flex items-center gap-2 rounded-3xl bg-netflix px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#f40612]">
                Watch Now
              </button>
              <button onClick={() => navigate('/browse')} className="inline-flex items-center gap-2 rounded-3xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/15">
                Back to Browse
              </button>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              <span>{movie.genres.join(' · ')}</span>
              <span>{movie.languages.join(', ')}</span>
              <span>{movie.rating} Rating</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-netflix">
            <h2 className="text-xl font-semibold">Synopsis</h2>
            <p className="leading-7 text-slate-300">{movie.description}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Runtime</p>
                <p className="mt-2 text-lg font-semibold">{movie.runtime} mins</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Rating</p>
                <p className="mt-2 text-lg font-semibold">{movie.rating}</p>
              </div>
            </div>
          </div>

          <div className="space-y-5 rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-netflix">
            <h3 className="text-lg font-semibold">What to expect</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>• Cinematic visuals with deep drama and suspense.</li>
              <li>• Designed for the full Netflix-style homepage experience.</li>
              <li>• Checkout uses the existing webhook demo order flow.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
