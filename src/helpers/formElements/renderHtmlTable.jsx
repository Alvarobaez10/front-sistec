import { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { defaultColDef, textGrid } from "@sistec/helpers/grid/UtilsGrid";
import configGrid from "@sistec/helpers/configGrid";
import Pagination from "@sistec/components/common/paginationComponent/Pagination";

/**
 * @typedef {Object} propsTable
 * @property {Array} columnas - Definicion de las columnas de la tabla
 * @property {Array} datos - Datos de la tabla
 * @property {boolean} enableAdd - Permite habilitar el boton Añadir nuevo elemento
 * @property {string} labelAgregar - Texto del boton para añadir nuevo elemento
 * @property {boolean} hasActions - Permite habilitar una columna de acciones para cada registro
 * @property {(updatedRows: Array) => {}} handleDatosFormUpdate - Funcion para actualizar los datos
 * @property {(accion: string, Datos: any, Form: any) => {}} handleAcciones - Funcion para manejar cada Accion en la columan Acciones
 * @property {string} fieldAction - Identificador del campo para las acciones
 * @property {boolean} enablePagination - Permite habilitar/Deshabilitar la paginacion
 * @property {() => {}} handleSearch - Funcion para consultar los datos al cambiar de pagina
 * @property {{ total: number, perPage: number, currentPage: number, lastPage: number}} meta - Objeto de metadatos de la paginacion
 * @property {string} customClass -  Clase personalizada para la tabla
 * @property {Array} acciones - Acciones que se mostraran en la columna de acciones
 * 
 */

/**
 * @param { propsTable } props
 * @returns
 */

export default function RenderHtmlTable({
  columnas = [],
  datos = [],
  enableAdd = false,
  labelAgregar = "Agregar",
  hasActions = false,
  handleDatosFormUpdate = () => {},
  handleAcciones = () => {},
  fieldAction = "",
  enablePagination = false,
  handleSearch = () => {},
  meta = {},
  customClass = "",
  acciones = {},
}) {
  const [columnasGrid, setColumnasGrid] = useState([]);
  const columnDefs = [];
  const gridRef = useRef();

  function buttonTableOptions(params) {
    const datos = params.data;
    const html = [];

    for (const accion in acciones) {
      const item = acciones[accion];
      html.push(
        <button
          key={accion + datos[fieldAction]}
          className="btn-icon"
          mytitle={item.title}
          onClick={(e) => handleAcciones(accion, datos, item.form)}
        >
          <span className={accion}></span>
        </button>
      );
    }

    return <div className="grid-actions-container">{html}</div>;
  }

  function handleCellValueChanged() {
    const updatedRows = [];
    gridRef.current.api.forEachNode((node) => {
      updatedRows.push(node.data);
    });
    handleDatosFormUpdate(updatedRows);
  }

  const tipoTraducido = {
    POINT: "Punto",
    POLYLINE: "Línea",
    POLYGON: "Polígono",
    RECTANGLE: "Rectángulo",
  };

  useEffect(() => {
    if (columnas) {
      let arrayColumnas;
      arrayColumnas = [...columnDefs];
      for (let i = 0; i < columnas.length; i++) {
        const item = columnas[i];
        const { visible, type = "", ...propsItem } = item;

        if (visible) {
          propsItem.width = item.width ?? 100;
          propsItem.minWidth = item.width ?? 100;
          propsItem["resizable"] = true;
          propsItem.cellClass = (params) => {
            const baseClass = "text-center-vertical";
            const isEditable = item.editable;
            return isEditable ? `${baseClass} celda-editable` : baseClass;
          };

          propsItem["cellRenderer"] = (params) => {
            if (item.field === "tipo") {
              return tipoTraducido[params.value] || params.value;
            }
            return textGrid(params.data[item["field"]], type);
          };

          arrayColumnas.push({ ...propsItem });
        }
      }

      if (hasActions && fieldAction) {
        arrayColumnas.push({
          headerName: "Acciones",
          minWidth: 100,
          field: fieldAction,
          cellRenderer: (params) => buttonTableOptions(params),
        });
      }
      setColumnasGrid([...arrayColumnas]);
    } else {
      setColumnasGrid([...columnas]);
    }
  }, [columnas]);

  function handleAgregar() {
    const newItem = {};

    gridRef.current.api.applyTransaction({
      add: [newItem],
      addIndex: 0,
    });

    gridRef.current.api.startEditingCell({
      rowIndex: 0,
      colKey: columnasGrid[0]?.field,
    });

    setTimeout(() => {
      const firstRowNode = gridRef.current.api.getDisplayedRowAtIndex(0);
      if (firstRowNode) {
        gridRef.current.api.startEditingCell({
          rowIndex: 0,
          colKey: columnasGrid[0]?.field,
        });
      }
    });
  }

  return (
    <div className="mb-3 w-full h-full">
      {enableAdd && (
        <ButtonAgregar handleAgregar={handleAgregar} labelAgregar={labelAgregar} />
      )}

      <div style={{ width: "100%" }}>
        <AgGridReact
          key="custom-table"
          ref={gridRef}
          gridOptions={configGrid()}
          columnDefs={[...columnasGrid]}
          defaultColDef={{ ...defaultColDef, editable: enableAdd }}
          rowData={datos || []}
          onCellValueChanged={handleCellValueChanged}
          overlayNoRowsTemplate={
            '<span class="mensaje-sin-resultados-grid">Sin resultados para mostrar</span>'
          }
          suppressCellSelection={false}
          suppressCellFocus={false}
          suppressColumnMoveAnimation={true}
          enableCellTextSelection={false}
          stopEditingWhenCellsLoseFocus={true}
          domLayout="autoHeight"
          className={`ag-customgrid ${customClass}`}
        />
      </div>

      {enablePagination && (
        <div className="container-pagination">
          <Pagination
            meta={meta}
            onclick={handleSearch}
            state={null}
            exportExcel={false}
            reportExcel={() => {}}
            description="elementos"
          />
        </div>
      )}
    </div>
  );
}

function ButtonAgregar({ handleAgregar, labelAgregar }) {
  const buttonStyles = {
    background: "none",
    border: "none",
    color: "#00a3e0",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: 0,
    cursor: "pointer",
  };

  return (
    <div className="flex justify-end mb-2">
      <button onClick={handleAgregar} style={buttonStyles}>
        <span style={{ fontSize: "18px", lineHeight: 1 }}>+</span> {labelAgregar}
      </button>
    </div>
  );
}
