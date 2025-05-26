import React from 'react';
import { auth, provider, signInWithPopup } from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css'; // assure-toi d'importer FontAwesome

const GoogleLogin = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        const userData = {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          uid: user.uid,
        };

        try {
          const response = await axios.post('http://127.0.0.1:8000/api/google-login', userData);
          const token = response.data.token;

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate('/MyAccount');
        } catch (error) {
          alert("Erreur côté serveur !");
          console.error(error);
        }
      })
      .catch((error) => {
        alert("Échec de l'authentification Google");
        console.error(error);
      });
  };

  return (
    <button type="button" onClick={handleGoogleLogin} className="google-login-btn">
      <i className="fa fa-google"></i> S’inscrire avec Google
    </button>
  );
};

export default GoogleLogin;
