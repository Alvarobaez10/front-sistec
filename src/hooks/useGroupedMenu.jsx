import { useMemo } from 'react';

export function useGroupedMenu(menu) {
  return useMemo(() => {
    return menu.reduce((acc, item) => {
      const group = acc.find(g => g.id_grupo === item.id_grupo);
      if (group) {
        group.formularios.push(item);
      } else {
        acc.push({
          id_grupo: item.id_grupo,
          grupo_nombre: item.grupo,
          formularios: [item],
        });
      }
      return acc;
    }, []);
  }, [menu]);
}
