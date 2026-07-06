const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const outPath = path.join(__dirname, "Quai_Antique_Presentation_Premiere_Remise.pdf");
const screenshots = path.join(__dirname, "screenshots");

const colors = {
  bg: "#f7f7f7",
  dark: "#211817",
  brown: "#3c2e24",
  primary: "#9b6a22",
  secondary: "#c5baa4",
  white: "#ffffff",
  text: "#222222",
  lightBrown: "#eae6e2",
};

const doc = new PDFDocument({
  size: [1280, 720],
  margin: 0,
  info: {
    Title: "Quai Antique - Présentation de première remise",
    Author: "Larisa Faessel",
    Subject: "Présentation de première remise - Projet d'examen",
  },
});

doc.pipe(fs.createWriteStream(outPath));

// Helper: draw gold header line on content pages
function drawHeader(doc, title, slideIndex, totalSlides) {
  // Gold horizontal line
  doc.rect(56, 30, 1168, 4).fill(colors.primary);
  
  // "Quai Antique" small banner
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(colors.brown)
    .text("QUAI ANTIQUE  |  PREMIÈRE REMISE", 56, 44);
    
  // Slide title
  doc
    .font("Helvetica-Bold")
    .fontSize(28)
    .fillColor(colors.primary)
    .text(title, 56, 68);

  // Footer page number
  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor("#777777")
    .text(`${slideIndex} / ${totalSlides}`, 1130, 675, { width: 90, align: "right" });
}

// Helper: draw text block
function drawTextBlock(doc, text, x, y, w, fontSize = 15, color = colors.text, font = "Helvetica") {
  doc
    .font(font)
    .fontSize(fontSize)
    .fillColor(color)
    .text(text, x, y, {
      width: w,
      lineGap: 5,
    });
}

// Helper: draw rounded container for text blocks
function drawTextBox(doc, text, x, y, w, h, options = {}) {
  const bgCol = options.bg || colors.lightBrown;
  const borderCol = options.border || "#d5c8be";
  const fontSize = options.size || 14;
  const fontName = options.bold ? "Helvetica-Bold" : "Helvetica";
  const textCol = options.color || colors.text;

  doc.roundedRect(x, y, w, h, 8).fill(bgCol);
  doc.roundedRect(x, y, w, h, 8).strokeColor(borderCol).lineWidth(1).stroke();

  doc
    .font(fontName)
    .fontSize(fontSize)
    .fillColor(textCol)
    .text(text, x + 16, y + 16, {
      width: w - 32,
      height: h - 32,
      lineGap: 4,
    });
}

// Helper: draw a beautiful terminal / code block
function drawCodeBlock(doc, code, x, y, w, h) {
  doc.roundedRect(x, y, w, h, 8).fill(colors.dark);
  doc.roundedRect(x, y, w, h, 8).strokeColor(colors.brown).lineWidth(1).stroke();
  
  // Terminal dot-lights
  doc.circle(x + 18, y + 14, 4).fill("#ff5f56");
  doc.circle(x + 28, y + 14, 4).fill("#ffbd2e");
  doc.circle(x + 38, y + 14, 4).fill("#27c93f");

  doc
    .font("Courier")
    .fontSize(9.5)
    .fillColor(colors.white)
    .text(code, x + 16, y + 32, {
      width: w - 32,
      height: h - 44,
      lineGap: 2.5,
    });
}

// Helper: draw screenshot image with frame
function drawScreenshotCard(doc, filename, label, x, y, w, h) {
  doc.roundedRect(x, y, w, h, 8).fill(colors.white);
  doc.roundedRect(x, y, w, h, 8).strokeColor("#e0dcd9").lineWidth(1).stroke();
  
  const imagePath = path.join(screenshots, filename);
  if (fs.existsSync(imagePath)) {
    doc.image(imagePath, x + 8, y + 8, {
      fit: [w - 16, h - 46],
      align: "center",
      valign: "center"
    });
  } else {
    // Fallback if missing
    doc.rect(x + 8, y + 8, w - 16, h - 46).fill(colors.brown);
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .fillColor(colors.white)
      .text("[ Capture d'écran ]", x + 8, y + h / 2 - 25, { width: w - 16, align: "center" });
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(colors.secondary)
      .text(filename, x + 8, y + h / 2, { width: w - 16, align: "center" });
  }
  
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(colors.brown)
    .text(label, x + 8, y + h - 26, {
      width: w - 16,
      align: "center"
    });
}

// Helper: draw tables
function drawTable(doc, headers, rows, x, y, colWidths, rowHeight = 34) {
  let currentY = y;
  
  // Header background
  doc.rect(x, currentY, colWidths.reduce((a,b)=>a+b, 0), rowHeight).fill(colors.brown);
  
  // Header text
  let currentX = x;
  headers.forEach((header, index) => {
    doc.font("Helvetica-Bold").fontSize(11).fillColor(colors.white).text(header, currentX + 8, currentY + 11, {
      width: colWidths[index] - 16,
      align: "left"
    });
    currentX += colWidths[index];
  });
  
  currentY += rowHeight;
  
  // Rows
  rows.forEach((row, rowIndex) => {
    // Alternating bg
    if (rowIndex % 2 === 0) {
      doc.rect(x, currentY, colWidths.reduce((a,b)=>a+b, 0), rowHeight).fill("#eae6e2");
    } else {
      doc.rect(x, currentY, colWidths.reduce((a,b)=>a+b, 0), rowHeight).fill(colors.white);
    }
    
    // Grid borders
    doc.rect(x, currentY, colWidths.reduce((a,b)=>a+b, 0), rowHeight).strokeColor("#d5c8be").lineWidth(1).stroke();
    
    currentX = x;
    row.forEach((cell, cellIndex) => {
      let isStatus = cellIndex === row.length - 1 || cell.startsWith("✓") || cell.startsWith("△");
      let textColor = colors.text;
      let fontName = "Helvetica";
      
      if (cell.startsWith("✓")) {
        textColor = "#1e4620"; // green
        fontName = "Helvetica-Bold";
      } else if (cell.startsWith("△")) {
        textColor = "#7c5a11"; // gold
        fontName = "Helvetica-Bold";
      }
      
      doc.font(fontName).fontSize(10.5).fillColor(textColor).text(cell, currentX + 8, currentY + 11, {
        width: colWidths[cellIndex] - 16,
        align: "left"
      });
      currentX += colWidths[cellIndex];
    });
    currentY += rowHeight;
  });
}

// Helper: draw architecture diagram
function drawArchitectureDiagram(doc, y) {
  const boxWidth = 260;
  const boxHeight = 75;
  const spacing = 150;
  
  // Box 1: Frontend
  let x1 = 80;
  doc.roundedRect(x1, y, boxWidth, boxHeight, 8).fill(colors.white);
  doc.roundedRect(x1, y, boxWidth, boxHeight, 8).strokeColor(colors.primary).lineWidth(2).stroke();
  doc.font("Helvetica-Bold").fontSize(12).fillColor(colors.primary).text("FRONTEND CLIENT", x1, y + 16, { width: boxWidth, align: "center" });
  doc.font("Helvetica").fontSize(10).fillColor(colors.text).text("HTML5 / CSS3 / Vanilla JS\nFormulaire interactif (app.js)", x1, y + 36, { width: boxWidth, align: "center" });
  
  // Arrow 1: Frontend -> Backend
  let ax1 = x1 + boxWidth;
  let ax2 = ax1 + spacing;
  let ay = y + boxHeight / 2;
  doc.lineCap("butt").moveTo(ax1, ay).lineTo(ax2 - 10, ay).strokeColor(colors.primary).lineWidth(2).stroke();
  doc.moveTo(ax2 - 10, ay - 6).lineTo(ax2, ay).lineTo(ax2 - 10, ay + 6).fill(colors.primary);
  doc.font("Helvetica-Bold").fontSize(8.5).fillColor(colors.primary).text("FETCH API (POST JSON)", ax1 + 5, ay - 18, { width: spacing - 10, align: "center" });
  
  // Box 2: Backend
  let x2 = ax2;
  doc.roundedRect(x2, y, boxWidth, boxHeight, 8).fill(colors.white);
  doc.roundedRect(x2, y, boxWidth, boxHeight, 8).strokeColor(colors.primary).lineWidth(2).stroke();
  doc.font("Helvetica-Bold").fontSize(12).fillColor(colors.primary).text("BACKEND API EXPRESS", x2, y + 16, { width: boxWidth, align: "center" });
  doc.font("Helvetica").fontSize(10).fillColor(colors.text).text("Node.js / Express Server\nValidation & CORS autorisés", x2, y + 36, { width: boxWidth, align: "center" });
  
  // Arrow 2: Backend -> DB
  let bx1 = x2 + boxWidth;
  let bx2 = bx1 + spacing;
  let by = y + boxHeight / 2;
  doc.lineCap("butt").moveTo(bx1, by).lineTo(bx2 - 10, by).strokeColor(colors.primary).lineWidth(2).stroke();
  doc.moveTo(bx2 - 10, by - 6).lineTo(bx2, by).lineTo(bx2 - 10, by + 6).fill(colors.primary);
  doc.font("Helvetica-Bold").fontSize(8.5).fillColor(colors.primary).text("POOL DE CONNX. PG SQL", bx1 + 5, by - 18, { width: spacing - 10, align: "center" });
  
  // Box 3: DB
  let x3 = bx2;
  doc.roundedRect(x3, y, boxWidth, boxHeight, 8).fill(colors.white);
  doc.roundedRect(x3, y, boxWidth, boxHeight, 8).strokeColor(colors.primary).lineWidth(2).stroke();
  doc.font("Helvetica-Bold").fontSize(12).fillColor(colors.primary).text("BASE DE DONNÉES", x3, y + 16, { width: boxWidth, align: "center" });
  doc.font("Helvetica").fontSize(10).fillColor(colors.text).text("PostgreSQL (Supabase Cloud)\nTable 'reservations' persistante", x3, y + 36, { width: boxWidth, align: "center" });
}

// ------------------------------------------------------------------------------------------------
// SLIDE 1 : PAGE DE GARDE (Dark Cover)
// ------------------------------------------------------------------------------------------------
doc.rect(0, 0, 1280, 720).fill(colors.brown);

// Draw gold geometric decor
doc.moveTo(1100, 0).lineTo(1280, 0).lineTo(1280, 720).lineTo(900, 720).fill(colors.primary);
doc.moveTo(1000, 0).lineTo(1080, 0).lineTo(880, 720).lineTo(800, 720).fill("#865715");

doc
  .font("Helvetica-Bold")
  .fontSize(52)
  .fillColor(colors.white)
  .text("Projet Quai Antique", 80, 200, { width: 700 });

doc
  .font("Helvetica")
  .fontSize(22)
  .fillColor(colors.secondary)
  .text("Présentation de première remise\nProjet en cours de développement", 80, 275, { width: 700, lineGap: 6 });

// Divider gold line
doc.rect(80, 370, 480, 3).fill(colors.secondary);

// Student metadata block
doc
  .font("Helvetica-Bold")
  .fontSize(15)
  .fillColor(colors.white)
  .text("Étudiante :", 80, 420);
doc
  .font("Helvetica")
  .fontSize(15)
  .fillColor(colors.secondary)
  .text("Larisa Faessel (Promo Développeur No-Code)", 305, 420);

doc
  .font("Helvetica-Bold")
  .fontSize(15)
  .fillColor(colors.white)
  .text("Contexte pédagogique :", 80, 450);
doc
  .font("Helvetica")
  .fontSize(15)
  .fillColor(colors.secondary)
  .text("Examen étudiant — Première remise", 305, 450);

doc
  .font("Helvetica-Bold")
  .fontSize(15)
  .fillColor(colors.white)
  .text("État de l'application :", 80, 480);
doc
  .font("Helvetica-Bold")
  .fontSize(15)
  .fillColor("#a1e0a4")
  .text("Frontend interactif & Backend Express connectés !", 305, 480);

doc
  .font("Helvetica-Bold")
  .fontSize(15)
  .fillColor(colors.white)
  .text("Date de génération :", 80, 510);
doc
  .font("Helvetica")
  .fontSize(15)
  .fillColor(colors.secondary)
  .text("Mai 2026", 305, 510);

// Slide counter
doc
  .font("Helvetica")
  .fontSize(11)
  .fillColor(colors.secondary)
  .text("1 / 12", 1130, 675, { width: 90, align: "right" });


// ------------------------------------------------------------------------------------------------
// SLIDE 2 : PRESENTATION DU PROJET (Light)
// ------------------------------------------------------------------------------------------------
doc.addPage({ size: [1280, 720], margin: 0 });
doc.rect(0, 0, 1280, 720).fill(colors.bg);
drawHeader(doc, "1. Présentation du projet", 2, 12);

const slide2Text = 
  "Dans le cadre de ma formation Développeur No-Code, je présente le projet Quai Antique. Il s'agit d'une application web conçue pour un restaurant gastronomique.\n\n" +
  "L'objectif de cette première version est de proposer une interface utilisateur pour découvrir l'établissement, reliée à une base de données pour la gestion des réservations.\n\n" +
  "Le projet est actuellement en cours de développement. La base technique permet d'envisager de futures extensions (espace de connexion et panneau d'administration).";

drawTextBox(doc, slide2Text, 56, 130, 550, 480);

// Visual placeholder representing home screen
drawScreenshotCard(doc, "01-home.png", "Accueil du site web - Quai Antique", 650, 130, 574, 480);


// ------------------------------------------------------------------------------------------------
// SLIDE 3 : CAHIER DES CHARGES SIMPLIFIE
// ------------------------------------------------------------------------------------------------
doc.addPage({ size: [1280, 720], margin: 0 });
doc.rect(0, 0, 1280, 720).fill(colors.bg);
drawHeader(doc, "2. Cahier des charges (version simplifiée)", 3, 12);

// Column 1: Client need & Frontend
const cdcCol1 = 
  "BESOIN CLIENT :\n" +
  "Disposer d'un site vitrine fonctionnel permettant de consulter les plats, la galerie du restaurant et de faire une réservation de table en ligne.\n\n\n" +
  "FONCTIONNALITÉS INTERFACE (FRONTEND) :\n" +
  "• Page d'accueil : Présentation du restaurant et bouton d'appel à réservation.\n" +
  "• La Carte / Menu : Onglets de filtres par catégories (entrées, plats, desserts).\n" +
  "• Galerie photos : Grille adaptative pour afficher les photos des plats.\n" +
  "• Connexion / Inscription : Maquette des formulaires d'authentification.\n" +
  "• Formulaire de réservation : Saisie de la date, l'heure, du nombre de convives et des allergies.";

drawTextBox(doc, cdcCol1, 56, 130, 560, 480);

// Column 2: Backend & Database & Constraints
const cdcCol2 = 
  "FONCTIONNALITÉS LOGIQUE (BACKEND) :\n" +
  "• API REST : Serveur Express pour intercepter les requêtes du frontend.\n" +
  "• Validation des données : Traitement et contrôle de conformité des données côté serveur.\n" +
  "• Connexion base de données : Intégration SQL avec gestion d'un pool de connexion.\n\n\n" +
  "BASE DE DONNÉES (POSTGRESQL) :\n" +
  "• Table 'reservations' : Sauvegarde et persistance des réservations de table.\n" +
  "• Suivi client : Stockage des informations de contact et d'allergies.\n\n\n" +
  "CONTRAINTES TECHNIQUES :\n" +
  "• Responsive : Adaptation sur mobile, tablette et ordinateur de bureau.\n" +
  "• Architecture : Code structuré pour favoriser la maintenance.\n" +
  "• Versionnement Git : Suivi régulier des commits.";

drawTextBox(doc, cdcCol2, 650, 130, 574, 480);


// ------------------------------------------------------------------------------------------------
// SLIDE 4 : TECHNOLOGIES UTILISEES
// ------------------------------------------------------------------------------------------------
doc.addPage({ size: [1280, 720], margin: 0 });
doc.rect(0, 0, 1280, 720).fill(colors.bg);
drawHeader(doc, "3. Technologies utilisées dans le projet", 4, 12);

const techIntro = 
  "J'ai mis en œuvre des technologies standardisées pour la réalisation de ce projet. L'accent a été mis sur la mise en place d'une architecture client-serveur afin de séparer la présentation et la gestion des données.";
drawTextBlock(doc, techIntro, 56, 130, 1168, 15, colors.text);

const techHeaders = ["Couche Applicative", "Technologies Choisies", "Rôle & Justification Technique"];
const techRows = [
  ["Frontend / Client", "HTML5, CSS3, JavaScript (ES6+)", "Structure sémantique, styles réactifs (CSS Grid) et requêtes asynchrones Fetch API."],
  ["Backend / API", "Node.js, Express, CORS middleware", "Serveur HTTP structuré en MVC, routage REST, middleware de sécurité CORS pour l'intégration."],
  ["Base de Données", "PostgreSQL (Supabase Cloud), pg", "Stockage relationnel, intégrité référentielle, connexion par pool robuste pour la performance."],
  ["DevOps & Outils", "Git / GitHub, Docker (Nginx), VS Code", "Contrôle des versions, conteneurisation pour le serveur statique local, environnement homogène."]
];

drawTable(doc, techHeaders, techRows, 56, 210, [220, 300, 648], 40);


// ------------------------------------------------------------------------------------------------
// SLIDE 5 : AVANCEMENT DU PROJET
// ------------------------------------------------------------------------------------------------
doc.addPage({ size: [1280, 720], margin: 0 });
doc.rect(0, 0, 1280, 720).fill(colors.bg);
drawHeader(doc, "4. État d'avancement des fonctionnalités", 5, 12);

const progressHeaders = ["Fonctionnalité principale", "Détail Technique & Implémentation", "Statut actuel"];
const progressRows = [
  ["Page d'accueil & Vitrine", "Mise en page HTML5 et CSS3 responsive.", "✓ Réalisé"],
  ["Galerie photos des plats", "Grille réactive avec photos des plats.", "✓ Réalisé"],
  ["La carte du restaurant", "Onglets de filtres en JavaScript (app.js).", "✓ Réalisé"],
  ["Formulaire de réservation", "Formulaire avec contrôle local des champs obligatoires.", "✓ Réalisé"],
  ["API Express (Backend)", "Routes REST (/api/reservations) et route de statut (/api/health).", "✓ Réalisé"],
  ["Connexion PostgreSQL", "Base de données hébergée avec table 'reservations' initialisée.", "✓ Réalisé"],
  ["Liaison Formulaire → DB", "Envoi des données en POST JSON du Frontend vers l'API Express.", "✓ Intégré"],
  ["Comptes & Espace Admin", "Maquettes de connexion et d'inscription prêtes.", "△ En cours"]
];

drawTable(doc, progressHeaders, progressRows, 56, 140, [320, 600, 248], 38);


// ------------------------------------------------------------------------------------------------
// SLIDE 6 : ARCHITECTURE TECHNIQUE
// ------------------------------------------------------------------------------------------------
doc.addPage({ size: [1280, 720], margin: 0 });
doc.rect(0, 0, 1280, 720).fill(colors.bg);
drawHeader(doc, "5. Architecture technique de l'application", 6, 12);

const archText = 
  "L'application implémente une architecture découpée en couches de type Client-Serveur. " +
  "La communication entre le Frontend et le Backend est asynchrone et repose sur le format standard JSON.\n\n" +
  "Fonctionnement détaillé de l'intégration :\n" +
  "1. L'utilisateur remplit le formulaire de réservation sur l'interface.\n" +
  "2. Le script JavaScript intercepte la soumission, valide les types de données et effectue une requête Fetch API en POST JSON.\n" +
  "3. Le serveur Express intercepte la requête, applique les validations côté serveur (ex: nombre de convives > 0) et transmet les données au repository.\n" +
  "4. Le repository exécute une requête préparée via un pool de connexions (pg) vers PostgreSQL (Supabase) pour y insérer les informations.";

drawTextBlock(doc, archText, 56, 130, 1168, 14.5, colors.text);

// Draw the vector architecture diagram below the text
drawArchitectureDiagram(doc, 365);


// ------------------------------------------------------------------------------------------------
// SLIDE 7 : CAPTURES D'ECRAN (Frontend Interface)
// ------------------------------------------------------------------------------------------------
doc.addPage({ size: [1280, 720], margin: 0 });
doc.rect(0, 0, 1280, 720).fill(colors.bg);
drawHeader(doc, "6. Captures d'écran : Interface Frontend", 7, 12);

drawScreenshotCard(doc, "01-home.png", "Page d'accueil responsive", 56, 140, 360, 275);
drawScreenshotCard(doc, "02-gallery.png", "Grille de la Galerie photos", 460, 140, 360, 275);
drawScreenshotCard(doc, "05-reservation.png", "Formulaire de réservation interactif", 860, 140, 364, 275);

const screenText = 
  "L'interface utilisateur est adaptée pour un restaurant gastronomique avec un thème sombre et doré. Le site est responsive et s'adaptes aux smartphones, tablettes et ordinateurs.";

drawTextBox(doc, screenText, 56, 440, 1168, 170);


// ------------------------------------------------------------------------------------------------
// SLIDE 8 : CAPTURES D'ECRAN (Backend & Database Code)
// ------------------------------------------------------------------------------------------------
doc.addPage({ size: [1280, 720], margin: 0 });
doc.rect(0, 0, 1280, 720).fill(colors.bg);
drawHeader(doc, "6. Architecture de code : Contrôleur Backend & DB", 8, 12);

const backExpl = 
  "STRUCTURE DU CODE :\n\n" +
  "Le backend Express utilise une structure de type Repository pour séparer les responsabilités :\n\n" +
  "• controllers/reservation.controller.js :\n" +
  "Gère la requête HTTP, extrait les données, valide les champs obligatoires (ex: nombre de personnes entier positif) et renvoie la réponse (201 ou codes d'erreur 400, 500, 503).\n\n" +
  "• repositories/reservation.repository.js :\n" +
  "Exécute les requêtes SQL paramétrées vers la base de données PostgreSQL.\n\n" +
  "• config/database.js & initDatabase.js :\n" +
  "Configure la connexion pg et initialise la table des réservations au démarrage.";

drawTextBox(doc, backExpl, 56, 130, 550, 480);

const sampleCode = 
  "// Extrait de controllers/reservation.controller.js\n" +
  "async function createReservation(req, res) {\n" +
  "  const { firstName, lastName, email, date, time, guests, allergies } = req.body;\n\n" +
  "  if (!firstName || !lastName || !email || !date || !time || !guests) {\n" +
  "    return res.status(400).json({\n" +
  "      message: 'Tous les champs obligatoires doivent etre remplis'\n" +
  "    });\n" +
  "  }\n\n" +
  "  const guestCount = Number(guests);\n" +
  "  if (!Number.isInteger(guestCount) || guestCount <= 0) {\n" +
  "    return res.status(400).json({\n" +
  "      message: 'Le nombre de personnes doit etre un nombre entier positif'\n" +
  "    });\n" +
  "  }\n\n" +
  "  try {\n" +
  "    const reservation = await reservationRepository.createReservation({\n" +
  "      firstName, lastName, email, date, time, guests: guestCount, allergies\n" +
  "    });\n" +
  "    return res.status(201).json({ message: 'Reservation enregistree', reservation });\n" +
  "  } catch (error) {\n" +
  "    // Gestion gracieuse d'une base de donnees indisponible\n" +
  "    if (error.message.includes('DATABASE_URL')) {\n" +
  "      return res.status(503).json({ message: 'Base de donnees indisponible' });\n" +
  "    }\n" +
  "    return res.status(500).json({ message: 'Erreur serveur' });\n" +
  "  }\n" +
  "}";

drawCodeBlock(doc, sampleCode, 630, 130, 594, 480);


// ------------------------------------------------------------------------------------------------
// SLIDE 9 : GESTION DE VERSIONS (GIT / GITHUB)
// ------------------------------------------------------------------------------------------------
doc.addPage({ size: [1280, 720], margin: 0 });
doc.rect(0, 0, 1280, 720).fill(colors.bg);
drawHeader(doc, "7. Gestion des versions : Git & GitHub", 9, 12);

const gitText = 
  "SUIVI DES VERSIONS AVEC GIT :\n" +
  "Le suivi des versions permet de structurer les étapes du projet et de sécuriser le code.\n\n" +
  "• Organisation des commits :\n" +
  "Chaque modification fait l'objet d'un commit décrivant de manière unitaire le changement apporté (ex : création du formulaire, liaison API, initialisation base de données).\n\n" +
  "• Sécurisation du code et clés d'accès :\n" +
  "Utilisation d'un fichier `.gitignore` pour exclure les variables d'environnement locales (.env), les identifiants de base de données et les dépendances du dossier 'node_modules'.\n\n" +
  "• Sauvegarde et partage :\n" +
  "Le dépôt local est synchronisé sur GitHub pour permettre le suivi du projet et la validation.\n\n\n" +
  "LIENS DU PROJET :\n" +
  "• Dépôt de code GitHub : https://github.com/catcodecat/Quai_Antique_Project\n" +
  "• Déploiement en ligne (vitrine Netlify) : https://quai-antique-projet.netlify.app/";

drawTextBox(doc, gitText, 56, 130, 1168, 480);


// ------------------------------------------------------------------------------------------------
// SLIDE 10 : DIFFICULTES RENCONTREES (Student Tone!)
// ------------------------------------------------------------------------------------------------
doc.addPage({ size: [1280, 720], margin: 0 });
doc.rect(0, 0, 1280, 720).fill(colors.bg);
drawHeader(doc, "8. Difficultés rencontrées et solutions", 10, 12);

const diffText = 
  "Le développement de l'intégration client-serveur a présenté plusieurs points techniques :\n\n" +
  "• Gestion de la sécurité CORS :\n" +
  "Les requêtes du formulaire frontend étaient initialement bloquées par les navigateurs. Solution : configuration du middleware 'cors' côté Express pour autoriser spécifiquement l'origine de développement local.\n\n" +
  "• Connexion et stabilité de la base de données :\n" +
  "Pour éviter que le serveur Express ne s'arrête en cas de délai de réponse de Supabase au démarrage (mode veille cloud), un système de reconnexion automatique avec plusieurs tentatives (retries) a été intégré dans le script 'initDatabase.js'.\n\n" +
  "• Validation des données saisies :\n" +
  "Afin de garantir que seules des données cohérentes soient enregistrées, une double validation a été mise en place : côté client (contraintes HTML5) et côté serveur Express (contrôle du type et de la positivité des valeurs dans le contrôleur).";

drawTextBox(doc, diffText, 56, 140, 1168, 470);


// ------------------------------------------------------------------------------------------------
// SLIDE 11 : PROCHAINES ETAPES
// ------------------------------------------------------------------------------------------------
doc.addPage({ size: [1280, 720], margin: 0 });
doc.rect(0, 0, 1280, 720).fill(colors.bg);
drawHeader(doc, "9. Prochaines étapes du développement", 11, 12);

const nextCol1 = 
  "1. SÉCURISATION ET AUTHENTIFICATION DES COMPTES CLIENTS :\n" +
  "• Implémenter le hachage sécurisé des mots de passe dans la base de données avec la bibliothèque 'bcrypt' côté backend Express.\n" +
  "• Générer et valider des jetons sécurisés JWT (JSON Web Tokens) lors de la connexion pour maintenir la session de l'utilisateur.\n" +
  "• Protéger les routes sensibles de l'API REST grâce à des middlewares d'authentification personnalisés.\n\n\n" +
  "2. DÉVELOPPEMENT DU PANNEAU D'ADMINISTRATION COMPLET :\n" +
  "• Créer des écrans d'administration permettant de modifier dynamiquement les plats de la carte, les prix et les descriptions.\n" +
  "• Gérer les jours et horaires d'ouverture du restaurant de manière interactive.\n" +
  "• Pouvoir consulter, filtrer et valider/annuler les demandes de réservations des clients.";

drawTextBox(doc, nextCol1, 56, 130, 560, 480);

const nextCol2 = 
  "3. REFACTORISATION ET MIGRATION COMPOSANTS REACT + VITE :\n" +
  "• Refactoriser le frontend statique HTML/CSS/JS actuel dans un projet moderne React + Vite pour un développement plus fluide.\n" +
  "• Découper l'interface utilisateur en composants autonomes et réutilisables (ex: Header, Footer, MenuTabs, ReservationForm).\n" +
  "• Utiliser React Router pour gérer de manière transparente et performante la navigation entre les pages sans rechargement.\n\n\n" +
  "4. DÉPLOIEMENT FINAL DE L'APPLICATION EN PRODUCTION :\n" +
  "• Déployer la base de données finale de production PostgreSQL sur Supabase.\n" +
  "• Héberger l'API REST Express sur une plateforme de cloud (Render ou Fly.io) avec des variables d'environnement chiffrées.\n" +
  "• Publier le frontend React sur Netlify avec des redirections configurées pour les requêtes API.";

drawTextBox(doc, nextCol2, 650, 130, 574, 480);


// ------------------------------------------------------------------------------------------------
// SLIDE 12 : CONCLUSION (Dark Cover)
// ------------------------------------------------------------------------------------------------
doc.addPage({ size: [1280, 720], margin: 0 });
doc.rect(0, 0, 1280, 720).fill(colors.brown);

// Draw gold geometric decor
doc.moveTo(1100, 0).lineTo(1280, 0).lineTo(1280, 720).lineTo(900, 720).fill(colors.primary);
doc.moveTo(1000, 0).lineTo(1080, 0).lineTo(880, 720).lineTo(800, 720).fill("#865715");

doc
  .font("Helvetica-Bold")
  .fontSize(38)
  .fillColor(colors.white)
  .text("Conclusion du projet", 80, 100);

const conclusionText = 
  "J'ai mis en œuvre une architecture applicative web pour ce projet. L'interface utilisateur est responsive et interactive. Le backend Express est fonctionnel, prend en charge les validations côté serveur et transmet les données de réservation à la base de données PostgreSQL.\n\n" +
  "La base technique est en place. Le projet est prêt pour cette première validation intermédiaire. Cela permet de valider la communication entre le client et le serveur, et de préparer la suite du développement de manière sereine.";

drawTextBlock(doc, conclusionText, 80, 180, 680, 16, colors.secondary);

// Student signature
doc
  .font("Helvetica-Bold")
  .fontSize(16)
  .fillColor(colors.white)
  .text("Larisa Faessel", 80, 550);
doc
  .font("Helvetica")
  .fontSize(13)
  .fillColor(colors.secondary)
  .text("Étudiante en formation Développeur No-Code", 80, 572);

// Slide counter
doc
  .font("Helvetica")
  .fontSize(11)
  .fillColor(colors.secondary)
  .text("12 / 12", 1130, 675, { width: 90, align: "right" });

doc.end();
console.log("PDF generated successfully at: " + outPath);
