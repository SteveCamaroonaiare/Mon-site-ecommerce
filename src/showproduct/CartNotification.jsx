import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ShowProduct.css'

const CartNotification = ({ item, onClose, cartCount }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="cart-notification">
      <div className="cart-notification-content">
        <span className="close-btn" onClick={onClose}>×</span>
        <p>✅ Ajouté au panier</p>
        <div className="cart-item-preview">
          <img src={`http://localhost:8000/storage/${item.image}`} alt={item.name} />
          <div>
            <h4>{item.name}</h4>
            <p>{item.price} Dh</p>
          </div>
        </div>
        <Link to="/Panier" className="view-cart-btn">
          Afficher le panier ({cartCount})
        </Link>
      </div>
    </div>
  );
};

export default CartNotification;