import React from "react";

function ErrorPage() {
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Désolé, une erreur inattendue s'est produite.</p>
      <button onClick={() => window.location.href = '/'}>
        Retour à l'accueil
      </button>
    </div>
  );
}
export default ErrorPage