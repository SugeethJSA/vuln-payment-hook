import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { HiCheck, HiOutlineShieldCheck, HiOutlineCreditCard, HiOutlineLockClosed } from 'react-icons/hi';
import { getSelectedProfile } from '../utils/session';
import { findMovieById } from '../data/streamingData';
import Navbar from '../components/Navbar';
import LoadingScreen from '../components/LoadingScreen';

const plans = [
  { id: 'basic', name: 'Basic', price: 4.99, quality: '720p', screens: '1 screen' },
  { id: 'standard', name: 'Standard', price: 9.99, quality: '1080p', screens: '2 screens', popular: true },
  { id: 'premium', name: 'Premium', price: 15.99, quality: '4K HDR', screens: '4 screens' }
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
  const [submitting, setSubmitting] = useState(false);

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
      setLoading(false);
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

  const handleCompletePayment = () => {
    if (!orderId) return;
    setSubmitting(true);
    navigate(`/payment/${orderId}`);
  };

  if (!getSelectedProfile()) {
    navigate('/profiles', { replace: true });
    return null;
  }

  if (!orderId) {
    navigate(`/movie/${id}`, { replace: true });
    return null;
  }

  if (loading) return <LoadingScreen />;

  if (!movie) {
    return (
      <div className="min-h-screen bg-background text-white">
        <Navbar profile={getSelectedProfile()} onLogout={() => navigate('/login')} />
        <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-4 text-center">
          <h1 className="text-3xl font-semibold">Movie not found</h1>
          <button onClick={() => navigate('/browse')} className="mt-8 rounded-md bg-netflix px-6 py-3 text-sm font-semibold text-white transition hover:bg-netflix-hover">
            Return to Browse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar profile={getSelectedProfile()} onLogout={() => navigate('/login')} />
      <div className="pointer-events-none fixed inset-0 bg-glow-radial" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 py-24 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              <HiOutlineCreditCard className="h-4 w-4 text-netflix" />
              Step 2 of 3 · Payment
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Choose how to watch
            </h1>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-white/10 bg-black/50 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm">
            <img
              src={movie.poster}
              alt={movie.title}
              className="h-10 w-8 rounded-sm object-cover"
            />
            <div>
              <p className="font-semibold text-white">{movie.title}</p>
              <p className="text-xs text-slate-500">{movie.year} · {movie.runtime} min</p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {plans.map((plan, index) => (
                <motion.button
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  onClick={() => setSelectedPlan(plan)}
                  className={`relative rounded-md border-2 p-5 text-left transition-all duration-300 hover:-translate-y-1 ${
                    selectedPlan.id === plan.id
                      ? 'border-netflix bg-netflix/10 shadow-glow-red'
                      : 'border-white/10 bg-surface hover:border-white/30'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 right-4 rounded-sm bg-netflix px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                      Popular
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                      {plan.name}
                    </p>
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                        selectedPlan.id === plan.id
                          ? 'border-netflix bg-netflix text-white'
                          : 'border-slate-600'
                      }`}
                    >
                      {selectedPlan.id === plan.id && <HiCheck className="h-3 w-3" />}
                    </span>
                  </div>
                  <p className="mt-3 text-3xl font-extrabold text-white">
                    ${plan.price.toFixed(2)}
                    <span className="text-sm font-medium text-slate-500">/mo</span>
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    {plan.quality} • {plan.screens}
                  </p>
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-4 rounded-md border border-white/10 bg-surface p-6"
            >
              <p className="flex items-center gap-2 text-sm font-bold text-white">
                <HiOutlineShieldCheck className="h-5 w-5 text-netflix" />
                Demo payment note
              </p>
              <p className="text-sm leading-6 text-slate-300">
                Completing payment opens the demo payment gateway. The order stays{' '}
                <span className="font-semibold text-amber-400">PENDING</span> until a webhook
                confirms it — fire the webhook from the gateway page to see the order flip to{' '}
                <span className="font-semibold text-emerald-400">PAID</span>.
              </p>
              {order && (
                <div className="rounded-md bg-black/40 p-4 text-xs text-slate-400">
                  <p className="uppercase tracking-[0.2em] text-slate-500">Order reference</p>
                  <p className="mt-1 font-mono text-sm text-slate-200">{order.order_id}</p>
                  <p className="mt-2">
                    Status:{' '}
                    <span className={`font-bold ${order.status === 'PAID' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {order.status || 'PENDING'}
                    </span>
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="h-fit space-y-5 rounded-md border border-white/10 bg-surface p-6 lg:sticky lg:top-24"
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">Plan summary</p>

            <div className="flex gap-3 rounded-md bg-black/40 p-4">
              <img src={movie.poster} alt={movie.title} className="h-24 w-16 rounded-sm object-cover" />
              <div>
                <p className="font-bold text-white">{movie.title}</p>
                <p className="mt-1 text-xs text-slate-400">{movie.genres.join(' · ')}</p>
                <p className="mt-2 inline-flex rounded-sm border border-white/30 px-1.5 text-[10px] font-semibold text-slate-300">
                  {movie.maturity}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-sm text-slate-200">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-slate-400">Plan</span>
                <span className="font-semibold text-white">{selectedPlan.name}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-slate-400">Quality</span>
                <span className="font-semibold text-white">{selectedPlan.quality}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-slate-400">Screens</span>
                <span className="font-semibold text-white">{selectedPlan.screens}</span>
              </div>
              <div className="flex items-center justify-between pt-2 text-lg font-extrabold text-white">
                <span>Total</span>
                <span>${selectedPlan.price.toFixed(2)}/mo</span>
              </div>
            </div>

            {error && (
              <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              onClick={handleCompletePayment}
              disabled={submitting}
              className="w-full rounded-md bg-netflix px-6 py-4 text-base font-bold uppercase tracking-[0.25em] text-white transition-all duration-200 hover:bg-netflix-hover hover:shadow-glow-red-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Redirecting...' : 'Complete Payment'}
            </button>

            <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <HiOutlineLockClosed className="h-3.5 w-3.5" />
              Demo checkout · no real money moves
            </p>

            <button
              onClick={() => navigate('/browse')}
              className="w-full rounded-md border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/40 hover:bg-white/10"
            >
              Back to Browse
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
