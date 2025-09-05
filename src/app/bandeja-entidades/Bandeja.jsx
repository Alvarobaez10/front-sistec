'use client';
import '@sistec/styles/bandeja.css';
import { showConfirm } from '@sistec/components/common/ConfirmToast';
import FormModal from '@sistec/components/common/FormModal';
import Pagination from '@sistec/components/common/paginationComponent/Pagination';
import { useApp } from '@sistec/context/AppContext';
import validarObligatorios from '@sistec/helpers/validarObligatorios';
import { getData, putData } from '@sistec/services/common/gestionarInformacion';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Table from './Table';

const FiltrosBandeja = dynamic(() => import('@sistec/components/common/FiltrosBandeja'), {
  ssr: false,
});

export default function Bandeja({ config, codigoConfig }) {
  const { offLoad, onLoad, loading, getToken } = useApp();
  const initialStateResultados = { data: [], meta: {} };

  const [filterData, setFilterData] = useState({});
  const [formData, setFormData] = useState({});
  const [viewCard, setViewCard] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idEdition, setIdEdition] = useState(0);
  const [resultados, setResultados] = useState(initialStateResultados);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFormData({});
  }, [mostrarModal]);

  function setFilters(info) {
    setFilterData((prev) => ({ ...prev, ...info }));
  }

  function handleChangeFormData(info) {
    setFormData((prev) => ({ ...prev, ...info }));
    const idTipoPersona = info?.id_dom_tipo_persona ? info?.id_dom_tipo_persona : '0';
    validarTipoPersona(idTipoPersona);
  }

  function validarTipoPersona(idTipoPersona) {
    let fieldsHidden = [];
    let fieldsShow = [];
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

  async function handleSearch(page = 1, filters) {
    try {
      onLoad();
      if (page !== currentPage) {
        setCurrentPage(page);
      }
      const token = await getToken();
      const jsonFilters = filters ?? filterData;
      const response = await getData(
        config.endpoint,
        codigoConfig,
        jsonFilters,
        page,
        config.limit,
        token
      );
      setResultados(response);
    } catch (e) {
      console.error('Error al cargar los datos:', e);
      toast.error('Error al cargar los datos. Por favor, intente nuevamente.');
    }
    offLoad();
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
    const idTipoPersona = item?.id_dom_tipo_persona ? item?.id_dom_tipo_persona : '0';
    validarTipoPersona(idTipoPersona);
    setFormData(item);
    setMostrarModal(true);
  }

  function limpiarCampos() {
    setFilterData({});
    setResultados(initialStateResultados);
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
          handleClose();
          handleSearch(currentPage);
        } else {
          toast.success('Información registrada correctamente');
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

  function changePage(e) {
    const page = Number(e.target.dataset.id);
    setCurrentPage(page);
    handleSearch(page);
  }

  if (!config) return null;

  return (
    <div className="w-full p-2" id="containerBandeja">
      {/* Filtros */}
      <div id="bodyBandeja">
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
        <div className="p-4" id="resultsContainer">
          {
            //  viewCard ? (
            //   <Cards data={resultados} config={config} />
            // ) : (
            <div
              key={'table'}
              style={!viewCard ? {} : { display: 'none' }}
              className="ag-theme-alpine content-grid"
              id="contentgrid"
            >
              <Table config={config} resultados={resultados.data} handleAcciones={handleAcciones} />
            </div>

            // )
          }
        </div>
      </div>
      <div id="footerBandeja">
        <Pagination meta={resultados?.meta} onclick={changePage}></Pagination>
      </div>
    </div>
  );
}
