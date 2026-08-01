const PROFILE_KEY = 'netflix_selected_profile';
const AUTH_KEY = 'netflix_authenticated';

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
