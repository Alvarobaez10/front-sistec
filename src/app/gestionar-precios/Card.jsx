'use client';
import formatNumberMoney, { getValueMoney, preventValueMoney } from '@sistec/helpers/formatMoney';
import React from 'react';

const Card = ({ material, changePrice, indice, options }) => {
  const precio = material.precio_nuevo ? material.precio_nuevo : material.precio;
  return (
    <div className="card not-hover">
      <div className="card-image">
        {material.imagen && (
          <img src={material.imagen} alt={material.material} className="material-img" />
        )}
      </div>

      <div className="card-name">{material.material}</div>

      <div className="flex flex-row justify-between items-center mt-2 gap-1 text-xs">
        <span>Ultima actualización</span>
        <span title="Última actualización">{material.fecha_actualizacion}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3 text-sm items-center">
        <span title="Precio actual">{formatNumberMoney(material.precio)}</span>
        <input
          className={`w-full border border-gray-300 rounded-[5px] px-2 py-1 text-sm 
               focus:outline-none focus:ring-1 focus:ring-blue-300 
               disabled:bg-gray-100 disabled:cursor-not-allowed 
               h-[35px]`}
          id={`precio_nuevo_${material.id_material}`}
          name={`precio_nuevo_${material.id_material}`}
          value={formatNumberMoney(precio)}
          type="text"
          onChange={(e) => changePrice(getValueMoney(e), indice, 'predio')}
          onKeyDownCapture={preventValueMoney}
        />
        <span title="Precio actual">Unidad de medida</span>

        <select
          id={`unidad_medida_${material.id_material}`}
          name={`unidad_medida_${material.id_material}`}
          onChange={(e) => changePrice(getValueMoney(e), indice, 'unidad')}
          value={String(material.id_dom_unidad_medida)}
          className={`w-full border border-gray-300 rounded-[5px] px-2 py-1 text-sm 
              focus:outline-none focus:ring-1 focus:ring-blue-300 
              disabled:bg-gray-100 disabled:cursor-not-allowed 
              h-[35px]`}
        >
          <option key={-1} value={'-1'}>
            Seleccione
          </option>
          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Card;
