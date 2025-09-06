'use client';
import '@sistec/styles/bandeja.css';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Table from './Table';
import FormModal from '@sistec/components/common/FormModal';
import Pagination from '@sistec/components/common/paginationComponent/Pagination';
import { useApp } from '@sistec/context/AppContext';
import validarObligatorios from '@sistec/helpers/validarObligatorios';
import { toast } from 'react-toastify';
import { getData, putData } from '@sistec/services/common/gestionarInformacion';
import { showConfirm } from '@sistec/components/common/ConfirmToast';


const FiltrosBandeja = dynamic(() => import('@sistec/components/common/FiltrosBandeja'), {
  ssr: false,
});

export default function Bandeja({ codigoBandeja, config }) {
  const { offLoad, onLoad, loading, getToken } = useApp();
  const initialStateResultados = { data: [], meta: {} };
  const [filterData, setFilterData] = useState({});
  const [resultados, setResultados] = useState(initialStateResultados);
  const [currentPage, setCurrentPage] = useState(1);
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
    if (typeof info === 'function') {
      setFormData(info);
    } else {
      setFormData(prev => ({ ...prev, ...info }));
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
    setIdEdition(item.id_instalacion);
    setFormData(item);
    setMostrarModal(true);
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
        codigoBandeja,
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
      const response = await putData(config.endpoint, codigoBandeja, idEdition, formData, token);
      if (response && response.success) {
        if (idEdition && idEdition > 0) {
          toast.success('Información actualizada correctamente');
        } else {
          toast.success('Información registrada correctamente');
          handleClose();
          handleSearch(currentPage);
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
            <div
              key={'table'}
              style={!viewCard ? {} : { display: 'none' }}
              className="ag-theme-alpine content-grid"
              id="contentgrid"
            >
              <Table config={config} resultados={resultados.data} handleAcciones={handleAcciones} />
            </div>

          }
        </div>
      </div>
      <div id="footerBandeja">
        <Pagination meta={resultados?.meta} onclick={changePage}></Pagination>
      </div>
    </div>
  );
}
