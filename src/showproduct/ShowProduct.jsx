import React, {  useEffect, useState } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import Cookies from 'js-cookie'
import Footer from '../components/footer/Footer';
import { Link, useParams } from 'react-router-dom';
import e1 from "../assets/img/e1.jpg"
import e2 from "../assets/img/e2.jpg"
import pint from "../assets/img/pint.jpg"
import pint2 from "../assets/img/pint2.jpg"
import axios from 'axios'
import avatar from "../assets/img/avatar.jpg"

import pint4 from "../assets/img/pint4.jpg"


import './ShowProduct.css'
import { TbTruckReturn } from "react-icons/tb";
import { CiCreditCard1 } from "react-icons/ci";
import { IoBagCheckOutline } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import { FaRegStar } from "react-icons/fa";

import CartNotification from './CartNotification.jsx'


import ColorSelector from './ColorSelector.jsx'


const ShowProduct = ({ images }) => {
  const { id } = useParams();
  const [product, setproduct] = useState({})
  const [selectedImage, setSelectedImage] = useState("");

  //pour le petit panier
  const [showNotification, setShowNotification] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  
  // fin 

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const response = await axios.get(`https://steve.new-mande.com/api/products/${id}`)
        setproduct(response.data)
        console.log(response.data)
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
      }
    };
    fetchHomeProducts();
  }, [id]);



  // Ajout de cette fonction pour gerer mon panier
  const addToCart = () => {
  const cartItems = JSON.parse(Cookies.get('cart') || '[]');
const productToAdd = {
  ...product,
  quantity: 1,
  image: mainImage.includes('Storage/')
    ? mainImage.split('Storage/')[1]
    : product.image
};

// Cherche si le produit existe déjà
const existingItemIndex = cartItems.findIndex(item => item.id === productToAdd.id);

let updatedCart;
if (existingItemIndex !== -1) {
  // Le produit est déjà dans le panier, on incrémente la quantité
  cartItems[existingItemIndex].quantity += 1;
  updatedCart = [...cartItems];
} else {
  // Produit non existant, on l’ajoute
  updatedCart = [...cartItems, productToAdd];
}

Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7, path: "/" });

setLastAddedItem(productToAdd);
setCartCount(updatedCart.length);
setShowNotification(true);
};

  const [mainImage, setMainImage] = useState(''); // image principale
  useEffect(() => {
    if (product.image) {
      setMainImage(`https://steve.new-mande.com/Storage/${product.image}`);
    }
  }, [product.image]);


  const handleImageClick = (path) => {
    setMainImage(path); // changer l'image principale
  };
  const [quantity, setQuantity] = useState()
  const [activeTab, setActiveTab] = useState('info');
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





  //gerer les commentaire 

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    message: '',
    numberOfStars: 5, // Valeur par défaut
  });
  const [loading, setLoading] = useState(false);

  // Ajoutez cet effet pour charger les commentaires
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://steve.new-mande.com/api/products/${id}/comments`);
        setComments(response.data.comments);
      } catch (error) {
        console.error("Erreur lors du chargement des commentaires:", error);
      }
    };

    fetchComments();
  }, [id]);

  // Fonction pour ajouter un commentaire
  const handleSubmitComment = async () => {
    if (!newComment.message.trim()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `https://steve.new-mande.com/api/products/${id}/comments`,
        {
          message: newComment.message,
          numberOfStars: newComment.numberOfStars,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments([response.data.comment, ...comments]);
      setNewComment({ message: '', numberOfStars: 5 });
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error);
      alert(error.response?.data?.message || "Erreur lors de l'ajout du commentaire");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour supprimer un commentaire
  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce commentaire ?")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://steve.new-mande.com/api/comments/${commentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setComments(comments.filter(comment => comment.id !== commentId));
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        alert(error.response?.data?.message || "Erreur lors de la suppression");
      }
    }
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
          <a href="/shop" className="active">Boutique</a>

          <a href="/MyAccount">Mon Compte</a>
          <a href="/login">Connexion</a>
        </nav>
        <div className="search-icons">
          <FaHeart className="icon" />
          <Link to='/Panier' className="cart-icon">
            <FaShoppingCart className="icon" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
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
        <div className="details__content">
        <div className="image-preview-container">
          <div className="thumbnail-scroll-container">
            {product.image && (
              <img
                src={`httpss://steve.new-mande.com/Storage/${product.image}`}
                alt="Image principale"
                className='details__small-img'
                onClick={() => setMainImage(`httpss://steve.new-mande.com/Storage/${product.image}`)}
                style={{
                  border: mainImage === `https://steve.new-mande.com/Storage/${product.image}` ? '2px solid gold' : '1px solid #ccc'
                }}
              />
            )}

            {product.images && product.images.map((image, index) => (
              <img
                key={index}
                src={`httpss://steve.new-mande.com/Storage/${image.path}`}
                alt={`Miniature ${index + 1}`}
                className='details__small-img'
                onClick={() => setMainImage(`httpss://steve.new-mande.com/Storage/${image.path}`)}
                style={{
                  border: mainImage === `httpss://steve.new-mande.com/Storage/${image.path}` ? '2px solid gold' : '1px solid #ccc'
                }}
              />
            ))}
          </div>

          <div className="main-image-container">
            <img src={mainImage} alt="Produit" className="details_img" />
          </div>
        </div>
        <div className='text_details'>
          <h1 className='details__group details__tittle'>{product.name}</h1>

          <div className='details__price flex'>
            <p className='new_price'>{product.price} Dh</p>

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
           <p className="text-red-600 font-semibold mt-2">⚠️ Stock presque épuisé !</p>
           <ColorSelector />

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
              onClick={addToCart}
            >
              ADD to Cart
            </button>
            {showNotification && (
              <CartNotification
                item={lastAddedItem}
                onClose={() => setShowNotification(false)}
                cartCount={cartCount}
              />
            )}
            
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
            <h3 onClick={() => setActiveTab('info')} className='couleur' style={{ cursor: 'pointer' }}>Info Supplementaire</h3>
            <h3 onClick={() => setActiveTab('commentaire')} className='couleur'
              style={{ cursor: 'pointer' }}>Commentaire </h3>
          </div>
        </div>
        {activeTab === 'info' && (
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
        {activeTab === 'commentaire' && (
          <div className='row2'>
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className='position'>
                  <img
                    src={avatar}
                    className='review-image'
                    alt="avatar"
                  />
                  <div className='review'>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ color: i < comment.numberOfStars ? '#ffc107' : '#e4e5e9' }}>
                          ★
                        </span>
                      ))}
                    </div>
                    <p className='desc'>
                      {comment.message} <br />
                      <span>
                        Par {comment.user?.name} le {new Date(comment.creationDate).toLocaleDateString('fr-FR')}
                      </span>
                    </p>
                    {comment.user_id === parseInt(localStorage.getItem('user_id')) && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className='delete-btn'
                      >
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
              <div className="rating-input">
                <span>Note : </span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setNewComment({ ...newComment, numberOfStars: star })}
                    style={{
                      cursor: 'pointer',
                      color: star <= newComment.numberOfStars ? '#ffc107' : '#e4e5e9',
                      fontSize: '1.5em'
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                className='commenter'
                placeholder='Votre commentaire...'
                value={newComment.message}
                onChange={(e) => setNewComment({ ...newComment, message: e.target.value })}
              ></textarea>
              <button
                className='soumettre'
                onClick={handleSubmitComment}
                disabled={loading || !newComment.message.trim()}
              >
                {loading ? 'Envoi en cours...' : 'Soumettre'}
              </button>
            </div>
          </div>
        )}


      </section>

      <section>
        <Footer />

      </section>
    </div>
  );
};

export default ShowProduct;