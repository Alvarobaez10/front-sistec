'use client'

import React, { useEffect, useState, useRef } from 'react';

export function DateRangePickerSimple({ value, setDate, id = 'date-range' }) {
  const [open, setOpen] = useState(false);
  const [localFrom, setLocalFrom] = useState('');
  const [localTo, setLocalTo] = useState('');
  const wrapRef = useRef(null);


  useEffect(() => {
    const parseToInput = (v) => {
      if (!v) return '';
      if (v instanceof Date) {
        const y = v.getFullYear();
        const m = String(v.getMonth() + 1).padStart(2, '0');
        const d = String(v.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
      }

      if (typeof v === 'string') {
        if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(v)) {
          const [dd, mm, yyyy] = v.split('/');
          return `${yyyy}-${mm}-${dd}`;
        }
      }
      return '';
    };

    setLocalFrom(parseToInput(value?.from));
    setLocalTo(parseToInput(value?.to));
  }, [value]);

  useEffect(() => {
    function onDoc(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const apply = () => {
    const fromDate = localFrom ? new Date(localFrom) : null;
    const toDate = localTo ? new Date(localTo) : null;
    setDate({ from: fromDate, to: toDate });
    setOpen(false);
  };

  const clear = () => {
    setLocalFrom('');
    setLocalTo('');
    setDate({ from: null, to: null });
    setOpen(false);
  };

  const formatLabel = () => {
    if (!value || (!value.from && !value.to)) return 'Seleccionar rango';
    const fmt = (d) =>
      d instanceof Date
        ? d.toLocaleDateString()
        : typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d)
        ? new Date(d).toLocaleDateString()
        : d?.toString();
    if (value.from && value.to) return `${fmt(value.from)} - ${fmt(value.to)}`;
    if (value.from) return fmt(value.from);
    return 'Seleccionar rango';
  };

  return (
    <div className="relative inline-block" ref={wrapRef}>
      <button
        id={id}
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-[260px] flex items-center justify-between px-3 py-2 border rounded-md text-sm bg-white hover:shadow-sm"
      >
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none">
            <path d="M7 11V13M17 11V13M3 7h18M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className={`text-sm ${!value?.from && !value?.to ? 'text-gray-400' : 'text-gray-700'}`}>
            {formatLabel()}
          </span>
        </div>
        <span className="text-xs text-gray-400">▾</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-[300px] bg-white border rounded-md shadow-lg p-3">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-600">Desde</label>
            <input
              type="date"
              value={localFrom}
              onChange={(e) => setLocalFrom(e.target.value)}
              className="w-full border px-2 py-1 rounded text-sm"
            />

            <label className="text-xs text-gray-600">Hasta</label>
            <input
              type="date"
              value={localTo}
              onChange={(e) => setLocalTo(e.target.value)}
              className="w-full border px-2 py-1 rounded text-sm"
            />

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={clear}
                className="px-3 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200"
              >
                Limpiar
              </button>
              <button
                type="button"
                onClick={apply}
                className="px-3 py-1 text-sm rounded bg-green-500 text-white hover:bg-green-600"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default function renderHtmlDateRange(config, setValue, value) {
  const key = config?.name ?? config?.id ?? 'date_range';

  const setDate = (range) => {

    setValue(key, range);
  };

  return <DateRangePickerSimple value={value} setDate={setDate} id={key} />;
}
