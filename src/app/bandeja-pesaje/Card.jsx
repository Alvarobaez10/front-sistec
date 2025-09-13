'use client';
import React from 'react';

const Card = ({ material }) => {
  return (
    <div className="card">
      <div className="card-image">
        {material.imagen && (
          <img
            src={material.imagen}
            alt={material.material}
            className="material-img"
          />
        )}
      </div>

      <div className="card-name">
        {material.material}
      </div>
    </div>
  );
};

export const CardGrid = ({ materiales = [] }) => {
  if (!materiales.length) {
    return (
      <div className="empty-state">
        <p>No hay materiales disponibles</p>
      </div>
    );
  }

  return (
    <div>
      {materiales.map((material) => (
        <Card
          key={material.id_material}
          material={material}
        />
      ))}
    </div>
  );
};

export default Card;