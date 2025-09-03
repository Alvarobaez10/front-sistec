import { LayoutGrid, RefreshCw, Search, PlusSquare, Filter } from 'lucide-react';

export default function AccionesBandeja({
  handleSearch,
  setViewCard,
  viewCard,
  onCreateNew,
  labelCreate = 'Crear nuevo',
  showTable = true,
}) {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-2 text-blue-600">
        <Filter size={16} />
        <span className="text-sm font-medium">Más reciente</span>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-3 text-blue-600">
        {showTable && (
          <button
            title="Vista cuadrícula"
            onClick={() => setViewCard(!viewCard)}
            className="hover:text-blue-800"
            type="button"
          >
            <LayoutGrid size={18} />
          </button>
        )}

        <button
          title="Recargar"
          onClick={handleSearch}
          className="hover:text-blue-800"
          type="button"
        >
          <RefreshCw size={18} />
        </button>

        <button
          title="Buscar"
          onClick={handleSearch}
          className="hover:text-blue-800"
          type="button"
        >
          <Search size={18} />
        </button>

          <button
            title={labelCreate}
            onClick={onCreateNew}
            className="hover:text-blue-800"
            type="button"
          >
            <PlusSquare size={18} />
          </button>
    
      </div>
    </div>
  );
}
