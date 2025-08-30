'use client';
import { createContext, useContext, useLayoutEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import validateSession from '@sistec/services/login/validateSession';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import setLogOut from '@sistec/services/login/setLogOut';
import useStorage from '@sistec/hooks/useStorage';
import { getPageJsonConfiguration } from '@sistec/services/common/getConfigurations';
import { getMenu } from '@sistec/services/common/getMenu';

const appContext = createContext();

export const useApp = () => {
  const context = useContext(appContext);
  if (!context) throw new Error('There is no context provider');
  return context;
};

const listForms = [
  { id_form: '1', label: 'prueba', url: '/SAC/formulario', visible: true },
  { id_form: '2', label: 'prueba2', url: '/SAC/formulario', visible: false },
  { id_form: '3', label: 'prueba3', url: '/SAC/formulario', visible: false },
];

export function AppProvider({ children }) {
  const router = useRouter();
  let pathname = usePathname();
  const { removeItem } = useStorage();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [loadedForms, setLoadedForms] = useState([]);
  const [user, setUserData] = useState();
  const validateActive = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
  };
  const publicRoutes = ['/login', '/forgotpassword'];
  const isPublicRoute = publicRoutes.includes(pathname);
  const [isLogged, setIsLogged] = useState(false);
  const [menu, setMenu] = useState([]);

  useLayoutEffect(() => {
    const url = pathname + searchParams.toString();
    if (url === '/login') {
      setIsLogged(true);
    }
  }, [pathname, searchParams]);

  useLayoutEffect(() => {
    if (isPublicRoute) return;

    async function validate() {
      try {
        await validateSession();
        setIsLogged(true);
        loadMenu();
      } catch (error) {
        returnLogin();
      }
    }
    validate().then();
  }, [isPublicRoute]);

  const loggedIn = () => {
    setIsLogged(true);
    loadMenu();
  };

  async function loadMenu() {
    try {
      const token = await getToken();
      if (!token) {
        setMenu([]);
        return;
      }

      const menuItems = await getMenu(token);
      setMenu(menuItems?.data || []);
    } catch (error) {
      console.error('Error loading menu:', error);
      setMenu([]);
    }
  }

  const returnLogin = () => {
    router.push('/login');
  };

  async function logOut() {
    try {
      await setLogOut();
      setIsLogged(false);
      removeItem('info-user', 'local');
      returnLogin();
    } catch (error) {
      console.log(error);
    }
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

function openForm(form) {
  const copyLoadedForms = [...loadedForms];
  const exists = copyLoadedForms.find(f => f.id_form === form.id_form);

  if (exists) {
    copyLoadedForms.forEach(f => (f.visible = f.id_form === form.id_form));
  } else {
    copyLoadedForms.forEach(f => (f.visible = false));
    copyLoadedForms.push({ ...form, visible: true });
  }
  setLoadedForms(copyLoadedForms);
}


 function changeForm(idForm) {
  const copyLoadedForms = [...loadedForms];
  copyLoadedForms.forEach(f => (f.visible = f.id_form === idForm));
  setLoadedForms(copyLoadedForms);
}

 const closeForm = (formId) => {
    setLoadedForms(prev => {
      const filteredForms = prev.filter(form => form.id_form !== formId);
      
      const wasActive = prev.find(form => form.id_form === formId)?.visible;
      
      if (wasActive && filteredForms.length > 0) {
        return filteredForms.map((form, index) => ({
          ...form,
          visible: index === filteredForms.length - 1
        }));
      }
      
      return filteredForms;
    });
  };


  return (
    <appContext.Provider
      value={{
        loading,
        onLoad,
        offLoad,
        setUserData,
        user,
        setLoadedForms,
        loadedForms,
        isLogged,
        loggedIn,
        openForm,
        closeForm,
        changeForm,
        menu,
        returnLogin,
        getToken,
        logOut,
      }}
    >
      <ToastContainer />
      {isPublicRoute || isLogged ? children : <></>}
    </appContext.Provider>
  );
}
