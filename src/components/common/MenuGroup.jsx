export default function MenuGroup({ grupo, activeFormId, onSelect }) {
  return (
    <li key={grupo.id_grupo}>
      <h3>{grupo.grupo_nombre}</h3>
      <ul>
        {grupo.formularios.map(item => (
          <li key={item.id_formulario}>
            <button
              onClick={() => onSelect(item)}
              className={activeFormId === String(item.id_formulario) ? 'active' : ''}
              aria-current={activeFormId === String(item.id_formulario) ? 'page' : undefined}
            >
              {item.formulario}
            </button>
          </li>
        ))}
      </ul>
    </li>
  );
}
