'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Menu() {
  const router = useRouter();

  const handleNavigate = (ruta) => {
    router.push(ruta);
  };

  return (
    <aside className="section-menu">
      <nav>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleNavigate('/gestion/formulario')}
              className="block w-full text-left p-2 hover:bg-green-200 rounded"
            >
              Inicio
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate('/perfil')}
              className="block w-full text-left p-2 hover:bg-green-200 rounded"
            >
              Perfil
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate('/configuracion')}
              className="block w-full text-left p-2 hover:bg-green-200 rounded"
            >
              Configuración
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
