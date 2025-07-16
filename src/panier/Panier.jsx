import { useState, useEffect } from 'react';
import { IoIosRemoveCircle } from "react-icons/io";
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import "./Panier.css";
import axios from 'axios';
import Cookies from 'js-cookie';
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { RiSubtractFill } from "react-icons/ri";

export default function Panier() {
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState('info');
  const [cartCount, setCartCount] = useState(0);
  const [shippingAddress, setShippingAddress] = useState('');
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    const cartItems = JSON.parse(Cookies.get('cart') || '[]');
    setCart(cartItems);
    setCartCount(cartItems.length);
  }, []);

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7, path: "/" });
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    setCartCount(updatedCart.length);
    Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7, path: "/" });
  };

  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const handleOrder = async () => {
    if (!shippingAddress.trim()) {
      alert("Adresse de livraison requise");
      return;
    }

    const orderData = {
      products: cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      payment_method: 'COD',
      shipping_address: shippingAddress,
    };

    try {
      const response = await axios.post("https://steve.new-mande.com/api/orders", orderData);
      alert("✅ Commande enregistrée avec succès !");
      Cookies.remove("cart");
      setCart([]);
      setCheckout("info");
      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert("❌ Une erreur est survenue !");
    }
  };

  return (
    <div className="home-shop-container">
      <div className="top-header">
        <span className='deb'>(+01)-2345-6789</span>
        <span className='debut'>Our location</span>
        <span>Super Value Deals - Save more with coupons</span>
        <span className="auth-links debut">Log In / Sign Up</span>
      </div>

      <div className="main-nav">
        <div className="logo">Step-ZOne<span className="leaf"></span></div>
        <nav className="nav-links">
          <a href="/">Accueil</a>
          <a href="/HomeShop">Boutique</a>
          <a href="/MyAccount">Mon Compte</a>
          <a href="/login">Connexion</a>
        </nav>
        <div className="search-icons">
          <FaHeart className="icon" />
          <Link to='/Panier'><FaShoppingCart className="icon" /></Link>
        </div>
      </div>

      <div className="breadcrumb">
        <span>Home &nbsp; &gt; &nbsp;</span>
        <span>Shop &nbsp; &gt; &nbsp;</span>
        <span>Panier</span>
      </div>

      {checkout === 'info' && (
        <div className="container py-5">
          <h2 className="mb-4 text-center">🛒 Votre Panier</h2>
          <div className="rows g-4">
            {cart.map(item => (
              <div key={item.id} className="col-12">
                <div className="card cart-item">
                  <img src={`https://steve.new-mande.com/storage/${item.image}`} alt={item.name} className="cart-image" />
                  <div className="cart-content">
                    <div className="cart-header">
                      <h5 className="espace">{item.name}</h5>
                      <p className="espace">{item.description}</p>
                      <p className="cart-price"><strong>Prix :</strong> {item.price} Dh</p>
                      <p className="subtotal"><strong>Sous-total :</strong> {(item.price * item.quantity).toFixed(2)} Dh</p>
                    </div>
                    <div className="cart-footer">
                      <div className="cart-quantity">
                        <button onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}><RiSubtractFill /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}><FaPlus /></button>
                      </div>
                      <button className="btn-supprimer" onClick={() => removeItem(item.id)}>
                        <MdDelete className="me-1" size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-between align-items-center mt-5">
            <h4>Total : {total} Dh</h4>
            <div className="d-flex gap-2">
              <a href="/HomeShop"><button className="btn btn-outline-secondary">🔄 Mettre à jour</button></a>
              <a href='/HomeShop'><button className="btn btn-success">🛍 Continuer les achats</button></a>
            </div>
          </div>
        </div>
      )}

      <div>
        <h4 className='btn paiement' onClick={() => setCheckout('paiement')}>Procéder au Paiement</h4>
      </div>

      {checkout === 'paiement' && (
        <div className="container py-5">
          <h2 className="text-center mb-4">💳 Paiement à la livraison</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="form-section">
                <label>Adresse de livraison <span style={{ color: "#d48d0a" }}>*</span></label>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Votre adresse complète..."
                  rows={3}
                  required
                />
              </div>
              <button type="button" onClick={handleOrder} className="btn btn-primary w-100 mt-3">
                💰 Confirmer la commande - {total} MAD
              </button>
              {success && (
                <div className="alert alert-success mt-3">
                  ✅ Commande enregistrée avec succès !
                </div>
              )}
            </div>

            <div className="col-md-6">
              <div className="card p-4 shadow-sm">
                <h5>🧾 Récapitulatif</h5>
                <ul className="list-group list-group-flush mb-3">
                  {cart.map(item => (
                    <li key={item.id} className="list-group-item">
                      {item.name} - {item.quantity} x {item.price} MAD
                    </li>
                  ))}
                </ul>
                <h5 className="text-end">Total : {total} MAD</h5>
              </div>
            </div>
          </div>
        </div>
      )}

      <section>
        <Footer />
      </section>
    </div>
  );
}
