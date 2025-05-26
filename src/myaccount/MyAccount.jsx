import React, { useState,useEffect } from 'react';
import './MyAccount.css';
import as from "../assets/img/as.jpeg"
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const MonCompte = () => {
  const [ongletActif, setOngletActif] = useState("tableau-de-bord");

  
const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
  }
}, []);

  const utilisateur = JSON.parse(localStorage.getItem("user"));

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
              <p>Vous n'avez pas encore passé de commande.</p>
            </div>
          );
        case "profil":
          return (
            <div className="dashboard-content">
              <h2>Modifier le Profil</h2>
              <form>
                <label>Nom complet</label><br />
                <input type="text" placeholder="Entrez votre nom" /><br /><br />
                <label>Email</label><br />
                <input type="email" placeholder="Entrez votre email" /><br /><br />
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
              <form>
                <label>Mot de passe actuel</label><br />
                <input type="password" /><br /><br />
                <label>Nouveau mot de passe</label><br />
                <input type="password" /><br /><br />
                <label>Confirmer le nouveau mot de passe</label><br />
                <input type="password" /><br /><br />
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
        <img src={as} alt="" className='reduire'/>
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
          <Footer/>
    
          </section>
    </div>
  );
};

export default MonCompte;
