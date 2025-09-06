export default function Cards({ data = [], config, onEdit }) {
  const visibleColumns = config?.columnas?.filter(col => col.visible) || [];

  if (!data || data.length === 0) {
    return <div className="p-8 text-center text-gray-500">Sin resultados para mostrar</div>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div
            key={item[config?.campo_pk || 'id'] || index}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
          >
            {/* Título principal */}
            <div className="mb-2 font-medium text-gray-700">
              {visibleColumns[0] ? item[visibleColumns[0].field] : 'Registro'}
            </div>

            {/* Campos visibles */}
            <div className="space-y-1 mb-2">
              {visibleColumns.slice(0, 4).map(col => (
                <div key={col.field}>
                  <span className="text-xs text-gray-500">{col.headerName}:</span>{' '}
                  <span className="text-sm text-gray-900">{item[col.field] || '-'}</span>
                </div>
              ))}
            </div>

            {/* Botón editar */}
            {onEdit && (
              <div className="text-right">
                <button
                  onClick={() => onEdit(item[config?.campo_pk || 'id'], item)}
                  className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Editar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Info de resultados */}
      <div className="mt-4 text-center text-sm text-gray-500">
        {data.length} registro{data.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
