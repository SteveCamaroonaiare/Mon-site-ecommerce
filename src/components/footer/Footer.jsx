import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa'; 
import './Footer.css'
const Footer = () => {
  return (
    <div>
    <div className='Pouremail'>
     <div> 
      <h2 className='h'>Passer votre information la</h2>
      </div>
     <div className='hh'>     
       <h5> Mervi bien pour le confiance que <br />vous nous accordez</h5>
     </div>  
     <div className='hhh'>
     <input type="text" placeholder='Enter your email...'/>
     <button>Subcribe</button>
     </div>
    </div>
    <footer className="footer " >
      <div className="footer-section brand">
        <h2>STEP-ZONE</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Cum in beatae
          ea recusandae blanditiis veritatis.
        </p>
        <p className="made-with">
         Fais par <span className="heart">♥</span> par Steve Kamguia
        </p>
        <button className="youtube-btn">
          <i className="fa-brands fa-youtube"></i> Visit our YouTube Channel
        </button>
      </div>

      <div className="footer-section links">
        <h4>Important Links</h4>
        <ul>
          <li><i className="fa-solid fa-house"></i> Home</li>
          <li><i className="fa-solid fa-info-circle"></i> About</li>
          <li><i className="fa-solid fa-envelope"></i> Contact</li>
          <li><i className="fa-solid fa-blog"></i> Blog</li>
        </ul>
      </div>

      <div className="footer-section links">
        <h4>Links</h4>
        <ul>
          <li><i className="fa-solid fa-house"></i> Home</li>
          <li><i className="fa-solid fa-info-circle"></i> Boutique</li>
          <li><i className="fa-solid fa-info-circle"></i> Hommes</li>
          <li><i className="fa-solid fa-info-circle"></i> Femmes</li>
          <li><i className="fa-solid fa-info-circle"></i> Enfants</li>
          <li><i className="fa-solid fa-info-circle"></i> A propos</li>
          <li><i className="fa-solid fa-envelope"></i> Contact</li>
        </ul>
      </div>

      <div className="footer-section contact">
        <p><FaMapMarkerAlt /> Errachidia, Dratafilat</p>
        <p><FaPhoneAlt /> +212 657945202</p>
        <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
    </div>

  );
}

export default Footer;
