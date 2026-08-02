import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProfileSelection from './pages/ProfileSelection';
import HomePage from './pages/HomePage';
import MovieDetails from './pages/MovieDetails';
import CheckoutPage from './pages/CheckoutPage';
import PaymentUpdatePage from './pages/PaymentUpdatePage';
import WatchPage from './pages/WatchPage';
import LoadingScreen from './components/LoadingScreen';
import { getSelectedProfile, isAuthenticated } from './utils/session';

function App() {
  const location = useLocation();
  const profile = getSelectedProfile();
  const auth = isAuthenticated();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="min-h-screen bg-background text-white"
      >
        <Routes location={location}>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profiles"
            element={auth ? <ProfileSelection /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/browse"
            element={auth ? (profile ? <HomePage /> : <Navigate to="/profiles" replace />) : <Navigate to="/login" replace />}
          />
          <Route
            path="/watch/:id"
            element={auth ? (profile ? <WatchPage /> : <Navigate to="/profiles" replace />) : <Navigate to="/login" replace />}
          />
          <Route
            path="/movie/:id"
            element={auth ? (profile ? <MovieDetails /> : <Navigate to="/profiles" replace />) : <Navigate to="/login" replace />}
          />
          <Route
            path="/checkout/:id"
            element={auth ? (profile ? <CheckoutPage /> : <Navigate to="/profiles" replace />) : <Navigate to="/login" replace />}
          />
          <Route
            path="/payment-update/:id"
            element={auth ? (profile ? <PaymentUpdatePage /> : <Navigate to="/profiles" replace />) : <Navigate to="/login" replace />}
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<LoadingScreen />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
