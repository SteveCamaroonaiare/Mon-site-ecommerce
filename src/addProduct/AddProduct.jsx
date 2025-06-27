import './AddProduct.css';
import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    sexes: "Hommes",
    image: null,
    is_new: false, // Initialiser comme booléen
    is_trending: false, // Initialiser comme booléen
    is_promo: false, // Initialiser comme booléen
    percent: 0,
    numberOfStars: 5, // Valeur par défaut,
    moreImgs: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'file' && name === 'moreImgs' ? Array.from(files) :
              type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price.toString());
    formDataToSend.append('quantity', formData.quantity.toString());
    formDataToSend.append('sexes', formData.sexes);
    formDataToSend.append('is_new', formData.is_new ? '1' : '0'); // Conversion explicite
    formDataToSend.append('is_trending', formData.is_trending ? '1' : '0');
    formDataToSend.append('is_promo', formData.is_promo ? '1' : '0');
    formDataToSend.append('percent', formData.percent.toString());
    formDataToSend.append('numberOfStars', formData.numberOfStars.toString());
    if (formData.image) {
        formDataToSend.append('image', formData.image);
    }
    // Images miniatures
    if (formData.moreImgs.length > 0) {
        formData.moreImgs.forEach((file, index) => {
            formDataToSend.append(`moreImgs[${index}]`, file);
        });
    }


    try {
        const response = await axios.post('http://localhost:8000/api/products', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Success:', response.data);
              alert('Produit ajouté avec succès !');

    } catch (error) {
        console.error('Error:', error.response.data);
        alert('Erreur lors de l’ajout du produit.');

    }
};

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Ajouter un Produit</h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nom du produit"
        required
        className="form-input"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="form-textarea"
      />

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Prix"
        required
        min="0"
        className="form-input"
      />

      <input
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        placeholder="Quantité"
        required
        min="0"
        className="form-input"
      />

      <select
        name="sexes"
        value={formData.sexes}
        onChange={handleChange}
        required
        className="form-select"
      >
        <option value="Hommes">Hommes</option>
        <option value="Femmes">Femmes</option>
        <option value="Enfants">Enfants</option>
      </select>
      
      <div>
        <label>Image principale :</label>
      <input
        type="file"
        name="image"
        onChange={handleChange}
        required
        accept="image/*"
        className="form-input-file"
      />
      </div>

      
      <div>
        <label>Images miniatures :</label>
        <input
          type="file"
          name="moreImgs"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="form-input-file"

        />
      </div>

      <div className="form-checkbox-group">
        <label className="form-checkbox-label">
          <input
            type="checkbox"
            name="is_new"
            checked={formData.is_new}
            onChange={handleChange}
          />
          Nouveauté
        </label>

        <label className="form-checkbox-label">
          <input
            type="checkbox"
            name="is_trending"
            checked={formData.is_trending}
            onChange={handleChange}
          />
          Tendance
        </label>

        <label className="form-checkbox-label">
          <input
            type="checkbox"
            name="is_promo"
            checked={formData.is_promo}
            onChange={handleChange}
          />
          Promotion
        </label>
      </div>

      {formData.is_promo && (
        <input
          type="number"
          name="percent"
          value={formData.percent}
          onChange={handleChange}
          placeholder="Pourcentage de réduction"
          min="0"
          max="100"
          className="form-input"
        />
      )}


      <button type="submit" className="form-button">
        Ajouter le produit
      </button>
    </form>
  );
};

export default AddProduct;
