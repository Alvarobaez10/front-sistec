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

            <div className="form-modal-container">
                <div className="form-modal">

                    <div className="form-modal-header">
                        <h2 className="form-modal-title">{title}</h2>
                        <button onClick={onClose} className="form-modal-close">×</button>
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
                                fields={fields}
                                options={options}
                                datosForm={formData}
                                setDatosForm={setFormData}
                                origin="modal"
                            />
                        </div>
                    </div>

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
