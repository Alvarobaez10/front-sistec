'use client';
import { useApp } from '@sistec/context/AppContext';
import { useGroupedMenu } from '@sistec/hooks/useGroupedMenu';
import MenuGroup from '@sistec/components/common/MenuGroup';
import '../../styles/menu.css';

export default function Menu() {
  const { menu, openForm, loadedForms } = useApp();
  const groupedMenu = useGroupedMenu(menu);
  const activeForm = loadedForms.find(form => form.visible);
  const activeFormId = activeForm?.id_form;

  const handleClick = (item) => {
    openForm({
      id_form: item.id_formulario.toString(),
      label: item.formulario,
      url: item.enlace,
      visible: true,
    });
  };

  return (
    <aside className="section-menu">
      <div className="logo-container">
        <div className="logo-image"></div>
        <span className="brand-name">SAC</span>
      </div>

      <div className="menu-content">
        <nav>
          <ul>
            {groupedMenu.map(grupo => (
              <MenuGroup
                key={grupo.id_grupo}
                grupo={grupo}
                activeFormId={activeFormId}
                onSelect={handleClick}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
