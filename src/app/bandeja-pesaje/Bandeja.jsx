'use client';
import { useEffect, useState } from 'react';
import { putData} from '@sistec/services/common/gestionarInformacion';
import { toast } from 'react-toastify';
import { useApp } from '@sistec/context/AppContext';
import { getMateriales } from '@sistec/services/common/getMateriales';
import { getTransaccion } from '@sistec/services/common/getTransaccion';
import FormModal from '@sistec/components/common/FormModal';
import RenderForm from '@sistec/components/common/RenderForm';
import Card from './Card';
import Table from './Table';
import '@sistec/styles/tabs.css';
import '@sistec/styles/card.css';

export default function Bandeja({ config, codigoBandeja }) {
  const { offLoad, onLoad, loading, getToken } = useApp();
  const [activeTab, setActiveTab] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalInstalacion, setMostrarModalInstalacion] = useState(true);
  const [mostrarContenido, setMostrarContenido] = useState(false)
  const [formData, setFormData] = useState({});
  const [filtrosData, setFiltrosData] = useState({});
  const [grupos, setGrupos] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [datosUsuario, setDatosUsuario] = useState({
    id_instalacion: null,
    instalacion: null,
    operador: null,
    id_vendedor: null
  });

  if (!config) return null;

  const openModal = (material = {}) => {
    setFormData(material);
    setMostrarModal(true);
  };

  const closeModal = () => {
    setMostrarModal(false);
  };

  const handleSubmit = async () => {
    try {
      onLoad();
      setResultados(prev => [...prev, formData]);
      setMostrarModal(false);
    } catch (e) {
      console.error("Error guardando:", e);
    } finally {
      offLoad();
    }
  };

  const handleSubmitInstalacion = () => {
    if (!datosUsuario.id_instalacion || !datosUsuario.operador) {
      toast.warning("Debes seleccionar instalación y operador");
      return;
    }

    const instalacionSeleccionada = config.options?.find(
      (o) => o.value === datosUsuario.id_instalacion
    );

    setDatosUsuario((prev) => ({
      ...prev,
      instalacion: instalacionSeleccionada ? instalacionSeleccionada.label : prev.instalacion
    }));

    setMostrarModalInstalacion(false);
  };


  const handleTransaccion = async () => {
    try {
      const token = await getToken();
      const transaccion = await getTransaccion(token, filtrosData);

      if (transaccion?.success && transaccion?.data?.success) {
        setDatosUsuario(prev => ({
          ...prev,
          id_vendedor: transaccion?.data?.id_vendedor ?? null
        }));
        toast.success("Transacción exitosa");
        setMostrarContenido(true);
      } else {
        setMostrarContenido(false);
        toast.warning("Transacción no fue exitosa");
      }
    } catch (error) {
      console.error("Error en la transacción:", error);
      setMostrarContenido(false);
      toast.error("Error ejecutando la transacción");
    }
  };


  const handleFinalizar = async () => {
    const dataAGuardar = {
      ...datosUsuario,
      materiales: resultados,
    };

    try {
      onLoad();
      const token = await getToken();
      const response = await putData(config.endpoint, codigoBandeja,  null , dataAGuardar, token);
      if (response && response.success) {
        toast.success('Información registrada correctamente');
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      toast.error('Error al guardar la información. Por favor, intente nuevamente.');
    } finally {
      offLoad();
    }
  };

  useEffect(() => {
    const fetchMateriales = async () => {
      try {
        const token = await getToken();
        if (!token) {
          setGrupos([]);
          return;
        }
        onLoad();
        const materialesItems = await getMateriales(token);
        const data = materialesItems?.data || [];
        setGrupos(data);
        if (data.length > 0) setActiveTab(data[0].id_grupo);
      } catch (error) {
        console.error('Error cargando materiales:', error);
        setGrupos([]);
      } finally {
        offLoad();
      }
    };

    fetchMateriales();
  }, []);

  const activeGrupo = grupos.find((g) => g.id_grupo === activeTab);

  return (
    <div className="bandeja-container">
      {mostrarModalInstalacion ? (
        <FormModal
          options={config.options ?? []}
          visible={true}
          config={config.modalInstalacion}
          handleSubmit={handleSubmitInstalacion}
          loading={loading}
          setFormData={setDatosUsuario}
          formData={datosUsuario}
          success={false}
          selectedTitle="Instalación"
        />
      ) : (
        <>
          {/* Filtros */}
          {config.filtros && (
            <div className="filtros-section">
              <div className="flex gap-4 items-end">
                <div className="w-1/4">
                  <RenderForm
                    key="form-filtros"
                    fields={config.filtros}
                    options={config?.options ?? []}
                    datosForm={filtrosData}
                    setDatosForm={setFiltrosData}
                    origin="form-filtros"
                  />
                </div>
                <button
                  onClick={handleTransaccion}
                  className="btn-action btn-with-icon"
                >
                  Transacción
                </button>

                {datosUsuario.instalacion && (
                  <span className="info-text">
                    Instalación: <strong>{datosUsuario.instalacion}</strong>
                  </span>
                )}
                {datosUsuario.operador && (
                  <span className="info-text">
                    Operador: <strong>{datosUsuario.operador}</strong>
                  </span>
                )}
              </div>
            </div>
          )}

          {mostrarContenido && (
            <>
              {/* Tabs */}
              <div className="tabs-container">
                {grupos.map((g) => (
                  <button
                    key={g.id_grupo}
                    onClick={() => setActiveTab(g.id_grupo)}
                    className={`tab-button ${activeTab === g.id_grupo ? 'active' : ''}`}
                  >
                    {g.grupo}
                  </button>
                ))}
              </div>

              {activeGrupo && (
                <div className="tab-content flex w-full gap-4">
                  {/* Cards */}
                  <div className="w-1/2">
                    <div className="cards-grid">
                      {activeGrupo.materiales?.map((material) => (
                        <div
                          key={material.id_material}
                          onClick={() => openModal(material)}
                        >
                          <Card material={material} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tabla */}
                  <div className="w-1/2">
                    <Table config={config} resultados={resultados} />
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleFinalizar}
                  className="btn-action btn-with-icon"
                >
                  Finalizar
                </button>
              </div>
            </>
          )}
          {/* Modal Materiales */}
          <FormModal
            options={config.options ?? []}
            visible={mostrarModal}
            onClose={closeModal}
            config={config.nuevoModal}
            handleSubmit={handleSubmit}
            loading={loading}
            setFormData={setFormData}
            formData={formData}
            success={false}
            selectedTitle={formData.material}
          />
        </>
      )}
    </div>
  );

}