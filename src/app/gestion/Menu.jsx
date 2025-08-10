'use client';
import { useRouter, usePathname } from 'next/navigation';

export default function Menu({ collapsed, setCollapsed }) {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { label: 'Inicio', path: '/gestion/formulario', icon: '🏠' },
    { label: 'Zona de pesaje', path: '/zona-pesaje', category: 'Apertura de punto', icon: '⚖️' },
    { label: 'Actualizar precios', path: '/actualizar-precios', category: 'Valor de compra', icon: '💲' },
    { label: 'Crear usuarios', path: '/crear-usuarios', category: 'Administrador', icon: '👤' },
    { label: 'Registrar entidad', path: '/registrar-entidad', icon: '🏢' },
    { label: 'Registro de entidad', path: '/registro-entidad', category: 'Asociados', icon: '📄' },
    { label: 'Registro reciclador', path: '/registro-reciclador', icon: '♻️' },
    { label: 'Registro instalación', path: '/registro-instalacion', icon: '🏭' },
    { label: 'Registro de vehículo', path: '/registro-vehiculo', icon: '🚗' },
    { label: 'Registrar clientes', path: '/registrar-clientes', category: 'Clientes', icon: '🧑‍🤝‍🧑' },
    { label: 'Perfil', path: '/perfil', icon: '🧑' },
    { label: 'Configuración', path: '/configuracion', icon: '⚙️' }
  ];

  const handleNavigate = (ruta) => {
    router.push(ruta);
  };

  return (
    <aside className={`section-menu ${collapsed ? 'collapsed' : ''}`}>
      <nav>
        <div className="menu-header flex items-center justify-between">
          {collapsed ? '≡' : 'Home'}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="collapse-btn"
            title={collapsed ? 'Expandir menú' : 'Colapsar menú'}
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            const isMainItem = item.label === 'Inicio';

            return (
              <li key={item.path}>
                {item.category && !collapsed && (
                  <div className="menu-category">{item.category}</div>
                )}
                <button
                  onClick={() => handleNavigate(item.path)}
                  className={`menu-item ${isActive ? 'active' : ''} ${isMainItem ? 'main-item' : ''}`}
                >
                  <span className="menu-icon">{item.icon}</span>
                  {!collapsed && item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
