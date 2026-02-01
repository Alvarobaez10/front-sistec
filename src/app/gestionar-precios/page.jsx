export const dynamic = "force-dynamic";
import React, { Suspense } from "react";
import Spinner from "@sistec/components/common/spinnerLoader/spinnerLoader";
import { getPageJsonConfiguration } from "@sistec/services/common/getConfigurations";
import GestionPrecios from "./GestionPrecios";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const token = await params?.token;

  const codigo = 'gestion-precios';
  const origen = 'formulario';
  const configuracion = await getPageJsonConfiguration(origen, codigo, token);

  return (
    <Suspense fallback={<Spinner />}>
      <GestionPrecios codigoConfig={codigo} config={configuracion} />
    </Suspense>
  );
}
