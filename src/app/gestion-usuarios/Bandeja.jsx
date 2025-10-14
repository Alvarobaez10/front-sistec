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
import useSessionValidator from '@sistec/hooks/useSessionValidator';

const FiltrosBandeja = dynamic(() => import('@sistec/components/common/FiltrosBandeja'), {
  ssr: false,
});

export default function Bandeja({ config, codigoConfig }) {
  const { offLoad, onLoad, loading, getToken } = useApp();
  useSessionValidator();
  const initialStateResultados = { data: [], meta: {} };
  const [filterData, setFilterData] = useState({});
  const [formData, setFormData] = useState({});
  const [viewCard, setViewCard] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idEdition, setIdEdition] = useState(0);
  const [titleModal, setTitleModal] = useState('');
  const [configModal, setConfigModal] = useState(null);
  const [resultados, setResultados] = useState(initialStateResultados);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyForm, setKeyForm] = useState(0);

  useEffect(() => {
    setFormData({});
  }, [mostrarModal]);

  function setFilters(info) {
    setFilterData((prev) => ({ ...prev, ...info }));
  }

  function handleChangeFormData(info) {
    setFormData((prev) => ({ ...prev, ...info }));
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
      setTitleModal(config?.nuevoModal?.title);
      setConfigModal({ ...config?.nuevoModal });
    } else if (accion === 'limpiar') {
      limpiarCampos();
    } else if (accion === 'buscar') {
      handleSearch();
    } else if (accion === 'vista') {
      setViewCard(!viewCard);
    } else if (accion === 'editar') {
      setTitleModal(config?.editarModalModal?.titleEdit);
      handleEditView(item, true);
      setConfigModal({ ...config?.editarModal });
    } else if (accion === 'ver') {
      setTitleModal(config?.nuevoModal?.titleView);
      handleEditView(item, false);
    }
  }

  function handleEditView(item, isEdition) {
    if (isEdition) {
      setIdEdition(item.id_usuario);
    }
    setFormData(item);
    setMostrarModal(true);
  }

  function limpiarCampos() {
    setFilterData({});
    setResultados(initialStateResultados);
    setKeyForm((prev) => prev + 1);
  }

  async function handleSubmit() {
    try {

      let fields = JSON.parse(JSON.stringify(configModal.fields));

      if(formData.id_usuario && formData['password']){
        fields.password.required = true;
        fields.confirmPassword.required = true;          
      }


      let mensaje = validarObligatorios({ fields:fields, ...config }, formData);
      if (mensaje) {
        toast.warning(mensaje, {
          style: { whiteSpace: 'pre-line' },
        });
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
          toast.success(response.message || 'Información actualizada correctamente');
          handleSearch(currentPage);
        } else {
          toast.success(response.message || 'Información creada correctamente');
        }
        handleClose();
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      toast.error(error.response?.message || 'Error al guardar la información');
    } finally {
      offLoad();
    }
  }

  function handleClose() {
    setMostrarModal(false);
    setIdEdition(0);
    setFormData({});
  }

  function changePage(idPage) {
    const page = Number(idPage);
    setCurrentPage(page);
    handleSearch(page);
  }

  if (!config) return null;

  return (
    <div className="w-full p-2" id="containerBandeja">
      {/* Filtros */}
      <div id="bodyBandeja">
        <FiltrosBandeja
          key={keyForm}
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
          config={configModal}
          handleSubmit={handleSubmit}
          loading={loading}
          setFormData={handleChangeFormData}
          formData={formData}
          selectedTitle={titleModal}
        />

        {/* Resultados (tabla o tarjetas) */}
        <div className="p-4" id="resultsContainer">
          <div
            key={'table'}
            style={!viewCard ? {} : { display: 'none' }}
            className="ag-theme-alpine content-grid"
            id="contentgrid"
          >
            <Table config={config} resultados={resultados.data} handleAcciones={handleAcciones} />
          </div>
        </div>
      </div>
      <div id="footerBandeja">
        <Pagination meta={resultados?.meta} onclick={changePage}></Pagination>
      </div>
    </div>
  );
}
