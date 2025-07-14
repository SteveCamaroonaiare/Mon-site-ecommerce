import React, { useState, useEffect } from "react";
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Home.css";

// Components
import Banner from "../components/banner/Banner";
import Services from '../components/services/Services';
import Footer from "../components/footer/Footer";

// Images
import logo from "../assets/img/logo1.png";
import i1 from "../assets/img/i1.jpg";
import i2 from "../assets/img/i2.jpg";
import i4 from "../assets/img/i4.jpg";
import e1 from "../assets/img/e1.jpg";
import e2 from "../assets/img/e2.jpg";
import f2 from "../assets/img/f2.jpg";
import store from "../assets/img/store.jpg";
import store2 from "../assets/img/store2.jpg";
import storeenfants from "../assets/img/storeenfants.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate=useNavigate()
  // States for products
  const [newProducts, setNewProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [filteredTrending, setFilteredTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Tous");

  // Fetch products from API
  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        setLoading(true);
        const [newRes, trendingRes] = await Promise.all([
          axios.get("https://steve.new-mande.com/api/products/new?limit=3").catch(e => ({ data: [] })),
          axios.get("https://steve.new-mande.com/api/products/trending").catch(e => ({ data: [] }))
        ]);
        console.log("Données tendances:", trendingRes.data); // Inspectez la structure
        setNewProducts(newRes?.data || []);
        setTrendingProducts(trendingRes?.data || []);
        setFilteredTrending(trendingRes?.data || []);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeProducts();
  }, []);

  // Filter function
  const filterItems = (categItem) => {
    setActiveFilter(categItem);
    if (categItem === "Tous") {
      setFilteredTrending(trendingProducts);
    } else {
      const filtered = trendingProducts.filter(item => item.sexes === categItem);
      setFilteredTrending(filtered);
    }
  };

  // Image error handler
  

  if (error) {
    return <div className="error-message">Erreur: {error}</div>;
  }

  return (
    <div className="homepage">
      <main className="main-content">
        {/* Header */}
        <header className="top-banner">
          <div className="account-section">
            <a href="/login">
              <button className="signin">SignIn</button>
            </a>
            <div className="search-icons">
              <Link to='/Panier'><FaShoppingCart className="icon" /></Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="details_container">
          <div className="entete">
            <h2 className="fw-bold principal as" style={{color: 'rgb(226, 174, 2)'}}>
              Découvrez nos collections tendance,<br/>
              Exprimez votre style unique à chaque pas,<br/>
              Profitez d'offres exclusives toute l'année !
            </h2>
            <p className="fw-bold principal" style={{fontSize: "18px"}}>
              Nous sélectionnons pour vous les meilleures marques au meilleur prix.<br/>
              Explorez nos collections tendance et trouvez votre coup de cœur dès aujourd'hui.
            </p>
          </div>

          <div className="rotation">
            <img src={i1} alt="Produit 1" className="image image-1" />
            <img src={e1} alt="Produit 2" className="image image-2" />
            <img src={i4} alt="Produit 3" className="image image-3" />
            <img src={f2} alt="Produit 4" className="image image-4" />
            <img src={e2} alt="Produit 5" className="image image-5" />
            <img src={i2} alt="Produit 6" className="image image-6" />
          </div>
        </div>

        {/* Categories Section */}
        <section className="categories">
          <h2 className="title">CATEGORIES»»»</h2>
          <div className="category-layout">
            <div className="top-row">
              <div className="category-card">
                <div className="card-content">
                  <div className="text-zone">
                    <h3>Pour Hommes</h3>
                    <p>Faites vos choix</p>
                   <button onClick={() => navigate("/HomeShop?category=hommes")}>Boutique1</button>
                  </div>
                  <div className="image-zone">
                    <img src={store} alt="Pour Hommes"  />
                  </div>
                </div>
              </div>
              
              <div className="category-card">
                <div className="card-content">
                  <div className="text-zone">
                    <h3>Pour Femmes</h3>
                    <p>Faites vos choix</p>
                    <button onClick={() => navigate("/HomeShop?category=femmes")}>Boutique2</button>
                  </div>
                  <div className="image-zone">
                    <img src={store2} alt="Pour Femmes" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bottom-row">
              <div className="category-card">
                <div className="card-content">
                  <div className="text-zone">
                    <h3>Pour Enfants</h3>
                    <p>Faites vos choix</p>
                    <button onClick={() => navigate("/HomeShop?category=enfants")}>Boutique3</button>
                  </div>
                  <div className="image-zone">
                    <img src={storeenfants} alt="Pour Enfants" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Products Section */}
        <div className="home-news-section">
          <h2 className="news-title">Nouveautés</h2>
          {loading ? (
            <p>Chargement en cours...</p>
          ) : (
            <div className="news-grid">
              {newProducts.slice(0,3).map(product => (
                <div className="product-card" key={product.id}>
                  <Link to={`/ShowProduct/${product.id}`}
                   state={{ productData: product }}>
                    <img 
                      src={`https://steve.new-mande.com/storage${product.image_url}`} 
                      alt={product.name} 
                      className="news-img"
                    />
                  </Link>
                  <h4 className="nom">{product.name}</h4>
                  <div className="product-pricing">
                    <span className="price">{product.price} Dh</span>
                    {product.is_promo && (
                      <span className="promo-price">{product.promo_price}Dh</span>
                    )}
                  </div>
                  <div className="product-rating">
                    {'⭐'.repeat(product.rating)}
                  </div>
                  <button className="btn-commander">Voir le produit</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Trending Products Section */}
        <div className="category-section style-4 padding-tb">
          <div className="container">
            <div className="section-header text-center">
              <h2 className="title Tendance">Nos Tendances</h2>
              <div className="course-filter-group">
                <ul className="lab-ul">
                  <li 
                    className={activeFilter === "Tous" ? "active" : ""}
                    onClick={() => filterItems("Tous")}
                  >
                    Tous
                  </li>
                  <li 
                    className={activeFilter === "Hommes" ? "active" : ""}
                    onClick={() => filterItems("Hommes")}
                  >
                    Hommes
                  </li>
                  <li 
                    className={activeFilter === "Femmes" ? "active" : ""}
                    onClick={() => filterItems("Femmes")}
                  >
                    Femmes
                  </li>
                  <li 
                    className={activeFilter === "Enfants" ? "active" : ""}
                    onClick={() => filterItems("Enfants")}
                  >
                    Enfants
                  </li>
                </ul>
              </div>
            </div>
            
            {loading ? (
              <p>Chargement en cours...</p>
            ) : filteredTrending.length === 0 ? (
              <p>
    Aucun produit {activeFilter !== "Tous" ? `pour ${activeFilter}` : 'tendance'} trouvé.
    <br />
    <small>Vérifiez que les produits ont bien le champ 'sexes' rempli</small>
  </p>
            ) : (
              <div className="section-wrapper">
                <div className="row g-4 justify-content-center">
                  {filteredTrending.map(product => (
                    <div className="col" key={product.id}>
                      <div className="course-item style-4">
                        <div className="course-inner">
                          <div className="course-thumb">
                            <Link to={`/Showproduct/${product.id}`}
                             state={{ productData: product }}>
                              <img 
                                src={`https://steve.new-mande.com/storage${product.image_url}`} 
                                
                                alt={product.name}
                                className="nome"
                               />
                            </Link>
                          </div>
                          <div className="course-content">
                            <h6>{product.name}</h6>
                            <div className="course-price">
                            {product.price} Dh
                              {product.is_promo && (
                                <span className="promo">{product.promo_price}Dh</span>
                              )}
                            </div>
                            <div className="product-category">
                              {product.sexes}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Other Sections */}
        <section>
          <Banner/>
        </section>

        <section>
          <Services/>
        </section>

        <section >
          <Footer/>
        </section>
      </main>
    </div>
  );
};

export default Home;