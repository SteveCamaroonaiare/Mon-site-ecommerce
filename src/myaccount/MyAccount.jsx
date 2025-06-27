import React, { useState, useEffect } from 'react';
import './MyAccount.css';
import as from "../assets/img/as.jpeg";
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import Footer from '../components/footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const MonCompte = () => {
  const [ongletActif, setOngletActif] = useState("tableau-de-bord");
  const navigate = useNavigate();

  const [utilisateur, setUtilisateur] = useState(
    JSON.parse(localStorage.getItem("user")) || { name: "", email: "" }
  );

  const [formData, setFormData] = useState({
    name: utilisateur.name,
    email: utilisateur.email,
  });

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [errorOrders, setErrorOrders] = useState(null);

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });

  // Vérifier token/utilisateur au montage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
    if (userFromStorage) {
      setUtilisateur(userFromStorage);
      setFormData({
        name: userFromStorage.name,
        email: userFromStorage.email,
      });
    }
  }, [navigate]);

  // Charger les commandes quand on est sur l'onglet "commandes"
  useEffect(() => {
    if (ongletActif === "commandes") {
      const fetchOrders = async () => {
        setLoadingOrders(true);
        setErrorOrders(null);
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:8000/api/orders", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setOrders(response.data);
        } catch (error) {
          setErrorOrders("Impossible de charger les commandes.");
        } finally {
          setLoadingOrders(false);
        }
      };
      fetchOrders();
    }
  }, [ongletActif]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        "http://localhost:8000/api/profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUtilisateur(response.data.user);
      alert("Profil mis à jour !");
    } catch (error) {
      alert(error.response?.data?.error || "Une erreur est survenue");
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      alert("Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        "http://localhost:8000/api/change-password",
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert(response.data.message);
      setPasswordData({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      });
    } catch (error) {
      alert(error.response?.data?.error || error.response?.data?.message || "Erreur lors de la mise à jour");
    }
  };

  const afficherContenu = () => {
    switch (ongletActif) {
      case "tableau-de-bord":
        return (
          <div className="dashboard-content">
            <h2>Bonjour {utilisateur?.name || "utilisateur"} !</h2>
            <p>
              Depuis votre tableau de bord, vous pouvez facilement consulter vos commandes récentes,
              gérer vos adresses de livraison et de facturation, et modifier votre mot de passe ainsi que les détails de votre compte.
            </p>
          </div>
        );
      case "commandes":
        return (
          <div className="dashboard-content">
            <h2>Mes Commandes</h2>
            {loadingOrders && <p>Chargement des commandes...</p>}
            {errorOrders && <p style={{ color: 'red' }}>{errorOrders}</p>}
            {!loadingOrders && orders.length === 0 && <p>Vous n'avez pas encore passé de commande.</p>}
            {!loadingOrders && orders.length > 0 && (
              <div>
                {orders.map(order => (
                  <div key={order.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <h3>Commande #{order.id} - Statut: {order.status}</h3>
                    <p>Adresse de livraison : {order.shipping_address}</p>
                    <p>Méthode de paiement : {order.payment_method}</p>
                    <p>Date : {new Date(order.created_at).toLocaleDateString()}</p>
                    <h4>Produits :</h4>
                    <ul>
                      {order.products.map(prod => (
                        <li key={prod.id}>
                          {prod.name} — Quantité: {prod.pivot.quantity} — Prix unitaire: {prod.pivot.price} Dh
                        </li>
                      ))}
                    </ul>
                    <p><strong>Total : {order.products.reduce((acc, p) => acc + p.pivot.price * p.pivot.quantity, 0)} Dh</strong></p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "profil":
        return (
          <div className="dashboard-content">
            <h2>Modifier le Profil</h2>
            <form onSubmit={handleSubmit}>
              <label>Nom complet</label><br />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Entrez votre nom"
              /><br /><br />
              <label>Email</label><br />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Entrez votre email"
              /><br /><br />
              <button type="submit">Mettre à jour</button>
            </form>
          </div>
        );
      case "adresse":
        return (
          <div className="dashboard-content">
            <h2>Mon Adresse</h2>
            <p>Adresse actuelle : Aucune adresse enregistrée.</p>
            <button>Ajouter une adresse</button>
          </div>
        );
      case "motdepasse":
        return (
          <div className="dashboard-content">
            <h2>Modifier le mot de passe</h2>
            <form onSubmit={handlePasswordSubmit}>
              <label>Mot de passe actuel</label><br />
              <input
                type="password"
                name="current_password"
                value={passwordData.current_password}
                onChange={handlePasswordChange}
                required
              /><br /><br />

              <label>Nouveau mot de passe</label><br />
              <input
                type="password"
                name="new_password"
                value={passwordData.new_password}
                onChange={handlePasswordChange}
                minLength="8"
                required
              /><br /><br />

              <label>Confirmer le nouveau mot de passe</label><br />
              <input
                type="password"
                name="new_password_confirmation"
                value={passwordData.new_password_confirmation}
                onChange={handlePasswordChange}
                minLength="8"
                required
              /><br /><br />

              <button type="submit">Changer</button>
            </form>
          </div>
        );
      default:
        return <div className="dashboard-content"><h2>Bienvenue</h2></div>;
    }
  };

  return (
    <div className="home-shop-container">
      <div className="top-header">
        <span>(+01)-2345-6789</span>
        <span>Our location</span>
        <span>Super Value Deals - Save more with coupons</span>
        <span className="auth-links">Log In / Sign Up</span>
      </div>

      <div className="main-nav">
        <div className="logo">Step-ZOne<span className="leaf"></span></div>
        <nav className="nav-links">
          <a href="/">Accueil</a>
          <a href="/HomeShop">Boutique</a>
          <a href="/MyAccount" className="active">Mon Compte</a>
          <a href="/login">Connexion</a>
        </nav>
        <div className="search-icons">
          <FaHeart className="icon" />
          <Link to='/Panier'><FaShoppingCart className="icon" /></Link>
        </div>
      </div>

      <div className="user-dashboard-container">
        <div className="sidebars">
          <ul>
            <img src={as} alt="" className='reduire' />
            <h1 className='centrer'>{utilisateur?.name}</h1>

            <li onClick={() => setOngletActif("tableau-de-bord")} className={ongletActif === "tableau-de-bord" ? "active" : ""}>Tableau de bord</li>
            <li onClick={() => setOngletActif("commandes")} className={ongletActif === "commandes" ? "active" : ""}>Commandes</li>
            <li onClick={() => setOngletActif("profil")} className={ongletActif === "profil" ? "active" : ""}>Modifier le profil</li>
            <li onClick={() => setOngletActif("adresse")} className={ongletActif === "adresse" ? "active" : ""}>Mon adresse</li>
            <li onClick={() => setOngletActif("motdepasse")} className={ongletActif === "motdepasse" ? "active" : ""}>Modifier le mot de passe</li>

            <li onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              alert("Déconnexion réussie !");
              navigate("/");
            }}>
              Déconnexion
            </li>
          </ul>
        </div>

        <div className="content-area">
          {afficherContenu()}
        </div>
      </div>

      <section className='footers'>
        <Footer />
      </section>
    </div>
  );
};

export default MonCompte;
