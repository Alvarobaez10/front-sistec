import configGrid from '@sistec/helpers/configGrid';
import { defaultColDef, textGrid } from '@sistec/helpers/grid/UtilsGrid';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from 'react';

export default function Table({ resultados, config }) {
  const [columnasGrid, setColumnasGrid] = useState([]);


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
