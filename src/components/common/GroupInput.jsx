import get from 'lodash/get';
import { AutoComplete } from 'primereact/autocomplete';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import InputRange from 'react-input-range';
import renderSelect from '@sistec/helpers/formElements/renderSelect';
import renderRadio from '@sistec/helpers/formElements/renderRadio';
import renderHtmlGroup from '@sistec/helpers/formElements/renderHtmlGroup';
import renderHtmlDateRange from '@sistec/helpers/formElements/renderHtmlDateRange';
import renderInput from '@sistec/helpers/formElements/renderInput';
import formatNumberMoney, { preventValueMoney } from '@sistec/helpers/formatMoney';
import renderHtmlDescription from '@sistec/helpers/formElements/renderHtmlDescription';
import renderFile from '@sistec/helpers/formElements/renderFile';

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
      html = <input type="checkbox" checked={value} {...others} className={className} />;
      break;
    case 'textarea':
      html = (
        <textarea className={`border p-2 rounded ${className}`} {...config} value={value ?? ''} />
      );
      break;
    case 'money':
      html = (
        <input
          className={`border p-2 rounded ${className}`}
          {...config}
          value={formatNumberMoney(value) ?? ''}
          type="text"
          onKeyDownCapture={preventValueMoney}
        />
      );
      break;
    case 'split':
      html = (
        <input
          className={`border p-2 rounded ${className}`}
          {...config}
          value={value ?? ''}
          type="text"
        />
      );
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
        <InputRange
          formatLabel={(value) => {
            let valorFormato = value;
            if (formatLabel) {
              switch (formatLabel) {
                case '%':
                  valorFormato = `${value}${formatLabel}`;
                  break;
                case '$':
                  valorFormato = Number(value).toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  });
                  break;
                default:
                  valorFormato = value;
                  break;
              }
            }
            return valorFormato;
          }}
          {...config}
          value={value}
        />
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
      className={`${isFieldDisabled ? 'opacity-50' : ''} ${
        required && showMultiLine ? 'font-semibold' : ''
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
    <div className={classContainer}>
      {titleFormInput}
      {html}
    </div>
  );
}

export default GroupInput;
