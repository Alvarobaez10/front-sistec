import configGrid from '@sistec/helpers/configGrid';
import { defaultColDef, textGrid } from '@sistec/helpers/grid/UtilsGrid';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from 'react';
import IconsAcciones from '@sistec/components/common/IconsAcciones';

export default function Table({ resultados, config, handleAcciones }) {
  const [columnasGrid, setColumnasGrid] = useState([]);

  const columnDefs = [];

  function buttonTableOptions(params) {
    const datos = params.data;
    const html = [];
    const acciones = typeof datos.acciones === 'string' ? JSON.parse(datos.acciones) : datos.acciones;

    for (const accion in acciones) {
      const item = acciones[accion];
      html.push(
        <button
          className="text-blue-600 hover:text-blue-800 cursor-pointer"
          type="button"
          key={accion}
          onClick={() => handleAcciones(accion, datos)}
          title={item.title || accion}
        >
          <IconsAcciones accion={accion} />
        </button>
      );
    }
    return (
      <div className="flex flex-row gap-3 h-full flex justify-center items-center">{html}</div>
    );
  }

  useEffect(() => {
    const columnas = [...config.columnas];
    if (!columnas) return;

    const arrayColumnas = columnas
      .filter(item => item.visible)
      .map(item => ({
        ...item,
        minWidth: 100,
        resizable: true,
        cellRenderer: (params) => {
          const value = params.data[item.field];
          return typeof value === 'boolean' ? (value ? 'Activo' : 'Inactivo') : textGrid(value);
        },
      }));

    arrayColumnas.push({
      headerName: 'Acciones',
      minWidth: 100,
      field: 'id_contrato',
      cellRenderer: (params) => buttonTableOptions(params),
    });

    setColumnasGrid(arrayColumnas);
  }, [config]);


  return (
    <AgGridReact
      key={'grid'}
      gridOptions={{
        ...configGrid(),
        suppressCellFocus: true,
        suppressRowHoverHighlight: true,
        rowSelection: 'none',
      }}
      enableCellTextSelection={false}
      columnDefs={[...columnasGrid]}
      defaultColDef={defaultColDef}
      rowData={resultados ?? []}
      overlayNoRowsTemplate={
        '<span class="mensaje-sin-resultados-grid">Sin resultados para mostrar</span>'
      }
      suppressCellSelection={true}
      suppressCellFocus={false}
      suppressColumnMoveAnimation={true}
      className="ag-customgrid"
    ></AgGridReact>
  );
}
