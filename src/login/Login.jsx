import React, { useState } from 'react';
import './Login.css';
import Footer from "../components/footer/Footer";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import GoogleLogin from './GoogleLogin.jsx'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const navigate = useNavigate();


  // Fonction pour transférer le panier guest vers le compte utilisateur
 
  {/**const transferGuestCart = (userId) => {
    const guestCart = Cookies.get('cart_guest');
    if (guestCart) {
      Cookies.set(`cart_${userId}`, guestCart, { 
        expires: 7, 
        path: '/' 
      });
      Cookies.remove('cart_guest', { path: '/' });
    }
  }; */}

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // reset error
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password
      });

      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      {/**localStorage.setItem("user_id", response.data.user.id); // Ajout crucial
      transferGuestCart(response.data.user.id); */}
      navigate('/MyAccount'); // rediriger vers le tableau de bord
    } catch (err) {
      // Gérer les erreurs de validation Laravel
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Erreur de connexion. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className='debut'>
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Connexion</h2>

          {error && <p className="error-message">{error}</p>}

          <input
            type="email"
            name="email"
            id="loginEmail"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <input
            type="password"
            name="password"
            id="loginPassword"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <button type="submit">Se connecter</button>
          <GoogleLogin />

          <div className="links">
            <Link to="/Register">Créer un compte</Link>
            <Link to="/ForgotPassword">Mot de passe oublié ?</Link>
          </div>
        </form>
      </div>

      <section className='foot'><Footer /></section>
    </div>
  );
};

export default Login;
