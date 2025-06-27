import React ,{useState}from 'react'
import './Services.css'
import pa1 from "../../assets/img/pa1.png"
import pa2 from "../../assets/img/pa2.png"

import pa3 from "../../assets/img/pa3.png"

import pa4 from "../../assets/img/pa4.avif"

import pa5 from "../../assets/img/pa5.webp"
import vest1 from '../../assets/img/vest1.jpg'
import vest5 from '../../assets/img/vest5.jpg'
import vest3 from '../../assets/img/vest3.jpg'


import { Link } from 'react-router-dom'
// Données avec classes Font Awesome
const serviceData = [
  {
    id: 1,
    iconClass: "fas fa-car-side",
    title: "Free Shipping",
    description: "Free Shipping On All Orders",
  },
  {
    id: 2,
    iconClass: "fas fa-check-circle",
    title: "Safe Money",
    description: "30 Days Money Back",
  },
  {
    id: 3,
    iconClass: "fas fa-wallet",
    title: "Secure Payment",
    description: "All Payments Secure",
  },
  {
    id: 4,
    iconClass: "fa-solid fa-cart-shopping",
    title: "cart-shopping",
    description: "Technical Support 24/7",
  },
]

const faqData = [
  {
    question: "Quels sont les délais de livraison ?",
    answer: "Nos livraisons prennent généralement entre 2 à 5 jours ouvrables.",
  },
  {
    question: "Puis-je retourner un article ?",
    answer: "Oui, vous avez 14 jours après réception pour effectuer un retour.",
  },
  {
    question: "Comment choisir la bonne pointure ?",
    answer: "Consultez notre guide des tailles sur chaque fiche produit.",
  },
  {
    question: "Proposez-vous la livraison gratuite ?",
    answer: "Oui, pour toute commande supérieure à 500 MAD.",
  },
  {
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "Nous acceptons les paiements par carte, PayPal, et paiement à la livraison.",
  },
];


const Services = () => {
  {/*const imageData = [
    { id: 1, src:"src/assets/img/e1.jpg", caption: 'Inspiration 1' },
    { id: 2, src: 'src/assets/img/e2.jpg', caption: 'Inspiration 2' },
    { id: 3, src: 'src/assets/img/e3.jpg', caption: 'Inspiration 3' },
    { id: 4, src: 'src/assets/img/e4.jpg', caption: 'Inspiration 4' },
    { id: 5, src: 'src/assets/img/f1.jpg', caption: 'Inspiration 5' },
    { id: 6, src: 'src/assets/img/i1.jpg', caption: 'Inspiration 6' },
  ]; */}
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div>
    <div className="container my-5">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {serviceData.map((item) => (
          <div className="col d-flex" key={item.id}>
            <div className="d-flex flex-column flex-sm-row gap-3 align-items-start">
              {/* Icône avec couleur personnalisée */}
              <i
                className={`${item.iconClass} icones text-4xl md:text-5xl`}
                style={{ color: 'rgb(226, 174, 2)',fontSize: '3rem' }}
              ></i>

              {/* Texte */}
              <div>
                <h5 className="fw-bold">{item.title}</h5>
                <p className="text-muted small mb-0">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

                            {/*Conseils Vestimentaire */}


    <section className="services-section">
      <div className="container">
        <h2 className="services-title">Guide / Conseils de Style</h2>
        <p className="services-subtitle">Comment porter nos chaussures ?</p>
        <div className="services-content">
          {/* Élément 1 : Lookbook de la saison */}
          <div className="service-item">
            {/* Remplacez "path/to/image1.jpg" par le chemin de votre image */}
            <Link to="/Guide1">
                 <img src={vest1} alt="Lookbook de la saison" className="service-image" style={{height:"500px",width:"300px"}} />
            </Link>
            <h3 className="service-item-title">Lookbook de la saison</h3>
            <p className="service-item-description">
              Découvrez les dernières tendances et inspirez vos tenues avec nos conseils mode.
            </p>
          </div>
           {/* Élément 3 : Mini-tutos */}
           <div className="service-item">
            <img src={vest5} alt="Mini-tutos" className="service-image" />
            <h3 className="service-item-title">Mini-tutos</h3>
            <p className="service-item-description">
              Profitez de nos conseils pratiques pour bien associer vos chaussures à votre garde-robe.
            </p>
          </div>

          {/* Élément 2 : Tendances Mode */}
          <div className="service-item">
            <img src={vest3} alt="Tendances Mode" className="service-image" style={{height:"500px",width:"300px"}}/>
            <h3 className="service-item-title">Tendances Mode</h3>
            <p className="service-item-description">
              Suivez nos experts pour connaître les styles incontournables de la saison.
            </p>
          </div>

         
        </div>
      </div>
    </section>





    {/*<section className="services-section">
      <div className="container">
        <h2 className="services-title">Lookbook / Instagram Feed</h2>
        <p className="services-subtitle">
          Découvrez nos dernières inspirations et tendances
        </p>
        <div className="services-grid">
          {imageData.map((item) => (
            <div key={item.id} className="services-item">
              <img src={item.src} alt={item.caption} className="services-image" />
              <div className="services-caption">{item.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
 */}
           <section className="faq-section">
      <div className="container">
        <h2 className="faq-title">Foire aux Questions</h2>
        <p className="faq-subtitle">Besoin d’aide ? Voici les réponses aux questions fréquentes.</p>

        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question}
              </div>
              {openIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
            {/*PARTENARIAT */}


            <div className="py-5 mt-5 d-none d-md-block bg-light" style={{height: "130px",maxWidth:'100%'}}>
  <div className="container">
    <div className="row justify-content-center align-items-center g-3 opacity-50 text-center">
      <div className="col-6 col-md-2">
        <img src={pa1} alt="" className="img-fluid brand-img" style={{ maxWidth: '40%', height: 'auto' }} />
      </div>
      <div className="col-6 col-md-2">
        <img src={pa2} alt="" className="img-fluid brand-img" style={{ maxWidth: '40%', height: 'auto' }} />
      </div>
      <div className="col-6 col-md-2">
        <img src={pa3} alt="" className="img-fluid brand-img" style={{ maxWidth: '40%', height: 'auto' }} />
      </div>
      <div className="col-6 col-md-2">
        <img src={pa4} alt="" className="img-fluid brand-img" style={{ maxWidth: '40%', height: 'auto' }} />
      </div>
      <div className="col-6 col-md-2">
        <img src={pa5} alt="" className="img-fluid brand-img" style={{ maxWidth: '40%', height: 'auto' }} />
      </div>
    </div>
  </div>
</div>






                

        
    </div>


  )
}

export default Services
