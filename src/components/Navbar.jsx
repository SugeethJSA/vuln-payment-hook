import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BiSearch } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import NetflixLogo from './NetflixLogo';
import { logout, setSelectedProfile, getStoredProfiles } from '../utils/session';

const navItems = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List', 'Browse by Languages'];

export default function Navbar({ profile, onLogout }) {
  const [solid, setSolid] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [allProfiles, setAllProfiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 32);
    window.addEventListener('scroll', onScroll);
    setAllProfiles(getStoredProfiles());
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const submitSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      navigate('/browse');
      setTimeout(() => window.dispatchEvent(new CustomEvent('netflix-search', { detail: query.trim() })), 50);
    }
  };

  const switchProfile = (nextProfile) => {
    setSelectedProfile(nextProfile);
    setOpenMenu(false);
    navigate('/browse');
  };

  const handleSignOut = () => {
    setOpenMenu(false);
    logout();
    onLogout?.();
    navigate('/login');
  };

  return (
    <motion.header
      initial={false}
      animate={{ backgroundColor: solid || openMenu ? 'rgba(20,20,20,0.98)' : 'rgba(20,20,20,0)' }}
      transition={{ duration: 0.3 }}
      className="fixed inset-x-0 top-0 z-40 w-full text-white"
    >
      <div className={`mx-auto flex w-full items-center justify-between px-4 py-3 text-sm transition-all duration-300 sm:px-6 lg:px-12 ${solid ? 'bg-black/80 shadow-lg shadow-black/40 backdrop-blur-xl' : ''}`}>
        <div className="flex items-center gap-8">
          <button onClick={() => navigate('/browse')} className="transition-transform duration-200 hover:scale-105" aria-label="Netflix home">
            <NetflixLogo className="h-9 w-9" />
          </button>
          <nav className="hidden items-center gap-5 text-sm text-slate-200 md:flex">
            {navItems.map((item) => (
              <button
                key={item}
                className="group relative py-0.5 font-medium transition-colors duration-200 hover:text-white"
              >
                {item}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-netflix transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <form onSubmit={submitSearch} className="relative hidden items-center sm:flex">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
              placeholder="Titles, genres..."
              className={`w-0 border border-white/50 bg-black/70 py-1.5 pl-8 pr-3 text-white outline-none transition-all duration-300 placeholder:text-slate-400 ${searchOpen ? 'w-48' : 'border-transparent'}`}
            />
            <BiSearch
              className={`absolute left-2 h-5 w-5 cursor-pointer transition-colors ${searchOpen ? 'text-netflix' : 'text-white hover:text-netflix'}`}
              onClick={() => setSearchOpen((state) => !state)}
            />
          </form>
          <button aria-label="Notifications" className="relative p-1.5 text-white transition-colors hover:text-netflix">
            <IoMdNotificationsOutline className="h-6 w-6" />
            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-netflix" />
          </button>
          <button
            onClick={() => setOpenMenu((state) => !state)}
            className="flex items-center gap-2"
          >
            <div className="h-8 w-8 overflow-hidden rounded-md bg-slate-700 ring-2 ring-transparent transition-all duration-200 hover:ring-white">
              {profile?.avatar ? <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" /> : null}
            </div>
            <span className="hidden text-white md:block">{profile?.name || 'Profile'}</span>
            <FiChevronDown className={`h-4 w-4 transition-transform duration-200 ${openMenu ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="absolute right-4 top-14 z-50 w-72 overflow-hidden rounded-md border border-white/10 bg-black/95 shadow-xl shadow-black/60 backdrop-blur-lg lg:right-12"
          >
            <p className="px-5 pt-4 pb-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
              Who's switching?
            </p>
            <div className="grid grid-cols-3 gap-3 px-5 pb-4">
              {allProfiles.map((p) => (
                <button
                  key={p.id}
                  onClick={() => switchProfile(p)}
                  className="group/profile flex flex-col items-center gap-1.5"
                >
                  <div
                    className={`h-12 w-12 overflow-hidden rounded-sm transition-all duration-200 ${
                      profile?.id === p.id
                        ? 'ring-2 ring-netflix'
                        : 'ring-2 ring-transparent group-hover/profile:ring-white'
                    }`}
                  >
                    <img src={p.avatar} alt={p.name} className="h-full w-full object-cover" />
                  </div>
                  <span
                    className={`text-[10px] transition-colors ${
                      profile?.id === p.id
                        ? 'font-semibold text-white'
                        : 'text-slate-500 group-hover/profile:text-white'
                    }`}
                  >
                    {p.name}
                  </span>
                </button>
              ))}
            </div>
            <div className="border-t border-white/10 py-2 text-sm text-slate-200">
              <button
                onClick={() => { setOpenMenu(false); navigate('/profiles'); }}
                className="w-full px-5 py-2.5 text-left transition-colors hover:bg-white/10 hover:text-white"
              >
                Manage Profiles
              </button>
              <button
                onClick={handleSignOut}
                className="w-full px-5 py-2.5 text-left transition-colors hover:bg-white/10 hover:text-white"
              >
                Sign out of Netflix
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
