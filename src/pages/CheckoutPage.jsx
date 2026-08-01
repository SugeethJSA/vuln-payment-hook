import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getSelectedProfile } from '../utils/session';
import { findMovieById } from '../data/streamingData';
import Navbar from '../components/Navbar';

const plans = [
  { id: 'basic', name: 'Basic', price: 4.99, quality: 'SD', screens: '1 screen' },
  { id: 'standard', name: 'Standard', price: 9.99, quality: 'HD', screens: '2 screens' },
  { id: 'premium', name: 'Premium', price: 15.99, quality: '4K', screens: '4 screens' }
];

export default function CheckoutPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(location.state?.selectedPlan || plans[1]);
  const [orderId, setOrderId] = useState(location.state?.orderId || new URLSearchParams(location.search).get('orderId'));
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const selectedMovie = findMovieById(id);
    setMovie(selectedMovie);
  }, [id]);

  useEffect(() => {
    if (movie) {
      document.title = `Checkout • ${movie.title}`;
    }
  }, [movie]);

  useEffect(() => {
    if (!orderId) {
      return;
    }

    async function loadOrder() {
      try {
        const response = await axios.get(`/api/order/${orderId}`);
        setOrder(response.data);
      } catch (err) {
        console.error(err);
        setError('Unable to load order details.');
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [orderId]);

  if (!getSelectedProfile()) {
    navigate('/profiles', { replace: true });
    return null;
  }

  if (!orderId) {
    navigate(`/movie/${id}`, { replace: true });
    return null;
  }

  if (loading) return <div className="min-h-screen bg-background text-white"><Navbar profile={getSelectedProfile()} onLogout={() => navigate('/login')} /><div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-4">Loading checkout...</div></div>;
  if (!movie) {
    return (
      <div className="min-h-screen bg-background text-white">
        <Navbar profile={getSelectedProfile()} onLogout={() => navigate('/login')} />
        <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-4 text-center">
          <h1 className="text-3xl font-semibold">Movie not found</h1>
          <button onClick={() => navigate('/browse')} className="mt-8 rounded-3xl bg-netflix px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#f40612]">
            Return to Browse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar profile={getSelectedProfile()} onLogout={() => navigate('/login')} />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-12">
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-netflix">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Complete Payment</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">{movie.title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">Choose the plan that unlocks this movie and complete checkout using the existing webhook demo backend.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-netflix">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Selected movie</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">{movie.title}</h2>
              </div>
              <div className="rounded-3xl bg-white/5 px-4 py-2 text-sm text-slate-200">{movie.runtime} mins • {movie.year}</div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`rounded-3xl border p-5 text-left transition ${selectedPlan.id === plan.id ? 'border-netflix bg-netflix/10 shadow-[0_0_0_1px_rgba(229,9,20,0.8)]' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'}`}
                >
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{plan.name}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">${plan.price.toFixed(2)}</p>
                  <p className="mt-2 text-sm text-slate-400">{plan.quality} • {plan.screens}</p>
                </button>
              ))}
            </div>

            <div className="rounded-3xl bg-white/5 p-5 text-sm text-slate-300">
              <p className="font-semibold text-white">Payment note</p>
              <p className="mt-2">This demo checkout connects to the existing order backend. When you click Complete Payment, the webhook demo payment flow begins.</p>
            </div>
          </div>

          <div className="space-y-5 rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-netflix">
            <div className="rounded-3xl bg-slate-900/90 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Plan summary</p>
              <div className="mt-4 space-y-2 text-sm text-slate-200">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span>Plan</span>
                  <span className="font-semibold text-white">{selectedPlan.name}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span>Quality</span>
                  <span>{selectedPlan.quality}</span>
                </div>
                <div className="flex items-center justify-between pt-3 text-lg font-semibold text-white">
                  <span>Total</span>
                  <span>${selectedPlan.price.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {error && <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>}

            <button
              onClick={handleCompletePayment}
              disabled={submitting}
              className="w-full rounded-3xl bg-netflix px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#f40612] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Processing...' : 'Complete Payment'}
            </button>

            <button onClick={() => navigate(`/watch/${movie.id}`)} className="w-full rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/10">
              Choose another movie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
