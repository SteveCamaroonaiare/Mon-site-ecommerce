import React, { useState, useEffect, useRef } from 'react';
import './Banner.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import f7 from '../../assets/img/f7.jpg';
import f3 from '../../assets/img/f3.jpg';

import i7 from '../../assets/img/i7.jpg';

import i1 from '../../assets/img/i1.jpg';
import e4 from '../../assets/img/e4.jpg';

import f71 from '../../assets/img/f71.png';

import { Link } from 'react-router-dom';
import HomeShop from '../../homeshop/HomeShop';

const Banner = () => {
    const shoppingContainerRef = useRef(null);
    const [promoProducts, setPromoProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch promo products from API
     useEffect(() => {
    const fetchPromoProducts = async () => {
      try {
        setLoading(true);
        const [promoRes] = await Promise.all([
          axios.get("https://steve.new-mande.com/api/products/promo?limit=5").catch(e => ({ data: [] })),
        ]);
        console.log("Données promo:", promoRes.data); // Inspectez la structure
setPromoProducts((promoRes?.data || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));

      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPromoProducts();
  }, []);


    const scroll = (direction) => {
        if (!shoppingContainerRef.current) return;
        const container = shoppingContainerRef.current;
        const scrollAmount = 300;
        direction === "left" 
            ? container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
            : container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

  

    return (
        <div>
            <div className="shopping">
                {/* Nos Promotions */}
                <div className="sommer">
                    <h2 className="titre Tend">Nos Promotions</h2>
                </div>
                
                {loading ? (
                    <p>Chargement des promotions...</p>
                ) : error ? (
                    <p className="error-message">Erreur: {error}</p>
                ) : (
                    <>
                        
                        
                        <div className="containerShopping" ref={shoppingContainerRef}>
                            {promoProducts.map((product) => (
                                <div className="shoppingArtecl" key={product.id}>
                                  <Link 
                                      to={`/ShowProduct/${product.id}`}
                                      state={{ productData: product }}
                                  >
                                    <div>
                                        <img 
                                            src={`http://steve.new-mande.com/storage${product.image_url}`} 
                                            alt={product.name}
                                            className='imagepromo'
                                        />
                                    </div>
                                    <p>{product.name}</p>
                                    <span className="new-price">{product.promo_price} Dh</span>
                                    <span className="old-price">{product.price} Dh</span><br />
                                    </Link>
                                </div>
                            ))}
                        </div>

                    </>
                )}
            </div>
                        {/*PROMO*/}

                        <div className="promo py-5 promo-section" style={{ minHeight: '250px', backgroundColor: 'rgb(226, 174, 2)',position:"relative"}}>
                              <div className="container">
                                <div className="row align-items-center text-white rounded-4">

                                  {/* Colonne 1 */}
                                  <div className="espace col-md-4 p-4">
                                    <p className="small mb-1">-30% OFF</p>
                                    <h1 className="text-uppercase display-5 fw-bold">
                                      Sur Tous NOS produits.
                                    </h1>
                                    <p className="small">jausqu'au 05 juin 2025</p>
                                  </div>

                                  {/* Colonne 2 */}
                                  <div className="col-md-4 d-flex justify-content-center align-items-center">
                                    <img 
                                      src={f71} 
                                      alt="Casque" 
                                      className="img-fluid trans" 
                                      style={{ height:"439px" ,width: '380px', transform: 'scale(1.25)' ,position:"absolute",bottom:56}} 
                                    />
                                  </div>

                                  {/* Colonne 3 */}
                                  <div className="espace col-md-4 p-4 d-flex flex-column justify-content-center align-items-end text-end">
                                    <p className="fw-bold fs-5 mb-1">Marche avec style.</p>
                                    <h2 className="fw-bold fs-3 mb-1">Découvrez notre nouvelle collection 2025.</h2>
                                    <p className="small mb-3">Des chaussures conçues pour <br />allier  élégance, confort et <br />durabilité. Que vous soyez en <br />quête de sneakers tendance, <br />de talons élégants ou de bottines <br /> intemporelles, notre sélection a  <br />été pensée pour sublimer chacun <br /> de vos pas.</p>
                                    <Link to="/HomeShop"><button className="shop btn btn-light rounded-pill px-4 py-2">
                                      Shop Now
                                    </button></Link>
                                  </div>

                                </div>
                              </div>
                            </div>


                             {/*Livraison*/}

                            

    </div>
    
  )

}

export default Banner
