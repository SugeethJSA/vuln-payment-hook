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
      // Open Edit Modal
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
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-netflix/10 to-transparent" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-12 px-5 py-14">
        {/* HEADER LOGO & TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center text-center"
        >
          <NetflixLogo className="h-12 w-12 drop-shadow-lg" />
          <h1 className="mt-8 text-[clamp(2.4rem,5.5vw,4.2rem)] font-medium leading-none tracking-tight text-white">
            {isManaging ? 'Manage Profiles:' : "Who's watching?"}
          </h1>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            {profiles.length} of 5 Profiles Created
          </p>
        </motion.div>

        {/* PROFILES GRID */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 max-w-5xl"
        >
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.05, duration: 0.4 }}
              onClick={() => handleProfileClick(profile)}
              className="group flex w-[120px] sm:w-[150px] cursor-pointer flex-col items-center gap-3.5"
            >
              <div className="relative">
                <div
                  className={`h-28 w-28 overflow-hidden rounded-md transition-all duration-300 sm:h-32 sm:w-32 ${
                    isManaging
                      ? 'ring-2 ring-white/60 brightness-75 group-hover:brightness-90 group-hover:ring-white'
                      : 'ring-2 ring-transparent group-hover:ring-white group-hover:shadow-[0_0_28px_rgba(229,9,20,0.5)]'
                  }`}
                >
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* EDIT PENCIL OVERLAY WHEN MANAGING */}
                {isManaging && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/40">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white ring-2 ring-white transition hover:scale-110">
                      <HiPencil className="h-5 w-5" />
                    </div>
                  </div>
                )}

                {profile.isKids && (
                  <span className="absolute bottom-2 right-2 rounded bg-netflix px-1.5 py-0.5 text-[9px] font-bold uppercase text-white shadow">
                    Kids
                  </span>
                )}
              </div>

              <span className="text-sm sm:text-base font-medium text-slate-300 transition-colors duration-300 group-hover:text-white">
                {profile.name}
              </span>
            </motion.div>
          ))}

          {/* ADD PROFILE BUTTON (ONLY IF PROFILES < 5) */}
          {profiles.length < 5 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + profiles.length * 0.05, duration: 0.4 }}
              onClick={handleOpenAddModal}
              className="group flex w-[120px] sm:w-[150px] cursor-pointer flex-col items-center gap-3.5"
            >
              <div className="flex h-28 w-28 items-center justify-center rounded-md border-2 border-dashed border-slate-600 bg-white/5 transition-all duration-300 group-hover:border-white group-hover:bg-white/10 sm:h-32 sm:w-32">
                <HiPlus className="h-10 w-10 text-slate-500 transition-colors duration-300 group-hover:text-white" />
              </div>
              <span className="text-sm sm:text-base font-medium text-slate-500 transition-colors duration-300 group-hover:text-white">
                Add Profile
              </span>
            </motion.div>
          ) : (
            <div className="flex w-[120px] sm:w-[150px] flex-col items-center gap-3.5 opacity-40 cursor-not-allowed">
              <div className="flex h-28 w-28 items-center justify-center rounded-md border-2 border-dashed border-slate-700 bg-white/5 sm:h-32 sm:w-32">
                <span className="text-xs font-bold uppercase text-slate-400">Max 5</span>
              </div>
              <span className="text-xs font-medium text-slate-500">Limit Reached</span>
            </div>
          )}
        </motion.div>

        {/* MANAGE PROFILES TOGGLE BUTTON */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setIsManaging((prev) => !prev)}
          className={`mt-4 rounded-md border px-8 py-2 text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
            isManaging
              ? 'border-white bg-white text-black hover:bg-slate-200'
              : 'border-slate-500 text-slate-400 hover:border-white hover:text-white'
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
              className="relative w-full max-w-lg rounded-lg border border-white/10 bg-slate-900 p-8 shadow-2xl"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <HiX className="h-6 w-6" />
              </button>

              <h2 className="text-2xl font-bold text-white">
                {activeModal === 'add' ? 'Add Profile' : 'Edit Profile'}
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Add or modify profile details (Maximum 5 profiles allowed per account).
              </p>

              <form
                onSubmit={activeModal === 'add' ? handleSaveAdd : handleSaveEdit}
                className="mt-6 space-y-6"
              >
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md ring-2 ring-netflix">
                    <img src={selectedAvatar} alt="Avatar Preview" className="h-full w-full object-cover" />
                  </div>

                  <div className="w-full space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Profile Name
                    </label>
                    <input
                      type="text"
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                      placeholder="e.g. Alex"
                      maxLength={16}
                      required
                      className="w-full rounded-md border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white outline-none focus:border-white focus:ring-1 focus:ring-white"
                    />
                  </div>
                </div>

                {/* AVATAR SELECTOR */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Choose Icon
                  </label>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {avatarOptions.map((url, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedAvatar(url)}
                        className={`h-12 w-12 overflow-hidden rounded-md border-2 transition ${
                          selectedAvatar === url ? 'border-netflix scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={url} alt={`Avatar ${i}`} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* KIDS CHECKBOX */}
                <label className="flex items-center gap-3 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={isKids}
                    onChange={(e) => setIsKids(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-netflix focus:ring-netflix"
                  />
                  <span className="text-sm font-medium text-slate-200">
                    Kids Profile? <span className="text-xs text-slate-400">(Content filtered for 12 & under)</span>
                  </span>
                </label>

                {/* MODAL ACTIONS */}
                <div className="flex items-center justify-between border-t border-slate-800 pt-6">
                  {activeModal === 'edit' && profiles.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => handleDeleteProfile(editProfileData.id)}
                      className="flex items-center gap-1.5 rounded-md border border-red-500/30 px-4 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/10"
                    >
                      <HiTrash className="h-4 w-4" />
                      Delete Profile
                    </button>
                  ) : (
                    <div />
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="rounded-md border border-slate-600 px-5 py-2 text-xs font-semibold text-slate-300 hover:border-white hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-netflix px-6 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-netflix-hover"
                    >
                      Save Profile
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
