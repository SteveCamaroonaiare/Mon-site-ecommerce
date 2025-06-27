import React from 'react';
import './ShowProduct.css';

const SizeSelector = ({ sizes, selectedSizeId, onSizeChange, variantId }) => {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-900">Taille</h3>
      <div className="grid grid-cols-4 gap-2 mt-2">
        {sizes.map((size) => (
          <button
            key={size.id}
            onClick={() => onSizeChange(size.id)}
            className={`py-2 px-3 border rounded-md text-center ${selectedSizeId === size.id ? 'bg-black text-white border-black' : 'border-gray-300'}`}
          >
            {size.eu_size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;