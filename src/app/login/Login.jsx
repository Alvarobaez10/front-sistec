'use client';

import { useApp } from '@sistec/context/AppContext';
import useStorage from '@sistec/hooks/useStorage';
import setLogin from '@sistec/services/login/setLogin';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import '../../styles/login.css';
import { cn } from '@sistec/helpers/utils';

export default function Login() {
  const { onLoad, offLoad, loggedIn } = useApp();
  const { setItem } = useStorage();
  const router = useRouter();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    offLoad();
  }, []);

  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    let mensaje = '';
    if (user === '' || user === null) {
      mensaje = 'Ingrese el usuario';
    } else if (password === '' || password === null) {
      mensaje = 'Ingrese la contraseña';
    }

    if (mensaje !== '') {
      toast.warning(mensaje);
      return;
    } else {
      validateUser();
    }
  };

  async function validateUser() {
    try {
      setIsLoading(true);
      onLoad();
      const res = await setLogin(user, password);
      setItem('infoUser', JSON.stringify(res), 'local');
      loggedIn();
      router.push('/gestion');
    } catch (error) {
      toast.error('Usuario / Contraseña no válidos');
    } finally {
      setIsLoading(false);
      offLoad();
    }
  }

  return (
    <div className="min-h-screen h-screen w-full flex fixed inset-0 overflow-hidden">
      {/* Panel izquierdo - Imagen industrial */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-shrink-0">
        {/* Imagen de fondo industrial */}
        <div className="absolute inset-0 bg-cover bg-center sidebar-image" />

        {/* Overlay azul */}
        <div className="absolute inset-0 bg-cover bg-center overlay-image" />
      </div>

      {/* Panel derecho - Formulario */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 flex-shrink-0">
        <div className="w-full max-w-md">
          {/* Header del formulario */}
          <div className="mb-8">
            {/* Icono */}
            <i className="logo-image"></i>

            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Iniciar Sesión</h2>
            <p className="gray-text text-sm">
              Ingresa con los datos que proporcionaste en el proceso de inscripción
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
              <input
                type="text"
                required
                value={user}
                placeholder="john.doe@gmail.com"
                onChange={(e) => setUser(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-7 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-all duration-200"
                />
                <div
                  className={cn(
                    'absolute top-1/2 right-2 -translate-y-1/2 bg-no-repeat bg-center cursor-pointer h-5 w-4',
                    showPassword ? 'icon-password' : 'icon-password-show'
                  )}
                  onClick={() => setShowPassword((prev) => !prev)}
                  title={showPassword ? 'Ocultar' : 'Mostrar'}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!user || !password || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors duration-200 disabled:bg-blue-400 
              disabled:cursor-not-allowed shadow-sm hover:shadow-md cursor-pointer"
            >
              {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>

            <div className="text-end">
              <button
                type="button"
                onClick={() => router.push('/forgotpassword')}
                className="text-sm text-gray-600  hover:text-gray transition-colors duration-200 cursor-pointer"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
