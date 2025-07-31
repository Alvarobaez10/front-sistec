import dynamic from "next/dynamic";
import { set } from "lodash";
import { useEffect } from "react";
import { validateRulesForm } from "@sistec/helpers/formElements/validateRules";

const FormElementComponent = dynamic(() => import("./FormElementComponent"), {
  ssr: false,
});

function ListElements(props) {
  const typeOptions = ["select", "radio", "group"];
  const {
    valueMap,
    setValue,
    fields,
    options,
    setDatosForm,
    datosForm,
    origin,
    ...others
  } = props;

  const html = [];

  for (const key in fields) {
    const element = fields[key];

    if (typeOptions.includes(element.type)) {
      if (!element.options || element.options.length === 0) {
        element.options = options;
      }
    }

    switch (element.type) {
      case "subForm":
        html.push(
          <div className="w-full mb-4" key={key}>
            <RenderForm
              fields={element.fields}
              options={options}
              setDatosForm={setDatosForm}
              datosForm={datosForm[key] ?? {}}
              origin={origin ? `${origin},${key}` : key}
              {...others}
            />
          </div>
        );
        break;

      case "hidden":
        break;

      default:
        html.push(
          <div className="mb-4" key={key}>
            <FormElementComponent
              element={element}
              setValue={setValue}
              id={key}
              valueMap={valueMap}
              datosForm={datosForm}
              setDatosForm={setDatosForm}
              {...others}
            />
          </div>
        );
        break;
    }
  }

  return html;
}

export default function RenderForm(props) {
  const {
    fields,
    setConfig = () => {},
    options,
    setDatosForm,
    datosForm,
    origin,
    ...others
  } = props;

  const setValue = (id, value) => {
    const newValueMap = { ...datosForm };
    set(newValueMap, id, value);
    const validatedData = validateRulesForm(
      fields,
      origin,
      newValueMap,
      setConfig,
      options
    );
    setDatosForm(validatedData, origin);
  };

  useEffect(() => {
    const validatedData = validateRulesForm(
      fields,
      origin,
      datosForm,
      setConfig,
      options
    );
    setDatosForm(validatedData, origin);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4">
      <ListElements
        valueMap={datosForm}
        setValue={setValue}
        fields={fields}
        options={options}
        setDatosForm={setDatosForm}
        datosForm={datosForm}
        origin={origin}
        {...others}
      />
    </div>
  );
}
