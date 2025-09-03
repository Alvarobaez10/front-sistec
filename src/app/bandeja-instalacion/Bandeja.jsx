'use client';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Table from './Table';
import Cards from './Card';

const FiltrosBandeja = dynamic(
  () => import('@sistec/components/common/FiltrosBandeja'),
  { ssr: false }
);

export default function Bandeja({config}) {
  const [datosForm, setDatosForm] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewCard, setViewCard] = useState(false);
  const router = useRouter();

  function setFilters(info) {
    setDatosForm(prev => ({ ...prev, ...info }));
  }

  function handleSubmitNuevoRegistro(data) {
   //FALTA GUARDAR

  // Simulando éxito
  return { success: true }; 
}



  async function handleSearch() {
  //FALTA BUSCAR
  }

  function limpiarCampos() {
    setDatosForm({});
    setData([]);
  }

  function handleEdit(id, item) {
//FALTA EDITAR
  }

  if (!config) return null;

  return (
    <div className="w-full p-2">
      {/* Filtros */}
      <FiltrosBandeja
        handleSearch={handleSearch}
        limpiarCampos={limpiarCampos}
        config={config}
        setFilters={setFilters}
        dataFilters={datosForm}
        setViewCard={setViewCard}
        viewCard={viewCard}
        showTable={true}
        onSubmitNuevo={handleSubmitNuevoRegistro}
      />

      {/* Resultados (tabla o tarjetas) */}
      <div className="p-4">
        {loading ? (
          <div className="text-center text-gray-500">Cargando datos...</div>
        ) : (
          viewCard ? (
            <Cards data={data} config={config} />
          ) : (
            <Table config={config} data={data} onEdit={handleEdit} />
          )
        )}
      </div>
    </div>
  );
}
