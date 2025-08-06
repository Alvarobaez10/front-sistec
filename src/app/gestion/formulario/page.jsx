import React, { Suspense } from "react";
import Spinner from "@sistec/components/common/spinnerLoader/spinnerLoader";
import { getPageJsonConfiguration } from "@sistec/services/common/getConfigurations";
import validateSession from "@sistec/services/login/validateSession";
import Formulario from "./Formulario";
import { redirect } from "next/navigation";  

export default async function Page() {
  
  const codigo = "med-formulario";
  const origen = "formulario";
  const configuracion = await getPageJsonConfiguration(origen, codigo);

  return (
    <Suspense fallback={<Spinner />}>
      <Formulario config={configuracion} />
    </Suspense>
  );
}
