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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    offLoad();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword) return toast.warning('Ingrese la nueva contraseña');
    if (!confirmPassword) return toast.warning('Confirme la nueva contraseña');
    if (newPassword !== confirmPassword) return toast.warning('Las contraseñas no coinciden');
    if (newPassword.length < 6) return toast.warning('La contraseña debe tener al menos 6 caracteres');

    try {
      setIsLoading(true);
      onLoad();
      setTimeout(() => {
        offLoad();
        toast.success('Contraseña actualizada correctamente');
        router.push('/login');
      }, 2000);
    } catch {
      offLoad();
      toast.error('Error al actualizar la contraseña');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-screen w-full flex fixed inset-0 overflow-hidden">
      {/* Panel izquierdo - Imagen industrial */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-shrink-0">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 bg-cover bg-center sidebar-image" />
        {/* Overlay azul */}
        <div className="absolute inset-0 bg-cover bg-center overlay-image" />
      </div>

      {/* Panel derecho - Formulario */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 flex-shrink-0">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Recuperar Contraseña
            </h2>
            <p className="text-gray-600 text-sm">
              Ingresa tu nueva contraseña para restablecer el acceso
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nueva Contraseña
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repite Contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-all duration-200"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {isLoading ? 'Guardando...' : 'Cambiar Contraseña'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => router.push('/login')}
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Volver al inicio de sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
