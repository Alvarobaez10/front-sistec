'use client';
import { useApp } from '@sistec/context/AppContext';
import useSessionValidator from '@sistec/hooks/useSessionValidator';
import '@sistec/styles/card.css';
import '@sistec/styles/tabs.css';
import { useEffect, useState } from 'react';
import Card from './Card';
import RenderForm from '@sistec/components/common/RenderForm';
import { getDataId, putData } from '@sistec/services/common/gestionarInformacion';
import { getValueMoney } from '@sistec/helpers/formatMoney';
import { showConfirm } from '@sistec/components/common/ConfirmToast';
import { toast } from 'react-toastify';

const initialState = { id_instalacion: '-1' };

export default function GestionPrecios({ config, codigoConfig }) {
  const { offLoad, onLoad, getToken } = useApp();
  useSessionValidator();
  const [activeTab, setActiveTab] = useState(null);
  const [grupos, setGrupos] = useState([]);
  const [datosForm, setDatosForm] = useState(initialState);

  function handleChangeForm(info) {
    setDatosForm({ ...datosForm, id_instalacion: info.id_instalacion });
    if (info.id_instalacion && info.id_instalacion !== '-1') {
      cargarInformacion(info.id_instalacion);
    } else {
      setGrupos([]);
      setActiveTab(null);
    }
  }

  async function cargarInformacion(idInstalacion) {
    try {
      onLoad();
      const token = await getToken();
      const response = await getDataId(config.endpoint, codigoConfig, idInstalacion, token);
      if (response && response.success) {
        setGrupos(response.data);
        setActiveTab(response.data[0].id_grupo);
      }
    } catch (error) {
      console.error('Error al consultar:', error);
      toast.error('Error al consultar la información. Por favor, intente nuevamente.');
    } finally {
      offLoad();
    }
  }

  async function handleSubmit() {
    try {
      showConfirm(
        '¿Está seguro de guardar los cambios?',
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
      const listMateriales = grupos.flatMap((g) => g.materiales);
      const token = await getToken();
      const response = await putData(
        config.endpoint,
        codigoConfig,
        datosForm.id_instalacion,
        listMateriales,
        token
      );
      if (response && response.success) {
        toast.success('Información actualizada correctamente');
        cargarInformacion(datosForm.id_instalacion);
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      toast.error('Error al guardar la información. Por favor, intente nuevamente.');
    } finally {
      offLoad();
    }
  }

  const activeGrupo = grupos.find((g) => g.id_grupo === activeTab);

  function changePrice(valor, index, campo) {
    const indexGrupoActual = grupos.findIndex((g) => g.id_grupo === activeTab);
    const copyGrupos = [...grupos];
    const infoMaterial = copyGrupos[indexGrupoActual].materiales[index];
    if (campo === 'unidad') {
      infoMaterial.id_dom_unidad_medida = Number(valor);
    } else {
      infoMaterial.precio_nuevo = Number(valor);
    }
    copyGrupos[indexGrupoActual].materiales[index] = infoMaterial;
    setGrupos(copyGrupos);
  }

  return (
    <div className="bandeja-container">
      <div className="flex flex-col w-1/2">
        <RenderForm
          fields={config.fields}
          options={config.options}
          datosForm={datosForm}
          setDatosForm={handleChangeForm}
          origin=""
        />
      </div>

      {datosForm.id_instalacion !== '-1' && datosForm.id_instalacion ? (
        <>
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
              <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-5 py-5 w-full">
                {activeGrupo.materiales?.map((material, index) => (
                  <div key={material.id_material}>
                    <Card
                      material={material}
                      changePrice={changePrice}
                      indice={index}
                      options={config?.options?.filter(
                        (item) => item.field === 'id_dom_unidad_medida'
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="btn-action btn-with-icon"
            >
              Guardar
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
