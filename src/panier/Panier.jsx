import { useState ,useEffect} from 'react';
import { IoIosRemoveCircle } from "react-icons/io";
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import "./Panier.css"
import axios from 'axios';
import Cookies from 'js-cookie'

const initialCart = [
  {
    id: 1,
    name: "J.Crew Mercantile Women's Short-Sleeve",
    description: "Molestias in ea ratione nesciunt eget distinctio magnapibus.",
    price: 110,
    quantity: 3,
    image: "src/assets/img/e1.jpg",
  },
  {
    id: 2,
    name: "Amazon Essentials Women's Tank",
    description: "Molestias in ea ratione nesciunt eget distinctio magnapibus.",
    price: 110,
    quantity: 2,
    image: "src/assets/img/e1.jpg",
  },
  {
    id: 3,
    name: "Amazon Brand - Daily Ritual Women's Jersey",
    description: "Molestias in ea ratione nesciunt eget distinctio magnapibus.",
    price: 110,
    quantity: 1,
    image: "src/assets/img/e1.jpg",
  },
];

export default function Panier() {
 



  const [cart, setCart] = useState([]);
  const [checkout, setCheckout]=useState('info')

  useEffect(() => {
    const fetchCart = async () => {
        {/**const response = await axios.get('http://localhost:8000/api/cart', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }); */}
      const panier = JSON.parse(Cookies.get('cart') || '[]');
      setCart(panier);

    };
    fetchCart();
}, []);


  const updateQuantity = (id, quantity) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [success, setSuccess] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simuler le paiement
    console.log("Paiement en cours avec :", formData);
    setSuccess(true);
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
        <a href="/HomeShop" >Boutique</a>

        <a href="/MyAccount">Mon Compte</a>
        <a href="/login">Connexion</a>
      </nav>
      <div className="search-icons">
        <input type="text" placeholder="Search for items..." />
        <FaHeart className="icon" />²
        <Link to='/Panier'><FaShoppingCart className="icon" /></Link>
      </div>
    </div>

    {/* Breadcrumb */}
    <div className="breadcrumb">
      <span>Home &nbsp; &gt; &nbsp;</span>
      <span>Shop &nbsp; &gt; &nbsp;</span>
      <a href="">
            <span>panier</span>
        </a>
     
    </div>
    

    
 

    {checkout==='info'&& (
      <div className="container py-5">
      <h2 className="mb-4 text-center">🛒 Votre Panier</h2>
      
      <div className="row g-4">
        {cart.map(item => (
          <div key={item.id} className="col-md-6 col-lg-4">
            <div className="card shadow-sm h-100">
              <img src={item.image} alt={item.name} className="card-img-top p-3" style={{ height: '200px', objectFit: 'contain' }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text text-muted small">{item.description}</p>
                <div className="mt-auto">
                  <div className="mb-2">
                    <strong>Prix : </strong>{item.price}Dh
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <label className="me-2">Quantité :</label>
                    <input
                      type="number"
                      className="form-control w-50"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    />
                  </div>
                  <div className="mb-2">
                    <strong>Sous-total : </strong>{item.price * item.quantity}Dh
                  </div>
                  <button className="btn btn-sm supprimer w-100" onClick={() => removeItem(item.id)}>
                    <IoIosRemoveCircle className="me-1" size={18} /> Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-5">
        <h4>Total : ${total}</h4>
       
        <div className="d-flex gap-2">
          <a href="/HomeShop"><button className="btn btn-outline-secondary">
            🔄 Mettre à jour
          </button></a>
          <button className="btn btn-success">
            🛍 Continuer les achats
          </button>
        </div>
      </div>
    </div>)}
    <div>
        <h4 className='btn  paiement' onClick={()=>setCheckout('paiement')}>Proceder au Paiement</h4></div>
    
   {checkout==='paiement' && (
     <div className="container py-5">
     <h2 className="text-center mb-4">💳 Paiement</h2>

     <div className="row">
       <div className="col-md-6">
         <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
           <div className="mb-3">
             <label className="form-label">Nom complet</label>
             <input
               type="text"
               name="name"
               className="form-control"
               placeholder="Jean Dupont"
               onChange={handleChange}
               required
             />
           </div>

           <div className="mb-3">
             <label className="form-label">Numéro de carte</label>
             <input
               type="text"
               name="cardNumber"
               className="form-control"
               placeholder="1234 5678 9012 3456"
               onChange={handleChange}
               required
               maxLength="19"
             />
           </div>

           <div className="row mb-3">
             <div className="col">
               <label className="form-label">Expiration</label>
               <input
                 type="text"
                 name="expiry"
                 className="form-control"
                 placeholder="MM/AA"
                 onChange={handleChange}
                 required
               />
             </div>
             <div className="col">
               <label className="form-label">CVV</label>
               <input
                 type="text"
                 name="cvv"
                 className="form-control"
                 placeholder="123"
                 onChange={handleChange}
                 required
                 maxLength="4"
               />
             </div>
           </div>

           <button type="submit" className="btn btn-primary w-100">
             💰 Payer {total} MAD
           </button>
         </form>
       </div>

       <div className="col-md-6">
         <div className="card p-4 shadow-sm">
           <h5>🧾 Récapitulatif</h5>
           <ul className="list-group list-group-flush mb-3">
             <li className="list-group-item">Chaussure Nike Air Max - 1 x 220 MAD</li>
             <li className="list-group-item">Chaussure Adidas UltraBoost - 1 x 110 MAD</li>
           </ul>
           <h5 className="text-end">Total : {total} MAD</h5>
         </div>

         {success && (
           <div className="alert alert-success mt-4">
             ✅ Paiement effectué avec succès !
           </div>
         )}
       </div>
     </div>
   </div>
   )}



    <section>
    <Footer/>

    </section>



    </div>

  );
}

