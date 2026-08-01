import { motion } from 'framer-motion';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProfileSelection from './pages/ProfileSelection';
import HomePage from './pages/HomePage';
import MovieDetails from './pages/MovieDetails';
import CheckoutPage from './pages/CheckoutPage';
import WatchPage from './pages/WatchPage';
import LoadingScreen from './components/LoadingScreen';
import { getSelectedProfile } from './utils/session';

function App() {
  const profile = getSelectedProfile();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background text-white"
    >
      <Routes>
        <Route path="/login" element={<Navigate to="/profiles" replace />} />
        <Route path="/profiles" element={<ProfileSelection />} />
        <Route
          path="/browse"
          element={profile ? <HomePage /> : <Navigate to="/profiles" replace />}
        />
        <Route
          path="/watch/:id"
          element={profile ? <WatchPage /> : <Navigate to="/profiles" replace />}
        />
        <Route
          path="/movie/:id"
          element={profile ? <MovieDetails /> : <Navigate to="/profiles" replace />}
        />
        <Route
          path="/checkout/:id"
          element={profile ? <CheckoutPage /> : <Navigate to="/profiles" replace />}
        />
        <Route path="/" element={<Navigate to="/profiles" replace />} />
        <Route path="*" element={<LoadingScreen />} />
      </Routes>
    </motion.div>
  );
}

export default App;
