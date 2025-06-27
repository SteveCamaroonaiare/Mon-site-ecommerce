import React, { useState } from 'react';
import './ShowProduct.css';


const ProductImages = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]?.path || '');

  return (
    <div className="flex">
      {/* Miniatures */}
      <div className="flex flex-col mr-4 space-y-2">
        {images.map((image, index) => (
          <button
            key={index}
            className="w-16 h-16 border rounded overflow-hidden"
            onClick={() => setMainImage(image.path)}
          >
            <img 
              src={image.path} 
              alt={`Vue ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      
      {/* Image principale */}
      <div className="flex-1">
        <img 
          src={mainImage} 
          alt="Produit" 
          className="w-full h-auto max-h-96 object-contain"
        />
      </div>
    </div>
  );
};

export default ProductImages;