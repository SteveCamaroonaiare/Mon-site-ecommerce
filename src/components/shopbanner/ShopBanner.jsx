import React, { useEffect, useState } from "react";
import "./ShopBanner.css";
import { FaShoppingCart } from "react-icons/fa";
import Pagination from "./Pagination.jsx";
import { Link } from 'react-router-dom';
import axios from 'axios';

const ShopBanner = ({ category,searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products/shop?limit=8", {
          params: { category }
        });
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [category]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm?.toLowerCase() || '')
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="shop-banner">
      {currentProducts.map((product) => (
        <div className="product-card" key={product.id}>
          <Link to={`/ShowProduct/${product.id}`}
           state={{ productData: product }}>
            <img
              src={`http://localhost:8000/Storage${product.image}`}
              alt={product.name}

              className="product-image"
            />
          </Link>
          <p className="product-category">{product.category}</p>
          <h4 className="product-title">{product.name}</h4>
          <div className="product-pricing">
            <span className="price">${product.price}</span>
            {product.is_promo && (
              <span className="promo-price">${product.promo_price}</span>
            )}
          </div>
          <div className="product-rating">
            {'⭐'.repeat(product.rating)}
          </div>
          <button className="add-cart-icon">
            <FaShoppingCart />
            <span>ADD TO CART</span>
          </button>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ShopBanner;