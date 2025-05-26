import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Création du contexte
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);

// Provider du contexte
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          // Configurer axios avec le token
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Vérifier si le token est valide en faisant une requête au backend
          const response = await axios.get('http://127.0.0.1:8000/api/user');
          
          // Mettre à jour l'utilisateur avec les données fraîches du serveur
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
          // Si le token n'est plus valide, déconnecter l'utilisateur
          console.error('Erreur de vérification d\'authentification:', error);
          logout();
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      email,
      password
    });
    
    const { user, token } = response.data;
    
    // Stocker le token et l'utilisateur
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    // Configurer axios pour les futures requêtes
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    setUser(user);
    return user;
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Configurer axios avec le token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Appeler l'API de déconnexion
        await axios.post('http://127.0.0.1:8000/api/logout');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      // Supprimer le token et l'utilisateur du localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
       
      // Supprimer le header d'autorisation
      delete axios.defaults.headers.common['Authorization'];
       
      // Réinitialiser l'état de l'utilisateur
      setUser(null);
    }
  };

  // Valeurs exposées par le contexte
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};