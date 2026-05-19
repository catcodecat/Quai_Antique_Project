const pptxgen = require("pptxgenjs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const screenshots = path.join(__dirname, "screenshots");
const pptx = new pptxgen();

pptx.layout = "LAYOUT_WIDE";
pptx.author = "Codex";
pptx.subject = "Projet Quai Antique";
pptx.title = "Projet Quai Antique";
pptx.company = "Quai Antique";
pptx.lang = "fr-FR";
pptx.theme = {
  headFontFace: "Arial",
  bodyFontFace: "Arial",
  lang: "fr-FR",
};
pptx.defineLayout({ name: "CUSTOM_WIDE", width: 13.333, height: 7.5 });
pptx.layout = "CUSTOM_WIDE";

const colors = {
  bg: "F7F7F7",
  dark: "211817",
  brown: "3C2E24",
  primary: "9B6A22",
  secondary: "C5BAA4",
  white: "FFFFFF",
  text: "222222",
};

function addTitle(slide, title, dark = false) {
  slide.addText(title, {
    x: 0.45,
    y: 0.28,
    w: 12.4,
    h: 0.55,
    fontFace: "Arial",
    fontSize: 26,
    bold: true,
    color: dark ? colors.white : colors.primary,
    margin: 0.03,
  });
}

function addBody(slide, text) {
  slide.addText(text, {
    x: 0.55,
    y: 1.15,
    w: 5.4,
    h: 2.05,
    fontFace: "Arial",
    fontSize: 16,
    color: colors.text,
    breakLine: false,
    fit: "shrink",
    valign: "top",
    margin: 0.05,
  });
}

function addCode(slide, code) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.55,
    y: 3.5,
    w: 5.35,
    h: 2.75,
    rectRadius: 0.08,
    fill: { color: colors.dark },
    line: { color: colors.brown },
  });
  slide.addText(code, {
    x: 0.75,
    y: 3.7,
    w: 4.95,
    h: 2.35,
    fontFace: "Consolas",
    fontSize: 12,
    color: colors.white,
    fit: "shrink",
    valign: "top",
    margin: 0.02,
  });
}

function addShot(slide, file) {
  slide.addImage({
    path: path.join(screenshots, file),
    x: 6.25,
    y: 1.15,
    w: 6.5,
    h: 5.35,
    sizing: { type: "contain", x: 6.25, y: 1.15, w: 6.5, h: 5.35 },
  });
}

function addStandardSlide({ title, text, code, shot }) {
  const slide = pptx.addSlide();
  slide.background = { color: colors.bg };
  addTitle(slide, title);
  addBody(slide, text);
  if (code) addCode(slide, code);
  if (shot) addShot(slide, shot);
}

let slide = pptx.addSlide();
slide.background = { color: colors.brown };
addTitle(slide, "Projet Quai Antique", true);
slide.addText("Site vitrine d'un restaurant gastronomique", {
  x: 0.75,
  y: 1.3,
  w: 5.2,
  h: 0.9,
  fontSize: 24,
  bold: true,
  color: colors.white,
  margin: 0.02,
});
slide.addText("Présentation du code, des pages et des outils utilisés.", {
  x: 0.75,
  y: 2.35,
  w: 5.15,
  h: 0.85,
  fontSize: 17,
  color: "F6E7D6",
  margin: 0.02,
});
addShot(slide, "01-home.png");

addStandardSlide({
  title: "Objectif du projet",
  text:
    "Créer un site clair et responsive pour le restaurant Quai Antique.\n\nPrésenter la structure HTML, les styles CSS et l'interactivité JavaScript.\n\nPréparer un support facile à expliquer pendant l'examen.",
  code: "HTML5 + CSS3 + JavaScript\n\nPages :\n- Accueil\n- Galerie\n- La carte\n- Réservation\n- Connexion\n- Inscription",
});

addStandardSlide({
  title: "Charte graphique",
  text:
    "La maquette utilise une ambiance élégante et chaleureuse.\n\nLes couleurs principales sont le brun foncé, le doré et le blanc.\n\nLes boutons dorés sont réutilisés sur toutes les pages.",
  code: ":root {\n  --primary: #9b6a22;\n  --dark: #3c2e24;\n  --bg-dark: #211817;\n}",
  shot: "01-home.png",
});

addStandardSlide({
  title: "Header et navigation",
  text:
    "Le header contient le nom du restaurant et le menu principal.\n\nChaque lien ouvre une page HTML différente.\n\nLa navigation reste identique sur toutes les pages.",
  code:
    '<header class="site-header">\n  <a class="brand">Quai Antique</a>\n  <nav class="main-nav">...</nav>\n</header>',
  shot: "01-home.png",
});

addStandardSlide({
  title: "Page Accueil : hero",
  text:
    "Le hero est le premier bloc visible.\n\nIl présente le restaurant avec une image de fond, un titre et un bouton de réservation.\n\nL'image est nette et sauvegardée localement.",
  code:
    '<section class="hero hero-home">\n  <h1>Quai Antique</h1>\n  <a class="btn">Réserver</a>\n</section>',
  shot: "01-home.png",
});

addStandardSlide({
  title: "Body de la page Accueil",
  text:
    "Le contenu principal est organisé avec plusieurs sections.\n\nChaque section utilise du texte, une image et parfois un bouton.\n\nCSS Grid permet d'aligner proprement le texte et l'image.",
  code:
    '<main>\n  <section class="intro section-light">...</section>\n  <section class="fresh section-dark">...</section>\n</main>',
  shot: "01-home.png",
});

addStandardSlide({
  title: "Galerie",
  text:
    "La galerie présente les photos du restaurant et des plats.\n\nLes images ont été remplacées par des photos de meilleure qualité.\n\nLes cartes sont organisées avec une grille responsive.",
  code:
    '<div class="gallery-grid">\n  <article class="gallery-card">\n    <img src="assets/images/dish-salmon.jpg">\n  </article>\n</div>',
  shot: "02-gallery.png",
});

addStandardSlide({
  title: "La carte",
  text:
    "La page La carte contient trois catégories : Entrées, Plats et Desserts.\n\nLes boutons de catégories sont actifs.\n\nJavaScript affiche uniquement la catégorie sélectionnée.",
  code:
    'tab.addEventListener("click", (event) => {\n  event.preventDefault();\n  showMenuPanel(tab.dataset.tab);\n});',
  shot: "04-menu-desserts.png",
});

addStandardSlide({
  title: "Réservation en ligne",
  text:
    "La page réservation utilise un formulaire HTML.\n\nL'utilisateur peut choisir une date, une heure, le nombre de personnes et ajouter ses allergies.\n\nLe bouton affiche un message de confirmation.",
  code:
    '<form class="form-panel">\n  <input type="date">\n  <input type="time">\n  <select>...</select>\n</form>',
  shot: "05-reservation.png",
});

addStandardSlide({
  title: "Connexion et inscription",
  text:
    "La page Mon compte contient une connexion avec des champs vides.\n\nL'e-mail et le mot de passe de test ont été supprimés.\n\nLe lien Inscrivez-vous ici ouvre une page d'inscription.",
  code:
    '<input id="email" type="email">\n<input id="password" type="password">\n<a href="register.html">Inscrivez-vous ici !</a>',
  shot: "06-login.png",
});

addStandardSlide({
  title: "Footer et responsive",
  text:
    "Le footer affiche les horaires, l'adresse et le contact.\n\nIl utilise une image de fond plus nette.\n\nLa règle @media adapte la mise en page aux petits écrans.",
  code:
    "@media (max-width: 760px) {\n  .gallery-grid,\n  .site-footer {\n    grid-template-columns: 1fr;\n  }\n}",
  shot: "01-home.png",
});

addStandardSlide({
  title: "Conclusion",
  text:
    "Le projet respecte la structure demandée : header, body, pages, formulaires et footer.\n\nLe site est consultable localement depuis index.html.\n\nLa présentation montre le résultat, le code et les choix techniques.",
  code: "Fichiers principaux :\nindex.html\nstyles.css\napp.js\nassets/images/",
});

pptx.writeFile({ fileName: path.join(__dirname, "Quai_Antique_presentation_FR_PPTX_OK.pptx") });
