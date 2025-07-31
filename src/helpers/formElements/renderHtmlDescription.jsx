import formatNumberMoney from "../formatMoney";

export default function renderHtmlDescription(value, config, className = "") {
  let valor = value;

  if (config?.format === "money") {
    valor = valor === undefined ? "0" : valor;
    valor = formatNumberMoney(valor);
  } else {
    valor = valor ? valor : "Sin información";
  }

  return (
    <p className={`text-sm text-gray-700 ${className}`}>{valor}</p>
  );
}
