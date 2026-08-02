import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';
import LoadingScreen from '../components/LoadingScreen';
import DetailModal from '../components/DetailModal';
import { getSelectedProfile } from '../utils/session';
import { heroMovie, rows as browseRows } from '../data/streamingData';

const footerLinks = [
  'Audio Description', 'Investor Relations', 'Legal Notices',
  'Privacy', 'Help Centre', 'Terms of Use', 'Contact Us', 'Cookie Preferences'
];

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [hero, setHero] = useState(heroMovie);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    document.title = 'Netflix';
    setLoading(false);
  }, []);

  useEffect(() => {
    const onSearch = (event) => setSearchTerm(event.detail || '');
    const onOpenModal = (event) => setSelectedMovieId(event.detail?.id || 'super-subbu');

    window.addEventListener('netflix-search', onSearch);
    window.addEventListener('netflix-open-modal', onOpenModal);

    return () => {
      window.removeEventListener('netflix-search', onSearch);
      window.removeEventListener('netflix-open-modal', onOpenModal);
    };
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await axios.get('/api/search', { params: { q: searchTerm } });
        setSearchResults(res.data.results || []);
      } catch (error) {
        console.error(error);
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const rowsToRender = useMemo(() => {
    if (searchTerm) {
      return [{ title: `Search Results for "${searchTerm}"`, category: 'search', movies: searchResults }];
    }

    return browseRows;
  }, [searchTerm, searchResults]);

  const handleSubscribe = async () => {
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId: 'subscription', plan: 'subscription' })
      });

      const data = await response.json();
      if (!data.order_id) {
        throw new Error('Order creation failed');
      }

      window.location.href = `/payment/${data.order_id}?subscription=true`;
    } catch (err) {
      console.error(err);
      setError('Unable to start subscription payment. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="relative min-h-screen bg-background text-white">
      <Navbar profile={getSelectedProfile()} onLogout={() => (window.location.href = '/profiles')} />
      <main className="relative overflow-hidden">
        <HeroBanner hero={hero} onOpenModal={(id) => setSelectedMovieId(id)} />
        <section id="browse-rows" className="relative -mt-20 space-y-4 pb-16 pt-2 lg:-mt-28">
          {rowsToRender.map((row) => (
            <MovieRow key={row.title} title={row.title} movies={row.movies} category={row.category} />
          ))}
        </section>

        <footer className="mx-auto max-w-6xl px-6 pb-16 pt-8 text-slate-500">
          <p className="text-base">
            Questions? Call <button className="underline-offset-2 hover:underline">000-000-0000</button>
          </p>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-[13px] sm:grid-cols-3 lg:grid-cols-4">
            {footerLinks.map((link) => (
              <button key={link} className="w-fit text-left transition-colors hover:text-white">
                {link}
              </button>
            ))}
          </div>
          <p className="mt-10 text-xs">
            Netflix UI demo · Educational webhook security session · Not affiliated with Netflix
          </p>
        </footer>
      </main>

      {/* Render Detail Modal directly over the browse page */}
      {selectedMovieId && (
        <DetailModal movieId={selectedMovieId} onClose={() => setSelectedMovieId(null)} />
      )}
    </div>
  );
}
