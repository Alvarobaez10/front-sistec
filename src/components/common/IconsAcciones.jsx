import { CardSim, Edit, Eraser, Eye, PlusSquare, Search, Trash2 } from 'lucide-react';

export default function IconsAcciones({ accion }) {
  if (accion === 'nuevo') {
    return <PlusSquare size={20} />;
  } else if (accion === 'buscar') {
    return <Search size={20} />;
  } else if (accion === 'limpiar') {
    return <Eraser size={20} />;
  } else if (accion === 'editar') {
    return <Edit size={20} />;
  } else if (accion === 'ver') {
    return <Eye size={20} />;
  } else if (accion === 'eliminar') {
    return <Trash2 size={20} />;
  } else if (accion === 'vista') {
    return <CardSim size={20} />;
  } else {
    return <></>;
  }
}
