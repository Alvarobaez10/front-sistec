import { LayoutGrid, Search, PlusSquare, Filter, Eraser, CardSim, Table } from 'lucide-react';

export default function AccionesBandeja({ handleAcciones, labelCreate, viewCard }) {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-2 text-blue-600 cursor-pointer">
        <Filter size={16} />
        <span className="text-sm font-medium">Más reciente</span>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-3 text-blue-600">
        {!viewCard ? (
          <button
            title="Vista cuadrícula"
            onClick={() => handleAcciones('vista')}
            className="hover:text-blue-800 cursor-pointer"
            type="button"
          >
            <LayoutGrid size={20} />
          </button>
        ) : (
          <button
            title="Vista tabla"
            onClick={() => handleAcciones('vista')}
            className="hover:text-blue-800 cursor-pointer"
            type="button"
          >
            <Table size={20} />
          </button>
        )}

        <button
          title="Limpiar"
          onClick={() => handleAcciones('limpiar')}
          className="hover:text-blue-800 cursor-pointer"
          type="button"
        >
          <Eraser size={20} />
        </button>

        <button
          title="Buscar"
          onClick={() => handleAcciones('buscar')}
          className="hover:text-blue-800 cursor-pointer"
          type="button"
        >
          <Search size={20} />
        </button>

        {labelCreate && (
          <button
            title={labelCreate}
            onClick={() => handleAcciones('nuevo')}
            className="hover:text-blue-800 cursor-pointer"
            type="button"
          >
            <PlusSquare size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
