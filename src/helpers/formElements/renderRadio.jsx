function renderRadio(config, className = "", options, value) {
  const { id, ...otherConfig } = config;
  const html = [];

  for (let i = 0; i < options.length; i++) {
    const item = options[i];
    html.push(
      <label key={item.value} className="flex items-center space-x-2 text-sm text-gray-700 mb-2">
        <input
          type="radio"
          value={item.value}
          checked={String(item.value) === value}
          className="form-radio text-blue-600"
          {...otherConfig}
        />
        <span>{item.label}</span>
      </label>
    );
  }

  return <div className={`flex flex-col ${className}`}>{html}</div>;
}

export default renderRadio;
