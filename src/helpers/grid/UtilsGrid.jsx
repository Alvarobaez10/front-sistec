import { stringDateFormat } from "../formatDate";
import formatNumberMoney from "../formatMoney";

export function textGrid(text, format) {
  let textFormat = text;
  if (format === "money") {
    textFormat = formatNumberMoney(text);
  } else if (format === "date") {
    textFormat = stringDateFormat(text);
  }
  return (
    <span title={textFormat} className="text-grid-cell">
      {textFormat}
    </span>
  );
}

export const defaultColDef = {
  //propiedades por defecto de las columnas
  sortable: false,
  suppressMovable: true,
  flex: 1,
  filter: false,
  floatingFilter: false,
  minWidth: 100,
  editable: false,
};
