import { get } from "lodash";
import renderInput from "./renderInput";
import renderSelect from "./renderSelect";

function renderHtmlGroup(config, className = "", options, valueMap, setValue) {
  const fields = config.fields;
  const html = [];

  for (const key in fields) {
    const field = fields[key];
    field.id = key;
    field.name = key;
    field.onChange = config.onChange;
    const value = get(valueMap, key);
    const type = field.type;

    if (type === "select") {
      const optionsSelect = options.filter((item) => item.field === key);
      html.push(
        renderSelect(field, field.className, optionsSelect, value, field.mode, valueMap, setValue)
      );
    } else {
      html.push(renderInput(field, field.className, value, type, valueMap));
    }
  }

  return (
    <div className={`grid gap-4 ${className}`}>{html}</div>
  );
}

export default renderHtmlGroup;