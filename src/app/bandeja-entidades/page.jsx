import React, { Suspense } from "react";
import Spinner from "@sistec/components/common/spinnerLoader/spinnerLoader";
import { getPageJsonConfiguration } from "@sistec/services/common/getConfigurations";
import Bandeja from "./Bandeja";

export default async function Page() {
  
  const codigo = "bandeja-entidades";
  const origen = "bandeja";
  const configuracion = await getPageJsonConfiguration(origen, codigo);

  return (
    <Suspense fallback={<Spinner />}>
      <Bandeja config={configuracion} 
    />
    </Suspense>
  );
}
