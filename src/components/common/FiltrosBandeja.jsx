import { useState } from 'react';
import RenderForm from '@sistec/components/common/RenderForm';
import AccionesBandeja from './AccionesBandeja';
import FormModal from '@sistec/components/common/FormModal';

export default function FiltrosBandeja({
  handleAcciones,
  config,
  setFilters,
  dataFilters,
  viewCard,
}) {


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
          viewCard={viewCard}
          handleAcciones={handleAcciones}
          labelCreate={config?.nuevoModal?.title}
        />
      </form>
    </div>
  );
}
