import React from "react";

const Home = () => {
  return (
    <div
      style={{
        width: "60%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginInline: "auto",
        marginBottom: "10px",
      }}
    >
      <h1>Bienvenue sur TeachOnline</h1>
      <p style={{textAlign: "center" ,lineHeight: "30px"}}>
        une plateforme d'éducation en ligne offrant une interaction directe
        entre enseignants et étudiants. Participez à des réunions en ligne,
        discutez en temps réel, partagez des fichiers et répondez à des
        questions interactives pour enrichir votre apprentissage.
      </p>
    </div>
  );
};

export default Home;
