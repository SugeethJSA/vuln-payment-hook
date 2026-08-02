const PROFILE_KEY = 'netflix_selected_profile';
const AUTH_KEY = 'netflix_authenticated';
const ALL_PROFILES_KEY = 'netflix_all_profiles';

const DEFAULT_PROFILES = [
  {
    id: 'augustine',
    name: 'Nihara',
    avatar: '/avatars/avatar-1.png',
    isKids: false
  },
  {
    id: 'mary',
    name: 'Krish',
    avatar: '/avatars/avatar-2.png',
    isKids: false
  },
  {
    id: 'thirishal',
    name: 'Guhan',
    avatar: '/avatars/avatar-3.png',
    isKids: false
  },
  {
    id: 'sugeeth',
    name: 'Deepti',
    avatar: '/avatars/avatar-4.png',
    isKids: false
  },
  {
    id: 'jacintha',
    name: 'Maria',
    avatar: '/avatars/avatar-5.png',
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
