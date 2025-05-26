import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import axios from "axios";
import { Await } from "react-router-dom";


const Register = () => {
  const [userType, setUserType] = useState("user");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("")
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        //telephone,
        password,
        password_confirmation : confirmPassword,
      });
      setUser(response.data.user);
        } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data?.errors || err.message);
    }
  };


  return (
    <div className='debut'>
    <div className="register-container">
      <form  className="register-form">
        <h2>Créer un compte</h2>
            <select 
  name="userType" 
  id="userType" 
  value={userType} 
  onChange={(e) => setUserType(e.target.value)}
>
  <option value="user">Utilisateur</option>
  <option value="admin">Administrateur</option>
</select>

        
        <input
          type="text"
          name="name"
          id="name"
          placeholder="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
           autocomplete="name"
        />

        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
           autocomplete="email"
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
           autocomplete="password"
           
        />

        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirmer le mot de passe"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}

        />

        <button type="submit" onClick={(e) => handleSubmit(e)} className="register-button">S'inscrire</button>

        <p className="have-account">
          Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </form>
    </div>
    <section className='foot'>
    <Footer/>

    </section>
    </div>
  );
};

export default Register;
