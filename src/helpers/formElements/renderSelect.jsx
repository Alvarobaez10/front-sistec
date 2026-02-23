import { ComboBox } from '@sistec/components/common/ComboBox';
import { get } from 'lodash';
import dynamic from 'next/dynamic';
import { cn } from '../utils';
const Select = dynamic(() => import('react-select'), { ssr: false });
const AsyncSelect = dynamic(() => import('react-select/async'), { ssr: false });

const customStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: '35px',
    height: '35px',
    boxShadow: 'none',
    borderColor: state.isFocused ? '#93c5fd' : '#d1d5db',
    '&:hover': {
      borderColor: state.isFocused ? '#93c5fd' : '#d1d5db',
    },
  }),
  valueContainer: (base) => ({
    ...base,
    height: '35px',
    padding: '0 8px',
  }),
  input: (base) => ({
    ...base,
    margin: '0px',
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height: '35px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (base) => ({
    ...base,
    marginTop: '4px',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: '200px',
    padding: '4px',
  }),
  option: (base, state) => ({
    ...base,
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: state.isSelected ? 'var(--accent)' : state.isFocused ? '#dbeafe' : 'white',
    color: state.isSelected ? 'var(--white-color-label)' : '#1f2937',
    '&:active': {
      backgroundColor: state.isSelected ? 'var(--accent)' : '#dbeafe',
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: '#1f2937',
    fontSize: '14px',
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: '#dbeafe',
  }),
  multiValueLabel: (base) => ({
    ...base,
    fontSize: '14px',
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: '14px',
  }),
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
      <ComboBox
        allOptions={options}
        className={cn('form-select', otherConfig.className)}
        clearable={true}
        creatable={false}
        disabled={disabled}
        id={id}
        labelNotFound={otherConfig.labelNotFound ?? 'Sin resultados'}
        labelSearch={otherConfig.labelSearch ?? 'Buscar...'}
        options={options}
        placeholder={otherConfig.placeholder ?? 'Seleccionar'}
        setOptions={() => {}}
        value={value}
        onChange={otherConfig.onChange}
      />

      // <Select
      //   noOptionsMessage={() => 'Sin resultados'}
      //   isDisabled={disabled}
      //   isClearable
      //   isSearchable
      //   value={options.find((o) => String(o.value) === String(value)) || null}
      //   options={options}
      //   {...otherConfig}
      // />
    );
  }

  // SELECT MULTI
  else if (mode === 'multi') {
    const selectedValues =
      value?.map((val) => options.find((option) => String(option.value) === String(val))) || [];

    html = (
      <Select
        noOptionsMessage={() => 'Sin resultados'}
        styles={customStyles}
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
        styles={customStyles}
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
        styles={customStyles}
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
