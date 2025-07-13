import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../../assets/images/profile.png";
import "./profile.css";

const Profile = ({ user, setActived }) => {
  const [error, seterror] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const onLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://steve.new-mande.com/api/signOut",
        {},
        {
          headers: { Authorization: `Bearer ${token}` } // ✅ fix here
        }
      );
      console.log(response.data);
      localStorage.removeItem("token");
      location.reload();
    } catch (err) {
      seterror(err.message);
    }
  };

  return (
    <div className="profile-card">
      <button className="close" onClick={() => setActived(false)}>x</button>
      <img
        className="profile-avatar"
        src={user.avatar || profile}
        alt="User avatar"
      />
      <h2 className="profile-name">{user.name}</h2>
      <p className="profile-email">{user.email}</p>
      {error && <p className="error">{error}</p>}
      <button className="logout-button" onClick={onLogout}>
        Déconnexion
      </button>
    </div>
  );
};

export default Profile;
