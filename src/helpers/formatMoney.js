export function preventValueMoney(event) {
  const value = event.key;
  const regex = /^[0-9,]*$/;
  if (
    value === "," &&
    (event.target.value.indexOf(",") > -1 || !event.target.value)
  ) {
    event.preventDefault();
  } else if (!regex.test(value) && value !== "Backspace") {
    event.preventDefault();
  }
}

export function getValueMoney(event) {
  return event.target.value
    .replace(/\./g, "")
    .replace(/,/g, ".")
    .replace("$", "")
    .trim();
}

export default function formatNumberMoney(valor) {
  if (valor !== undefined) {
    let valorFinal;
    const valorFormato = Number(valor).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    const parts = String(valor).split(".");
    if (parts[1] !== undefined) {
      valorFinal = valorFormato + "," + parts[1];
    } else {
      valorFinal = valorFormato;
    }

    return valorFinal;
  }
}
