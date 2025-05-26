import React, { useState } from 'react';
import './ForgotPassword.css';
import Footer from '../footer/Footer';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

import { Link } from 'react-router-dom';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ici, tu peux appeler une API pour envoyer l'email
    setMessage(`Un lien de réinitialisation a été envoyé à ${email}`);
    setEmail('');
  };

  return (
    <div className="home-shop-container">
      {/* Top Header */}
      <div className="top-header">
        <span>(+01)-2345-6789</span>
        <span>Our location</span>
        <span>Super Value Deals - Save more with coupons</span>
        <span className="auth-links">Log In / Sign Up</span>
      </div>

      {/* Main Navigation */}
      <div className="main-nav">
        <div className="logo">Step-ZOne<span className="leaf"></span></div>
        <nav className="nav-links">
          <a href="/">Accueil</a>
          <a href="/shop">Boutique</a>
  
          <a href="/MyAccount">Mon Compte</a>
          <a href="/login"  className="active">Connexion</a>
        </nav>
        <div className="search-icons">
          <input type="text" placeholder="Search for items..." />
          <FaHeart className="icon" />
          <Link to='/Panier'><FaShoppingCart className="icon" /></Link>
        </div>
      </div>
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Mot de passe oublié</h2>
        <p>Veuillez entrer votre adresse e-mail pour recevoir un lien de réinitialisation.</p>
        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Envoyer</button>
        {message && <p className="confirmation-message">{message}</p>}
        <div className="links">
          <a href="/login">Retour à la connexion</a>
        </div>
      </form>

      
    </div>
    <section className='footers'>
    <Footer/>

    </section>
    </div>
  );
};

export default ForgotPassword;
