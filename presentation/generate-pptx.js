/**
 * Générateur PowerPoint — Dossier Projet Quai Antique
 * Larisa Faessel · DNC · Studi · Cohorte sept-oct 2026
 * 57 diapositives
 */
const pptxgen = require("pptxgenjs");
const path    = require("path");
const fs      = require("fs");

const ROOT  = path.resolve(__dirname, "..");
const SS    = path.join(__dirname, "screenshots");
const EVO   = path.join(__dirname, "evolution");
const ASSETS= path.join(__dirname, "assets");

// ── Vérification des assets ──────────────────────────────────────────────────
function img(p) {
  if (!fs.existsSync(p)) { console.warn(`⚠ manquant: ${path.basename(p)}`); return null; }
  return p;
}

// ── Palette ──────────────────────────────────────────────────────────────────
const C = {
  dark:      "211817",
  brown:     "3C2E24",
  primary:   "9B6A22",
  secondary: "C5BAA4",
  bg:        "F7F7F7",
  white:     "FFFFFF",
  text:      "222222",
  muted:     "5F5A54",
  green:     "2E7D32",
  red:       "C62828",
  blue:      "1565C0",
  purple:    "7C3FE4",
};

// ── Init PPTX ────────────────────────────────────────────────────────────────
const pptx = new pptxgen();
pptx.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 });
pptx.layout  = "WIDE";
pptx.author  = "Larisa Faessel";
pptx.subject = "Dossier Projet — Quai Antique";
pptx.title   = "Quai Antique — Dossier Projet DNC";

// ════════════════════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════════════════════

/** Fond foncé pour couverture / intercalaires */
function darkBg(slide) {
  slide.addShape(pptx.ShapeType.rect, { x:0, y:0, w:"100%", h:"100%", fill:{ color:C.dark } });
}

/** Fond clair standard */
function lightBg(slide) {
  slide.addShape(pptx.ShapeType.rect, { x:0, y:0, w:"100%", h:"100%", fill:{ color:C.bg } });
}

/** Barre de titre colorée en haut */
function titleBar(slide, text, bgColor = C.brown) {
  slide.addShape(pptx.ShapeType.rect, { x:0, y:0, w:"100%", h:1.1, fill:{ color:bgColor } });
  slide.addText(text, { x:0.35, y:0.15, w:12.6, h:0.8, fontSize:22, bold:true,
    color:C.white, fontFace:"Arial" });
}

/** Numéro de diapositive */
function slideNum(slide, n, total=57) {
  slide.addText(`${n} / ${total}`, { x:12.1, y:7.15, w:1.1, h:0.25,
    fontSize:8, color:C.secondary, align:"right" });
}

/** Filet de séparation horizontal */
function hline(slide, y, color = C.secondary) {
  slide.addShape(pptx.ShapeType.line, { x:0.35, y, w:12.65, h:0, line:{ color, width:0.8 } });
}

/** Badge coloré (petit rectangle texte) */
function badge(slide, text, x, y, bg=C.primary, fg=C.white) {
  slide.addText(text, { x, y, w:2.0, h:0.28, fontSize:9, bold:true, color:fg,
    fill:{ color:bg }, align:"center", valign:"middle",
    shape:pptx.ShapeType.roundRect, rectRadius:0.05 });
}

/** Note de bas de page */
function footnote(slide, text) {
  slide.addText(text, { x:0.35, y:7.1, w:11.5, h:0.3, fontSize:9,
    color:C.muted, italic:true });
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 1 — OUVERTURE (slides 1–5)
// ════════════════════════════════════════════════════════════════════════════

// ── Slide 1 : Page de garde ──────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  darkBg(s);
  // Bande dorée gauche
  s.addShape(pptx.ShapeType.rect, { x:0, y:0, w:0.18, h:"100%", fill:{ color:C.primary } });
  // Image hero en fond semi-transparent
  const heroPath = img(path.join(ROOT,"assets/images/restaurant-room.jpg"));
  if (heroPath) s.addImage({ path:heroPath, x:6.5, y:0, w:6.83, h:7.5, transparency:45 });
  // Titre
  s.addText("Quai Antique", { x:0.5, y:1.4, w:6.0, h:1.2, fontSize:46, bold:true,
    color:C.primary, fontFace:"Arial", shadow:{ type:"outer", color:"000000", blur:4, offset:2 }});
  s.addText("Site web du restaurant gastronomique", { x:0.5, y:2.7, w:6.0, h:0.5,
    fontSize:16, color:C.secondary, italic:true });
  hline(s, 3.35, C.primary);
  s.addText("Larisa Faessel", { x:0.5, y:3.5, w:5.5, h:0.55, fontSize:20, bold:true, color:C.white });
  s.addText("Dossier Projet · Développeur No Code (DNC)", { x:0.5, y:4.1, w:5.8, h:0.4,
    fontSize:13, color:C.secondary });
  s.addText("Studi · Cohorte Septembre – Octobre 2026", { x:0.5, y:4.55, w:5.8, h:0.35,
    fontSize:12, color:C.muted });
  s.addText("Juin 2026", { x:0.5, y:5.0, w:3.0, h:0.35, fontSize:12, color:C.muted });
}

// ── Slide 2 : Sommaire ───────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  darkBg(s);
  s.addShape(pptx.ShapeType.rect, { x:0, y:0, w:"100%", h:1.1, fill:{ color:C.brown } });
  s.addText("Sommaire", { x:0.35, y:0.15, w:12.6, h:0.8, fontSize:26, bold:true,
    color:C.white, fontFace:"Arial" });
  slideNum(s, 2);

  const parts = [
    ["01", "Contexte & objectifs du projet",   "Slides 3–5"],
    ["02", "Cahier des charges",                "Slides 6–11"],
    ["03", "Environnement & Architecture",      "Slides 12–18"],
    ["04", "Base de données",                   "Slides 19–23"],
    ["05", "Backend — API & Authentification",  "Slides 24–31"],
    ["06", "Frontend — Interface utilisateur",  "Slides 32–41"],
    ["07", "Déploiement",                       "Slides 42–46"],
    ["08", "Démonstration",                     "Slide 47"],
    ["09", "Bilan & Évolution du projet",       "Slides 48–53"],
    ["10", "Compétences DNC validées",          "Slides 54–57"],
  ];

  parts.forEach(([num, title, ref], i) => {
    const row = i % 5; const col = Math.floor(i/5);
    const x = col === 0 ? 0.5 : 6.9;
    const y = 1.35 + row * 1.12;
    s.addShape(pptx.ShapeType.rect, { x, y, w:0.55, h:0.55, fill:{ color:C.primary }, rectRadius:0.05 });
    s.addText(num, { x, y:y+0.1, w:0.55, h:0.35, fontSize:13, bold:true, color:C.white, align:"center" });
    s.addText(title, { x:x+0.7, y:y+0.05, w:5.6, h:0.35, fontSize:13, color:C.white, bold:true });
    s.addText(ref,   { x:x+0.7, y:y+0.38, w:5.6, h:0.22, fontSize:9,  color:C.secondary });
  });
}

// ── Slide 3 : Présentation personnelle ──────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s, "Qui suis-je ?"); slideNum(s, 3);
  s.addText("Larisa Faessel", { x:0.5, y:1.3, w:8, h:0.7, fontSize:28, bold:true, color:C.brown });
  const rows = [
    [{ text:"Formation",    options:{ bold:true, fill:{ color:C.brown }, color:C.white } },
     { text:"Développeur No Code (DNC) · Studi" }],
    [{ text:"Cohorte",      options:{ bold:true, fill:{ color:C.brown }, color:C.white } },
     { text:"Septembre – Octobre 2026" }],
    [{ text:"Projet",       options:{ bold:true, fill:{ color:C.brown }, color:C.white } },
     { text:"Quai Antique — Site web restaurant gastronomique" }],
    [{ text:"Objectif",     options:{ bold:true, fill:{ color:C.brown }, color:C.white } },
     { text:"Dossier Projet — réalisation complète frontend & backend" }],
    [{ text:"Technologies", options:{ bold:true, fill:{ color:C.brown }, color:C.white } },
     { text:"HTML5 · CSS3 · JavaScript · Node.js · PostgreSQL · Netlify · Railway" }],
  ];
  s.addTable(rows, { x:0.5, y:2.1, w:12.3, colW:[2.8,9.5], border:{ color:C.secondary },
    fontFace:"Arial", fontSize:13,
    fill:{ color:C.white }, color:C.text });
  footnote(s, "Formation en ligne · Studi · 2026");
}

// ── Slide 4 : Le restaurant Quai Antique ────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s);
  titleBar(s, "Le restaurant Quai Antique"); slideNum(s, 4);
  const sc = img(path.join(SS,"desktop-accueil.png"));
  if (sc) s.addImage({ path:sc, x:6.8, y:1.2, w:6.2, h:3.9, sizing:{type:"contain",w:6.2,h:3.9} });
  s.addText("Contexte fictif — sujet d'examen", { x:0.35, y:1.25, w:6.0, h:0.35, fontSize:11, italic:true, color:C.muted });
  const pts = [
    "Restaurant gastronomique situé à Chambéry",
    "Chef : Arnaud Michant",
    "Cuisine de saison, produits locaux et frais",
    "Service midi & soir, du mardi au dimanche",
    "Besoin : moderniser la présence numérique",
    "Objectif client : réserver une table en ligne",
  ];
  pts.forEach((t,i) => {
    s.addText("▸  " + t, { x:0.35, y:1.7+i*0.76, w:6.1, h:0.6, fontSize:13, color:C.text });
  });
  hline(s, 5.8);
  s.addText("Projet réalisé dans le cadre du Dossier Projet DNC · Studi", {
    x:0.35, y:5.9, w:12.6, h:0.4, fontSize:11, italic:true, color:C.muted });
}

// ── Slide 5 : Objectifs du projet ───────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s, "Objectifs du projet"); slideNum(s, 5);
  const objs = [
    { num:"01", title:"Vitrine du restaurant",      desc:"Présenter le restaurant, la galerie et la carte gastronomique", color:C.brown },
    { num:"02", title:"Réservation en ligne",        desc:"Formulaire connecté à une API REST et une base de données réelle", color:C.primary },
    { num:"03", title:"Espace utilisateur",          desc:"Inscription, connexion JWT, préremplissage automatique du formulaire", color:C.purple },
    { num:"04", title:"Espace administrateur",       desc:"Dashboard de consultation des réservations avec statuts colorés", color:C.blue },
  ];
  objs.forEach((o, i) => {
    const x = (i % 2) * 6.4 + 0.4;
    const y = Math.floor(i / 2) * 2.8 + 1.3;
    s.addShape(pptx.ShapeType.roundRect, { x, y, w:6.0, h:2.5, fill:{ color:C.white },
      line:{ color:o.color, width:2 }, rectRadius:0.1 });
    s.addShape(pptx.ShapeType.rect, { x, y, w:6.0, h:0.55, fill:{ color:o.color }, rectRadius:0.05 });
    s.addText(o.num, { x:x+0.15, y:y+0.08, w:0.6, h:0.38, fontSize:14, bold:true, color:C.white });
    s.addText(o.title, { x:x+0.8, y:y+0.08, w:4.9, h:0.38, fontSize:14, bold:true, color:C.white });
    s.addText(o.desc, { x:x+0.2, y:y+0.75, w:5.6, h:1.5, fontSize:12, color:C.text,
      valign:"top", wrap:true });
  });
  slideNum(s, 5);
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 2 — CAHIER DES CHARGES (slides 6–11)
// ════════════════════════════════════════════════════════════════════════════

// ── Slide 6 : Intercalaire ──────────────────────────────────────────────────
{
  const s = pptx.addSlide(); darkBg(s);
  s.addShape(pptx.ShapeType.rect, { x:0, y:3.2, w:"100%", h:1.1, fill:{ color:C.primary } });
  s.addText("02", { x:0.4, y:0.5, w:2, h:2, fontSize:100, bold:true, color:C.brown, fontFace:"Arial" });
  s.addText("Cahier\ndes charges", { x:0.35, y:3.3, w:12.6, h:0.85, fontSize:30, bold:true,
    color:C.white, align:"center" });
  slideNum(s, 6);
}

// ── Slide 7 : Besoins fonctionnels — Visiteur ────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s);
  titleBar(s, "Besoins fonctionnels — Visiteur"); slideNum(s, 7);
  const rows = [
    [{text:"Fonctionnalité",options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Description",  options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"État",         options:{bold:true,fill:{color:C.brown},color:C.white}}],
    ["Accueil restaurant","Présentation du chef, des valeurs, photo hero","✅ Livré"],
    ["Galerie photos","6 images du restaurant et des plats","✅ Livré"],
    ["Carte du restaurant","Entrées, plats, desserts avec prix et descriptions","✅ Livré"],
    ["Onglets dynamiques","Navigation entre catégories sans rechargement","✅ Livré"],
    ["Formulaire réservation","Envoi date, heure, convives, allergies","✅ Livré"],
    ["Horaires & contact","Footer visible sur toutes les pages","✅ Livré"],
    ["Responsive mobile","Adaptation 390px → 1280px","✅ Livré"],
  ];
  s.addTable(rows, { x:0.35, y:1.2, w:12.6, colW:[3.2,7.2,2.2],
    border:{color:C.secondary}, fontSize:12, fontFace:"Arial",
    fill:{color:C.white}, color:C.text,
    rowH:0.52 });
}

// ── Slide 8 : Besoins fonctionnels — Utilisateur connecté ────────────────────
{
  const s = pptx.addSlide(); lightBg(s);
  titleBar(s, "Besoins fonctionnels — Utilisateur connecté"); slideNum(s, 8);
  const sc = img(path.join(SS,"desktop-reservation-connectee.png"));
  if (sc) s.addImage({ path:sc, x:6.8, y:1.2, w:6.1, h:4.2, sizing:{type:"contain",w:6.1,h:4.2} });
  const rows = [
    [{text:"Fonctionnalité",options:{bold:true,fill:{color:C.primary},color:C.white}},
     {text:"État",options:{bold:true,fill:{color:C.primary},color:C.white}}],
    ["S'inscrire (prénom, nom, email, mdp)","✅ Livré"],
    ["Se connecter (email + mdp)","✅ Livré"],
    ["Formulaire prérempli automatiquement","✅ Livré"],
    ["Navigation affiche prénom","✅ Livré"],
    ["Se déconnecter (supprime localStorage)","✅ Livré"],
    ["Redirection post-login → réservation","✅ Livré"],
  ];
  s.addTable(rows, { x:0.35, y:1.2, w:6.1, colW:[4.6,1.5],
    border:{color:C.secondary}, fontSize:12, fontFace:"Arial",
    fill:{color:C.white}, color:C.text, rowH:0.58 });
  if (sc) s.addText("Formulaire prérempli après connexion", {
    x:6.8, y:5.5, w:6.1, h:0.3, fontSize:9, italic:true, color:C.muted, align:"center" });
}

// ── Slide 9 : Besoins fonctionnels — Admin ───────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s);
  titleBar(s, "Besoins fonctionnels — Administrateur"); slideNum(s, 9);
  const sc = img(path.join(SS,"desktop-admin-data.png"));
  if (sc) s.addImage({ path:sc, x:0.35, y:1.3, w:7.2, h:4.5, sizing:{type:"contain",w:7.2,h:4.5} });
  s.addText("Dashboard Admin", { x:7.8, y:1.4, w:5.0, h:0.45, fontSize:17, bold:true, color:C.brown });
  const pts = [
    "Voir toutes les réservations",
    "Tri par date (plus récentes en premier)",
    "Badge statut : En attente / Confirmée / Annulée",
    "Colonne email, date, heure, convives, allergies",
    "Bouton Actualiser (rechargement API)",
    "Accessible via /admin.html",
  ];
  pts.forEach((p,i) => s.addText("▸  "+p, { x:7.7, y:2.0+i*0.68, w:5.2, h:0.55, fontSize:12, color:C.text }));
  badge(s,"⚠ Non protégé par auth", 7.7, 6.3, C.red, C.white);
  slideNum(s, 9);
}

// ── Slide 10 : Besoins non fonctionnels ─────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s, "Besoins non fonctionnels"); slideNum(s, 10);
  const rows = [
    [{text:"Critère",       options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Exigence",      options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Solution",      options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"État",          options:{bold:true,fill:{color:C.brown},color:C.white}}],
    ["Responsive","Mobile 390px + Desktop 1280px","CSS Flexbox / Grid + media query","✅"],
    ["Sécurité mots de passe","Hashage irréversible","bcrypt 10 rounds","✅"],
    ["Authentification","Tokens stateless","JWT · 7 jours","✅"],
    ["Protection données","Variables secrètes hors code","dotenv · .gitignore","✅"],
    ["CORS","Seul le frontend peut appeler l'API","CORS_ORIGIN env var","✅"],
    ["Disponibilité","Site en ligne 24/7","Netlify CDN + Railway","✅"],
    ["Versioning","Historique du code","Git + GitHub","✅"],
    ["Déploiement automatique","Push = déploiement","GitHub → Netlify / Railway","✅"],
  ];
  s.addTable(rows, { x:0.35, y:1.2, w:12.6, colW:[2.4,3.2,3.8,1.2],
    border:{color:C.secondary}, fontSize:11, fontFace:"Arial",
    fill:{color:C.white}, color:C.text, rowH:0.48 });
}

// ── Slide 11 : Mapping besoins → implémentation ──────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s, "Mapping besoins → implémentation"); slideNum(s, 11);
  const rows = [
    [{text:"Besoin",options:{bold:true,fill:{color:C.primary},color:C.white}},
     {text:"Implémentation",options:{bold:true,fill:{color:C.primary},color:C.white}},
     {text:"Fichier(s)",options:{bold:true,fill:{color:C.primary},color:C.white}},
     {text:"État",options:{bold:true,fill:{color:C.primary},color:C.white}}],
    ["Vitrine restaurant","HTML statique + CSS","index.html · styles.css","✅"],
    ["Carte dynamique","Onglets JS","menu.html · app.js","✅"],
    ["Réservation → BDD","fetch() + Express + SQL","app.js · reservation.controller","✅"],
    ["Inscription","bcrypt + JWT + POST register","auth.controller · user.repo","✅"],
    ["Connexion","bcrypt.compare + JWT","auth.controller · user.repo","✅"],
    ["Préremplissage formulaire","localStorage → form fields","app.js (bloc reservationForm)","✅"],
    ["Dashboard admin","fetch GET reservations","admin.html","✅"],
    ["Responsive mobile","CSS media query","styles.css","✅"],
    ["Déploiement production","Git push → auto-deploy","Netlify + Railway","✅"],
    ["Protection admin par rôle","Middleware JWT","middlewares/ (vide)","⚠ Prévu"],
  ];
  s.addTable(rows, { x:0.35, y:1.2, w:12.6, colW:[2.8,3.4,3.6,1.2],
    border:{color:C.secondary}, fontSize:10, fontFace:"Arial",
    fill:{color:C.white}, color:C.text, rowH:0.44 });
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 3 — ENVIRONNEMENT & ARCHITECTURE (slides 12–18)
// ════════════════════════════════════════════════════════════════════════════

// ── Slide 12 : Intercalaire ──────────────────────────────────────────────────
{
  const s = pptx.addSlide(); darkBg(s);
  s.addShape(pptx.ShapeType.rect, { x:0, y:3.2, w:"100%", h:1.1, fill:{ color:C.primary } });
  s.addText("03", { x:0.4, y:0.5, w:2, h:2, fontSize:100, bold:true, color:C.brown });
  s.addText("Environnement\n& Architecture", { x:0.35, y:3.3, w:12.6, h:0.85,
    fontSize:28, bold:true, color:C.white, align:"center" });
  slideNum(s, 12);
}

// ── Slide 13 : Environnement de travail ──────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s, "Environnement de travail"); slideNum(s, 13);
  const tools = [
    { name:"VS Code",    role:"Éditeur de code",                 color:C.blue },
    { name:"Git",        role:"Versioning local",                color:C.brown },
    { name:"GitHub",     role:"Dépôt distant + CI/CD",           color:C.dark },
    { name:"Node.js",    role:"Runtime JavaScript backend",       color:C.green },
    { name:"npm",        role:"Gestionnaire de dépendances",      color:C.red },
    { name:"Postman",    role:"Test des routes API",              color:C.primary },
    { name:"Chromium",   role:"Navigateur + DevTools",            color:C.blue },
    { name:"Supabase",   role:"BDD PostgreSQL cloud",             color:"3ECF8E" },
  ];
  tools.forEach((t, i) => {
    const col = i % 4; const row = Math.floor(i / 4);
    const x = col * 3.1 + 0.45; const y = row * 2.4 + 1.3;
    s.addShape(pptx.ShapeType.roundRect, { x, y, w:2.8, h:1.9, fill:{ color:C.white },
      line:{ color:t.color, width:2.5 }, rectRadius:0.1 });
    s.addShape(pptx.ShapeType.rect, { x, y, w:2.8, h:0.55, fill:{ color:t.color }, rectRadius:0.05 });
    s.addText(t.name, { x, y:y+0.1, w:2.8, h:0.4, fontSize:14, bold:true,
      color:C.white, align:"center" });
    s.addText(t.role, { x:x+0.1, y:y+0.75, w:2.6, h:0.9, fontSize:11,
      color:C.text, align:"center", wrap:true, valign:"middle" });
  });
}

// ── Slide 14 : Stack technique ───────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s, "Stack technique"); slideNum(s, 14);
  const cols = [
    { title:"Frontend", color:C.primary, items:["HTML5","CSS3","JavaScript ES6+","Vanilla (sans framework)","styles.css — 400 lignes","app.js — 178 lignes"] },
    { title:"Backend",  color:C.brown,   items:["Node.js 24","Express 4","bcryptjs","jsonwebtoken (JWT)","dotenv","pg (node-postgres)"] },
    { title:"Base de données", color:"3ECF8E", items:["PostgreSQL","Supabase (cloud)","Requêtes préparées","Pas d'ORM","initDatabase auto","2 tables"] },
    { title:"Déploiement", color:C.blue, items:["Netlify (frontend)","Railway (backend)","GitHub CI/CD","Nixpacks","Docker + Nginx","HTTPS partout"] },
  ];
  cols.forEach((c, i) => {
    const x = i * 3.15 + 0.35;
    s.addShape(pptx.ShapeType.rect, { x, y:1.2, w:2.9, h:0.55, fill:{ color:c.color }, rectRadius:0.05 });
    s.addText(c.title, { x, y:1.25, w:2.9, h:0.45, fontSize:13, bold:true, color:C.white, align:"center" });
    c.items.forEach((item, j) => {
      s.addText("• " + item, { x:x+0.1, y:1.9+j*0.7, w:2.7, h:0.6, fontSize:11, color:C.text });
    });
  });
}

// ── Slide 15 : Justification des choix ──────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s, "Justification des choix techniques"); slideNum(s, 15);
  const rows = [
    [{text:"Technologie",options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Pourquoi ce choix ?",options:{bold:true,fill:{color:C.brown},color:C.white}}],
    ["HTML / CSS / JS vanilla","Maîtrise complète du code sans abstraction · Idéal pour comprendre les bases"],
    ["Node.js + Express","Légèreté · JavaScript côté serveur · Écosystème npm · Idéal API REST"],
    ["PostgreSQL / Supabase","Base relationnelle robuste · SQL standard · Supabase gratuit et simple"],
    ["JWT","Authentification stateless · Pas de sessions serveur · Compatible mobile"],
    ["bcrypt","Standard industriel du hashage de mots de passe · Irréversible"],
    ["Netlify","Déploiement frontend en 30 sec · CDN mondial · Gratuit · HTTPS auto"],
    ["Railway","Déploiement Node.js simple · Variables env sécurisées · Nixpacks"],
    ["Git / GitHub","Versioning indispensable · CI/CD auto · Collaboration · Historique"],
  ];
  s.addTable(rows, { x:0.35, y:1.2, w:12.6, colW:[3.2,9.4],
    border:{color:C.secondary}, fontSize:12, fontFace:"Arial",
    fill:{color:C.white}, color:C.text, rowH:0.5 });
}

// ── Slide 16 : Architecture globale ──────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s, "Architecture globale"); slideNum(s, 16);
  const archSvg = img(path.join(ASSETS,"architecture.svg"));
  if (archSvg) s.addImage({ path:archSvg, x:0.35, y:1.2, w:12.6, h:5.9,
    sizing:{type:"contain",w:12.6,h:5.9} });
  slideNum(s, 16);
}

// ── Slide 17 : Pattern MVC ───────────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s, "Pattern MVC — Architecture backend"); slideNum(s, 17);
  const mvcSvg = img(path.join(ASSETS,"mvc.svg"));
  if (mvcSvg) s.addImage({ path:mvcSvg, x:0.35, y:1.2, w:12.6, h:5.9,
    sizing:{type:"contain",w:12.6,h:5.9} });
}

// ── Slide 18 : Git / GitHub & CI/CD ──────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s, "Git · GitHub · CI/CD"); slideNum(s, 18);
  s.addText("20 commits · 9 jours de développement · branche main", {
    x:0.35, y:1.15, w:12.6, h:0.35, fontSize:12, italic:true, color:C.muted });
  const ghSc = img(path.join(ROOT,"screens/github.png"));
  if (ghSc) s.addImage({ path:ghSc, x:0.35, y:1.55, w:7.2, h:4.0, sizing:{type:"contain",w:7.2,h:4.0}});
  const pts = [
    "Commits atomiques avec messages clairs",
    "feat: / fix: / add: (convention)",
    "Push → déploiement auto Netlify (~30s)",
    "Push → rebuild Railway (~2min)",
    ".gitignore : .env, node_modules, PDFs",
    "Aucune donnée sensible dans le dépôt",
  ];
  pts.forEach((p,i) => s.addText("▸  "+p, {
    x:7.8, y:1.6+i*0.72, w:5.1, h:0.6, fontSize:12, color:C.text }));
  footnote(s, "Dépôt : github.com/catcodecat/Quai_Antique_Project");
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 4 — BASE DE DONNÉES (slides 19–23)
// ════════════════════════════════════════════════════════════════════════════

// ── Slide 19 : Intercalaire ──────────────────────────────────────────────────
{
  const s = pptx.addSlide(); darkBg(s);
  s.addShape(pptx.ShapeType.rect, { x:0, y:3.2, w:"100%", h:1.1, fill:{ color:C.primary } });
  s.addText("04", { x:0.4, y:0.5, w:2, h:2, fontSize:100, bold:true, color:C.brown });
  s.addText("Base de données", { x:0.35, y:3.3, w:12.6, h:0.85, fontSize:32, bold:true,
    color:C.white, align:"center" });
  slideNum(s, 19);
}

// ── Slide 20 : ERD ───────────────────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s, "Modèle Entité-Relation (ERD)"); slideNum(s, 20);
  const erdSvg = img(path.join(ASSETS,"erd.svg"));
  if (erdSvg) s.addImage({ path:erdSvg, x:0.35, y:1.15, w:12.6, h:6.0,
    sizing:{type:"contain",w:12.6,h:6.0} });
}

// ── Slide 21 : Table users ───────────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s, "Table users — Structure SQL"); slideNum(s, 21);
  s.addText(`CREATE TABLE IF NOT EXISTS users (\n  id            SERIAL PRIMARY KEY,\n  first_name    VARCHAR(100) NOT NULL,\n  last_name     VARCHAR(100) NOT NULL,\n  email         VARCHAR(255) UNIQUE NOT NULL,\n  password_hash VARCHAR(255) NOT NULL,\n  role          VARCHAR(20)  NOT NULL DEFAULT 'user',\n  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP\n);`,
    { x:0.35, y:1.25, w:7.5, h:4.5, fontSize:12, fontFace:"Courier New",
      fill:{color:C.dark}, color:"D4D4D4",
      insets:{left:0.2,right:0.2,top:0.15,bottom:0.15} });
  s.addText("Points clés", { x:8.2, y:1.3, w:4.8, h:0.4, fontSize:14, bold:true, color:C.brown });
  const pts = [
    ["SERIAL PK","Identifiant auto-incrémenté"],
    ["UNIQUE email","Un seul compte par adresse"],
    ["password_hash","Jamais le mot de passe en clair"],
    ["role DEFAULT 'user'","Deux rôles : user / admin"],
    ["CURRENT_TIMESTAMP","Date d'inscription automatique"],
  ];
  pts.forEach(([k,v], i) => {
    s.addText(k, { x:8.2, y:1.9+i*0.9, w:2.2, h:0.45, fontSize:11, bold:true,
      color:C.white, fill:{color:C.primary}, align:"center" });
    s.addText(v, { x:10.5, y:1.9+i*0.9, w:2.55, h:0.45, fontSize:11, color:C.text });
  });
  footnote(s, "Initialisation automatique au démarrage du serveur · backend/src/config/initDatabase.js");
}

// ── Slide 22 : Table reservations ────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s, "Table reservations — Structure SQL"); slideNum(s, 22);
  s.addText(`CREATE TABLE IF NOT EXISTS reservations (\n  id               SERIAL PRIMARY KEY,\n  first_name       VARCHAR(100) NOT NULL,\n  last_name        VARCHAR(100) NOT NULL,\n  email            VARCHAR(255) NOT NULL,\n  reservation_date DATE         NOT NULL,\n  reservation_time TIME         NOT NULL,\n  guests           INTEGER      NOT NULL CHECK (guests > 0),\n  allergies        TEXT,\n  status           VARCHAR(30)  NOT NULL DEFAULT 'pending',\n  created_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP\n);`,
    { x:0.35, y:1.25, w:7.5, h:5.3, fontSize:11, fontFace:"Courier New",
      fill:{color:C.dark}, color:"D4D4D4",
      insets:{left:0.2,right:0.2,top:0.15,bottom:0.15} });
  s.addText("Statuts possibles", { x:8.2, y:1.3, w:4.8, h:0.4, fontSize:14, bold:true, color:C.brown });
  [["pending","En attente",C.primary],["confirmed","Confirmée",C.green],["cancelled","Annulée",C.red]]
    .forEach(([v,l,c],i) => {
      s.addShape(pptx.ShapeType.roundRect, {x:8.2, y:1.9+i*0.8, w:4.8, h:0.6, fill:{color:c}, rectRadius:0.08});
      s.addText(`${v}  →  ${l}`, {x:8.2, y:1.9+i*0.8, w:4.8, h:0.6, fontSize:13, bold:true,
        color:C.white, align:"center", valign:"middle"});
    });
  s.addText("CHECK (guests > 0)", {x:8.2, y:4.5, w:4.8, h:0.5, fontSize:12, color:C.primary, bold:true});
  s.addText("Contrainte SQL : empêche une réservation pour 0 convive", {x:8.2, y:5.0, w:4.8, h:0.5, fontSize:11, color:C.text});
  footnote(s, "allergies est nullable (TEXT sans NOT NULL) — champ optionnel");
  slideNum(s, 22);
}

// ── Slide 23 : Requêtes préparées ────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s, "Requêtes préparées — Protection SQL Injection"); slideNum(s, 23);
  s.addText("Exemple : user.repository.js", {x:0.35,y:1.2,w:8,h:0.4,fontSize:13,bold:true,color:C.brown});
  s.addText(
`// ✅ CORRECT — Requête préparée
const result = await db.query(
  \`SELECT id, first_name AS "firstName",
          email, password_hash AS "passwordHash"
   FROM users
   WHERE email = $1\`,   ←  paramètre $1 séparé des données
  [email]                ←  valeur injectée proprement
);

// ❌ INCORRECT — Vulnérable à l'injection SQL
const result = await db.query(
  \`SELECT * FROM users WHERE email = '\${email}'\`
  // Si email = "' OR 1=1--"  →  toute la table exposée !
);`,
    { x:0.35, y:1.7, w:8.0, h:4.5, fontSize:11, fontFace:"Courier New",
      fill:{color:C.dark}, color:"D4D4D4",
      insets:{left:0.2,right:0.2,top:0.2,bottom:0.2} });

  s.addText("Principe", {x:8.6,y:1.3,w:4.4,h:0.4,fontSize:14,bold:true,color:C.brown});
  const pts=["Les données ne sont jamais\nconcaténées dans la requête SQL",
             "Le paramètre $1, $2… est\ntraité comme donnée, pas comme code",
             "Protection contre les\ninjections SQL (OWASP Top 10)",
             "Utilisé dans tous les\nrepositories du projet"];
  pts.forEach((p,i)=>s.addText("▸  "+p,{x:8.6,y:1.9+i*1.25,w:4.4,h:1.1,fontSize:11,color:C.text,wrap:true}));
  slideNum(s, 23);
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 5 — BACKEND (slides 24–31)
// ════════════════════════════════════════════════════════════════════════════

// ── Slide 24 : Intercalaire ──────────────────────────────────────────────────
{
  const s = pptx.addSlide(); darkBg(s);
  s.addShape(pptx.ShapeType.rect, { x:0, y:3.2, w:"100%", h:1.1, fill:{ color:C.primary } });
  s.addText("05", { x:0.4, y:0.5, w:2, h:2, fontSize:100, bold:true, color:C.brown });
  s.addText("Backend\nAPI & Authentification", { x:0.35, y:3.3, w:12.6, h:0.85,
    fontSize:28, bold:true, color:C.white, align:"center" });
  slideNum(s, 24);
}

// ── Slide 25 : Routes API ────────────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Routes API — Quai Antique Backend"); slideNum(s,25);
  s.addText("Base URL : https://quaiantiqueproject-production.up.railway.app",
    {x:0.35,y:1.15,w:12.6,h:0.3,fontSize:11,fontFace:"Courier New",color:C.primary});
  const rows = [
    [{text:"Méthode",options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Route",options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Description",options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Auth",options:{bold:true,fill:{color:C.brown},color:C.white}}],
    [{text:"GET",options:{fill:{color:"1565C0"},color:C.white,bold:true}},"/api/health","Vérification disponibilité serveur","—"],
    [{text:"POST",options:{fill:{color:"2E7D32"},color:C.white,bold:true}},"/api/auth/register","Créer un compte · bcrypt + JWT","—"],
    [{text:"POST",options:{fill:{color:"2E7D32"},color:C.white,bold:true}},"/api/auth/login","Connexion · bcrypt.compare + JWT","—"],
    [{text:"GET",options:{fill:{color:"1565C0"},color:C.white,bold:true}},"/api/reservations","Lister toutes les réservations","—"],
    [{text:"POST",options:{fill:{color:"2E7D32"},color:C.white,bold:true}},"/api/reservations","Créer une réservation","—"],
  ];
  s.addTable(rows, {x:0.35,y:1.5,w:12.6,colW:[1.6,4.0,5.8,1.2],
    border:{color:C.secondary},fontSize:12,fontFace:"Arial",fill:{color:C.white},color:C.text,rowH:0.58});
  badge(s,"⚠ Admin non protégé",0.35,5.4,C.red,C.white);
  s.addText("La route GET /api/reservations devrait exiger un token admin (middleware JWT prévu)",
    {x:2.6,y:5.38,w:10,h:0.38,fontSize:11,color:C.red,italic:true});
  slideNum(s, 25);
}

// ── Slide 26 : Flux auth — Register ──────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Flux d'authentification — register() + login()"); slideNum(s,26);
  const authSvg = img(path.join(ASSETS,"auth-flow.svg"));
  if (authSvg) s.addImage({ path:authSvg, x:0.35, y:1.15, w:12.6, h:6.0,
    sizing:{type:"contain",w:12.6,h:6.0} });
}

// ── Slide 27 : JWT — Détail ──────────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"JSON Web Token (JWT) — Structure & usage"); slideNum(s,27);
  s.addText("Structure d'un JWT", {x:0.35,y:1.2,w:6.0,h:0.4,fontSize:14,bold:true,color:C.brown});
  s.addText(
`// Payload généré dans auth.controller.js
const token = jwt.sign(
  {
    userId : user.id,
    email  : user.email,
    role   : user.role     // 'user' ou 'admin'
  },
  process.env.JWT_SECRET,  // secret côté serveur
  { expiresIn: '7d' }      // expire dans 7 jours
);

// Côté frontend (app.js)
localStorage.setItem("qaToken", token);
localStorage.setItem("qaUser", JSON.stringify(user));`,
    {x:0.35,y:1.7,w:6.1,h:4.5,fontSize:11,fontFace:"Courier New",
     fill:{color:C.dark},color:"D4D4D4",insets:{left:0.2,right:0.2,top:0.2,bottom:0.2}});
  s.addText("Avantages", {x:6.8,y:1.2,w:5.8,h:0.4,fontSize:14,bold:true,color:C.brown});
  const pts=["Stateless : le serveur ne stocke pas de session","Le token contient userId, email, role","Expiration automatique (7 jours)","Compatible avec toute architecture (mobile, SPA)","Signé avec JWT_SECRET : infalsifiable sans la clé"];
  pts.forEach((p,i)=>s.addText("▸  "+p,{x:6.8,y:1.75+i*0.85,w:6.1,h:0.7,fontSize:12,color:C.text}));
  footnote(s, "JWT_SECRET = variable d'environnement Railway · jamais dans le code source");
  slideNum(s, 27);
}

// ── Slide 28 : Gestion réservations ──────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Gestion des réservations — Backend"); slideNum(s,28);
  s.addText(
`// reservation.controller.js — createReservation()

const { firstName, lastName, email,
        date, time, guests, allergies } = req.body;

// 1. Validation
if (!firstName || !email || !date || !time || !guests)
  return res.status(400).json({ message: 'Champs manquants' });

if (!Number.isInteger(Number(guests)) || guests <= 0)
  return res.status(400).json({ message: 'Guests invalide' });

// 2. Insertion SQL préparée
const reservation = await reservationRepository
  .createReservation({ firstName, lastName, email,
                       date, time, guests, allergies });

// 3. Réponse
return res.status(201).json({ reservation });`,
    {x:0.35,y:1.2,w:7.0,h:5.1,fontSize:10,fontFace:"Courier New",
     fill:{color:C.dark},color:"D4D4D4",insets:{left:0.2,right:0.2,top:0.2,bottom:0.2}});
  s.addText("Parcours complet", {x:7.5,y:1.2,w:5.4,h:0.4,fontSize:14,bold:true,color:C.brown});
  const steps=["Utilisateur remplit le formulaire","fetch() POST vers Railway API","Controller valide les données","Repository exécute l'INSERT SQL","Réservation créée en base (status: pending)","Réponse 201 → message succès affiché","Admin voit la réservation dans /admin.html"];
  steps.forEach((st,i)=>{
    s.addShape(pptx.ShapeType.rect,{x:7.5,y:1.75+i*0.72,w:0.42,h:0.42,fill:{color:C.primary},rectRadius:0.03});
    s.addText(String(i+1),{x:7.5,y:1.78+i*0.72,w:0.42,h:0.36,fontSize:12,bold:true,color:C.white,align:"center"});
    s.addText(st,{x:8.05,y:1.78+i*0.72,w:4.9,h:0.55,fontSize:11,color:C.text});
  });
  slideNum(s, 28);
}

// ── Slide 29 : CORS ──────────────────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"CORS — Cross-Origin Resource Sharing"); slideNum(s,29);
  s.addText(
`// backend/src/app.js

const allowedOrigins = (process.env.CORS_ORIGIN
  || 'http://localhost:8080')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);    // ✅ autorisé
    } else {
      callback(new Error(      // ❌ bloqué
        'CORS : origine non autorisée'
      ));
    }
  }
}));`,
    {x:0.35,y:1.2,w:6.8,h:5.1,fontSize:11,fontFace:"Courier New",
     fill:{color:C.dark},color:"D4D4D4",insets:{left:0.2,right:0.2,top:0.2,bottom:0.2}});
  s.addText("Pourquoi CORS ?", {x:7.4,y:1.2,w:5.5,h:0.4,fontSize:14,bold:true,color:C.brown});
  const pts=["Le frontend (Netlify) et l'API (Railway)\nsont sur des domaines différents","Sans CORS : le navigateur bloque\nautomatiquement les requêtes","La variable CORS_ORIGIN liste\nles origines autorisées","En prod : uniquement le domaine Netlify","En dev : localhost:8080 autorisé","Aucun autre domaine ne peut\nappeler l'API"];
  pts.forEach((p,i)=>s.addText("▸  "+p,{x:7.4,y:1.75+i*0.88,w:5.5,h:0.75,fontSize:11,color:C.text,wrap:true}));
  slideNum(s, 29);
}

// ── Slide 30 : Variables d'environnement ─────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Variables d'environnement — Sécurité"); slideNum(s,30);
  const rows=[
    [{text:"Variable",options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Valeur (exemple)",options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Service",options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Rôle",options:{bold:true,fill:{color:C.brown},color:C.white}}],
    ["DATABASE_URL","postgres://user:pass@host/db","Railway","Connexion PostgreSQL Supabase"],
    ["JWT_SECRET","xKj8#mN2...","Railway","Signature des tokens JWT"],
    ["PORT","3000","Railway","Port Express"],
    ["CORS_ORIGIN","https://quai-antique...netlify.app","Railway","Origines CORS autorisées"],
  ];
  s.addTable(rows,{x:0.35,y:1.2,w:12.6,colW:[3.0,3.5,2.2,3.9],
    border:{color:C.secondary},fontSize:12,fontFace:"Arial",fill:{color:C.white},color:C.text,rowH:0.55});
  s.addText(".env.example (extrait)", {x:0.35,y:4.0,w:7.0,h:0.4,fontSize:13,bold:true,color:C.brown});
  s.addText("DATABASE_URL=postgres://...\nJWT_SECRET=votre-secret-ici\nPORT=3000\nCORS_ORIGIN=http://localhost:8080",
    {x:0.35,y:4.45,w:7.0,h:1.8,fontSize:11,fontFace:"Courier New",
     fill:{color:C.dark},color:"D4D4D4",insets:{left:0.2,right:0.2,top:0.1,bottom:0.1}});
  s.addText("Le fichier .env réel n'est jamais commité\n→ .gitignore bloque .env et .env.*",
    {x:7.5,y:4.4,w:5.4,h:1.2,fontSize:13,bold:true,color:C.green,
     fill:{color:"E8F5E9"},insets:{left:0.2,right:0.2,top:0.2,bottom:0.2}});
  slideNum(s, 30);
}

// ── Slide 31 : Sécurité — Récapitulatif ─────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Sécurité — Récapitulatif"); slideNum(s,31);
  const rows=[
    [{text:"Mesure",options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Implémentation",options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"État",options:{bold:true,fill:{color:C.brown},color:C.white}}],
    ["Hash mots de passe","bcrypt.hash(password, 10) · irréversible","✅"],
    ["Authentification","JWT signé · expiresIn 7j","✅"],
    ["Variables secrètes","dotenv · .env hors Git · .gitignore","✅"],
    ["Protection SQL","Requêtes préparées ($1, $2…)","✅"],
    ["CORS","Origines restreintes via CORS_ORIGIN","✅"],
    ["HTTPS","Automatique Netlify + Railway","✅"],
    ["Protection admin","Middleware JWT + rôle (middlewares/ vide)","⚠ Prévu"],
    ["Validation entrées","Côté serveur dans les controllers","✅ Partielle"],
    ["Tests","Aucun test automatisé","❌ À faire"],
  ];
  s.addTable(rows,{x:0.35,y:1.2,w:12.6,colW:[3.5,6.5,1.6],
    border:{color:C.secondary},fontSize:12,fontFace:"Arial",fill:{color:C.white},color:C.text,rowH:0.5});
  slideNum(s, 31);
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 6 — FRONTEND (slides 32–41)
// ════════════════════════════════════════════════════════════════════════════

// ── Slide 32 : Intercalaire ──────────────────────────────────────────────────
{
  const s = pptx.addSlide(); darkBg(s);
  s.addShape(pptx.ShapeType.rect, { x:0, y:3.2, w:"100%", h:1.1, fill:{ color:C.primary } });
  s.addText("06", { x:0.4, y:0.5, w:2, h:2, fontSize:100, bold:true, color:C.brown });
  s.addText("Frontend\nInterface utilisateur", { x:0.35, y:3.3, w:12.6, h:0.85,
    fontSize:28, bold:true, color:C.white, align:"center" });
  slideNum(s, 32);
}

// ── Slide 33 : Charte graphique ──────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Charte graphique"); slideNum(s,33);
  const swatches=[
    {hex:"3C2E24",name:"Brun foncé",role:"Header, backgrounds"},
    {hex:"9B6A22",name:"Or",role:"Couleur principale, CTAs"},
    {hex:"C5BAA4",name:"Beige",role:"Textes secondaires"},
    {hex:"F7F7F7",name:"Gris clair",role:"Fond des pages"},
    {hex:"211817",name:"Noir brun",role:"Dashboard, dark sections"},
    {hex:"222222",name:"Anthracite",role:"Texte principal"},
  ];
  swatches.forEach((sw,i)=>{
    const x=i*2.1+0.35, y=1.3;
    s.addShape(pptx.ShapeType.rect,{x,y,w:1.85,h:1.6,fill:{color:sw.hex},rectRadius:0.05});
    s.addText(sw.name,{x,y:y+1.65,w:1.85,h:0.35,fontSize:11,bold:true,color:C.text,align:"center"});
    s.addText(sw.role,{x,y:y+2.0,w:1.85,h:0.4,fontSize:9,color:C.muted,align:"center"});
    s.addText("#"+sw.hex,{x,y:y+1.25,w:1.85,h:0.3,fontSize:9,fontFace:"Courier New",
      color:sw.hex==="F7F7F7"?"222222":"FFFFFF",align:"center"});
  });
  hline(s,4.0);
  s.addText("Typographies", {x:0.35,y:4.1,w:4,h:0.4,fontSize:14,bold:true,color:C.brown});
  s.addText("Titres : Montserrat (font-weight: 500)",{x:0.35,y:4.6,w:5.5,h:0.4,fontSize:13,color:C.text});
  s.addText("Corps : Hind Madurai (font-family: 'Hind Madurai', Arial)",{x:0.35,y:5.05,w:7,h:0.4,fontSize:13,color:C.text});
  s.addText("Code : Courier New",{x:0.35,y:5.5,w:5.5,h:0.4,fontSize:13,color:C.text});
  s.addText("Exemple de bouton", {x:7.5,y:4.1,w:4,h:0.4,fontSize:14,bold:true,color:C.brown});
  s.addShape(pptx.ShapeType.roundRect,{x:7.5,y:4.6,w:2.5,h:0.6,fill:{color:C.primary},rectRadius:0.05});
  s.addText("Réserver",{x:7.5,y:4.62,w:2.5,h:0.56,fontSize:14,bold:true,color:C.white,align:"center"});
  slideNum(s, 33);
}

// ── Slide 34 : Pages statiques ───────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Pages statiques — Accueil & Galerie"); slideNum(s,34);
  const acc = img(path.join(SS,"desktop-accueil.png"));
  const gal = img(path.join(SS,"desktop-galerie.png"));
  if (acc) s.addImage({path:acc, x:0.35,y:1.2,w:6.2,h:3.9,sizing:{type:"contain",w:6.2,h:3.9}});
  if (gal) s.addImage({path:gal, x:6.75,y:1.2,w:6.2,h:3.9,sizing:{type:"contain",w:6.2,h:3.9}});
  s.addText("Accueil — index.html",{x:0.35,y:5.2,w:6.2,h:0.3,fontSize:10,italic:true,color:C.muted,align:"center"});
  s.addText("Galerie — gallery.html",{x:6.75,y:5.2,w:6.2,h:0.3,fontSize:10,italic:true,color:C.muted,align:"center"});
  const pts=["Navigation commune : header + footer sur toutes les pages","Hero section avec image de fond","Sections alternées clair/foncé","Boutons CTA vers réservation","Responsive : même structure sur mobile"];
  pts.forEach((p,i)=>s.addText("▸  "+p,{x:0.35,y:5.6+i*0.35,w:12.6,h:0.3,fontSize:10,color:C.text}));
  slideNum(s, 34);
}

// ── Slide 35 : Carte dynamique ───────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"La carte — Onglets dynamiques JavaScript"); slideNum(s,35);
  const m1 = img(path.join(SS,"desktop-menu-entrees.png"));
  const m2 = img(path.join(SS,"desktop-menu-plats.png"));
  if (m1) s.addImage({path:m1, x:0.35,y:1.2,w:5.8,h:3.7,sizing:{type:"contain",w:5.8,h:3.7}});
  if (m2) s.addImage({path:m2, x:6.6,y:1.2,w:5.8,h:3.7,sizing:{type:"contain",w:5.8,h:3.7}});
  s.addText("Onglet Entrées actif",{x:0.35,y:5.0,w:5.8,h:0.3,fontSize:10,italic:true,color:C.muted,align:"center"});
  s.addText("Onglet Plats actif",{x:6.6,y:5.0,w:5.8,h:0.3,fontSize:10,italic:true,color:C.muted,align:"center"});
  s.addText("Implémentation : fonction showMenuPanel() dans app.js",{x:0.35,y:5.35,w:12.6,h:0.35,fontSize:11,bold:true,color:C.brown});
  s.addText("classList.toggle('active') · classList.toggle('is-visible') · history.replaceState() · data-tab / data-panel",
    {x:0.35,y:5.75,w:12.6,h:0.3,fontSize:10,fontFace:"Courier New",color:C.text});
  slideNum(s, 35);
}

// ── Slide 36 : Formulaires ───────────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Formulaires — Login & Register"); slideNum(s,36);
  const lg = img(path.join(SS,"desktop-login.png"));
  const rg = img(path.join(SS,"desktop-register.png"));
  if (lg) s.addImage({path:lg, x:0.35,y:1.2,w:6.2,h:4.2,sizing:{type:"contain",w:6.2,h:4.2}});
  if (rg) s.addImage({path:rg, x:6.75,y:1.2,w:6.2,h:4.2,sizing:{type:"contain",w:6.2,h:4.2}});
  s.addText("login.html",{x:0.35,y:5.5,w:6.2,h:0.25,fontSize:9,italic:true,color:C.muted,align:"center"});
  s.addText("register.html",{x:6.75,y:5.5,w:6.2,h:0.25,fontSize:9,italic:true,color:C.muted,align:"center"});
  s.addText("Messages d'erreur affichés en rouge · Message de succès en vert · Redirection automatique vers reservation.html",
    {x:0.35,y:5.8,w:12.6,h:0.3,fontSize:10,color:C.text,align:"center"});
  slideNum(s, 36);
}

// ── Slide 37 : Session utilisateur ───────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Session utilisateur — localStorage & updateNav()"); slideNum(s,37);
  const nav = img(path.join(SS,"desktop-nav-connectee.png"));
  if (nav) s.addImage({path:nav, x:0.35,y:1.2,w:7.5,h:3.5,sizing:{type:"contain",w:7.5,h:3.5}});
  s.addText(`// app.js — updateNav()
function updateNav() {
  const user = JSON.parse(
    localStorage.getItem("qaUser") || "null");
  const navLink = document.querySelector(
    '.main-nav a[href="login.html"]');

  if (user) {
    navLink.textContent =
      \`\${user.firstName} — Déconnexion\`;
    navLink.href = "#";
    navLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("qaToken");
      localStorage.removeItem("qaUser");
      window.location.href = "index.html";
    });
  }
}`,
    {x:7.8,y:1.2,w:5.1,h:4.7,fontSize:9,fontFace:"Courier New",
     fill:{color:C.dark},color:"D4D4D4",insets:{left:0.15,right:0.15,top:0.1,bottom:0.1}});
  s.addText("Navigation affiche 'Prénom — Déconnexion' quand l'utilisateur est connecté",
    {x:0.35,y:5.0,w:7.1,h:0.35,fontSize:10,italic:true,color:C.muted});
  slideNum(s, 37);
}

// ── Slide 38 : Préremplissage réservation ─────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Préremplissage du formulaire de réservation"); slideNum(s,38);
  const sc = img(path.join(SS,"desktop-reservation-connectee.png"));
  if (sc) s.addImage({path:sc, x:0.35,y:1.2,w:6.8,h:4.8,sizing:{type:"contain",w:6.8,h:4.8}});
  s.addText("Fonctionnement",{x:7.4,y:1.2,w:5.5,h:0.4,fontSize:14,bold:true,color:C.brown});
  s.addText(
`// app.js — bloc reservationForm
const connectedUser = JSON.parse(
  localStorage.getItem("qaUser") || "null"
);

if (connectedUser) {
  const f  = document.getElementById("firstName");
  const l  = document.getElementById("lastName");
  const em = document.getElementById("email");

  if (f)  f.value  = connectedUser.firstName || "";
  if (l)  l.value  = connectedUser.lastName  || "";
  if (em) em.value = connectedUser.email     || "";
}`,
    {x:7.4,y:1.7,w:5.5,h:4.0,fontSize:10,fontFace:"Courier New",
     fill:{color:C.dark},color:"D4D4D4",insets:{left:0.15,right:0.15,top:0.1,bottom:0.1}});
  s.addText("Les champs prénom, nom, email sont préremplis automatiquement\ndès que l'utilisateur est connecté",
    {x:0.35,y:6.1,w:6.8,h:0.5,fontSize:10,italic:true,color:C.muted,align:"center"});
  slideNum(s, 38);
}

// ── Slide 39 : Dashboard admin ───────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Dashboard Administrateur — admin.html"); slideNum(s,39);
  const sc = img(path.join(SS,"desktop-admin-data.png"));
  if (sc) s.addImage({path:sc, x:0.35,y:1.2,w:12.6,h:5.0,sizing:{type:"contain",w:12.6,h:5.0}});
  s.addText("Tableau des réservations · Badges statuts colorés · Bouton Actualiser · fetch() GET /api/reservations",
    {x:0.35,y:6.35,w:12.6,h:0.3,fontSize:10,italic:true,color:C.muted,align:"center"});
  slideNum(s, 39);
}

// ── Slide 40 : Responsive mobile ─────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Responsive Design — Mobile 390×844"); slideNum(s,40);
  const pages = [
    [path.join(SS,"mobile-accueil.png"),"Accueil"],
    [path.join(SS,"mobile-menu-entrees.png"),"Carte"],
    [path.join(SS,"mobile-reservation.png"),"Réservation"],
    [path.join(SS,"mobile-login.png"),"Connexion"],
    [path.join(SS,"mobile-admin.png"),"Admin"],
  ];
  pages.forEach(([p,label],i)=>{
    const x=i*2.5+0.3; const sc=img(p);
    if(sc) s.addImage({path:sc, x, y:1.2, w:2.2, h:4.5, sizing:{type:"contain",w:2.2,h:4.5}});
    s.addText(label,{x, y:5.8, w:2.2, h:0.3, fontSize:10, italic:true, color:C.muted, align:"center"});
  });
  s.addText("Rendu à 390px de largeur (iPhone 14) · CSS Flexbox + Grid + media query",
    {x:0.35,y:6.3,w:12.6,h:0.3,fontSize:10,color:C.muted,align:"center"});
  slideNum(s, 40);
}

// ── Slide 41 : Flux utilisateur complet ──────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Parcours utilisateur complet"); slideNum(s,41);
  const authSvg = img(path.join(ASSETS,"auth-flow.svg"));
  if (authSvg) s.addImage({path:authSvg, x:0.35, y:1.2, w:12.6, h:5.9,
    sizing:{type:"contain",w:12.6,h:5.9}});
  slideNum(s, 41);
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 7 — DÉPLOIEMENT (slides 42–46)
// ════════════════════════════════════════════════════════════════════════════

// ── Slide 42 : Intercalaire ──────────────────────────────────────────════════
{
  const s = pptx.addSlide(); darkBg(s);
  s.addShape(pptx.ShapeType.rect,{x:0,y:3.2,w:"100%",h:1.1,fill:{color:C.primary}});
  s.addText("07",{x:0.4,y:0.5,w:2,h:2,fontSize:100,bold:true,color:C.brown});
  s.addText("Déploiement",{x:0.35,y:3.3,w:12.6,h:0.85,fontSize:34,bold:true,color:C.white,align:"center"});
  slideNum(s, 42);
}

// ── Slide 43 : Netlify ───────────────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Netlify — Déploiement Frontend"); slideNum(s,43);
  const sc = img(path.join(ROOT,"screens/netlify.png"));
  if (sc) s.addImage({path:sc, x:0.35,y:1.2,w:7.5,h:4.5,sizing:{type:"contain",w:7.5,h:4.5}});
  s.addText("Configuration",{x:8.1,y:1.2,w:4.8,h:0.4,fontSize:14,bold:true,color:C.brown});
  const pts=["Site : quai-antique-projet.netlify.app","Déclencheur : push sur branche main","Pas de build step (HTML statique)","Publish directory : racine du projet","HTTPS automatique (Let's Encrypt)","Déploiement en ~30 secondes","CDN mondial","Gratuit (plan Free)"];
  pts.forEach((p,i)=>s.addText("▸  "+p,{x:8.1,y:1.75+i*0.65,w:5.0,h:0.55,fontSize:11,color:C.text}));
  slideNum(s, 43);
}

// ── Slide 44 : Railway ───────────────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Railway — Déploiement Backend Node.js"); slideNum(s,44);
  s.addText("railway.json",{x:0.35,y:1.2,w:7.0,h:0.35,fontSize:12,bold:true,color:C.brown});
  s.addText(
`{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node src/server.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 3
  }
}`,
    {x:0.35,y:1.6,w:7.0,h:3.0,fontSize:11,fontFace:"Courier New",
     fill:{color:C.dark},color:"D4D4D4",insets:{left:0.2,right:0.2,top:0.15,bottom:0.15}});
  s.addText("Difficultés rencontrées au déploiement",{x:0.35,y:4.8,w:7.0,h:0.4,fontSize:12,bold:true,color:C.red});
  const issues=[["Problème PORT","process.env.PORT obligatoire"],["EXPOSE Docker","Ajout EXPOSE 3000 dans Dockerfile"],["Builder","Switch vers Nixpacks (plus stable)"]];
  issues.forEach(([p,s2],i)=>{
    s.addText(p,{x:0.35+i*2.35,y:5.25,w:2.2,h:0.4,fontSize:10,bold:true,color:C.red,fill:{color:"FFEBEE"},align:"center"});
    s.addText(s2,{x:0.35+i*2.35,y:5.7,w:2.2,h:0.5,fontSize:10,color:C.text,align:"center"});
  });
  s.addText("Points clés",{x:7.6,y:1.2,w:5.3,h:0.4,fontSize:14,bold:true,color:C.brown});
  const pts2=["API : quaiantiqueproject-production.up.railway.app","Builder : Nixpacks (détection auto Node.js)","Déploiement : push GitHub → rebuild auto","Restart on failure (x3)","Variables env : Railway dashboard","~2 minutes de build","Gratuit (plan Hobby)"];
  pts2.forEach((p,i)=>s.addText("▸  "+p,{x:7.6,y:1.75+i*0.65,w:5.3,h:0.55,fontSize:11,color:C.text}));
  slideNum(s, 44);
}

// ── Slide 45 : Supabase ──────────────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Supabase — Base de données PostgreSQL Cloud"); slideNum(s,45);
  s.addText("Pourquoi Supabase ?",{x:0.35,y:1.2,w:6.0,h:0.4,fontSize:14,bold:true,color:"3ECF8E"});
  const pts=["PostgreSQL managé (pas de serveur à gérer)","Plan gratuit généreux","Interface visuelle pour inspecter les données","URL de connexion standard PostgreSQL","SSL obligatoire (sécurité)","Backups automatiques","Compatible avec tout client pg (Node.js)"];
  pts.forEach((p,i)=>s.addText("▸  "+p,{x:0.35,y:1.75+i*0.62,w:6.0,h:0.55,fontSize:12,color:C.text}));
  s.addText("Connexion dans le code",{x:6.8,y:1.2,w:6.0,h:0.4,fontSize:14,bold:true,color:C.brown});
  s.addText(
`// backend/src/config/database.js
const { Pool } = require('pg');

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL
    })
  : null;

function query(text, params) {
  if (!pool)
    throw new Error('DATABASE_URL manquant');
  return pool.query(text, params);
}

module.exports = { query, pool };`,
    {x:6.8,y:1.7,w:6.0,h:4.0,fontSize:10,fontFace:"Courier New",
     fill:{color:C.dark},color:"D4D4D4",insets:{left:0.15,right:0.15,top:0.15,bottom:0.15}});
  slideNum(s, 45);
}

// ── Slide 46 : Docker ────────────────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Docker — Lancement local"); slideNum(s,46);
  s.addText("Dockerfile (frontend Nginx)",{x:0.35,y:1.2,w:6.0,h:0.35,fontSize:12,bold:true,color:C.brown});
  s.addText(
`FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`,
    {x:0.35,y:1.6,w:6.0,h:1.8,fontSize:11,fontFace:"Courier New",
     fill:{color:C.dark},color:"D4D4D4",insets:{left:0.2,right:0.2,top:0.15,bottom:0.15}});
  s.addText("docker-compose.yml",{x:0.35,y:3.55,w:6.0,h:0.35,fontSize:12,bold:true,color:C.brown});
  s.addText(
`services:
  frontend:
    build: .
    ports:
      - "8080:80"`,
    {x:0.35,y:3.95,w:6.0,h:1.5,fontSize:11,fontFace:"Courier New",
     fill:{color:C.dark},color:"D4D4D4",insets:{left:0.2,right:0.2,top:0.15,bottom:0.15}});
  s.addText("Commandes",{x:6.8,y:1.2,w:6.0,h:0.4,fontSize:14,bold:true,color:C.brown});
  const cmds=[["docker compose up --build","Lancement du frontend"],["http://localhost:8080","Accès dans le navigateur"],["docker compose down","Arrêt du conteneur"],["cd backend && npm run dev","Backend en développement"]];
  cmds.forEach(([cmd,desc],i)=>{
    s.addText(cmd,{x:6.8,y:1.7+i*1.2,w:6.0,h:0.5,fontSize:11,fontFace:"Courier New",
      fill:{color:C.dark},color:C.primary,insets:{left:0.15,right:0.15,top:0.05,bottom:0.05}});
    s.addText(desc,{x:6.8,y:2.25+i*1.2,w:6.0,h:0.4,fontSize:11,color:C.muted});
  });
  slideNum(s, 46);
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 8 — DÉMONSTRATION (slide 47)
// ════════════════════════════════════════════════════════════════════════════

// ── Slide 47 : Démonstration ─────────────────────────────────────────────────
{
  const s = pptx.addSlide(); darkBg(s);
  s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:"100%",h:1.25,fill:{color:C.primary}});
  s.addText("Démonstration du projet",{x:0.35,y:0.2,w:12.6,h:0.85,fontSize:28,bold:true,color:C.white,align:"center"});
  slideNum(s, 47);

  const blocks=[
    { title:"Site Netlify (Frontend)", url:"https://quai-antique-projet.netlify.app/",
      color:C.blue, desc:"Accueil · Galerie · Carte · Réservation\nLogin · Inscription · Admin" },
    { title:"API Railway (Backend)",   url:"https://quaiantiqueproject-production.up.railway.app/api/health",
      color:"7C3FE4", desc:"GET /api/health → { status: 'ok' }\nGET /api/reservations → liste réservations" },
    { title:"GitHub — Code source",    url:"github.com/catcodecat/Quai_Antique_Project",
      color:C.brown, desc:"20 commits · branche main\nHistorique complet du développement" },
    { title:"Compte de démonstration", url:"",
      color:C.green, desc:"Email  : demo@quaiantique.com\nMdp    : demo123\n(à créer avant la soutenance)" },
  ];
  blocks.forEach((b,i)=>{
    const col=i%2, row=Math.floor(i/2);
    const x=col*6.4+0.35, y=row*2.65+1.45;
    s.addShape(pptx.ShapeType.roundRect,{x,y,w:6.0,h:2.4,fill:{color:C.brown},line:{color:b.color,width:2.5},rectRadius:0.1});
    s.addShape(pptx.ShapeType.rect,{x,y,w:6.0,h:0.55,fill:{color:b.color},rectRadius:0.05});
    s.addText(b.title,{x:x+0.15,y:y+0.08,w:5.7,h:0.38,fontSize:13,bold:true,color:C.white});
    if(b.url) s.addText(b.url,{x:x+0.15,y:y+0.65,w:5.7,h:0.35,fontSize:10,fontFace:"Courier New",color:"90CAF9"});
    s.addText(b.desc,{x:x+0.15,y:y+1.1,w:5.7,h:1.15,fontSize:11,color:C.secondary,wrap:true});
  });

  s.addText("Parcours à démontrer : Accueil → Register → Login → Réservation préremplie → Admin",
    {x:0.35,y:6.9,w:12.6,h:0.35,fontSize:11,italic:true,color:C.secondary,align:"center"});
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 9 — BILAN & ÉVOLUTION (slides 48–53)
// ════════════════════════════════════════════════════════════════════════════

// ── Slide 48 : Intercalaire ──────────────────────────────────────────────────
{
  const s = pptx.addSlide(); darkBg(s);
  s.addShape(pptx.ShapeType.rect,{x:0,y:3.2,w:"100%",h:1.1,fill:{color:C.primary}});
  s.addText("09",{x:0.4,y:0.5,w:2,h:2,fontSize:100,bold:true,color:C.brown});
  s.addText("Bilan &\nÉvolution du projet",{x:0.35,y:3.3,w:12.6,h:0.85,fontSize:28,bold:true,color:C.white,align:"center"});
  slideNum(s, 48);
}

// ── Slide 49 : Chronologie ───────────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Chronologie — 20 commits · 9 jours"); slideNum(s,49);
  const sc = img(path.join(EVO,"chronologie.png"));
  if(sc) s.addImage({path:sc, x:0.35,y:1.2,w:12.6,h:5.9,sizing:{type:"contain",w:12.6,h:5.9}});
}

// ── Slide 50 : Comparatifs ───────────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Évolution AVANT → APRÈS — Formulaire de réservation"); slideNum(s,50);
  const sc = img(path.join(EVO,"comparatif-reservation.png"));
  if(sc) s.addImage({path:sc, x:0.35,y:1.2,w:12.6,h:5.5,sizing:{type:"contain",w:12.6,h:5.5}});
  s.addText("AVANT : 4 champs statiques · aucune API  |  APRÈS : 7 champs · fetch() · PostgreSQL",
    {x:0.35,y:6.85,w:12.6,h:0.3,fontSize:10,italic:true,color:C.muted,align:"center"});
}

// ── Slide 51 : Comparatif menu ───────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Évolution AVANT → APRÈS — Carte du restaurant"); slideNum(s,51);
  const sc = img(path.join(EVO,"comparatif-menu.png"));
  if(sc) s.addImage({path:sc, x:0.35,y:1.2,w:12.6,h:5.5,sizing:{type:"contain",w:12.6,h:5.5}});
  s.addText("AVANT : placeholders 'Entrée 1'  |  APRÈS : vrais plats gastronomiques avec prix réels",
    {x:0.35,y:6.85,w:12.6,h:0.3,fontSize:10,italic:true,color:C.muted,align:"center"});
}

// ── Slide 52 : Fonctionnalités livrées ───────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Fonctionnalités livrées vs prévues"); slideNum(s,52);
  const rows=[
    [{text:"Fonctionnalité",options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"État",options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Fonctionnalité",options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"État",options:{bold:true,fill:{color:C.brown},color:C.white}}],
    ["Vitrine (accueil, galerie, footer)","✅","JWT côté frontend (localStorage)","✅"],
    ["Carte avec onglets dynamiques","✅","Préremplissage formulaire","✅"],
    ["Formulaire réservation → BDD","✅","Dashboard admin (lecture)","✅"],
    ["Inscription + hash bcrypt","✅","Responsive mobile","✅"],
    ["Connexion + JWT","✅","CORS multi-origine","✅"],
    ["CI/CD automatique","✅","Docker (Nginx local)","✅"],
    ["Middleware JWT (admin protégé)","⚠ Prévu","Tests automatisés","❌ Absent"],
    ["Numéro de téléphone","❌ Absent","PATCH statut réservation","❌ Absent"],
  ];
  s.addTable(rows,{x:0.35,y:1.2,w:12.6,colW:[4.6,0.9,4.6,0.9],
    border:{color:C.secondary},fontSize:11,fontFace:"Arial",fill:{color:C.white},color:C.text,rowH:0.48});
  slideNum(s, 52);
}

// ── Slide 53 : Difficultés & Solutions ───────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Difficultés rencontrées & Solutions"); slideNum(s,53);
  const cases=[
    { prob:"Railway ne démarrait pas", sol:"PORT = process.env.PORT || 3000 + EXPOSE 3000 + switch vers Nixpacks (4 commits successifs)", c:C.red },
    { prob:"URL localhost en production", sol:"Création de config.js avec la vraie URL Railway · API_BASE_URL utilisée dans tout app.js", c:"E65100" },
    { prob:"Pas de retour visuel après login", sol:"Redirection vers reservation.html · message de succès · setTimeout 1200ms", c:C.blue },
    { prob:"Formulaire réservation vide", sol:"Lecture localStorage au chargement de la page · préremplissage automatique des champs", c:C.green },
    { prob:"Fichiers PDF dans les commits", sol:"git reset HEAD sur les fichiers de présentation · .gitignore renforcé", c:C.purple },
  ];
  cases.forEach((c,i)=>{
    const y=1.25+i*1.15;
    s.addShape(pptx.ShapeType.roundRect,{x:0.35,y,w:5.8,h:0.9,fill:{color:C.white},line:{color:c.c,width:2},rectRadius:0.08});
    s.addText("Problème : "+c.prob,{x:0.5,y:y+0.1,w:5.5,h:0.7,fontSize:11,color:C.text,wrap:true});
    s.addShape(pptx.ShapeType.roundRect,{x:6.6,y,w:6.4,h:0.9,fill:{color:C.white},line:{color:C.green,width:2},rectRadius:0.08});
    s.addText("✅ "+c.sol,{x:6.75,y:y+0.1,w:6.1,h:0.7,fontSize:10,color:C.text,wrap:true});
  });
  slideNum(s, 53);
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 10 — COMPÉTENCES DNC (slides 54–57)
// ════════════════════════════════════════════════════════════════════════════

// ── Slide 54 : Intercalaire ──────────────────────────────────────────────────
{
  const s = pptx.addSlide(); darkBg(s);
  s.addShape(pptx.ShapeType.rect,{x:0,y:3.2,w:"100%",h:1.1,fill:{color:C.primary}});
  s.addText("10",{x:0.4,y:0.5,w:2,h:2,fontSize:100,bold:true,color:C.brown});
  s.addText("Compétences DNC\nvalidées par le projet",{x:0.35,y:3.3,w:12.6,h:0.85,fontSize:26,bold:true,color:C.white,align:"center"});
  slideNum(s, 54);
}

// ── Slide 55 : Compétences DNC — Tableau ─────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Compétences DNC — Correspondance référentiel"); slideNum(s,55);
  const rows=[
    [{text:"Compétence DNC",options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Preuve dans le projet",options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Fichier(s)",options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"État",options:{bold:true,fill:{color:C.brown},color:C.white}}],
    ["Concevoir des maquettes et interfaces","7 pages HTML responsives · charte graphique CSS","styles.css · HTML","✅"],
    ["Développer des interfaces statiques","Pages accueil, galerie, menu, footer complet","index.html · gallery.html · menu.html","✅"],
    ["Développer des interfaces dynamiques","Onglets menu JS · préremplissage · updateNav()","app.js","✅"],
    ["Intégrer des formulaires","3 formulaires : réservation, login, register","reservation.html · login.html · register.html","✅"],
    ["Connecter une interface à une API","fetch() vers Railway API (POST/GET)","app.js · config.js","✅"],
    ["Mettre en place une base de données","PostgreSQL Supabase · 2 tables · SQL préparé","repositories/ · initDatabase.js","✅"],
    ["Gérer l'authentification","bcrypt (hash) + JWT (token) + localStorage","auth.controller.js · app.js","✅"],
    ["Déployer une application web","Netlify + Railway + CI/CD GitHub","railway.json · Dockerfile","✅"],
    ["Documenter le projet","README · docs/ · diagrammes · comments","docs/ · README.md","✅"],
    ["Respecter les bonnes pratiques",".gitignore · .env · CORS · requêtes préparées","Tous les fichiers backend","✅"],
  ];
  s.addTable(rows,{x:0.35,y:1.2,w:12.6,colW:[3.5,4.5,3.0,0.8],
    border:{color:C.secondary},fontSize:10,fontFace:"Arial",fill:{color:C.white},color:C.text,rowH:0.44});
  slideNum(s, 55);
}

// ── Slide 56 : Conclusion ────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:"100%",h:"100%",fill:{color:C.dark}});
  s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:"100%",h:1.25,fill:{color:C.primary}});
  s.addText("Conclusion",{x:0.35,y:0.2,w:12.6,h:0.85,fontSize:28,bold:true,color:C.white,align:"center"});
  const sc = img(path.join(ROOT,"assets/images/chef-quality.jpg"));
  if(sc) s.addImage({path:sc,x:8.8,y:1.3,w:4.1,h:5.7,sizing:{type:"cover",w:4.1,h:5.7},transparency:40});
  const pts=[
    "J'ai créé un site web complet de A à Z : conception, développement, déploiement",
    "J'ai appris à structurer un projet selon le pattern MVC",
    "J'ai implémenté une vraie authentification (bcrypt + JWT) pour la première fois",
    "J'ai résolu des problèmes concrets de déploiement (Railway, CORS, PORT)",
    "J'ai utilisé Git comme outil de travail quotidien (20 commits documentés)",
    "Si je refaisais ce projet : tests automatisés dès le début, protection admin dès la v1",
  ];
  pts.forEach((p,i)=>{
    s.addShape(pptx.ShapeType.rect,{x:0.35,y:1.45+i*0.88,w:0.4,h:0.42,fill:{color:C.primary}});
    s.addText(String(i+1),{x:0.35,y:1.48+i*0.88,w:0.4,h:0.36,fontSize:13,bold:true,color:C.white,align:"center"});
    s.addText(p,{x:0.9,y:1.48+i*0.88,w:7.7,h:0.7,fontSize:12,color:C.secondary,wrap:true});
  });
  slideNum(s, 56);
}

// ── Slide 57 : Liens & Remerciements ─────────────────────────────────────────
{
  const s = pptx.addSlide(); darkBg(s);
  s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:"100%",h:1.1,fill:{color:C.primary}});
  s.addText("Liens & Ressources",{x:0.35,y:0.15,w:12.6,h:0.8,fontSize:24,bold:true,color:C.white,align:"center"});
  const links=[
    ["Site Netlify","https://quai-antique-projet.netlify.app/",C.blue],
    ["API Railway","https://quaiantiqueproject-production.up.railway.app",C.purple],
    ["GitHub","github.com/catcodecat/Quai_Antique_Project",C.brown],
    ["Compte démo","demo@quaiantique.com · mdp: demo123",C.green],
  ];
  links.forEach((l,i)=>{
    s.addShape(pptx.ShapeType.roundRect,{x:0.35,y:1.35+i*1.35,w:12.6,h:1.1,fill:{color:C.brown},line:{color:l[2],width:2.5},rectRadius:0.1});
    s.addText(l[0],{x:0.6,y:1.5+i*1.35,w:2.5,h:0.5,fontSize:13,bold:true,color:C.secondary});
    s.addText(l[1],{x:3.3,y:1.5+i*1.35,w:9.4,h:0.5,fontSize:12,fontFace:"Courier New",color:"90CAF9"});
  });
  s.addText("Larisa Faessel · Dossier Projet DNC · Studi · Cohorte Sept–Oct 2026",
    {x:0.35,y:6.9,w:12.6,h:0.35,fontSize:11,italic:true,color:C.muted,align:"center"});
  slideNum(s, 57);
}

// ════════════════════════════════════════════════════════════════════════════
// EXPORT
// ════════════════════════════════════════════════════════════════════════════
const outPath = path.join(__dirname, "Quai_Antique_Dossier_Projet_DNC.pptx");
pptx.writeFile({ fileName: outPath })
  .then(() => console.log(`\n✅ PowerPoint généré :\n   ${outPath}\n   57 diapositives\n`))
  .catch(err => { console.error("Erreur génération PPTX:", err.message); process.exit(1); });
