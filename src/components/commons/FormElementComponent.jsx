import { useEffect, useState } from "react";
import GroupInput from "./GroupInput";
import { getValueSelect } from "@sistec/helpers/utils";
import { getValueMoney } from "@sistec/helpers/formatMoney";
// import Ubicacion from "../commons/components-ubicacion/Ubicacion";

export default function FormElementComponent(props) {
  let parent = window.parent;

  const {
    element,
    setValue,
    id,
    setDatosForm,
    datosForm,
    classDivCol,
    ...others
  } = props;

  const [jsonConfigUbicacion, setJsonConfigUbicacion] = useState(
    JSON.parse(
      parent.getParametro
        ? parent.getParametro("jsonConfigUbicacion")
        : parent.parent?.getParametro?.("jsonConfigUbicacion") || "{}"
    )
  );

  useEffect(() => {
    let intentos = 0;
    while (intentos < 3 && !parent?.deleteGraphics) {
      parent = parent?.parent;
      intentos++;
    }
  }, []);

  const getCurrentValue = (event) => {
    let type = element.type;
    let mode = element?.mode;

    if (type === "group") {
      const idField = event.target ? event.target.id : event?.field;
      const fieldElement = element.fields[idField];
      type = fieldElement.type;
      mode = fieldElement.mode;
    }

    switch (type) {
      case "radio":
      case "checkbox":
      case "switch":
        return event.target.checked;
      case "select":
        return getValueSelect(event, mode);
      case "money":
        return getValueMoney(event);
      case "input-range":
        return event;
      default:
        return event.target.value;
    }
  };

  const setUbicacion = (dataUbicacion) => {
    setDatosForm(dataUbicacion, id);
  };

  const handleChange = (event) => {
    const value = getCurrentValue(event);

    switch (element.type) {
      case "group":
        const idField = event.target ? event.target.id : event?.field;
        setValue(idField, value);
        break;

      case "input-range":
        const valorFinal = {
          min: value.min < element.minValue ? element.minValue : value.min,
          max: value.max > element.maxValue ? element.maxValue : value.max,
        };
        setValue(id, valorFinal);
        break;

      default:
        setValue(id, value);
        break;
    }
  };

  const show = element.show !== undefined ? element.show : true;

  if (element.type === "ubicacion") {
    return (
      <Ubicacion
        config={jsonConfigUbicacion}
        data={datosForm}
        setUbicacion={setUbicacion}
        style={{ marginTop: "10px" }}
      />
    );
  }

  return (
    <div
      key={id}
      className={`mt-2 flex items-center ${classDivCol ?? ""}`}
      style={!show ? { display: "none" } : {}}
    >
      <GroupInput
        {...element}
        id={id}
        setValue={setValue}
        {...others}
        onChange={handleChange}
        name={id}
      />
    </div>
  );
}
