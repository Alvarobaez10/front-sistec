"use client";
import React, { useState } from "react";
import RenderForm from "@sistec/components/commons/RenderForm";

export default function Formulario({ config }) {
    const [keyForm, setKeyform] = useState(0);
    const [datosForm, setDatosForm] = useState({});


    function changeDataForm(info, origin) {
        setDatosForm({ ...datosForm, [origin]: info });
    }

    
    return (
         <div className={`p-4 ${config?.parentContainerClass ?? ""}`}>
            <RenderForm
                key={"form-informacion_general" + keyForm}
                fields={config?.informacion_general}
                options={config?.options ?? []}
                setDatosForm={changeDataForm}
                datosForm={datosForm?.informacion_general ?? {}}
                origin={"informacion_general"}
            />
        </div>
    );
}
