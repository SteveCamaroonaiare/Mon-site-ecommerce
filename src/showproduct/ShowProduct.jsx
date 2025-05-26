import React, {use, useEffect, useState} from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import Cookies from 'js-cookie'
import Footer from '../components/footer/Footer';
import { Link, useParams } from 'react-router-dom';
import e1 from "../assets/img/e1.jpg"
import e2 from "../assets/img/e2.jpg"
import pint from "../assets/img/pint.jpg"
import pint2 from "../assets/img/pint2.jpg"
import axios from 'axios'

import pint4 from "../assets/img/pint4.jpg"


import './ShowProduct.css'
import { TbTruckReturn } from "react-icons/tb";
import { CiCreditCard1 } from "react-icons/ci";
import { IoBagCheckOutline } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import { FaRegStar } from "react-icons/fa";





const ShowProduct = () => {
    const { id } = useParams();
    const[product,setproduct] = useState({})
    
    useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
          const response = await axios.get(`http://localhost:8000/api/products/${id}`)       
          setproduct(response.data)
          console.log(response.data)
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
      }
    };
    fetchHomeProducts();
  }, []);



  // Ajout de cette fonction pour gerer mon panier
const addToCart = async () => {
   /** try {
        const token = localStorage.getItem('token'); // Récupérez le token
        const response = await axios.post(
            'http://localhost:8000/api/cart/add', 
            { product_id: product.id, quantity: quantity || 1 ,
                      product_variation_id: selectedVariationId // 

            },
            { headers: { 'Authorization': `Bearer ${token}` } } // Ajout du header
        );
        alert("Produit ajouté au panier !");
    } catch (error) {
        console.error("Erreur:", error.response?.data);
    } */

        const cartItems = JSON.parse(Cookies.get('cart') || '[]');
const setCookie = (name, value, option = { expires: 7 }) => {
  Cookies.set(name, JSON.stringify(value), { ...option, path: "/" });
};

setCookie('cart', [...cartItems, product]);

};



  const handleImageClick = (newImage) => {
    setMainImage(newImage); // changer l'image principale
  };
  const [quantity,setQuantity]=useState()
  const[activeTab, setActiveTab]=useState('info');
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState([
    {
      image: pint,
      rating: "⭐⭐⭐⭐⭐",
      text: "Merci ,pour votre tres rapide livraison en 3 jour depuis le Maroc",
      date: "dimanche 4, avril 2025",
      removable: false 
    },
    {
      image: pint2,
      rating: "⭐⭐⭐⭐⭐",
      text: "Merci ,pour la qualité des produits",
      date: "comme le montrait la pub",
      removable: false 
    },
    {
      image: pint4,
      rating: "⭐⭐⭐⭐⭐",
      text: "Merci ,pour votre tres rapide livraison en 3 jour depuis le Maroc",
      date: "dimanche 4, avril 2025",
      removable: false 
    }
  ]);

  const handleSubmitReview = () => {
    if (newReview.trim() === '') return;

    const newEntry = {
      image: pint4, // ou un avatar générique
      rating: "⭐⭐⭐⭐⭐",
      text: newReview,
      date: new Date().toLocaleDateString('fr-FR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      }),
      removable: true 

    };

    setReviews([...reviews, newEntry]);
    setNewReview('');
  };
  const handleDeleteReview = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
  };


    const specs = [
      ["Stand Up", "35\"L x 24\"W x 37-45\"H (front to back wheel)"],
      ["Folded (no wheels)", "32.5\"L x 18.5\"W x 16.5\"H"],
      ["Folded (w/ wheels)", "32.5\"L x 24\"W x 18.5\"H"],
      ["Door Pass Through", "24"],
      ["Frame", "Aluminum"],
      ["Weight (no wheels)", "20 LBS"],
      ["Weight Capacity", "60 LBS"],
      ["Width", "24\""],
      ["Handle height (ground to handle)", "37-45\""],
      ["Wheels", "12\" air / wide track slick tread"],
      ["Seat back height", "21.5\""],
      ["Head room (inside canopy)", "25\""],
      ["Color", "Black, Blue, Red, White"],
      ["Size", "M, S"]
    ];

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
          <a href="/shop" className="active">Boutique</a>
  
          <a href="/MyAccount">Mon Compte</a>
          <a href="/login">Connexion</a>
        </nav>
        <div className="search-icons">
          <input type="text" placeholder="Search for items..." />
          <FaHeart className="icon" />
          <Link to='/Panier'><FaShoppingCart className="icon" /></Link>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home &nbsp; &gt; &nbsp;</span>
        <span>Shop &nbsp; &gt; &nbsp;</span>
        <a href="">
            <span>colorful pattern shirts</span>
        </a>
      </div>
      

      <section className="details section--lg">
        <div className="details_container container grid">
            <div className="details__group">
                {console.log(product.image)}
                <img src={`http://localhost:8000/Storage/${product.image}`} alt="" className="details_img" />
                <div className='details--small-images grid'>
                    <img src={`http://localhost:8000/storage/${product.image}`} alt="" className='details__small-img ' />
                    <img src={`http://localhost:8000/Storage/${product.image}`} alt="" className='details__small-img' />
                    <img src={`http://localhost:8000/Storage/${product.image}`} alt="" className='details__small-img'/> 

                </div>
            </div>
            <div className=''>
                    <h1 className='details__group details__tittle'>{product.name}</h1>
                
                <div className='details__price flex'>
                    <p className='new_price'>{product.price}</p>
                    
                </div>
                <div className='short__description'>
                    {product.description}
                </div>
                <ul className="product__list">
                    <li className='list__item flex'>
                    <IoBagCheckOutline />
                    Renouvellement du stock chaque 1mois
                    </li>
                    <li className='list__item flex'>
                    <TbTruckReturn />Retou du produit possible
                    </li>
                    <li className='list__item flex'>
                    <CiCreditCard1 />
Paiement a la livraison                    </li>
                </ul>
                
                <div className="details__color flex">
                    <span className="details__color-title">color</span>

                    <ul className="color__list">
                        <li>
                            <a href="" className="color__link" style={{backgroundColor:'red'}}></a>
                        </li>
                        <li>
                            <a href="" className="color__link" style={{backgroundColor:'blue'}}></a>
                        </li>
                        <li>
                            <a href="" className="color__link" style={{backgroundColor:'black'}}></a>
                        </li>
                        <li>
                            <a href="" className="color__link" style={{backgroundColor:'white'}}></a>
                        </li>

                    </ul>
                </div>
                
                <div className="details__action">
                    <input
                        type="number"
                        className="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min={1}
                    />             
                  <button 
                       
                      className="btn btn--sm" 
                      onClick={  addToCart}
                  >
                      ADD to Cart
                  </button>                    <a href="/Panier" className='details__action-btn'>
                    <SlBasket />


                    </a>
                </div>
                <div className='avis flex'>
                <p>Stephen curry </p>
                <p className='etoile'>
                    <FaRegStar /> 
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />

                </p>
                </div>
                <p className='description'>Optez pour l'élégance sans compromis avec 
le mocassin homme Rome. Confectionné en
cuir pleine-fleur souple et résistant, il allie 
raffinement et confort pour répondre aux 
exigences de l'homme moderne. Son bout 
légèrement arrondi ajoute une touche 
</p>
                
            </div>
        </div>
      </section>
       <section className='infoclient'>
        <div className='row'>
            <div className='contenu'>
                <h3 onClick={()=>setActiveTab('info')} className='couleur'  style={{ cursor: 'pointer' }}>Info Supplementaire</h3>
                <h3 onClick={()=>setActiveTab('commentaire')} className='couleur' 
                 style={{ cursor: 'pointer' }}>Commentaire </h3>
            </div>
        </div>
        {activeTab==='info' &&(
        <div className="specs-container">
                <table className="specs-table">
                    <tbody>
                        {specs.map(([key, value], index) => (
                            <tr key={index}>
                                <td className="spec-key">{key}</td>
                                <td className="spec-value">{value}</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </div>)
        }
        {activeTab==='commentaire' &&(
        <div className='row2'>
        {reviews.map((review, index) => (
          <div key={index}>
            <div className='position'>
              <img src={review.image} className='review-image' alt="review" />
              <div className='review'>
              <p className="product-rating">{review.rating}</p>
              <p className='desc'>
                {review.text} <br />
                <span>{review.date}</span>
              </p>
              {review.removable && (
                    <button onClick={() => handleDeleteReview(review.id)} className='delete-btn'>
                    Supprimer
                    </button>
                )}
                              </div>

            </div>
            <hr />
          </div>
        ))}

        <br />
        <div className='add'>
          <h4>Ajouter un avis</h4>
          <textarea
            className='commenter'
            placeholder='Commenter...'
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          ></textarea>
          <button className='soumettre' onClick={handleSubmitReview}>Soumettre</button>
        </div>
      </div>
    )}
        
        
      </section>
      
      <section>
      <Footer/>

      </section>
    </div>
  );
};

export default ShowProduct;