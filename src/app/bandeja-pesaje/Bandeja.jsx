'use client';
import { useEffect, useState } from 'react';
import { useApp } from '@sistec/context/AppContext';
import { getMateriales } from '@sistec/services/common/getMateriales';
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
  const [formData, setFormData] = useState({});
  const [filtrosData, setFiltrosData] = useState({});
  const [grupos, setGrupos] = useState([]);

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
      console.log("Guardando datos del tab:", activeTab, formData);
      setMostrarModal(false);
    } catch (e) {
      console.error("Error guardando:", e);
    } finally {
      offLoad();
    }
  };

  const handleTransaccion = () => {
    console.log("Transacción ejecutada", { codigoBandeja, activeTab, filtrosData });
  };

  const handleFinalizar = () => {
    console.log("Finalizar ejecutada", { codigoBandeja, activeTab, filtrosData });
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
          </div>
        </div>
      )}

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
                <div key={material.id_material} onClick={() => openModal(material)}>
                  <Card material={material} />
                </div>
              ))}
            </div>
          </div>

          {/* Tabla */}
          <div className="w-1/2">
            <Table
              config={config}
              resultados={[]}
            />
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


      {/* Modal */}
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
      />
    </div>
  );
}