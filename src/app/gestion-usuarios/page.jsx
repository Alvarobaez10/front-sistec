export const dynamic = "force-dynamic";
import React, { Suspense } from "react";
import dynamicLoader from "next/dynamic";
import { getPageJsonConfiguration } from "@sistec/services/common/getConfigurations";

const Spinner = dynamicLoader(() => import("@sistec/components/common/spinnerLoader/spinnerLoader"));
const Bandeja = dynamicLoader(() => import("./Bandeja"));

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const token = await params?.token;

  const codigo = 'gestion-usuarios';
  const origen = 'bandeja';
  const configuracion = await getPageJsonConfiguration(origen, codigo, token);

  return (
    <Suspense fallback={<Spinner />}>
      <Bandeja config={configuracion} codigoConfig={codigo} />
    </Suspense>
  );
}
