import { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import configGrid from "@sistec/helpers/configGrid";
import { defaultColDef } from "@sistec/helpers/grid/UtilsGrid";
import IconsAcciones from "@sistec/components/common/IconsAcciones";

export default function RenderTable({
  data = [],
  columnas = [],
  options = {},
  hasAction = false,
  onAgregar,
  handleAcciones,
  onUpdate,
}) {
  const [columnasGrid, setColumnasGrid] = useState([]);
  const gridRef = useRef();


  function buttonTableOptions(params) {
    const datos = params.data;
    const acciones = datos?.acciones || {};
    return (
      <div className="flex flex-row gap-3 justify-center items-center">
        {Object.keys(acciones).map((accion) => {
          const item = acciones[accion];
          return (
            <button
              key={accion}
              className="text-blue-600 hover:text-blue-800"
              type="button"
              onClick={() => handleAcciones?.(accion, datos)}
              title={item?.title || accion}
            >
              <IconsAcciones accion={accion} />
            </button>
          );
        })}
      </div>
    );
  }

  useEffect(() => {
    const optionsByField = options.reduce((acc, curr) => {
      if (!acc[curr.field]) acc[curr.field] = [];
      acc[curr.field].push({ value: curr.value, label: curr.label });
      return acc;
    }, {});

    const cols = columnas.map((col) => {
      const colDef = {
        ...col,
        editable: col.disabled !== true,
        resizable: true,
        minWidth: 100,
        onCellValueChanged: handleCellValueChanged,
      };

      if (col.type === "select") {
        const opts = optionsByField[col.field];
        if (opts) {
          colDef.cellEditor = "agSelectCellEditor";
          colDef.cellEditorParams = { values: [null, ...opts.map((o) => o.value)] };
          colDef.valueFormatter = (params) => {
            if (col.disabled === true && (params.value == null || params.value === '')) {
              return '';
            }

            if (params.value == null) return "Seleccione";
            const found = opts.find((o) => o.value === params.value);
            return found ? found.label : params.value;
          };
        }
      }

      if (col.type === "text") {
        colDef.valueFormatter = (params) => {
          
          if (col.disabled === true && (params.value == null || params.value === '')) {
              return '';
            }

          if (params.value == null || params.value === '') {
            return 'Escribir';
          }
          return params.value;
        };
        
        colDef.cellEditor = 'agTextCellEditor';
        colDef.cellEditorParams = {
          placeholder: 'Escribir'
        };
      }

      if (col.type === "switch") {
        colDef.cellRenderer = (params) => (
          <input
            type="checkbox"
            checked={!!params.value}
            onChange={(e) => params.setValue(e.target.checked)}
          />
        );
      }

      return colDef;
    });

    if (hasAction) {
      cols.push({
        headerName: "Acciones",
        minWidth: 100,
        field: "acciones",
        cellRenderer: buttonTableOptions,
      });
    }

    setColumnasGrid(cols);
  }, [columnas, hasAction, options]);


  function handleCellValueChanged() {
    const updatedRows = [];
    gridRef.current.api.forEachNode((node) => updatedRows.push(node.data));
    onUpdate?.(updatedRows);
  }

  return (
    <div>
      {onAgregar && (
        <div className="mb-2 flex justify-end">
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => onAgregar()}
          >
            Agregar
          </button>
        </div>
      )}
      <div className="ag-theme-alpine ag-customgrid">
        <AgGridReact
          ref={gridRef}
          gridOptions={{
            ...configGrid(),
            rowSelection: "none",
            suppressRowHoverHighlight: false,
            stopEditingWhenCellsLoseFocus: true,
          }}
          columnDefs={columnasGrid}
          defaultColDef={{ ...defaultColDef, editable: true, cellClass: 'editable-cell' }}
          rowData={data}
          onCellValueChanged={handleCellValueChanged}
          overlayNoRowsTemplate={
            '<span class="mensaje-sin-resultados-grid">Sin resultados para mostrar</span>'
          }
          domLayout="autoHeight"
          className="ag-customgrid"
        />
      </div>
    </div>
  );
}
