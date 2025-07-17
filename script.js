document.addEventListener("DOMContentLoaded", function () {
  const output = document.getElementById("cv-output");

  document.getElementById("cvForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const nom = document.getElementById("nom").value;
    const poste = document.getElementById("poste").value;
    const experience = document.getElementById("experience").value;

    const texte = `
Nom : ${nom}
Poste : ${poste}
Expérience : ${experience}

Ceci est un exemple de CV généré manuellement.`;

    output.textContent = texte;
  });

  document.getElementById("download-pdf").addEventListener("click", function () {
    if (!output.textContent.trim()) {
      alert("Aucun CV à télécharger !");
      return;
    }

    const opt = {
      margin:       0.5,
      filename:     'moncv.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(output).save();
  });
});
