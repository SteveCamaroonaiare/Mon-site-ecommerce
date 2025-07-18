import React, { useState, useEffect } from 'react';
import './HomeShop.css';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import ShopBanner from '../components/shopbanner/ShopBanner';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const HomeShop = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const [showSubMenu, setShowSubMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");

    if (category) {
      setShowSubMenu(true);            // Ouvre le sous-menu
      setSelectedCategory(category);   // Stocke la catégorie pour déclencher une action
    }
  }, [location.search]);
  const toggleSubMenu = (e) => {
    e.preventDefault(); // pour éviter la redirection
    setShowSubMenu(!showSubMenu);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowSubMenu(false); // on referme le menu après clic
  };



  return (
    <div className="home-shop-container">
      {/* Top Header */}
            <div className="top-header">
        <span className='deb'>(+01)-2345-6789</span>
        <span className='debut'>Our location</span>
        <span>Super Value Deals - Save more with coupons</span>
        <span className="auth-links debut">Log In / Sign Up</span>
      </div>

      {/* Main Navigation */}
      <div className="main-nav">
        <div className="logo">Step-ZOne<span className="leaf"></span></div>
        <nav className="nav-links">
          <a href="/">Accueil</a>
          <ul>
            <li>
              <a href="/HomeShop" className="active" onClick={toggleSubMenu}>
                Boutique
              </a>
              {showSubMenu && (
                <ul className="submenu">
                  <li><a href="#" onClick={() => handleCategoryClick('hommes')}>Hommes</a></li>
                  <li><a href="#" onClick={() => handleCategoryClick('femmes')}>Femmes</a></li>
                  <li><a href="#" onClick={() => handleCategoryClick('enfants')}>Enfants</a></li>
                </ul>
              )}
            </li>
          </ul>


          <a href="/MyAccount">Mon Compte</a>
          <a href="/login">Connexion</a>
        </nav>
        <div className="search-icons">
          <input
            type="text"
            placeholder="Search for items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />          <FaHeart className="icon" />
          <Link to='/Panier'><FaShoppingCart className="icon" /></Link>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home &nbsp; &gt; &nbsp;</span>
        <span>Shop &nbsp; &gt; &nbsp;</span>
        {selectedCategory && <span>{selectedCategory}</span>}
      </div>
      <div className='bots'>
        <h2 className='bot'>cherchez parmi nos <span>200</span> produits</h2>

      </div>


      <section>
        <ShopBanner category={selectedCategory} searchTerm={searchTerm} />
      </section>
      <section>
        <Footer />

      </section>
    </div>
  );
};

export default HomeShop;
