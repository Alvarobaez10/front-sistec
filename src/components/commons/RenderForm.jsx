import dynamic from "next/dynamic";
import { useEffect } from "react";
import { set } from "lodash";
import { validateRulesForm } from "@sistec/helpers/formElements/validateRules";

const FormElementComponent = dynamic(() => import("./FormElementComponent"), {
  ssr: false,
});

function ListElements(props) {
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

  const typeOptions = ["select", "radio", "group"];
  const html = [];

  for (const key in fields) {
    const element = fields[key];

    if (typeOptions.includes(element.type)) {
      if (!element.options || element.options.length === 0) {
        element.options = options;
      }
    }

    const classContainer = element.classContainer || "col-span-12";

    switch (element.type) {
      case "subForm":
        html.push(
          <div key={key} className="col-span-12">
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
          <div key={key} className={`${classContainer} flex flex-col`}>
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

  return <>{html}</>;
}

export default function RenderForm(props) {
  const {
    fields,
    setConfig = () => {},
    options,
    setDatosForm,
    datosForm,
    origin,
    config,
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

  const parentClass =
    config?.parentContainerClass || "grid grid-cols-12 gap-4";

  return (
    <div className={`w-full ${parentClass}`}>
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
