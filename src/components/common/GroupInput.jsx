import get from 'lodash/get';
import { AutoComplete } from 'primereact/autocomplete';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import renderSelect from '@sistec/helpers/formElements/renderSelect';
import renderRadio from '@sistec/helpers/formElements/renderRadio';
import renderHtmlGroup from '@sistec/helpers/formElements/renderHtmlGroup';
import renderHtmlDateRange from '@sistec/helpers/formElements/renderHtmlDateRange';
import renderInput from '@sistec/helpers/formElements/renderInput';
import formatNumberMoney, { preventValueMoney } from '@sistec/helpers/formatMoney';
import renderHtmlDescription from '@sistec/helpers/formElements/renderHtmlDescription';
import renderFile from '@sistec/helpers/formElements/renderFile';
import { cn } from '@sistec/helpers/utils';

function GroupInput({
  show,
  type,
  title,
  options,
  mode,
  value,
  defaultValue,
  className,
  classContainer,
  valueMap,
  setValue,
  width,
  jsConfig,
  formatLabel,
  handleFile,
  showExtraInfo,
  extraInfo = '',
  rules,
  ...config
}) {
  if (valueMap) {
    value = get(valueMap, config.id);
  } else {
    value = defaultValue ?? value;
  }

  if (jsConfig) {
    try {
      const obj = eval(jsConfig);
      config = { ...config, ...obj };
    } catch {
      throw new Error('Ocurrió un error!');
    }
  }

  options = options ?? [];
  className = className ?? '';
  let html;

  const { idSon, ...others } = config;
  switch (type) {
    case 'select':
      options = options.filter((item) => item.field === config.id);
      html = (
        <div className="select-container">
          {renderSelect(config, className, options, value, mode, valueMap)}
        </div>
      );
      break;
    case 'radio':
      options = options.filter((item) => item.field === config.id);
      html = renderRadio(config, className, options, value);
      break;
    case 'checkbox':
      html = <input type="checkbox" checked={value} className={config.className} {...others} />;
      break;
    case 'switch':
      html = (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={value || false}
            className="sr-only"
            onChange={(e) => setValue?.(e.target.checked)}
            disabled={config.disabled}
            {...others}
          />
          <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${value ? 'bg-green-500' : 'bg-gray-300'}`}>
            <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow transition-transform duration-200 ${value ? 'translate-x-full' : 'translate-x-0'}`}></div>
          </div>
        </label>
      );
      break;
    case 'textarea':
      html = (
        <textarea
          className={`w-full border border-gray-300 rounded-[5px] px-2 py-1 text-sm 
        focus:outline-none focus:ring-1 focus:ring-blue-300 
        disabled:bg-gray-100 disabled:cursor-not-allowed 
       min-h-[72px] ${className}`}
          {...config}
          value={value ?? ''}
        />
      );
      break;
    case 'money':
      html = (
        <input
          className={`w-full border border-gray-300 rounded-[5px] px-2 py-1 text-sm 
        focus:outline-none focus:ring-1 focus:ring-blue-300 
        disabled:bg-gray-100 disabled:cursor-not-allowed 
        h-[35px] ${className}`}
          {...config}
          value={formatNumberMoney(value) ?? ''}
          type="text"
          onKeyDownCapture={preventValueMoney}
        />
      );
      break;
    case 'split':
      html = renderInput(config, className, value, 'text', valueMap);
      break;
    case 'group':
      html = renderHtmlGroup(config, className, options, valueMap);
      break;
    case 'description':
      html = renderHtmlDescription(value, config, className);
      break;
    case 'date-range':
      html = renderHtmlDateRange(config, setValue, value);
      break;
    case 'autocomplete':
      html = (
        <div className="container-input-autocomplete">
          <AutoComplete value={value} className="input-autocomplete" {...config} />
        </div>
      );
      break;
    case 'input-range':
      html = (
        <div className="flex flex-col gap-1">
          <input
            type="range"
            className={`w-full ${className}`}
            {...config}
            value={value}
            onChange={(e) => setValue?.(e.target.value)}
          />
          <span className="text-sm text-gray-600">
            {formatLabel === '%'
              ? `${value}%`
              : formatLabel === '$'
                ? Number(value).toLocaleString('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
                : value}
          </span>
        </div>
      );
      break;
    case 'file':
      html = renderFile(className, mode, handleFile, { ...config });
      break;
    default:
      html = renderInput(config, className, value, type, valueMap);
      break;
  }

  const propTitle = { mytitle: title };

  const { id, disabled = false, isDisabled = false, required = false } = config;
  const showMultiLine = title?.length >= 12 && width?.sm < 4;
  const isFieldDisabled = disabled || isDisabled;

  const titleFormInput = title ? (
    <label
      htmlFor={id}
      className={`text-[0.91rem]  mt-auto ${isFieldDisabled ? 'opacity-50' : ''} ${required && showMultiLine ? 'font-semibold' : ''
        }`}
      {...(showMultiLine ? propTitle : {})}
    >
      {showMultiLine ? (
        <>
          <span>{`${title} ${showExtraInfo ? extraInfo : ''}`.trim()}</span>
          {required && <span>{' *'}</span>}
        </>
      ) : (
        `${title} ${showExtraInfo ? extraInfo : ''} ${required ? '*' : ''}`.trim()
      )}
    </label>
  ) : null;

  return (
    <div className={cn('p-1', classContainer)}>
      {titleFormInput}
      {html}
    </div>
  );
}

export default GroupInput;
