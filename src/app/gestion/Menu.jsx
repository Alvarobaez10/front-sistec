'use client';
import { useRouter, usePathname } from 'next/navigation';

export default function Menu({ menuItems,  collapsed, setCollapsed }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (ruta) => {
    router.push(ruta);
  };

  console.log('Menu items:', menuItems);
  return (
    <aside className={`section-menu ${collapsed ? 'collapsed' : ''}`}>
      <nav>
        <div className="menu-header flex items-center justify-between">
          {collapsed ? ' ≡ ' : 'Home'}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="collapse-btn"
            title={collapsed ? 'Expandir menú' : 'Colapsar menú'}
          >
            {collapsed ? ' → ' : ' ← '}
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
