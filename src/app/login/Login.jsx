'use client';

import { useApp } from '@sistec/context/AppContext';
import useStorage from '@sistec/hooks/useStorage';
import setLogin from '@sistec/services/login/setLogin';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Login() {
  const { onLoad, offLoad, loggedIn } = useApp();
  const { setItem } = useStorage();
  const router = useRouter();
  const [user, setUser] = useState('admin-sac');
  const [password, setPassword] = useState('12345*');

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
      onLoad();
      const res = await setLogin(user, password);
      setItem('infoUser', JSON.stringify(res), 'local');
      loggedIn();
      router.push('/gestion');
    } catch (error) {
      offLoad();
      toast.error('Usuario / Contraseña no válidos');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-4xl w-full flex">
        {/* Lado izquierdo - Imagen */}
        <div className="hidden md:flex md:w-1/2 relative">
          <div className="absolute inset-0 bg-green-600 opacity-80"></div>
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3Cpattern id='industrial' patternUnits='userSpaceOnUse' width='100' height='100'%3E%3Crect width='100' height='100' fill='%2316a34a'/%3E%3Cpath d='M0 40h40v20H0zM60 40h40v20H60z' fill='%23ffffff' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23industrial)'/%3E%3C/svg%3E")`
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center p-8">
                <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold mb-2">Sistema de Gestión</h1>
                <p className="text-lg opacity-90">Plataforma Industrial</p>
                <div className="mt-8 space-y-2 text-sm opacity-80">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Gestión de Procesos</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Control de Calidad</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Reportes en Tiempo Real</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lado derecho - Formulario */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Iniciar Sesión</h2>
              <p className="text-gray-600 text-sm">Ingresa con tus datos para acceder al portal de inscripción</p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
                <input
                  type="text"
                  required
                  value={user}
                  placeholder="john.doe@gmail.com"
                  onChange={(e) => setUser(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <span className="ml-2 text-sm text-gray-600">Recordar contraseña</span>
                </label>
                {/* <a href="#" className="text-sm text-green-600 hover:text-green-800 font-medium">
                  ¿Olvidaste tu contraseña?
                </a> */}
              </div>

              <button
                type="submit"
                disabled={!user || !password}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Iniciar Sesión
              </button>
            </form>

            {/* Footer del formulario */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Al iniciar sesión, aceptas nuestros{' '}
                <a href="#" className="text-green-600 hover:underline">términos y condiciones</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}