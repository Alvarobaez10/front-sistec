import { useEffect, useState, Fragment } from 'react';
import { createPortal } from 'react-dom';
import RenderForm from '@sistec/components/common/RenderForm';
import '@sistec/styles/form-modal.css';

export default function FormModal({
  options,
  visible,
  onClose,
  setFormData,
  formData,
  loading,
  config,
  success = false,
  handleSubmit,
}) {
  if (!visible) return null;

  return (
    <div key={'formModal'}>
      <div className="form-modal-overlay" onClick={onClose} />

      <div className="form-modal-container">
        <div className="form-modal">
          <div className="form-modal-header">
            <h2 className="form-modal-title">{config.title ?? 'Formulario'}</h2>
            <button onClick={onClose} className="form-modal-close">
              ×
            </button>
          </div>

          <div className="form-modal-content">
            {success && (
              <div className="form-modal-success">
                <div className="form-modal-success-title">Operación exitosa</div>
                <div>Información almacenada de manera correcta</div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-4">
              <RenderForm
                fields={config.fields}
                options={options}
                datosForm={formData}
                setDatosForm={setFormData}
                origin="modal"
              />
            </div>
          </div>

          <div className="form-modal-buttons">
            <button onClick={onClose} className="form-modal-cancel" disabled={loading}>
              Cancelar
            </button>
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
