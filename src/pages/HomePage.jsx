import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';
import SearchBar from '../components/SearchBar';
import LoadingScreen from '../components/LoadingScreen';
import { getSelectedProfile } from '../utils/session';
import { heroMovie, rows as browseRows } from '../data/streamingData';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [hero, setHero] = useState(heroMovie);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Netflix Browse';
    setLoading(false);
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
      return [{ title: 'Search Results', category: 'search', movies: searchResults }];
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
        <HeroBanner hero={hero} />
        <section className="relative -mt-32 space-y-10 px-4 pb-16 pt-6 md:px-8 lg:-mt-36 lg:px-12">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <div className="rounded-3xl border border-netflix/30 bg-gradient-to-r from-netflix/20 via-red-600/10 to-transparent p-5 shadow-netflix">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-netflix">Subscription</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Pay Subscription</h2>
                <p className="mt-2 text-sm text-slate-300">Unlock premium access and continue watching your favorite movies.</p>
              </div>
              <button
                onClick={handleSubscribe}
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-3xl bg-netflix px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#f40612] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? 'Processing...' : 'Pay Subscription'}
              </button>
            </div>
            {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
          </div>
          {rowsToRender.map((row) => (
            <MovieRow key={row.title} title={row.title} movies={row.movies} />
          ))}
        </section>
      </main>
    </div>
  );
}
