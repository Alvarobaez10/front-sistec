import { useEffect, useState, Fragment } from "react";
import { createPortal } from "react-dom";
import RenderForm from "@sistec/components/common/RenderForm";
import "@sistec/styles/form-modal.css";

export default function FormModal({
    options,
    visible,
    onClose,
    title = "Formulario",
    fields = {},
    initialData = {},
    onSubmit,
    loading = false,
    success = false,
}) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (visible) {
            setFormData(initialData || {});
        }
    }, [visible, initialData]);

    const handleSave = () => {
        if (onSubmit) onSubmit(formData);
    };

    if (!visible) return null;

    return createPortal(
        <Fragment>
            <div className="form-modal-overlay" onClick={onClose} />

            {/* Modal */}
            <div className="form-modal-container">
                <div className="form-modal">
                    
                    {/* Botón de cerrar */}
                    <button onClick={onClose} className="form-modal-close">
                        ×
                    </button>
                     <h2 className="form-modal-title">{title}</h2>

                    {/* Alerta verde si éxito */}
                    {success && (
                        <div className="form-modal-success">
                            <div className="form-modal-success-title">Operación exitosa</div>
                            <div>Información almacenada de manera correcta</div>
                        </div>
                    )}

                    <div className="form-modal-grid">
                        <RenderForm
                            fields={fields}
                            options={options}
                            datosForm={formData}
                            setDatosForm={setFormData}
                            origin="modal"
                        />
                    </div>

                    {/* Botones */}
                    <div className="form-modal-buttons">
                        <button
                            onClick={onClose}
                            className="form-modal-cancel"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            className={`form-modal-save ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>,
        document.body
    );
}