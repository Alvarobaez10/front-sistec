'use client';

import { useApp } from '@sistec/context/AppContext';
import useStorage from '@sistec/hooks/useStorage';
import setLogin from '@sistec/services/login/setLogin';
import validateSession from '@sistec/services/login/validateSession';
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
      toast.warning('Ingrese el usuario');
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
      router.push('/inicio');
    } catch (error) {
      offLoad();
      toast.error('Usuario / Contraseña no válidos');
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-6">Iniciar sesión</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-green-800 font-medium mb-1">Usuario</label>
            <input
              type="text"
              required
              value={user}
              placeholder="Usuario"
              onChange={(e) => setUser(e.target.value)}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-green-800 font-medium mb-1">Contraseña</label>
            <input
              type="password"
              required
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={!user || !password}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition disabled:bg-green-600/50"
          >
            Ingresar
          </button>
        </form>

        {/* <p className="text-sm text-center text-green-700 mt-4">
          ¿No tienes cuenta?{" "}
          <a href="#" className="text-green-800 font-semibold hover:underline">
            Regístrate
          </a>
        </p> */}
      </div>
    </div>
  );
}
