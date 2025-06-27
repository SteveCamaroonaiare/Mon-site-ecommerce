import React from 'react';
import './Guide.css'
const Guide1 =() =>{


return(
<div className='Entete'>
             
    <div class="header">
        <div class="container">
            <h1>Lookbook de la Saison</h1>
            <div class="accent-line"></div>
            <p>Découvrez les dernières tendances masculines et inspirez-vous avec nos conseils mode pour créer des looks sophistiqués et contemporains.</p>
        </div>
    </div>

    <div class="section">
        <div class="container">
            <div class="section-title">
                <h2>Tendances Automne/Hiver</h2>
                <p>Les incontournables de la saison pour un style impeccable</p>
            </div>
            
            <div class="lookbook-grid">
                <div class="lookbook-item">
                    <div class="lookbook-image"></div>
                    <div class="lookbook-content">
                        <h3>Look Business Casual</h3>
                        <p>Associez élégance et confort avec nos chaussures en cuir premium. Parfait pour le bureau ou les occasions semi-formelles.</p>
                        <span class="price-tag">À partir de 149€</span>
                    </div>
                </div>
                
                <div class="lookbook-item">
                    <div class="lookbook-image" style={{background: "linear-gradient(45deg, #d0d0d0, #e8e8e8)"}}></div>
                    <div class="lookbook-content">
                        <h3>Style Décontracté Chic</h3>
                        <p>Des sneakers haut de gamme qui s'adaptent à toutes vos tenues décontractées tout en gardant une allure sophistiquée.</p>
                        <span class="price-tag">À partir de 89€</span>
                    </div>
                </div>
                
                <div class="lookbook-item">
                    <div class="lookbook-image" style={{background: "linear-gradient(45deg, #c8c8c8, #f0f0f0)"}}></div>
                    <div class="lookbook-content">
                        <h3>Look Urbain Moderne</h3>
                        <p>Explorez la ville avec style grâce à nos chaussures conçues pour l'homme moderne et actif.</p>
                        <span class="price-tag">À partir de 119€</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="style-tips">
        <div class="container">
            <div class="section-title">
                <h2 style={{color: "white"}}>Conseils de Style</h2>
                <p style={{color:" rgba(255,255,255,0.8)"}}>Les règles d'or pour bien choisir vos chaussures</p>
            </div>
            
            <div class="tips-grid">
                <div class="tip-card">
                    <span class="tip-icon">👞</span>
                    <h3>Accord Parfait</h3>
                    <p>Harmonisez vos chaussures avec votre ceinture et vos accessoires pour un look cohérent.</p>
                </div>
                
                <div class="tip-card">
                    <span class="tip-icon">🎯</span>
                    <h3>Occasion Adaptée</h3>
                    <p>Choisissez le bon style selon l'événement : formel, casual ou sportif.</p>
                </div>
                
                <div class="tip-card">
                    <span class="tip-icon">⚡</span>
                    <h3>Confort d'Abord</h3>
                    <p>Privilégiez toujours le confort sans compromettre l'élégance.</p>
                </div>
                
                <div class="tip-card">
                    <span class="tip-icon">🌟</span>
                    <h3>Qualité Premium</h3>
                    <p>Investissez dans des chaussures de qualité qui dureront dans le temps.</p>
                </div>
            </div>
        </div>
    </div>

    <div class="section seasonal-collection">
        <div class="container">
            <div class="section-title">
                <h2>Collection Saisonnière</h2>
                <p>Explorez nos dernières créations inspirées des tendances actuelles</p>
            </div>
            
            <div class="collection-grid">
                <div class="collection-item">
                    👔
                </div>
                <div class="collection-item">
                    👟
                </div>
                <div class="collection-item">
                    🥿
                </div>
                <div class="collection-item">
                    🦶
                </div>
            </div>
        </div>
    </div>

    <div class="cta-section">
        <div class="container">
            <h2>Prêt à Adopter Votre Nouveau Style ?</h2>
            <p>Découvrez notre collection complète et trouvez la paire parfaite</p>
            <a href="#" class="cta-button">Voir Toute la Collection</a>
        </div>
    </div>
</div>
    )
}

   export default Guide1