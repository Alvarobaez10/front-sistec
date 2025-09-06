import { get } from 'lodash';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

const customStyles = {
  option: ({ isFocused, isSelected }) =>
    `px-2 py-1 !cursor-pointer !text-sm ${
      isSelected
        ? '!bg-[var(--accent)] !text-[var(--white-color-label)]'
        : isFocused
        ? 'bg-blue-100'
        : 'bg-white'
    }`,
  menu: () => 'mt-1 rounded-md border border-gray-200 bg-white shadow-md',
  singleValue: () => 'text-gray-800',
  clearIndicator: () => 'cursor-pointer [&>svg]:w-4 [&>svg]:h-4',
  dropdownIndicator: () => 'cursor-pointer [&>svg]:w-4 [&>svg]:h-4',
};
const customStylesSingle = {
  control: ({ isFocused }) =>
    `w-full border rounded-[5px] p-0 text-sm  shadow-none h-[35px] !min-h-[35px]
           ${isFocused ? '!border-gray-300 ring-1 ring-blue-300' : 'border-gray-300'}
           disabled:bg-gray-100 disabled:cursor-not-allowed`,
  indicatorsContainer: () => 'h-full',
};
const customStylesMulti = {
  control: ({ isFocused }) =>
    `w-full border rounded-[5px] p-0 text-sm  !shadow-none !min-h-[35px]
           ${isFocused ? '!border-gray-300 ring-1 ring-blue-300' : 'border-gray-300'}
           disabled:bg-gray-100 disabled:cursor-not-allowed`,
  multiValue: () => '!bg-blue-100',
  multiValueRemove: () => 'cursor-pointer',
};

function renderSelect(config, className = '', options, value, mode, valueMap) {
  const { id, idParent, idSon, action, ...otherConfig } = config;
  let { disabled } = config;

  let isDisabled = false;

  // Manejo de dependencias padre-hijo
  if (idParent) {
    const valueParent = get(valueMap, idParent);
    if (valueParent && valueParent !== -1) {
      options = options.filter((object) => String(object.id_parent) === String(valueParent));
    } else {
      options = options.filter(
        (object) => String(object.id_parent) === '-1' || String(object.id_parent) === ''
      );
    }

    if (options.length === 0) {
      isDisabled = true;
      options = [];
      value = null;
    }
  }

  disabled = disabled ? disabled : isDisabled;
  let html = <></>;

  // SELECT NATIVO
  if (mode === 'single') {
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
        className={`w-full border border-gray-300 rounded-[5px] px-2 py-1 text-sm 
              focus:outline-none focus:ring-1 focus:ring-blue-300 
              disabled:bg-gray-100 disabled:cursor-not-allowed 
              h-[35px] ${className}`}
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
  else if (mode === 'autocomplete') {
    html = (
      <Select
        noOptionsMessage={() => 'Sin resultados'}
        className={`react-select-container ${className}`}
        classNames={{ ...customStyles, ...customStylesSingle }}
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
  else if (mode === 'multi') {
    const selectedValues =
      value?.map((val) => options.find((option) => String(option.value) === String(val))) || [];

    html = (
      <Select
        noOptionsMessage={() => 'Sin resultados'}
        classNames={{ ...customStyles, ...customStylesMulti }}
        className={`react-select-container`}
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
  else if (mode === 'async') {
    html = (
      <AsyncSelect
        noOptionsMessage={() => 'Sin resultados'}
        loadingMessage={() => 'Cargando...'}
        classNames={{ ...customStyles, ...customStylesSingle }}
        className={`react-select-container`}
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
  else if (mode === 'async-multi') {
    const selectedValues =
      value?.map((val) => options.find((option) => String(option.value) === String(val))) || [];

    html = (
      <AsyncSelect
        noOptionsMessage={() => 'Sin resultados'}
        loadingMessage={() => 'Cargando...'}
        classNames={{ ...customStyles, ...customStylesMulti }}
        className={`react-select-container`}
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
