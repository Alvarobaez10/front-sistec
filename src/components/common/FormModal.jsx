import RenderForm from '@sistec/components/common/RenderForm';
import '@sistec/styles/form-modal.css';
import RenderTable from './RenderTable';

export default function FormModal({
  options,
  visible,
  onClose,
  setFormData,
  formData,
  loading,
  config,
  handleSubmit,
  selectedTitle,
}) {
  if (!visible) return null;

  function handleAgregar() {
    const key = config.table?.key || 'items';

    const fila = Object.fromEntries(
      (config.table.columnas || []).map((c) => {
        switch (c.type) {
          case 'switch':
            return [c.field, true];      // check activo por defecto
          case 'select':
            return [c.field, null];      // select vacío
          case 'text':
          default:
            return [c.field, ''];        // texto vacío
        }
      })
    );


    setFormData(prev => ({
      ...prev,
      [key]: prev?.[key] ? [...prev[key], fila] : [fila]
    }));
  }

  function handleUpdate(updatedRows) {
    const key = config.table.key;
    setFormData((prev) => ({
      ...prev,
      [key]: updatedRows,
    }));
  }

  return (
    <div key={'formModal'}>
      <div className="form-modal-overlay" onClick={onClose} />

      <div className="form-modal-container">
        <div className="form-modal">
          <div className="form-modal-header">
            <h2 className="form-modal-title">{selectedTitle || config.title || 'Formulario'}</h2>
            {onClose && (<button onClick={onClose} className="form-modal-close">
              ×
            </button>
            )}
          </div>

          <div className="form-modal-content">
            <div className={config.classNameContainerModal || "grid grid-cols-2 gap-4 mb-4"}>
              <RenderForm
                fields={config.fields}
                options={options}
                datosForm={formData}
                setDatosForm={setFormData}
                origin="modal"
              />
            </div>


            {config.table && (
              <>
                <div className="ag-theme-alpine content-grid" />
                <RenderTable
                  data={formData[config.table.key] || []}
                  columnas={config.table.columnas || []}
                  options={options}
                  hasAction={!!config.table?.hasAction}
                  onAgregar={handleAgregar}
                  onUpdate={handleUpdate}
                />
              </>
            )}

          </div>

          <div className="form-modal-buttons">
            {onClose && (<button onClick={onClose} className="form-modal-cancel" disabled={loading}>
              Cancelar
            </button>
            )}
            <button
              onClick={handleSubmit}
              className={`form-modal-save ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
