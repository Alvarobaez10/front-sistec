const ruleShowOn = (localConfig, setConfig, origin, key, rule, info) => {
  const { field, value, type: originalType } = rule;
  const currentValue = info[field];
  const ruleValue = rule.value;
  const condition = rule.condition;
  let shouldShow = false;

  switch (condition) {
    case "include":
      shouldShow = ruleValue.includes(String(currentValue));
      break;
    case "exclude":
      shouldShow = !ruleValue.includes(String(currentValue));
      break;
    case "equal":
      shouldShow = String(currentValue) === String(ruleValue);
      break;
    case "notEqual":
      shouldShow = String(currentValue) !== String(ruleValue);
      break;
    default:
      break;
  }

  const currentField = localConfig[key];
  const updatedField = {
    ...currentField,
    type: shouldShow ? originalType : "hidden",
  };

  if (!shouldShow) {
    delete info[key];
  }

  if (currentField.type !== updatedField.type) {
    setConfig((prev) => ({
      ...prev,
      [origin]: {
        ...prev[origin],
        [key]: updatedField,
      },
    }));
  }
};

export default ruleShowOn;
