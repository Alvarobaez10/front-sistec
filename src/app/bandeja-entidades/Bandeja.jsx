'use client';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Table from './Table';
import Cards from './Card';
import FormModal from '@sistec/components/common/FormModal';
import { useApp } from '@sistec/context/AppContext';
import { el } from 'date-fns/locale';
import validarObligatorios from '@sistec/helpers/validarObligatorios';
import { toast } from 'react-toastify';

const FiltrosBandeja = dynamic(() => import('@sistec/components/common/FiltrosBandeja'), {
  ssr: false,
});

export default function Bandeja({ config }) {
  const { offLoad, onLoad, loading } = useApp();

  const [filterData, setFilterData] = useState({});
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [viewCard, setViewCard] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    setFormData({});
  }, [mostrarModal]);

  function setFilters(info) {
    setFilterData((prev) => ({ ...prev, ...info }));
  }

  function handleChangeFormData(info) {
    setFormData((prev) => ({ ...prev, ...info }));

    let fieldsHidden = [];
    let fieldsShow = [];
    const idTipoPersona = info?.id_dom_tipo_persona ? info?.id_dom_tipo_persona : '0';
    if (String(idTipoPersona) === '2') {
      fieldsHidden = config.nuevoModal.fieldsNatural;
      fieldsShow = config.nuevoModal.fieldsJuridica;
    } else {
      fieldsShow = config.nuevoModal.fieldsNatural;
      fieldsHidden = config.nuevoModal.fieldsJuridica;
    }

    for (const keyField in config.nuevoModal.fields) {
      if (fieldsHidden.includes(keyField)) {
        if (!config.nuevoModal.fields[keyField].classContainer.includes('hidden')) {
          config.nuevoModal.fields[keyField].classContainer += ' hidden';
          config.nuevoModal.fields[keyField].hidden = true;
        }
      }
      if (fieldsShow.includes(keyField)) {
        if (config.nuevoModal.fields[keyField].classContainer.includes('hidden')) {
          config.nuevoModal.fields[keyField].classContainer = config.nuevoModal.fields[
            keyField
          ].classContainer.replaceAll('hidden', '');
          config.nuevoModal.fields[keyField].hidden = false;
        }
      }
    }
  }

  function handleAcciones(accion, item) {
    if (accion === 'nuevo') {
      setMostrarModal(true);
    } else if (accion === 'limpiar') {
      limpiarCampos();
    } else if (accion === 'buscar') {
      handleSearch();
    } else if (accion === 'vista') {
      setViewCard(!viewCard);
    }
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

  async function handleSubmit() {
    try {
      let mensaje = validarObligatorios({ fields: config.nuevoModal.fields }, formData);
      if (mensaje) {
        toast.warning(mensaje);
        return;
      }
      onLoad();
      console.log('Guardar', formData);
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      offLoad();
    }
  }

  if (!config) return null;

  return (
    <div className="w-full p-2">
      {/* Filtros */}
      <FiltrosBandeja
        handleAcciones={handleAcciones}
        config={config}
        setFilters={setFilters}
        dataFilters={filterData}
        viewCard={viewCard}
      />

      <FormModal
        options={config.options ?? []}
        visible={mostrarModal}
        onClose={() => setMostrarModal(false)}
        config={config.nuevoModal}
        handleSubmit={handleSubmit}
        loading={loading}
        setFormData={handleChangeFormData}
        formData={formData}
        success={false}
      />

      {/* Resultados (tabla o tarjetas) */}
      <div className="p-4">
        {loading ? (
          <div className="text-center text-gray-500">Cargando datos...</div>
        ) : viewCard ? (
          <Cards data={data} config={config} />
        ) : (
          <Table config={config} data={data} onEdit={handleEdit} />
        )}
      </div>
    </div>
  );
}
