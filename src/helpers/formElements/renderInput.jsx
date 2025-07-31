import { get } from "lodash";

function renderInput(config, className = "", value, type, valueMap) {
  const { idParent, idSon, action, trigger, ...otherConfig } = config;
  let { disabled } = config;
  let isDisabled = false;
  let key = otherConfig.id;

  if (idParent) {
    const valueParent = get(valueMap, idParent);
    key = key + valueParent;
    const triggerAction = trigger !== undefined ? trigger : false;
    const condition = triggerAction
      ? !valueParent || valueParent === -1
      : valueParent && valueParent !== -1;
    if (condition) {
      isDisabled = action === "disabled";
      value = null;
    }
  }

  disabled = disabled ? disabled : isDisabled;

  const handlerOnInput = (event) => {
    if (
      otherConfig?.maxlength &&
      event.target.value.length > otherConfig.maxlength
    ) {
      event.target.value = event.target.value.slice(0, otherConfig.maxlength);
    }
    if (type === "numeric") {
      const regex = /^[0-9.\s]*$/;
      if (!regex.test(event.target.value)) {
        event.target.value = event.target.value.replace(/[^0-9.\s]/g, "");
      }
    }
  };

  return (
    <input
      key={key}
      className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
      {...otherConfig}
      disabled={disabled}
      autoComplete="off"
      onInput={handlerOnInput}
      value={value ?? ""}
      type={type}
    />
  );
}

export default renderInput;
