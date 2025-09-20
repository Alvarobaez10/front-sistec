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

export default Card;