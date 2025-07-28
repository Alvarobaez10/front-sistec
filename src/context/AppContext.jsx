'use client';
import { createContext, useContext, useLayoutEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import validateSession from '@sistec/services/login/validateSession';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const appContext = createContext();

export const useApp = () => {
  const context = useContext(appContext);
  if (!context) throw new Error('There is no context provider');
  return context;
};

const listForms = [{ id_form: '1', label: 'prueba', url: '/SAI/land/prueba' }];

export function AppProvider({ children }) {
  const router = useRouter();
  let pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [loadedForms, setLoadedForms] = useState([]);
  const [user, setUserData] = useState();
  const validateActive = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
  };
  let [isLogged, setIsLogged] = useState(validateActive() === '/login');

  useLayoutEffect(() => {
    const url = pathname + searchParams.toString();
    if (url === '/login') {
      setIsLogged(true);
    }
  }, [pathname, searchParams]);

  useLayoutEffect(() => {
    async function validate() {
      try {
        await validateSession();
        setIsLogged(true);
      } catch (error) {
        returnLogin();
      }
    }
    validate().then();
  }, []);

  const loggedIn = () => {
    setIsLogged(true);
  };

  const returnLogin = () => {
    router.push('/login');
  };

  async function logOut() {
    try {
      const response = await validateSession();
      // await setLogOut(response.access_token, response.refresh_token);
    } catch (error) {
      console.log(error);
    }
    setUserData(null);
    setIsLogged(false);
    removeItem('refresh-token', 'local');
    removeItem('info-user', 'local');
    returnLogin();
  }

  const offLoad = () => {
    setLoading(false);
  };
  const onLoad = () => {
    setLoading(true);
  };

  async function getToken() {
    try {
      const response = await validateSession();
      return response.access_token;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <appContext.Provider
      value={{
        loading,
        onLoad,
        offLoad,
        setUserData,
        user,
        loadedForms,
        isLogged,
        loggedIn,
        returnLogin,
        getToken,
      }}
    >
      <ToastContainer />
      {isLogged ? children : <></>}
    </appContext.Provider>
  );
}
