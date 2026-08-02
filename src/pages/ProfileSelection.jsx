import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiPlus, HiPencil, HiX, HiTrash } from 'react-icons/hi';
import NetflixLogo from '../components/NetflixLogo';
import { avatarOptions } from '../data/streamingData';
import {
  getStoredProfiles,
  saveStoredProfiles,
  setSelectedProfile
} from '../utils/session';

export default function ProfileSelection() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [isManaging, setIsManaging] = useState(false);

  // Modal State for Add/Edit Profile
  const [activeModal, setActiveModal] = useState(null); // 'add' | 'edit' | null
  const [editProfileData, setEditProfileData] = useState(null);
  const [inputName, setInputName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);
  const [isKids, setIsKids] = useState(false);

  useEffect(() => {
    document.title = "Who's Watching? | Netflix";
    const loaded = getStoredProfiles();
    setProfiles(loaded);
  }, []);

  const handleProfileClick = (profile) => {
    if (isManaging) {
      setEditProfileData(profile);
      setInputName(profile.name);
      setSelectedAvatar(profile.avatar);
      setIsKids(!!profile.isKids);
      setActiveModal('edit');
    } else {
      setSelectedProfile(profile);
      navigate('/browse');
    }
  };

  const handleOpenAddModal = () => {
    if (profiles.length >= 5) return;
    setInputName('');
    setSelectedAvatar(avatarOptions[profiles.length % avatarOptions.length]);
    setIsKids(false);
    setActiveModal('add');
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!inputName.trim()) return;

    const newProfile = {
      id: 'profile_' + Date.now(),
      name: inputName.trim(),
      avatar: selectedAvatar,
      isKids: isKids
    };

    const updated = [...profiles, newProfile];
    const saved = saveStoredProfiles(updated);
    setProfiles(saved);
    setActiveModal(null);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!inputName.trim() || !editProfileData) return;

    const updated = profiles.map((p) =>
      p.id === editProfileData.id
        ? { ...p, name: inputName.trim(), avatar: selectedAvatar, isKids: isKids }
        : p
    );

    const saved = saveStoredProfiles(updated);
    setProfiles(saved);
    setActiveModal(null);
  };

  const handleDeleteProfile = (id) => {
    const updated = profiles.filter((p) => p.id !== id);
    const saved = saveStoredProfiles(updated);
    setProfiles(saved);
    setActiveModal(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-white select-none">
      <div className="pointer-events-none absolute inset-0 bg-glow-radial" />

      {/* TOP LEFT NETFLIX LOGO */}
      <header className="absolute top-6 left-6 z-20 sm:left-12 sm:top-8">
        <button onClick={() => navigate('/browse')} className="transition transform hover:scale-105">
          <NetflixLogo className="h-8 sm:h-9 w-auto drop-shadow-md" variant="wordmark" />
        </button>
      </header>

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-8 px-4 py-12">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-col items-center text-center mt-6"
        >
          <h1 className="text-2xl font-medium tracking-tight text-white sm:text-4xl">
            {isManaging ? 'Manage Profiles:' : "Who's watching?"}
          </h1>
        </motion.div>

        {/* PROFILES GRID */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 max-w-4xl"
        >
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.04, duration: 0.3 }}
              onClick={() => handleProfileClick(profile)}
              className="group flex w-[96px] sm:w-[120px] cursor-pointer flex-col items-center gap-2.5"
            >
              <div className="relative">
                <div
                  className={`h-20 w-20 overflow-hidden rounded-md transition-all duration-200 sm:h-24 sm:w-24 ${
                    isManaging
                      ? 'ring-2 ring-white/60 brightness-75 group-hover:brightness-90 group-hover:ring-white'
                      : 'ring-2 ring-transparent group-hover:ring-white group-hover:shadow-[0_0_20px_rgba(229,9,20,0.5)]'
                  }`}
                >
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>

                {/* EDIT PENCIL OVERLAY WHEN MANAGING */}
                {isManaging && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/40">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white ring-2 ring-white transition hover:scale-110">
                      <HiPencil className="h-4 w-4" />
                    </div>
                  </div>
                )}

                {profile.isKids && (
                  <span className="absolute bottom-1.5 right-1.5 rounded bg-netflix px-1 py-0.2 text-[8px] font-bold uppercase text-white shadow">
                    Kids
                  </span>
                )}
              </div>

              <span className="text-xs sm:text-sm font-normal text-slate-400 text-center line-clamp-2 leading-tight transition-colors duration-200 group-hover:text-white">
                {profile.name}
              </span>
            </motion.div>
          ))}

          {/* ADD PROFILE BUTTON (ONLY IF PROFILES < 5) */}
          {profiles.length < 5 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + profiles.length * 0.04, duration: 0.3 }}
              onClick={handleOpenAddModal}
              className="group flex w-[96px] sm:w-[120px] cursor-pointer flex-col items-center gap-2.5"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-md border-2 border-dashed border-slate-600 bg-white/5 transition-all duration-200 group-hover:border-white group-hover:bg-white/10 sm:h-24 sm:w-24">
                <HiPlus className="h-8 w-8 text-slate-500 transition-colors duration-200 group-hover:text-white" />
              </div>
              <span className="text-xs sm:text-sm font-normal text-slate-500 transition-colors duration-200 group-hover:text-white">
                Add Profile
              </span>
            </motion.div>
          ) : null}
        </motion.div>

        {/* MANAGE PROFILES TOGGLE BUTTON */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => setIsManaging((prev) => !prev)}
          className={`mt-2 rounded border px-6 py-1.5 text-xs font-medium uppercase tracking-[0.18em] transition-all duration-200 ${
            isManaging
              ? 'border-white bg-white text-black hover:bg-slate-200'
              : 'border-slate-600 text-slate-400 hover:border-white hover:text-white'
          }`}
        >
          {isManaging ? 'Done' : 'Manage Profiles'}
        </motion.button>
      </div>

      {/* ADD / EDIT MODAL */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md rounded-lg border border-white/10 bg-slate-900 p-6 shadow-2xl"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <HiX className="h-5 w-5" />
              </button>

              <h2 className="text-xl font-bold text-white">
                {activeModal === 'add' ? 'Add Profile' : 'Edit Profile'}
              </h2>

              <form
                onSubmit={activeModal === 'add' ? handleSaveAdd : handleSaveEdit}
                className="mt-5 space-y-5"
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md ring-2 ring-netflix">
                    <img src={selectedAvatar} alt="Avatar Preview" className="h-full w-full object-cover" />
                  </div>

                  <div className="w-full space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Profile Name
                    </label>
                    <input
                      type="text"
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                      placeholder="e.g. Alex"
                      maxLength={32}
                      required
                      className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white outline-none focus:border-white focus:ring-1 focus:ring-white"
                    />
                  </div>
                </div>

                {/* AVATAR SELECTOR */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Choose Icon
                  </label>
                  <div className="mt-2.5 flex flex-wrap gap-2.5">
                    {avatarOptions.map((url, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedAvatar(url)}
                        className={`h-10 w-10 overflow-hidden rounded border-2 transition ${
                          selectedAvatar === url ? 'border-netflix scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={url} alt={`Avatar ${i}`} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* KIDS CHECKBOX */}
                <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={isKids}
                    onChange={(e) => setIsKids(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-slate-700 bg-slate-800 text-netflix focus:ring-netflix"
                  />
                  <span className="text-xs font-medium text-slate-200">
                    Kids Profile?
                  </span>
                </label>

                {/* MODAL ACTIONS */}
                <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                  {activeModal === 'edit' && profiles.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => handleDeleteProfile(editProfileData.id)}
                      className="flex items-center gap-1.5 rounded border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
                    >
                      <HiTrash className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  ) : (
                    <div />
                  )}

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="rounded border border-slate-600 px-4 py-1.5 text-xs font-medium text-slate-300 hover:border-white hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded bg-netflix px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-netflix-hover"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
