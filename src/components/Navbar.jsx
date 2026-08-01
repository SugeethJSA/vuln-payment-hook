import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BiSearch } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const navItems = ['Home', 'TV Shows', 'Movies', 'Games', 'New & Popular', 'My List', 'Browse by Languages'];

export default function Navbar({ profile, onLogout }) {
  const [solid, setSolid] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{ backgroundColor: solid ? 'rgba(20,20,20,0.98)' : 'rgba(20,20,20,0)' }}
      transition={{ duration: 0.3 }}
      className="fixed inset-x-0 top-0 z-40 mx-auto flex w-full items-center justify-between px-4 py-3 text-sm text-white sm:px-6 lg:px-12"
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-sm bg-red-600 px-2 py-1 text-lg font-black tracking-[0.35em] text-white">N</div>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/90">
            {navItems.map((item) => (
              <button key={item} className="transition hover:text-white">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button aria-label="Search" className="hidden rounded-full bg-white/10 px-3 py-2 transition hover:bg-white/15 sm:inline-flex">
          <BiSearch className="h-5 w-5" />
        </button>
        <button aria-label="Notifications" className="hidden rounded-full bg-white/10 px-3 py-2 transition hover:bg-white/15 sm:inline-flex">
          <IoMdNotificationsOutline className="h-5 w-5" />
        </button>
        <button
          onClick={() => setOpenMenu((state) => !state)}
          className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 transition hover:bg-white/15"
        >
          <div className="h-8 w-8 overflow-hidden rounded-md bg-slate-700">
            {profile?.avatar ? <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" /> : null}
          </div>
          <span className="hidden sm:block">{profile?.name || 'Profile'}</span>
          <FiChevronDown className="h-4 w-4" />
        </button>
      </div>

      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-4 top-16 z-50 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 shadow-xl backdrop-blur"
          >
            <div className="flex flex-col gap-2 p-4 text-left text-sm text-slate-200">
              <button onClick={() => navigate('/profiles')} className="w-full rounded-xl px-4 py-3 text-left transition hover:bg-white/5">Switch Profile</button>
              <button onClick={onLogout} className="w-full rounded-xl px-4 py-3 text-left transition hover:bg-white/5">Sign out</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
