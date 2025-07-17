document.addEventListener("DOMContentLoaded", function () {
  const outputCV = document.getElementById("cv-html");
  const outputLettre = document.getElementById("lettreResultat");

  // 👉 Générateur de CV
  document.getElementById("cvForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nom = document.getElementById("nom").value;
    const poste = document.getElementById("poste").value;
    const experience = document.getElementById("experience").value;
    const competences = document.getElementById("competences").value;
    const formation = document.getElementById("formation").value;

    const prompt = `Crée un CV professionnel clair avec ces infos :
Nom : ${nom}
Poste : ${poste}
Expérience : ${experience}
Compétences : ${competences}
Formation : ${formation}`;

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Tu es un assistant qui rédige des CV professionnels." },
          { role: "user", content: prompt }
        ]
      })
    })
      .then(res => res.json())
      .then(data => {
        const texte = data.choices?.[0]?.message?.content || "❌ Aucune réponse de l'IA.";
        outputCV.innerHTML = texte.replace(/\n/g, "<br>");
      })
      .catch(error => {
        outputCV.innerHTML = "❌ Erreur IA :<br>" + error.message;
      });
  });

  // 👉 Générateur de lettre de motivation
  document.getElementById("lettreForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nom = document.getElementById("nomLettre").value;
    const poste = document.getElementById("posteLettre").value;
    const motivation = document.getElementById("motivation").value;

    const promptLettre = `Rédige une lettre de motivation :
Nom : ${nom}
Poste : ${poste}
Motivation : ${motivation}`;

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Tu rédiges des lettres de motivation pros." },
          { role: "user", content: promptLettre }
        ]
      })
    })
      .then(res => res.json())
      .then(data => {
        const lettre = data.choices?.[0]?.message?.content || "❌ Aucune réponse IA.";
        outputLettre.innerHTML = lettre.replace(/\n/g, "<br>");
      })
      .catch(error => {
        outputLettre.innerHTML = "❌ Erreur :<br>" + error.message;
      });
  });

  // 👉 Téléchargement PDF
  document.getElementById("download-pdf").addEventListener("click", function () {
    const contenu = document.getElementById("cv-html");
    if (!contenu || !contenu.innerHTML.trim()) {
      alert("Aucun CV à télécharger !");
      return;
    }
    html2pdf().from(contenu).save("MonCVIA_CV.pdf");
  });

  // (Optionnel) Traduction — non activée pour l'instant
  document.getElementById("traduireCV").addEventListener("click", function () {
    const langue = document.getElementById("langueCV").value;
    const contenu = document.getElementById("cv-html").innerText;

    if (!contenu || !langue) {
      alert("Rien à traduire ou langue non sélectionnée.");
      return;
    }

    const prompt = `Traduis ce CV en ${langue} :\n\n${contenu}`;

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Tu es un traducteur professionnel." },
          { role: "user", content: prompt }
        ]
      })
    })
      .then(res => res.json())
      .then(data => {
        const traduit = data.choices?.[0]?.message?.content || "❌ Aucune traduction.";
        outputCV.innerHTML = traduit.replace(/\n/g, "<br>");
      })
      .catch(error => {
        alert("Erreur de traduction : " + error.message);
      });
  });
});
