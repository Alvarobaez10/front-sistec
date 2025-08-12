import { useApp } from '@sistec/context/AppContext';
import { cn } from '@sistec/helpers/utils';
import React, { useRef } from 'react';

export default function ContainerForms() {
  const iframesRef = useRef({});
  const { loadedForms, changeForm } = useApp();

  function renderHeader() {
    let html = [];
    for (let i = 0; i < loadedForms.length; i++) {
      const form = loadedForms[i];
      html.push(
        <div
          key={form.id_form}
          className={cn('item-header-form', form.visible ? 'active' : '')}
          onClick={() => changeForm(form.id_form)}
        >
          <label>{form.label}</label>
          <span className="close-icon">&times;</span>
        </div>
      );
    }

    return <div className="container-header-forms">{html}</div>;
  }

  return (
    <div className="grid grid-rows-[auto_1fr]" id="containerForms">
      {renderHeader()}
      <div className="p-4 overflow-auto h-full relative">
        {loadedForms.map((form) => (
          <iframe
            key={form.id_form}
            ref={(el) => (iframesRef.current[form.id_form] = el)}
            src={form.url}
            title={form.label}
            className={`w-full h-full border-0 top-0 left-0 ${form.visible ? 'block' : 'hidden'}`}
          ></iframe>
        ))}
      </div>
    </div>
  );
}
