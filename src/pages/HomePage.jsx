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

  if (loading) return <LoadingScreen />;

  return (
    <div className="relative min-h-screen bg-background text-white">
      <Navbar profile={getSelectedProfile()} onLogout={() => (window.location.href = '/login')} />
      <main className="relative overflow-hidden">
        <HeroBanner hero={hero} />
        <section className="relative -mt-32 space-y-10 px-4 pb-16 pt-6 md:px-8 lg:-mt-36 lg:px-12">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          {rowsToRender.map((row) => (
            <MovieRow key={row.title} title={row.title} movies={row.movies} />
          ))}
        </section>
      </main>
    </div>
  );
}
