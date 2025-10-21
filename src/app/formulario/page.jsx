export const dynamic = "force-dynamic";
import React, { Suspense } from "react";
import Spinner from "@sistec/components/common/spinnerLoader/spinnerLoader";
import { getPageJsonConfiguration } from "@sistec/services/common/getConfigurations";
import Formulario from "./Formulario";

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
