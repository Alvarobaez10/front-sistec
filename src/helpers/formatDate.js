/* eslint-disable no-empty */
export function stringDateFormat(valor) {
  let formato = valor;
  try {
    formato = valor.split("T")[0].split("-").reverse().join("/");
  } catch {}
  return formato;
}
