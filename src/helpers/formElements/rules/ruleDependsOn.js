const ruleDependsOn = (key, rule, info, options) => {
  // infoActualizado[key] = infoActualizado[rule];
  const parentValue = info[rule.field];
  if (!parentValue) {
    delete info[key];
    return;
  }

  const filtered = options.filter(
    (opt) => opt.field === key && opt[rule.option] === parentValue,
  );

  if (filtered.length > 0) {
    // Asigna el primer valor compatible
    info[key] = filtered[0].value;
  } else {
    // Limpia si no hay coincidencias
    delete info[key];
  }
};

export default ruleDependsOn;
