import React, { useState } from 'react';
import "../home/Home.css";
import logo from "../assets/img/logo1.png";
import { Link } from 'react-router-dom';
import { FaTimes, FaBars } from 'react-icons/fa';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Bouton Burger pour mobile */}
      <button 
        className="mobile-menu-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="couleur">
          <div className="logo-section">
            <img src={logo} alt="StepZone Logo" className="logo" />
          </div>
          <p className="sub-slogan" style={{ color: "white" }}>
            CHAUSSURES LUXUEUSES
            <br />
            Passez vos Commandes
          </p>
        </div>
        
        <nav className="menu-links" >
          <Link to="/" onClick={() => setIsOpen(false)}>Accueil</Link>
          <Link to="/HomeShop" onClick={() => setIsOpen(false)}>Boutique</Link>
          <Link to="/MyAccount" onClick={() => setIsOpen(false)}>Mon compte</Link>
          <Link to="/Login" onClick={() => setIsOpen(false)}>Connexion</Link>
        </nav>
      </aside>
    </div>
  )
}

export default Menu;
