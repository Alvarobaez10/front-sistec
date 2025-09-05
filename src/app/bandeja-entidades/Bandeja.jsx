'use client';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Table from './Table';
import Cards from './Card';
import FormModal from '@sistec/components/common/FormModal';
import { useApp } from '@sistec/context/AppContext';
import { el, id } from 'date-fns/locale';
import validarObligatorios from '@sistec/helpers/validarObligatorios';
import { toast } from 'react-toastify';
import { putData } from '@sistec/services/common/gestionarInformacion';
import { showConfirm } from '@sistec/components/common/ConfirmToast';

const FiltrosBandeja = dynamic(() => import('@sistec/components/common/FiltrosBandeja'), {
  ssr: false,
});

export default function Bandeja({ config, codigoConfig }) {
  const { offLoad, onLoad, loading, getToken } = useApp();

  const [filterData, setFilterData] = useState({});
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [viewCard, setViewCard] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idEdition, setIdEdition] = useState(0);

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
    } else if (accion === 'editar') {
      handleEdit(item);
    }
  }

  function handleEdit(item) {
    setIdEdition(item.id_entidad);
    setFormData(item);
    setMostrarModal(true);
  }

  async function handleSearch() {
    //FALTA BUSCAR
  }

  function limpiarCampos() {
    setDatosForm({});
    setData([]);
  }

  async function handleSubmit() {
    try {
      let mensaje = validarObligatorios({ fields: config.nuevoModal.fields }, formData);
      if (mensaje) {
        toast.warning(mensaje);
        return;
      }

      const mensajeConfirm = idEdition
        ? config.nuevoModal.mensajeConfirmacionActualizar
        : config.nuevoModal.mensajeConfirmacionCrear;

      showConfirm(
        mensajeConfirm || '¿Está seguro de guardar los cambios?',
        (confirmed) => {
          if (confirmed) {
            guardarInformacion();
          }
        },
        'top-center'
      );
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  }

  async function guardarInformacion() {
    try {
      onLoad();
      const token = await getToken();
      const response = await putData(config.endpoint, codigoConfig, idEdition, formData, token);
      if (response && response.success) {
        if (idEdition && idEdition > 0) {
          toast.success('Información actualizada correctamente');
        } else {
          toast.success('Información registrada correctamente');
          handleClose();
          handleSearch();
        }
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      toast.error('Error al guardar la información. Por favor, intente nuevamente.');
    } finally {
      offLoad();
    }
  }

  function handleClose() {
    setMostrarModal(false);
    setIdEdition(0);
    setFormData({});
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
        onClose={handleClose}
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
