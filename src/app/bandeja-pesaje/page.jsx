export const dynamic = "force-dynamic";
import React, { Suspense } from "react";
import Spinner from "@sistec/components/common/spinnerLoader/spinnerLoader";
import { getPageJsonConfiguration } from "@sistec/services/common/getConfigurations";
import Bandeja from "./Bandeja";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const token = await params?.token;

  const codigo = 'bandeja-pesaje';
  const origen = 'bandeja';
  const configuracion = await getPageJsonConfiguration(origen, codigo, token);

  return (
    <Suspense fallback={<Spinner />}>
      <Bandeja codigoBandeja={codigo} config={configuracion} />
    </Suspense>
  );
}
