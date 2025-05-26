import React from 'react';
import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';
import e1 from "../../assets/img/e1.jpg";
import f71 from "../../assets/img/f71.png";
import './Texte.css'



const Texte = () => {
  return (
    <div className="monte bg-dark text-light">
    {/* Hero Section */}
    <section className="container py-5 d-flex flex-column flex-md-row align-items-center justify-content-between">
      <div className="col-md-6 mb-4 mb-md-0">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="display-4 fw-bold text-warning"
        >
          Découvrez l'élégance en or
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="lead text-light"
        >
          Des chaussures stylées, confortables et haut de gamme, livrées chez vous.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-warning fw-bold mt-3"
        >
          Voir les produits
        </motion.button>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="col-md-6"
      >
        <img
          src={f71}
          alt="Chaussure en or"
          className="img-fluid rounded shadow-lg"
          style={{background:"transparent"}}
        />
      </motion.div>
    </section>

    {/* Section Produits */}
    <section className="bg-secondary py-5">
      <div className="container">
        <h2 className="text-warning mb-4">Nos Produits</h2>
        <div className="row">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="col-md-4 mb-4"
            >
              <div className="card bg-dark border-warning h-100">
                <img
                  src={e1}
                  alt={`Produit ${i}`}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title text-warning">Chaussure {i}</h5>
                  <p className="card-text text-light">Description rapide du produit {i}.</p>
                  <button className="btn btn-warning fw-bold">Acheter</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-dark border-top border-warning text-center py-4">
      <p className="text-light mb-0">© {new Date().getFullYear()} Boutique Gold Shoes. Tous droits réservés.</p>
    </footer>
  </div>
  )
}

export default Texte
