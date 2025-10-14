import configGrid from '@sistec/helpers/configGrid';
import { defaultColDef, textGrid } from '@sistec/helpers/grid/UtilsGrid';
import { AgGridReact } from 'ag-grid-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import IconsAcciones from '@sistec/components/common/IconsAcciones';

export default function Table({ resultados, config, handleAcciones }) {
  const [columnasGrid, setColumnasGrid] = useState([]);

  const columnDefs = [];

  function buttonTableOptions(params) {
    const datos = params.data;
    const html = [];

    html.push(
      <button
        className="text-blue-600 hover:text-blue-800 cursor-pointer"
        type="button"
        key={'editar'}
        onClick={() => handleAcciones('editar', datos)}
        title={'Editar'}
      >
        <IconsAcciones accion={'editar'} />
      </button>
    );

    return (
      <div className="flex flex-row gap-3 h-full flex justify-center items-center">{html}</div>
    );
  }

  useEffect(() => {
    let arrayColumnas;
    const columnas = [...config.columnas];
    if (columnas) {
      arrayColumnas = [...columnDefs];
      for (let i = 0; i < columnas.length; i++) {
        const item = columnas[i];
        const { visible, ...propsItem } = item;
        if (visible) {
          propsItem.minWidth = 100;
          propsItem['resizable'] = true;
          propsItem['cellRenderer'] = (params) => textGrid(params.data[item['field']]);
          arrayColumnas.push({ ...propsItem });
        }
      }

      arrayColumnas.push({
        headerName: 'Acciones',
        minWidth: 100,
        field: 'id_contrato',
        cellRenderer: (params) => buttonTableOptions(params), //para invocar la función que devuelve el icono (Ver)
      });
      setColumnasGrid([...arrayColumnas]);
    }
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
