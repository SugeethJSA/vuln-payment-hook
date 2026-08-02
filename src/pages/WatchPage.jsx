import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiOutlineArrowLeft, HiOutlineBadgeCheck } from 'react-icons/hi';
import { getSelectedProfile } from '../utils/session';
import { findMovieById } from '../data/streamingData';
import Navbar from '../components/Navbar';
import LoadingScreen from '../components/LoadingScreen';

export default function WatchPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [orderId, setOrderId] = useState(location.state?.orderId || new URLSearchParams(location.search).get('orderId'));
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getSelectedProfile()) {
      navigate('/profiles', { replace: true });
      return;
    }

    const selectedMovie = findMovieById(id);
    setMovie(selectedMovie);
  }, [id, navigate]);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    async function fetchStatus() {
      try {
        const response = await fetch(`/api/order/${orderId}`);
        const data = await response.json();
        setStatus(data.status);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchStatus();
  }, [orderId]);

  useEffect(() => {
    if (!loading && orderId && status !== 'PAID' && movie) {
      navigate(`/checkout/${movie.id}?orderId=${orderId}`, { state: { movieId: movie.id, orderId } });
    }
  }, [loading, orderId, status, navigate, id, movie]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-background text-white">
        <Navbar profile={getSelectedProfile()} onLogout={() => navigate('/profiles')} />
        <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-4 text-center text-white sm:px-6">
          <h1 className="text-3xl font-semibold">Movie not found</h1>
          <button onClick={() => navigate('/browse')} className="mt-8 rounded-md bg-netflix px-6 py-3 text-sm font-semibold text-white transition hover:bg-netflix-hover">
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (!orderId) {
    navigate(`/movie/${id}`, { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar profile={getSelectedProfile()} onLogout={() => navigate('/login')} />

      <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => navigate('/browse')}
              className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 transition hover:border-white hover:text-white"
            >
              <HiOutlineArrowLeft className="h-4 w-4" />
              Back to Browse
            </button>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
              <HiOutlineBadgeCheck className="h-4 w-4" />
              Unlocked
            </span>
          </div>

          <div className="group relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-[0_30px_80px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
            <div
              className="absolute inset-0 scale-105 bg-cover bg-center opacity-70 blur-[2px] transition-all duration-700 group-hover:scale-100 group-hover:opacity-90"
              style={{ backgroundImage: `url(${movie.backdrop})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-24 w-24 items-center justify-center rounded-full bg-netflix shadow-glow-red-lg"
              >
                <BsFillPlayFill className="h-12 w-12 text-white" />
              </motion.div>
              <p className="text-sm uppercase tracking-[0.4em] text-white/80">Now Playing</p>
            </div>

            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {movie.maturity} · {movie.year} · {movie.runtime} min
                </p>
                <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">{movie.title}</h1>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-emerald-400">
                  {movie.rating ? Math.min(99, Math.round(Number(movie.rating) * 10 + 8)) : 97}% Match
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4 rounded-lg border border-white/10 bg-surface p-6">
              <h2 className="text-lg font-bold">Enjoy the movie</h2>
              <p className="text-sm leading-6 text-slate-300">
                Your payment for <span className="font-semibold text-white">{movie.title}</span> was
                confirmed via webhook. The title is unlocked and ready to stream.
              </p>
              <p className="flex items-start gap-2 rounded-md border border-netflix/30 bg-netflix/10 p-3 text-xs leading-5 text-slate-300">
                <HiOutlineBadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-netflix" />
                In this demo, this screen only unlocks after the payment webhook flips the order
                from PENDING to PAID.
              </p>
            </div>

            <div className="h-fit rounded-lg border border-white/10 bg-surface p-6">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">Order reference</p>
              <p className="mt-2 break-all font-mono text-sm text-slate-200">{orderId}</p>
              <p className="mt-3 text-xs text-slate-500">
                Status confirmed at render time.
              </p>
              <button
                onClick={() => navigate(`/movie/${id}`)}
                className="mt-5 w-full rounded-md bg-white/10 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Play Trailer
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
