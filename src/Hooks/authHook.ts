import { useCookies } from './cookiesHook';

export const useAuthHook = () => {
  const { removeTokenCookie, getTokenCookie } = useCookies();

  // 24 hours in milliseconds
  let logoutTimer: NodeJS.Timeout;

  const setSession = (expires: Date) => {
    const expirationTime = expires;

    // Calculate the remaining time until expiration
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime.getTime() - currentTime;

    logoutTimer = setInterval(() => {
      checkSession();
    }, timeUntilExpiration);

    sessionStorage.setItem('expirationTime', expirationTime.toISOString());
  };

  const clearSession = () => {
    sessionStorage.removeItem('expirationTime');
    clearInterval(logoutTimer);
  };

  const getSessionExpirationTime = () => {
    return sessionStorage.getItem('expirationTime');
  };

  const checkSession = () => {
    const expirationTime = getSessionExpirationTime();
    if (expirationTime) {
      const currentTime = Date.now();
      if (currentTime > parseInt(expirationTime, 10)) {
        logoutUser();
      }
    }
  };

  const logoutUser = () => {
    // Perform logout logic
    clearSession();

    const userToken = getTokenCookie('whooshNgToken');
    if (userToken) {
      removeTokenCookie('whooshNgToken');
    }
    localStorage.removeItem('persist:whooshNG-Admin');
    window.location.reload();
  };

  return { logoutUser, setSession, getSessionExpirationTime };
};
