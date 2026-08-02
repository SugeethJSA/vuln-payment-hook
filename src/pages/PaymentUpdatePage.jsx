import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { HiLockClosed, HiShieldCheck, HiCreditCard, HiCheckCircle, HiExclamation } from 'react-icons/hi';
import NetflixLogo from '../components/NetflixLogo';
import { findMovieById } from '../data/streamingData';

export default function PaymentUpdatePage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    zipCode: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const isRetry = searchParams.get('retry') === 'true';

  useEffect(() => {
    document.title = 'Netflix - Update Payment Method';
    const selected = findMovieById(id);
    setMovie(selected);
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdatePayment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    let generatedOrderId = 'ORD_' + Math.random().toString(36).substring(2, 11).toUpperCase();

    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId: id || 'super-subbu', plan: 'standard' })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.order_id) {
          generatedOrderId = data.order_id;
        }
      }
    } catch (err) {
      console.warn('Backend API call warning:', err);
    }

    const isLabDemo = searchParams.get('demo') === 'true' || searchParams.get('intercept') === 'true' || searchParams.get('lab') === 'true' || searchParams.get('vuln') === 'true';

    setSuccess(true);
    setTimeout(() => {
      if (isLabDemo) {
        navigate(`/checkout/${id || 'super-subbu'}?orderId=${generatedOrderId}&lab=true`);
      } else {
        navigate(`/checkout/${id || 'super-subbu'}?orderId=${generatedOrderId}`);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white text-[#333333] font-sans">
      {/* Clean White Top Header */}
      <header className="border-b border-gray-200 bg-white py-4 px-4 sm:px-12 flex justify-between items-center">
        <button onClick={() => navigate('/browse')} aria-label="Netflix home">
          <NetflixLogo className="h-9 w-auto text-[#e50914]" cutoutColor="#ffffff" />
        </button>
        <button
          onClick={() => navigate('/browse')}
          className="text-sm font-semibold text-[#333333] hover:underline"
        >
          Sign Out
        </button>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-lg px-4 py-8 sm:py-12">
        {/* On Hold Warning Banner */}
        <div className="mb-6 rounded border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900 flex items-start gap-3 shadow-sm">
          <HiExclamation className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm text-amber-950">Membership On Hold</p>
            <p className="mt-0.5">
              {isRetry
                ? 'Retrying your last payment method. Update your card below to ensure uninterrupted service.'
                : 'Your account is on hold due to a problem with your last payment. Update your payment method below.'}
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-gray-500">Step 2 of 2</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mt-1">
              Update credit or debit card
            </h1>
          </div>

          {/* Payment Card Badges */}
          <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
            <span className="rounded bg-blue-900 text-white font-black text-[10px] px-2 py-1 tracking-widest">VISA</span>
            <span className="rounded bg-red-600 text-white font-black text-[10px] px-2 py-1 tracking-widest">MC</span>
            <span className="rounded bg-blue-600 text-white font-black text-[10px] px-2 py-1 tracking-widest">AMEX</span>
            <span className="rounded bg-orange-600 text-white font-black text-[10px] px-2 py-1 tracking-widest">DISCOVER</span>
          </div>

          {success ? (
            <div className="rounded border border-emerald-300 bg-emerald-50 p-6 text-center space-y-3">
              <HiCheckCircle className="h-12 w-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-950">Payment Method Updated!</h3>
              <p className="text-xs text-emerald-800">Your account is now active. Redirecting you to watch...</p>
            </div>
          ) : (
            <form onSubmit={handleUpdatePayment} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className="w-full rounded border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="w-full rounded border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardNumber"
                    required
                    maxLength={19}
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="4111 2222 3333 4444"
                    className="w-full rounded border border-gray-300 px-3 py-2.5 pr-10 text-sm text-gray-900 outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]"
                  />
                  <HiCreditCard className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Expiration Date</label>
                  <input
                    type="text"
                    name="expirationDate"
                    required
                    placeholder="MM/YY"
                    maxLength={5}
                    value={formData.expirationDate}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">CVV / Security Code</label>
                  <input
                    type="password"
                    name="cvv"
                    required
                    maxLength={4}
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]"
                  />
                </div>
              </div>

              {/* Plan Box */}
              <div className="rounded border border-gray-200 bg-gray-50 p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Plan</p>
                  <p className="text-sm font-bold text-gray-900">Standard Plan (1080p Full HD)</p>
                </div>
                <span className="text-sm font-black text-[#e50914]">$9.99/mo</span>
              </div>

              {error && (
                <p className="text-xs font-semibold text-red-600">{error}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded bg-[#e50914] py-3.5 text-base font-bold text-white shadow transition hover:bg-[#f40612] active:scale-98 disabled:opacity-60"
              >
                {submitting ? 'Updating Payment...' : 'Save & Update Payment'}
              </button>

              <p className="text-[11px] text-gray-500 leading-relaxed pt-2">
                By clicking "Save & Update Payment", you authorize Netflix to charge your payment method for your monthly membership. You can cancel online anytime under Account settings.
              </p>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
