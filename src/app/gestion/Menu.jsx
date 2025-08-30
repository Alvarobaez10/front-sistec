'use client';
import { useApp } from '@sistec/context/AppContext';

export default function Menu() {
  const { menu, openForm } = useApp();

  const handleClick = (item) => {
    const form = {
      id_form: item.id_formulario.toString(),
      label: item.nombre,
      url: item.enlace,
      visible: true,
    };

    openForm(form);
  };

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {menu.map((item) => (
            <li key={item.id_formulario}>
              <button onClick={() => handleClick(item)}>{item.nombre}</button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
