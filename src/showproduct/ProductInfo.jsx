import React from "react";

const ProductInfo = ({ product, selectedVariant, selectedSizeId, onColorChange, onSizeChange }) => {
  // Récupérer toutes les couleurs disponibles pour ce produit
  const availableColors = product.variants.map(v => v.color);
  // Filtrer les doublons
const uniqueColors = [...new Map(availableColors.map(color => [color.id, color])).values()];

  // Récupérer les tailles disponibles pour la variante sélectionnée
  const availableSizes = selectedVariant?.sizes || [];

  return (
    <div className="flex-1 pl-8">
      <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
      <p className="mt-2 text-xl text-gray-900">{product.price} €</p>
      <p className="mt-4 text-gray-600">{product.description}</p>
      
      <ColorSelector 
        colors={Array.from(uniqueColors)} 
        selectedColorId={selectedVariant?.color.id} 
        onColorChange={onColorChange}
      />
      
      <SizeSelector 
        sizes={availableSizes} 
        selectedSizeId={selectedSizeId} 
        onSizeChange={onSizeChange}
      />
    </div>
  );
};

export default ProductInfo;