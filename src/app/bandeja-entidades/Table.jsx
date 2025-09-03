import '@sistec/styles/grid.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function Table({ data = [], config, onEdit }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = config?.limit || 6;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const visibleColumns = config?.columnas?.filter(col => col.visible) || [];

  const handlePageChange = (page) => setCurrentPage(page);

  const handleEdit = (item) => {
    if (onEdit) onEdit(item[config?.campo_pk || 'id'], item);
  };

  const renderCellValue = (value) => (value === null || value === undefined || value === '' ? '-' : String(value));


  function EstadoBadge({ value }) {
    const isActive = ['Activo', 'ACTIVO'].includes(value);
    return (
      <span className={`cell-badge ${isActive ? 'badge-active' : 'badge-inactive'}`}>
        {renderCellValue(value)}
      </span>
    );
  }

  function ActionsCell({ item }) {
    if (item.acciones) {
      const acciones = typeof item.acciones === 'string' ? JSON.parse(item.acciones) : item.acciones;
      return (
        <div className="table-actions">
          {Object.entries(acciones).map(([key, accion]) => (
            <button
              key={key}
              onClick={() => onEdit && onEdit(key, item[config?.campo_pk || 'id'], accion.form)}
              className="btn-default"
              title={accion.title || key}
            >
              {accion.title || key}
            </button>
          ))}
        </div>
      );
    }

    return (
      <div className="table-actions">
        <button
          onClick={() => handleEdit(item)}
          className="btn-default"
          title="Editar registro"
        >
          Editar
        </button>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <table className="table">
          <thead className="table-head">
            <tr>
              {visibleColumns.map(column => (
                <th key={column.field} className="table-head-cell">
                  {column.headerName}
                </th>
              ))}
              <th className="table-head-cell">Acciones</th>
            </tr>
          </thead>

          <tbody className="table-body">
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={visibleColumns.length + 1} className="no-results">
                  Sin resultados para mostrar
                </td>
              </tr>
            ) : (
              currentData.map((item, index) => (
                <tr key={item[config?.campo_pk || 'id'] || index} className="table-row">
                  {visibleColumns.map(column => (
                    <td key={column.field} className="table-cell">
                      {column.field === 'estado' ? (
                        <EstadoBadge value={item[column.field]} />
                      ) : (
                        <span title={renderCellValue(item[column.field])}>
                          {renderCellValue(item[column.field])}
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="table-cell">
                    <ActionsCell item={item} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination-wrapper">
          <div className="pagination-controls">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
              title="Página anterior"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`pagination-page ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="pagination-btn"
              title="Página siguiente"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {data.length > 0 && (
        <div className="pagination-info">
          Mostrando {startIndex + 1} a {Math.min(endIndex, data.length)} de {data.length} registros
        </div>
      )}
    </div>
  );
}
