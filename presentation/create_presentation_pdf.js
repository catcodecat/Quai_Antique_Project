const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const outPath = path.join(__dirname, "Quai_Antique_presentation_FR.pdf");
const screenshots = path.join(__dirname, "screenshots");

const colors = {
  bg: "#f7f7f7",
  dark: "#211817",
  brown: "#3c2e24",
  primary: "#9b6a22",
  secondary: "#c5baa4",
  white: "#ffffff",
  text: "#222222",
};

const slides = [
  {
    title: "Projet Quai Antique",
    text: "Site vitrine d'un restaurant gastronomique\n\nPrésentation du code, des pages et des outils utilisés.",
    image: "01-home.png",
    cover: true,
  },
  {
    title: "Objectif du projet",
    text:
      "Créer un site clair et responsive pour le restaurant Quai Antique.\n\nPrésenter la structure HTML, les styles CSS et l'interactivité JavaScript.\n\nPréparer un support facile à expliquer pendant l'examen.",
    code: "HTML5 + CSS3 + JavaScript\n\nPages :\n- Accueil\n- Galerie\n- La carte\n- Réservation\n- Connexion\n- Inscription",
  },
  {
    title: "Charte graphique",
    text:
      "La maquette utilise une ambiance élégante et chaleureuse.\n\nLes couleurs principales sont le brun foncé, le doré et le blanc.\n\nLes boutons dorés sont réutilisés sur toutes les pages.",
    code: ":root {\n  --primary: #9b6a22;\n  --dark: #3c2e24;\n  --bg-dark: #211817;\n}",
    image: "01-home.png",
  },
  {
    title: "Header et navigation",
    text:
      "Le header contient le nom du restaurant et le menu principal.\n\nChaque lien ouvre une page HTML différente.\n\nLa navigation reste identique sur toutes les pages.",
    code: '<header class="site-header">\n  <a class="brand">Quai Antique</a>\n  <nav class="main-nav">...</nav>\n</header>',
    image: "01-home.png",
  },
  {
    title: "Page Accueil : hero",
    text:
      "Le hero est le premier bloc visible.\n\nIl présente le restaurant avec une image de fond, un titre et un bouton de réservation.\n\nL'image est nette et sauvegardée localement.",
    code: '<section class="hero hero-home">\n  <h1>Quai Antique</h1>\n  <a class="btn">Réserver</a>\n</section>',
    image: "01-home.png",
  },
  {
    title: "Body de la page Accueil",
    text:
      "Le contenu principal est organisé avec plusieurs sections.\n\nChaque section utilise du texte, une image et parfois un bouton.\n\nCSS Grid permet d'aligner proprement le texte et l'image.",
    code: '<main>\n  <section class="intro section-light">...</section>\n  <section class="fresh section-dark">...</section>\n</main>',
    image: "01-home.png",
  },
  {
    title: "Galerie",
    text:
      "La galerie présente les photos du restaurant et des plats.\n\nLes images ont été remplacées par des photos de meilleure qualité.\n\nLes cartes sont organisées avec une grille responsive.",
    code: '<div class="gallery-grid">\n  <article class="gallery-card">\n    <img src="assets/images/dish-salmon.jpg">\n  </article>\n</div>',
    image: "02-gallery.png",
  },
  {
    title: "La carte",
    text:
      "La page La carte contient trois catégories : Entrées, Plats et Desserts.\n\nLes boutons de catégories sont actifs.\n\nJavaScript affiche uniquement la catégorie sélectionnée.",
    code: 'tab.addEventListener("click", (event) => {\n  event.preventDefault();\n  showMenuPanel(tab.dataset.tab);\n});',
    image: "04-menu-desserts.png",
  },
  {
    title: "Réservation en ligne",
    text:
      "La page réservation utilise un formulaire HTML.\n\nL'utilisateur peut choisir une date, une heure, le nombre de personnes et ajouter ses allergies.\n\nLe bouton affiche un message de confirmation.",
    code: '<form class="form-panel">\n  <input type="date">\n  <input type="time">\n  <select>...</select>\n</form>',
    image: "05-reservation.png",
  },
  {
    title: "Connexion et inscription",
    text:
      "La page Mon compte contient une connexion avec des champs vides.\n\nL'e-mail et le mot de passe de test ont été supprimés.\n\nLe lien Inscrivez-vous ici ouvre une page d'inscription.",
    code: '<input id="email" type="email">\n<input id="password" type="password">\n<a href="register.html">Inscrivez-vous ici !</a>',
    image: "06-login.png",
  },
  {
    title: "Footer et responsive",
    text:
      "Le footer affiche les horaires, l'adresse et le contact.\n\nIl utilise une image de fond plus nette.\n\nLa règle @media adapte la mise en page aux petits écrans.",
    code: "@media (max-width: 760px) {\n  .gallery-grid,\n  .site-footer {\n    grid-template-columns: 1fr;\n  }\n}",
    image: "01-home.png",
  },
  {
    title: "Conclusion",
    text:
      "Le projet respecte la structure demandée : header, body, pages, formulaires et footer.\n\nLe site est consultable localement depuis index.html.\n\nLa présentation montre le résultat, le code et les choix techniques.",
    code: "Fichiers principaux :\nindex.html\nstyles.css\napp.js\nassets/images/",
  },
];

function drawTextBlock(doc, text, x, y, w, fontSize = 15, color = colors.text) {
  doc
    .font("Helvetica")
    .fontSize(fontSize)
    .fillColor(color)
    .text(text, x, y, {
      width: w,
      lineGap: 5,
    });
}

function drawCodeBlock(doc, code, x, y, w, h) {
  doc.roundedRect(x, y, w, h, 8).fill(colors.dark);
  doc
    .font("Courier")
    .fontSize(10.5)
    .fillColor(colors.white)
    .text(code, x + 16, y + 16, {
      width: w - 32,
      height: h - 32,
      lineGap: 3,
    });
}

function drawImage(doc, filename, x, y, w, h) {
  const imagePath = path.join(screenshots, filename);
  if (fs.existsSync(imagePath)) {
    doc.image(imagePath, x, y, {
      fit: [w, h],
      align: "center",
      valign: "center",
    });
  }
}

const doc = new PDFDocument({
  size: [1280, 720],
  margin: 0,
  info: {
    Title: "Projet Quai Antique",
    Author: "Codex",
    Subject: "Présentation du projet Quai Antique",
  },
});

doc.pipe(fs.createWriteStream(outPath));

slides.forEach((slide, index) => {
  if (index > 0) doc.addPage({ size: [1280, 720], margin: 0 });

  doc.rect(0, 0, 1280, 720).fill(slide.cover ? colors.brown : colors.bg);

  doc
    .font("Helvetica-Bold")
    .fontSize(slide.cover ? 42 : 34)
    .fillColor(slide.cover ? colors.white : colors.primary)
    .text(slide.title, 56, 40, { width: 1160 });

  if (slide.cover) {
    drawTextBlock(doc, slide.text, 70, 150, 480, 24, colors.white);
    drawImage(doc, slide.image, 610, 105, 610, 500);
  } else {
    drawTextBlock(doc, slide.text, 58, 125, 500, 17, colors.text);
    if (slide.code) drawCodeBlock(doc, slide.code, 58, 390, 500, 250);
    if (slide.image) {
      doc.roundedRect(610, 115, 610, 500, 10).fill("#ffffff");
      drawImage(doc, slide.image, 625, 130, 580, 470);
    } else {
      doc.roundedRect(610, 150, 570, 360, 12).fill(colors.brown);
      doc
        .font("Helvetica-Bold")
        .fontSize(34)
        .fillColor(colors.white)
        .text("Quai Antique", 660, 250, { width: 470, align: "center" });
      doc
        .font("Helvetica")
        .fontSize(22)
        .fillColor(colors.secondary)
        .text("HTML - CSS - JavaScript", 660, 315, { width: 470, align: "center" });
    }
  }

  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor(slide.cover ? colors.secondary : "#777777")
    .text(`${index + 1} / ${slides.length}`, 1130, 675, { width: 90, align: "right" });
});

doc.end();
console.log(outPath);
