import { useState } from "react";
import RenderForm from "@sistec/components/common/RenderForm";
import AccionesBandeja from "./AccionesBandeja";
import FormModal from "@sistec/components/common/FormModal";

export default function FiltrosBandeja({
  handleSearch,
  setViewCard,
  viewCard,
  limpiarCampos,
  config,
  setFilters,
  dataFilters,
  showTable = true,
  onSubmitNuevo,
}) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const abrirFormularioNuevo = () => {
    setMostrarModal(true);
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      const result = await onSubmitNuevo?.(formData);
      if (result?.success) {
        setSuccess(true);
        setTimeout(() => {
          setMostrarModal(false);
          setSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error al guardar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="filtersContainer" className="w-full p-2 border-gray-200">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
        }}
        className="space-y-4"
      >
        {/* Filtros principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <RenderForm
            key="formfilters"
            fields={config.filtros}
            options={config.options}
            setDatosForm={setFilters}
            datosForm={dataFilters}
            origin="resultados"
          />
        </div>

        {/* Acciones visibles */}
        <AccionesBandeja
          handleSearch={handleSearch}
          setViewCard={setViewCard}
          viewCard={viewCard}
          onCreateNew={abrirFormularioNuevo}
          labelCreate={config.nuevoModal?.title}
          showTable={showTable}
        />
      </form>

      {/* Modal dinámico */}
      {config?.nuevoModal && (
        <FormModal
          options={config.options ?? []}
          visible={mostrarModal}
          onClose={() => setMostrarModal(false)}
          title={config.nuevoModal?.title || "Registrar"}
          fields={config.nuevoModal?.fields}
          initialData={{}}
          onSubmit={handleSubmit}
          loading={loading}
          success={success}
        />
      )}
    </div>
  );
}
