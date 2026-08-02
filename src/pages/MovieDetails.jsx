import { useParams, useNavigate } from 'react-router-dom';
import { getSelectedProfile } from '../utils/session';
import Navbar from '../components/Navbar';
import DetailModal from '../components/DetailModal';
import HomePage from './HomePage';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!getSelectedProfile()) {
    navigate('/profiles', { replace: true });
    return null;
  }

  return (
    <div className="relative min-h-screen bg-background text-white">
      {/* Background Browse Screen */}
      <div className="pointer-events-none opacity-40 blur-[2px]">
        <Navbar profile={getSelectedProfile()} onLogout={() => navigate('/profiles')} />
        <HomePage />
      </div>

      {/* Authentic Netflix Detail Modal Popup */}
      <DetailModal movieId={id} onClose={() => navigate('/browse')} />
    </div>
  );
}
