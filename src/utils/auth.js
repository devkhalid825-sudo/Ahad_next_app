// Admin auth stored in cookies (path=/) so it survives navigation, page
// reloads and is shared by every component — unlike the old localStorage keys.

const TOKEN_COOKIE = 'adminToken';
const USER_COOKIE = 'adminUser';
const MAX_AGE = 30 * 24 * 60 * 60; // 30 days, matches the backend JWT expiry

const readCookie = (name) => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
};

const writeCookie = (name, value) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
};

const deleteCookie = (name) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
};

export const getAdminToken = () => readCookie(TOKEN_COOKIE);

export const setAdminToken = (token) => writeCookie(TOKEN_COOKIE, token);

export const setAdminUser = (user) => writeCookie(USER_COOKIE, JSON.stringify(user));

export const getAdminUser = () => {
  const raw = readCookie(USER_COOKIE);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const clearAdminAuth = () => {
  deleteCookie(TOKEN_COOKIE);
  deleteCookie(USER_COOKIE);
};
