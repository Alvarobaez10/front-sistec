// hooks/useSessionValidator.js
import { useApp } from '@sistec/context/AppContext';
import { useEffect, useRef } from 'react';

export default function useSessionValidator() {
  const { getToken, logOut } = useApp();
  const throttleMs = 5 * 1000; // 5 minutos

  const lastValidateRef = useRef(0);

  const onExpire = () => {
    console.log('Session expired. Please log in again.');
    logOut();
  };

  const validateSession = async () => {
    try {
      const token = await getToken();

      if (token) {
        return true;
      } else {
        onExpire();
        return false;
      }
    } catch (err) {
      onExpire();
      return false;
    }
  };

  const handleInteraction = () => {
    const now = Date.now();
    if (!lastValidateRef.current || now - lastValidateRef.current >= throttleMs) {
      lastValidateRef.current = Date.now();
      validateSession();
    }
  };

  useEffect(() => {
    const events = ['mousedown', 'click', 'scroll'];
    events.forEach((ev) => window.addEventListener(ev, handleInteraction, { passive: true }));

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, handleInteraction));
    };
  }, []);

  return {
    validateNow: validateSession,
  };
}
