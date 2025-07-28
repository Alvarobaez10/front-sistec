import React from 'react';

export default function Menu() {
  return (
    <aside className="section-menu">
      <nav>
        <ul className="space-y-2">
          <li>
            <a href="./inicio" className="block p-2 hover:bg-green-200 rounded">
              Inicio
            </a>
          </li>
          <li>
            <a href="perfil" className="block p-2 hover:bg-green-200 rounded">
              Perfil
            </a>
          </li>
          <li>
            <a href="configuracion" className="block p-2 hover:bg-green-200 rounded">
              Configuración
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
