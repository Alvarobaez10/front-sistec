'use client';

import RenderForm from '@sistec/components/common/RenderForm';
import { useState } from 'react';

export default function Formulario({ config }) {
  const [keyForm, setKeyform] = useState(0);
  const [datosForm, setDatosForm] = useState({});

  function changeDataForm(info, origin) {
    setDatosForm({ ...datosForm, [origin]: info });
  }

  return (
    <div className="p-4">
      <div className={'w-full grid grid-cols-3 gap-4'}>
        <RenderForm
          key={'form-informacion_general' + keyForm}
          fields={config?.informacion_general}
          options={config?.options ?? []}
          setDatosForm={changeDataForm}
          datosForm={datosForm?.informacion_general ?? {}}
          origin={'informacion_general'}
        />
      </div>
    </div>
  );
}
