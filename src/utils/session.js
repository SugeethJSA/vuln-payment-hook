const PROFILE_KEY = 'netflix_selected_profile';
const AUTH_KEY = 'netflix_authenticated';
const ALL_PROFILES_KEY = 'netflix_all_profiles';

const DEFAULT_PROFILES = [
  {
    id: 'nihara',
    name: 'Nihara',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    isKids: false
  },
  {
    id: 'niranjan',
    name: 'Niranjan',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    isKids: false
  },
  {
    id: 'anjali',
    name: 'Anjali',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    isKids: false
  },
  {
    id: 'nikhil',
    name: 'Nikhil',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    isKids: false
  }
];

export function getStoredProfiles() {
  try {
    const raw = localStorage.getItem(ALL_PROFILES_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_PROFILES;
  } catch {
    return DEFAULT_PROFILES;
  }
}

export function saveStoredProfiles(profilesList) {
  // Enforce max 5 profiles
  const capped = profilesList.slice(0, 5);
  localStorage.setItem(ALL_PROFILES_KEY, JSON.stringify(capped));
  return capped;
}

export function getSelectedProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setSelectedProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function clearSelectedProfile() {
  localStorage.removeItem(PROFILE_KEY);
}

export function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function setAuthenticated(value) {
  localStorage.setItem(AUTH_KEY, value ? 'true' : 'false');
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
  clearSelectedProfile();
}
