import { motion } from 'framer-motion';
import { HiExclamationCircle, HiX, HiCreditCard, HiRefresh } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function PaymentWarningModal({ movieId, onClose }) {
  const navigate = useNavigate();

  const handleUpdatePayment = () => {
    onClose?.();
    navigate(`/payment-update/${movieId || 'super-subbu'}`);
  };

  const handleRetryPayment = () => {
    onClose?.();
    navigate(`/payment-update/${movieId || 'super-subbu'}?retry=true`);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-md overflow-hidden rounded-md bg-[#181818] border border-red-500/30 p-6 sm:p-8 text-white shadow-2xl"
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-400 transition hover:bg-white hover:text-black"
          aria-label="Close"
        >
          <HiX className="h-5 w-5" />
        </button>

        {/* Warning Header Icon */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20 text-red-500 ring-8 ring-red-600/10">
            <HiExclamationCircle className="h-10 w-10" />
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            Account On Hold
          </h2>

          <div className="rounded border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300 leading-relaxed">
            Your payment didn't go through and your account is currently on hold.
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            We were unable to process your last membership payment. Please update your payment method or retry your payment to continue watching your favorite movies and shows.
          </p>

          {/* Action Buttons */}
          <div className="w-full space-y-3 pt-2">
            <button
              onClick={handleUpdatePayment}
              className="w-full flex items-center justify-center gap-2 rounded bg-netflix py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-netflix-hover shadow-lg active:scale-98"
            >
              <HiCreditCard className="h-5 w-5" />
              Update Payment Method
            </button>

            <button
              onClick={handleRetryPayment}
              className="w-full flex items-center justify-center gap-2 rounded border border-white/30 bg-white/10 py-3 text-sm font-semibold text-white transition hover:bg-white/20 active:scale-98"
            >
              <HiRefresh className="h-5 w-5" />
              Retry Payment
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
