import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
          <button onClick={() => navigate('/browse')} className="mt-8 rounded-3xl bg-netflix px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#f40612]">
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
    <div className="min-h-screen bg-background text-white">
      <Navbar profile={getSelectedProfile()} onLogout={() => navigate('/profiles')} />
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-12">
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-10 shadow-netflix text-center">
          <span className="inline-flex rounded-full bg-netflix/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-netflix">Now Playing</span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white">{movie.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300">Your payment is confirmed. The movie is unlocked and ready to stream.</p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button onClick={() => navigate('/browse')} className="rounded-3xl bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
              Back to Browse
            </button>
            <button onClick={() => navigate(`/movie/${id}`)} className="rounded-3xl border border-white/10 bg-netflix px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#f40612]">
              Play Trailer
            </button>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-netflix">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div>
              <h2 className="text-xl font-semibold">Enjoy the movie</h2>
              <p className="mt-4 text-slate-300">This page is unlocked because payment for the selected movie was confirmed. Use the button above to return to browse or play additional content.</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-5 text-sm text-slate-300">
              <p className="font-semibold text-white">Order ID</p>
              <p className="mt-2 break-all font-mono text-slate-200">{orderId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
