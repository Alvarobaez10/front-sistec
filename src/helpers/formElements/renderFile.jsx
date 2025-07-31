import React, { useState } from "react";

export default function renderFile(
  className = "",
  mode = "single",
  handleFile = () => {},
  { ...config }
) {
  const [fileName, setFileName] = useState("");
  const {
    disabled = false,
    accept,
    placeholder = "Selecciona un archivo",
    id,
    ...rest
  } = config;

  const handleChange = (e) => {
    const files = e.target.files;
    handleFile(files);

    if (files.length > 0) {
      const names = Array.from(files).map((f) => f.name).join(", ");
      setFileName(names);
    } else {
      setFileName("");
    }
  };

  const multiFiles = String(mode) === "multiple";

  return (
    <div>
      <label
        htmlFor={id}
        className={`flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${className}`}
        {...rest}
      >
        <span className="material-icons text-blue-500">attach_file</span>
        <p className="truncate w-full" title={fileName}>
          {fileName || placeholder}
        </p>
      </label>
      <input
        id={id}
        type="file"
        className="hidden"
        disabled={disabled}
        onChange={handleChange}
        accept={accept}
        multiple={multiFiles}
      />
    </div>
  );
}
