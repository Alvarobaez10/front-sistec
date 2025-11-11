import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { set } from 'lodash';
import { validateRulesForm } from '@sistec/helpers/formElements/validateRules';

const FormElementComponent = dynamic(() => import('./FormElementComponent'), {
  ssr: false,
});

function ListElements(props) {
  const { valueMap, setValue, fields, options, setDatosForm, datosForm, origin, ...others } = props;

  const typeOptions = ['select', 'radio', 'group'];
  const html = [];

  for (const key in fields) {
    const element = fields[key];
    const uniqueKey = origin ? `${origin}-${key}` : key;

    if (typeOptions.includes(element.type)) {
      if (!element.options || element.options.length === 0) {
        element.options = options;
      }
    }

    const classContainer = element.classContainer;

    switch (element.type) {
      case 'subForm':
        html.push(
          <div key={uniqueKey}>
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

      case 'hidden':
        break;

      default:
        html.push(
          <FormElementComponent
            key={uniqueKey}
            element={element}
            setValue={setValue}
            id={key}
            valueMap={valueMap}
            datosForm={datosForm}
            classContainer={classContainer}
            setDatosForm={setDatosForm}
            {...others}
          />
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

    const field = fields[id];
    if (field.idSon) {
      const sons = field.idSon.split(',');
      sons.map((son) => set(newValueMap, son, null));
    }

    const validatedData = validateRulesForm(fields, origin, newValueMap, setConfig, options);

    setDatosForm(validatedData, origin);
  };

  useEffect(() => {
    const validatedData = validateRulesForm(fields, origin, datosForm, setConfig, options);
    setDatosForm(validatedData, origin);
  }, []);

  return (
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
  );
}
