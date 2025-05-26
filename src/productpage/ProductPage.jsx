import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.css';
import { products } from '../components/shopbanner/ShopBanner';
import e1 from "../assets/img/e1.jpg";


const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const selectedProduct = products.find(item => item.id === parseInt(id));
    setProduct(selectedProduct);
  }, [id]);
  

  if (!product) {
    return <div>Chargement du produit...</div>;
  }

  return (
    <div className="product-page-container">
      <div className="product-images">
        <img src={product.image} alt={product.name} className="main-image" />
        <div className="thumbnails">
          {[product.image, product.image, product.image].map((thumb, index) => (
            <img
              key={index}
              src={thumb}
              alt={`Thumbnail ${index}`}
              className="thumbnail"
            />
          ))}
        </div>
      </div>

      <div className="product-details">
        <h2>{product.name}</h2>
        <p className="brand">Brand: adidas</p>
        <div className="price-section">
          <span className="current-price">${product.price}</span>
          <span className="old-price">${product.oldPrice}</span>
          <span className="discount">25% OFF</span>
        </div>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam rem officia, corrupti...
        </p>

        <ul className="product-benefits">
          <li>✔ 1 Year Al Jazeera Brand Warranty</li>
          <li>✔ 30 Day Return Policy</li>
          <li>✔ Cash on Delivery available</li>
        </ul>

        <div className="product-options">
          <div className="colors">
            <span>Color:</span>
            <div className="color-circle orange"></div>
            <div className="color-circle green"></div>
            <div className="color-circle yellow"></div>
            <div className="color-circle red"></div>
            <div className="color-circle blue"></div>
          </div>
          <div className="sizes">
            <span>Size:</span>
            <button>M</button>
            <button>L</button>
            <button>XL</button>
            <button>XXL</button>
          </div>
        </div>

        <div className="add-to-cart">
          <input type="number" defaultValue={1} min={1} />
          <button className="btn-add">Add to Cart</button>
        </div>

        <div className="meta">
          <p>SKU: FW511VSKT</p>
          <p>Tags: Cloth, Women, Dress</p>
          <p>Availability: 8 Items in Stock</p>
        </div>

        <div className="product-tabs">
          <button>Additional Info</button>
          <button>Reviews (3)</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
