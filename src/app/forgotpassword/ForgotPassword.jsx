'use client';
import { useApp } from '@sistec/context/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const { onLoad, offLoad } = useApp();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

   useEffect(() => {
     offLoad();
   }, []);

  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    let mensaje = '';
    if (newPassword === '' || newPassword === null) {
      mensaje = 'Ingrese la nueva contraseña';
    } else if (confirmPassword === '' || confirmPassword === null) {
      mensaje = 'Confirme la nueva contraseña';
    } else if (newPassword !== confirmPassword) {
      mensaje = 'Las contraseñas no coinciden';
    } else if (newPassword.length < 6) {
      mensaje = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (mensaje !== '') {
      toast.warning(mensaje);
      return;
    } else {
      updatePassword();
    }
  };

  async function updatePassword() {
    try {
      onLoad();
      setTimeout(() => {
        offLoad();
        toast.success('Contraseña actualizada correctamente');
        router.push('/login');
      }, 2000);
      
    } catch (error) {
      offLoad();
      toast.error('Error al actualizar la contraseña');
    }
  }

  const handleBackToLogin = () => {
    router.push('/login');
  };

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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2m6 0V7a2 2 0 00-2-2H9a2 2 0 00-2 2v0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0h6" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold mb-2">Recuperación Segura</h1>
                <p className="text-lg opacity-90">Restablece tu Acceso</p>
                <div className="mt-8 space-y-2 text-sm opacity-80">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Proceso Seguro</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Encriptación Avanzada</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Acceso Inmediato</span>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2m6 0V7a2 2 0 00-2-2H9a2 2 0 00-2 2v0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0h6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Recuperar Contraseña</h2>
              <p className="text-gray-600 text-sm">Ingresa tu nueva contraseña para restablecer tu acceso</p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nueva Contraseña</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  placeholder="••••••••••••"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Repetir Contraseña</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              </div>

              {/* Indicadores de seguridad */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-2 font-medium">Requisitos de la contraseña:</p>
                <div className="space-y-1 text-xs">
                  <div className={`flex items-center space-x-2 ${newPassword.length >= 6 ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${newPassword.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span>Mínimo 6 caracteres</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${newPassword === confirmPassword && newPassword !== '' ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${newPassword === confirmPassword && newPassword !== '' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span>Las contraseñas coinciden</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!newPassword || !confirmPassword}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Cambiar Contraseña
              </button>
            </form>

            {/* Volver al login */}
            <div className="mt-6 text-center">
              <button 
                onClick={handleBackToLogin}
                className="text-sm text-green-600 hover:text-green-800 font-medium flex items-center justify-center space-x-1 mx-auto"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Volver al inicio de sesión</span>
              </button>
            </div>
            {/* Footer del formulario */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Tu información está protegida con encriptación de nivel empresarial
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}