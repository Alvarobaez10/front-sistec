import { get } from "lodash";
import Select from "react-select";
import AsyncSelect from "react-select/async";

function renderSelect(config, className = "", options, value, mode, valueMap) {
  const { id, idParent, idSon, action, ...otherConfig } = config;
  let { disabled } = config;

  let isDisabled = false;

  // Manejo de dependencias padre-hijo
  if (idParent) {
    const valueParent = get(valueMap, idParent);
    if (valueParent && valueParent !== -1) {
      options = options.filter(
        (object) => String(object.id_parent) === String(valueParent)
      );
    } else {
      options = options.filter((object) => String(object.id_parent) === "-1");
    }

    if (options.length === 0) {
      isDisabled = true;
      options = [];
      value = null;
    }
  }

  disabled = disabled ?? isDisabled;
  let html = <></>;

  // SELECT NATIVO
  if (mode === "single") {
    const firstOption = config.placeholder ? (
      <option key={-1} value={-1}>
        {config.placeholder}
      </option>
    ) : null;

    html = (
      <select
        id={id}
        disabled={disabled}
        {...otherConfig}
        value={String(value)}
        className={`block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      >
        {firstOption}
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    );
  }

  // SELECT AUTOCOMPLETE
  else if (mode === "autocomplete") {
    html = (
      <Select
        noOptionsMessage={() => "Sin resultados"}
        className={`react-select-container ${className}`}
        classNamePrefix="select-autocomplete"
        isDisabled={disabled}
        isClearable
        isSearchable
        value={options.find((o) => String(o.value) === String(value))}
        options={options}
        {...otherConfig}
      />
    );
  }

  // SELECT MULTI
  else if (mode === "multi") {
    const selectedValues =
      value?.map((val) =>
        options.find((option) => String(option.value) === String(val))
      ) || [];

    html = (
      <Select
        noOptionsMessage={() => "Sin resultados"}
        className={`react-select-container ${className}`}
        classNamePrefix="select-multiple"
        isDisabled={disabled}
        isClearable
        isSearchable
        isMulti
        value={selectedValues}
        options={options}
        {...otherConfig}
      />
    );
  }

  // SELECT ASYNC
  else if (mode === "async") {
    html = (
      <AsyncSelect
        noOptionsMessage={() => "Sin resultados"}
        loadingMessage={() => "Cargando..."}
        className={`react-select-container ${className}`}
        classNamePrefix="select-autocomplete"
        isDisabled={disabled}
        isClearable
        isSearchable
        defaultOptions={options}
        value={options.find((o) => String(o.value) === String(value))}
        {...otherConfig}
      />
    );
  }

  // SELECT ASYNC MULTI
  else if (mode === "async-multi") {
    const selectedValues =
      value?.map((val) =>
        options.find((option) => String(option.value) === String(val))
      ) || [];

    html = (
      <AsyncSelect
        noOptionsMessage={() => "Sin resultados"}
        loadingMessage={() => "Cargando..."}
        className={`react-select-container ${className}`}
        classNamePrefix="select-multiple"
        isDisabled={disabled}
        isClearable
        isSearchable
        isMulti
        defaultOptions={options}
        value={selectedValues}
        {...otherConfig}
      />
    );
  }

  return html;
}

export default renderSelect;
