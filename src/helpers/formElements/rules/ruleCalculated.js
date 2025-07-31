const ruleCalculated = (key, rule, infoActualizado) => {
  if (!rule || !rule.fields || !rule.fields.some((f) => f in infoActualizado)) {
    return;
  }

  const { operation, fields } = rule;
  const values = fields.map((f) => parseFloat(infoActualizado[f]) || 0);

  switch (operation) {
    case "multiply":
      infoActualizado[key] = values.reduce((a, b) => a * b, 1);
      break;
    case "sum":
      infoActualizado[key] = values.reduce((a, b) => a + b, 0);
      break;
    case "subtract":
      infoActualizado[key] = values.reduce((a, b) => a - b);
      break;
    case "divide":
      infoActualizado[key] = values.reduce((a, b) => (b !== 0 ? a / b : 0));
      break;
  }
};

export default ruleCalculated;
