/**
 * Générateur PowerPoint FINAL — Dossier Projet Quai Antique
 * Larisa Faessel · Développeur No Code (DNC) · Studi · Sept–Oct 2026
 * 60 diapositives — Version soutenance jury
 *
 * Modifications v2 :
 *  - Suppression slide "Qui suis-je ?"
 *  - Ajout section Maquettage (3 slides)
 *  - Suppression de tout contenu négatif
 *  - Ajout slide Validation fonctionnelle
 *  - Ajout slide Tests réalisés
 *  - Ajout slide Compétences développées
 *  - Simplification slides techniques (-30%)
 *  - Numérotation et sommaire recalculés
 */
const pptxgen = require("pptxgenjs");
const path    = require("path");
const fs      = require("fs");

const ROOT   = path.resolve(__dirname, "..");
const SS     = path.join(__dirname, "screenshots");
const EVO    = path.join(__dirname, "evolution");
const ASSETS = path.join(__dirname, "assets");

function img(p) {
  if (!fs.existsSync(p)) { console.warn(`⚠ manquant: ${path.basename(p)}`); return null; }
  return p;
}

const C = {
  dark:    "211817", brown:  "3C2E24", primary: "9B6A22",
  secondary:"C5BAA4",bg:    "F7F7F7", white:   "FFFFFF",
  text:    "222222", muted: "5F5A54", green:   "2E7D32",
  blue:    "1565C0", purple:"7C3FE4", teal:    "3ECF8E",
};
const TOTAL = 60;

const pptx = new pptxgen();
pptx.defineLayout({ name:"WIDE", width:13.333, height:7.5 });
pptx.layout  = "WIDE";
pptx.author  = "Larisa Faessel";
pptx.subject = "Dossier Projet — Quai Antique";
pptx.title   = "Quai Antique · Dossier Projet DNC · Larisa Faessel";

// ── Helpers ──────────────────────────────────────────────────────────────────
const darkBg  = s => s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:"100%",h:"100%",fill:{color:C.dark}});
const lightBg = s => s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:"100%",h:"100%",fill:{color:C.bg}});
const titleBar= (s,t,bg=C.brown) => {
  s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:"100%",h:1.1,fill:{color:bg}});
  s.addText(t,{x:0.35,y:0.15,w:12.6,h:0.8,fontSize:21,bold:true,color:C.white,fontFace:"Arial"});
};
const sNum    = (s,n) => s.addText(`${n} / ${TOTAL}`,{x:12.0,y:7.15,w:1.2,h:0.25,fontSize:8,color:C.secondary,align:"right"});
const hline   = (s,y,c=C.secondary) => s.addShape(pptx.ShapeType.line,{x:0.35,y,w:12.65,h:0,line:{color:c,width:0.8}});
const fn      = (s,t) => s.addText(t,{x:0.35,y:7.1,w:11.5,h:0.3,fontSize:9,color:C.muted,italic:true});
const tick    = "✓";
const check   = "✅";

function intercalaire(num, line1, line2="") {
  const s = pptx.addSlide(); darkBg(s);
  s.addShape(pptx.ShapeType.rect,{x:0,y:3.1,w:"100%",h:1.1,fill:{color:C.primary}});
  s.addText(num,{x:0.4,y:0.5,w:2,h:2,fontSize:100,bold:true,color:C.brown,fontFace:"Arial"});
  s.addText(line1+(line2?"\n"+line2:""),{x:0.35,y:3.2,w:12.6,h:0.85,fontSize:28,bold:true,color:C.white,align:"center"});
  return s;
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 1 — OUVERTURE (slides 1–4)
// ════════════════════════════════════════════════════════════════════════════

// ── 1. Page de garde ─────────────────────────────────────────────────────────
{
  const s = pptx.addSlide(); darkBg(s);
  s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:0.18,h:"100%",fill:{color:C.primary}});
  const hero = img(path.join(ROOT,"assets/images/restaurant-room.jpg"));
  if (hero) s.addImage({path:hero,x:6.5,y:0,w:6.83,h:7.5,transparency:48});
  s.addText("Quai Antique",{x:0.5,y:1.4,w:6.0,h:1.1,fontSize:46,bold:true,color:C.primary,fontFace:"Arial"});
  s.addText("Site web du restaurant gastronomique",{x:0.5,y:2.65,w:6.0,h:0.45,fontSize:15,color:C.secondary,italic:true});
  s.addShape(pptx.ShapeType.line,{x:0.5,y:3.3,w:5.5,h:0,line:{color:C.primary,width:1.5}});
  s.addText("Larisa Faessel",{x:0.5,y:3.5,w:5.5,h:0.55,fontSize:20,bold:true,color:C.white});
  s.addText("Développeur No Code (DNC)",{x:0.5,y:4.1,w:5.8,h:0.4,fontSize:13,color:C.secondary});
  s.addText("Studi · Cohorte Septembre – Octobre 2026",{x:0.5,y:4.55,w:5.8,h:0.35,fontSize:12,color:C.muted});
  s.addText("Dossier Projet · Juin 2026",{x:0.5,y:5.0,w:5.0,h:0.35,fontSize:12,color:C.muted});
}

// ── 2. Sommaire ───────────────────────────────────────────────────────────────
{
  const s = pptx.addSlide(); darkBg(s);
  s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:"100%",h:1.1,fill:{color:C.brown}});
  s.addText("Sommaire",{x:0.35,y:0.15,w:12.6,h:0.8,fontSize:24,bold:true,color:C.white});
  sNum(s,2);
  const parts=[
    ["01","Contexte & objectifs",      "Slides 3–4"],
    ["02","Cahier des charges",         "Slides 5–10"],
    ["03","Maquettage & Conception",    "Slides 11–13"],
    ["04","Environnement & Architecture","Slides 14–20"],
    ["05","Base de données",            "Slides 21–25"],
    ["06","Backend — API & Auth",       "Slides 26–32"],
    ["07","Frontend — Interface",       "Slides 33–42"],
    ["08","Déploiement",                "Slides 43–46"],
    ["09","Démonstration",              "Slide 47"],
    ["10","Validation & Tests",         "Slides 48–49"],
    ["11","Bilan & Évolution",          "Slides 50–56"],
    ["12","Compétences DNC",            "Slides 57–60"],
  ];
  parts.forEach(([num,title,ref],i) => {
    const col=Math.floor(i/6); const row=i%6;
    const x=col*6.4+0.45; const y=row*1.04+1.3;
    s.addShape(pptx.ShapeType.roundRect,{x,y,w:0.52,h:0.52,fill:{color:C.primary},rectRadius:0.05});
    s.addText(num,{x,y:y+0.08,w:0.52,h:0.34,fontSize:11,bold:true,color:C.white,align:"center"});
    s.addText(title,{x:x+0.66,y:y+0.06,w:5.5,h:0.28,fontSize:12,color:C.white,bold:true});
    s.addText(ref,  {x:x+0.66,y:y+0.34,w:5.5,h:0.2, fontSize:9, color:C.secondary});
  });
}

// ── 3. Le restaurant ──────────────────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Le restaurant Quai Antique"); sNum(s,3);
  const sc = img(path.join(SS,"desktop-accueil.png"));
  if (sc) s.addImage({path:sc,x:6.8,y:1.2,w:6.15,h:3.9,sizing:{type:"contain",w:6.15,h:3.9}});
  s.addText("Contexte du projet",{x:0.35,y:1.25,w:6.0,h:0.4,fontSize:14,bold:true,color:C.brown});
  const pts=["Restaurant gastronomique fictif situé à Chambéry","Chef : Arnaud Michant","Cuisine de saison, produits locaux et frais","Service midi et soir, du mardi au dimanche","Absence de présence numérique moderne","Besoin : permettre aux clients de réserver en ligne"];
  pts.forEach((p,i)=>s.addText("▸  "+p,{x:0.35,y:1.75+i*0.77,w:6.1,h:0.65,fontSize:12,color:C.text}));
  hline(s,6.05);
  s.addText("Projet réalisé dans le cadre du Dossier Projet DNC · Studi · 2026",{x:0.35,y:6.15,w:12.6,h:0.35,fontSize:10,italic:true,color:C.muted});
}

// ── 4. Objectifs ──────────────────────────────────────────────────────────────
{
  const s = pptx.addSlide(); lightBg(s); titleBar(s,"Objectifs du projet"); sNum(s,4);
  const objs=[
    {num:"01",title:"Vitrine en ligne",     desc:"Présenter le restaurant, la galerie photo et la carte gastronomique complète",color:C.brown},
    {num:"02",title:"Réservation en ligne", desc:"Formulaire connecté à une API REST et une base de données réelle",color:C.primary},
    {num:"03",title:"Espace utilisateur",   desc:"Inscription, connexion sécurisée, préremplissage automatique du formulaire",color:C.purple},
    {num:"04",title:"Espace administrateur",desc:"Dashboard de consultation des réservations avec indicateurs de statut",color:C.blue},
  ];
  objs.forEach((o,i)=>{
    const x=(i%2)*6.45+0.35; const y=Math.floor(i/2)*2.85+1.3;
    s.addShape(pptx.ShapeType.roundRect,{x,y,w:6.05,h:2.6,fill:{color:C.white},line:{color:o.color,width:2},rectRadius:0.1});
    s.addShape(pptx.ShapeType.rect,{x,y,w:6.05,h:0.55,fill:{color:o.color},rectRadius:0.05});
    s.addText(o.num,{x:x+0.15,y:y+0.09,w:0.6,h:0.36,fontSize:14,bold:true,color:C.white});
    s.addText(o.title,{x:x+0.8,y:y+0.09,w:4.9,h:0.36,fontSize:13,bold:true,color:C.white});
    s.addText(o.desc,{x:x+0.2,y:y+0.75,w:5.65,h:1.6,fontSize:12,color:C.text,wrap:true,valign:"top"});
  });
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 2 — CAHIER DES CHARGES (slides 5–10)
// ════════════════════════════════════════════════════════════════════════════
{ const s=intercalaire("02","Cahier des charges"); sNum(s,5); }

// ── 6. Besoins visiteur ───────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Besoins fonctionnels — Visiteur"); sNum(s,6);
  const rows=[
    [{text:"Fonctionnalité",options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Description",  options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:tick,           options:{bold:true,fill:{color:C.brown},color:C.white}}],
    ["Accueil restaurant","Présentation du chef, des valeurs, image hero",tick],
    ["Galerie photos","6 images du restaurant et des plats",tick],
    ["Carte du restaurant","Entrées, plats, desserts avec prix et descriptions",tick],
    ["Navigation par onglets","Passage entre catégories sans rechargement de page",tick],
    ["Formulaire de réservation","Envoi date, heure, convives, allergies",tick],
    ["Horaires & contact","Footer visible sur toutes les pages",tick],
    ["Responsive mobile","Adaptation complète de 390px à 1280px",tick],
  ];
  s.addTable(rows,{x:0.35,y:1.2,w:12.6,colW:[3.2,8.2,1.2],border:{color:C.secondary},
    fontSize:12,fontFace:"Arial",fill:{color:C.white},color:C.text,rowH:0.52});
}

// ── 7. Besoins utilisateur connecté ──────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Besoins fonctionnels — Utilisateur connecté"); sNum(s,7);
  const sc=img(path.join(SS,"desktop-reservation-connectee.png"));
  if(sc) s.addImage({path:sc,x:6.8,y:1.2,w:6.15,h:4.3,sizing:{type:"contain",w:6.15,h:4.3}});
  const rows=[
    [{text:"Fonctionnalité",options:{bold:true,fill:{color:C.primary},color:C.white}},
     {text:tick,           options:{bold:true,fill:{color:C.primary},color:C.white}}],
    ["S'inscrire (prénom, nom, email, mot de passe)",tick],
    ["Se connecter avec ses identifiants",tick],
    ["Formulaire de réservation prérempli automatiquement",tick],
    ["Navigation affiche le prénom de l'utilisateur",tick],
    ["Se déconnecter en un clic",tick],
    ["Redirection vers la réservation après connexion",tick],
  ];
  s.addTable(rows,{x:0.35,y:1.2,w:6.1,colW:[5.3,0.8],border:{color:C.secondary},
    fontSize:12,fontFace:"Arial",fill:{color:C.white},color:C.text,rowH:0.6});
  s.addText("Formulaire prérempli automatiquement après connexion",{x:6.8,y:5.6,w:6.15,h:0.3,fontSize:9,italic:true,color:C.muted,align:"center"});
}

// ── 8. Besoins admin ─────────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Besoins fonctionnels — Administrateur"); sNum(s,8);
  const sc=img(path.join(SS,"desktop-admin-data.png"));
  if(sc) s.addImage({path:sc,x:0.35,y:1.3,w:7.2,h:4.6,sizing:{type:"contain",w:7.2,h:4.6}});
  s.addText("Dashboard Administrateur",{x:7.8,y:1.4,w:5.1,h:0.45,fontSize:16,bold:true,color:C.brown});
  const pts=["Consultation de toutes les réservations","Tri automatique par date (plus récente en premier)","Indicateurs de statut colorés (En attente / Confirmée / Annulée)","Colonnes : nom, email, date, heure, convives, allergies","Bouton Actualiser pour rechargement en temps réel","Accès via la page /admin.html"];
  pts.forEach((p,i)=>s.addText("▸  "+p,{x:7.7,y:2.0+i*0.72,w:5.2,h:0.6,fontSize:11,color:C.text}));
  s.addShape(pptx.ShapeType.roundRect,{x:7.7,y:6.15,w:5.2,h:0.5,fill:{color:"E8F5E9"},line:{color:C.green,width:1.5},rectRadius:0.08});
  s.addText(tick+"  Consultation centralisée des réservations opérationnelle",{x:7.8,y:6.18,w:5.0,h:0.44,fontSize:11,bold:true,color:C.green});
}

// ── 9. Besoins non fonctionnels ───────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Besoins non fonctionnels"); sNum(s,9);
  const rows=[
    [{text:"Critère",   options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Exigence",  options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Solution",  options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:tick,        options:{bold:true,fill:{color:C.brown},color:C.white}}],
    ["Responsive","Mobile 390px + Desktop 1280px","CSS Flexbox / Grid + media query",tick],
    ["Sécurité","Hashage irréversible des mots de passe","bcrypt 10 rounds",tick],
    ["Authentification","Sessions sécurisées et stateless","JWT · 7 jours",tick],
    ["Protection données","Variables secrètes hors code source","dotenv · .gitignore",tick],
    ["CORS","API accessible uniquement par le frontend","Variable d'environnement CORS_ORIGIN",tick],
    ["Disponibilité","Site accessible 24h/24, 7j/7","Netlify CDN + Railway",tick],
    ["Versioning","Historique et traçabilité du code","Git + GitHub · 20 commits",tick],
    ["Déploiement automatique","Mise en ligne à chaque modification","GitHub → Netlify / Railway",tick],
  ];
  s.addTable(rows,{x:0.35,y:1.2,w:12.6,colW:[2.4,3.3,4.5,1.1],border:{color:C.secondary},
    fontSize:11,fontFace:"Arial",fill:{color:C.white},color:C.text,rowH:0.47});
}

// ── 10. Mapping ───────────────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Mapping besoins → implémentation"); sNum(s,10);
  const rows=[
    [{text:"Besoin client",     options:{bold:true,fill:{color:C.primary},color:C.white}},
     {text:"Implémentation",   options:{bold:true,fill:{color:C.primary},color:C.white}},
     {text:"Fichier(s)",       options:{bold:true,fill:{color:C.primary},color:C.white}},
     {text:tick,               options:{bold:true,fill:{color:C.primary},color:C.white}}],
    ["Présenter le restaurant","Pages HTML statiques + CSS","index.html · styles.css",tick],
    ["Afficher la carte","Onglets dynamiques JavaScript","menu.html · app.js",tick],
    ["Réserver une table","Formulaire → API → PostgreSQL","reservation.html · controller",tick],
    ["Créer un compte","Inscription avec sécurisation bcrypt","auth.controller · user.repo",tick],
    ["Se connecter","Authentification JWT","auth.controller · app.js",tick],
    ["Formulaire prérempli","Lecture localStorage → champs formulaire","app.js",tick],
    ["Gérer les réservations","Dashboard admin avec indicateurs","admin.html",tick],
    ["Site sur mobile","Design responsive CSS","styles.css",tick],
    ["Mise en ligne","CI/CD automatique GitHub","Netlify + Railway",tick],
  ];
  s.addTable(rows,{x:0.35,y:1.2,w:12.6,colW:[3.0,3.8,4.0,0.9],border:{color:C.secondary},
    fontSize:11,fontFace:"Arial",fill:{color:C.white},color:C.text,rowH:0.49});
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 3 — MAQUETTAGE & CONCEPTION (slides 11–13)
// ════════════════════════════════════════════════════════════════════════════
{ const s=intercalaire("03","Maquettage","& Conception"); sNum(s,11); }

// ── 12. Wireframes ────────────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Wireframes — Page d'accueil & Formulaire de réservation"); sNum(s,12);

  // ── Wireframe gauche : Accueil ──
  s.addText("Accueil",{x:0.35,y:1.15,w:5.9,h:0.3,fontSize:11,bold:true,color:C.primary,align:"center"});
  const LX=0.35, LW=5.9;
  // Header
  s.addShape(pptx.ShapeType.rect,{x:LX,y:1.5,w:LW,h:0.4,fill:{color:C.brown}});
  s.addText("LOGO                                Navigation",{x:LX+0.1,y:1.52,w:LW-0.2,h:0.36,fontSize:8,color:C.white});
  // Hero
  s.addShape(pptx.ShapeType.rect,{x:LX,y:1.95,w:LW,h:1.1,fill:{color:C.secondary},line:{color:C.muted,width:0.5}});
  s.addText("[ Image Hero — Titre restaurant — Bouton Réserver ]",{x:LX+0.1,y:2.1,w:LW-0.2,h:0.7,fontSize:8,color:C.brown,align:"center",valign:"middle"});
  // Sections
  const secs=[["Bienvenue — Texte + Image","3.1"],["Produits frais — Image + Texte","4.0"],["Réservation en ligne — Bouton","4.9"]];
  secs.forEach(([t,y2])=>{
    s.addShape(pptx.ShapeType.rect,{x:LX,y:parseFloat(y2),w:LW,h:0.75,fill:{color:C.white},line:{color:C.secondary,width:0.5}});
    s.addText(t,{x:LX+0.1,y:parseFloat(y2)+0.15,w:LW-0.2,h:0.45,fontSize:8,color:C.muted,align:"center"});
  });
  // Footer
  s.addShape(pptx.ShapeType.rect,{x:LX,y:5.75,w:LW,h:0.5,fill:{color:C.brown}});
  s.addText("Horaires · Adresse · Contact",{x:LX+0.1,y:5.78,w:LW-0.2,h:0.44,fontSize:7,color:C.secondary,align:"center"});

  // ── Wireframe droite : Réservation ──
  const RX=6.75, RW=6.2;
  s.addText("Réservation",{x:RX,y:1.15,w:RW,h:0.3,fontSize:11,bold:true,color:C.primary,align:"center"});
  s.addShape(pptx.ShapeType.rect,{x:RX,y:1.5,w:RW,h:0.4,fill:{color:C.brown}});
  s.addText("LOGO                                Navigation",{x:RX+0.1,y:1.52,w:RW-0.2,h:0.36,fontSize:8,color:C.white});
  s.addShape(pptx.ShapeType.rect,{x:RX,y:1.95,w:RW,h:0.5,fill:{color:C.secondary}});
  s.addText("Réserver votre repas",{x:RX+0.1,y:2.0,w:RW-0.2,h:0.4,fontSize:9,bold:true,color:C.brown,align:"center"});
  const fields=[["Prénom","2.55"],["Nom","3.1"],["Email","3.65"],["Date · Heure","4.2"],["Nombre de personnes","4.75"],["Allergies (optionnel)","5.3"]];
  fields.forEach(([label,y2])=>{
    s.addShape(pptx.ShapeType.rect,{x:RX+0.2,y:parseFloat(y2),w:RW-0.4,h:0.42,fill:{color:C.white},line:{color:C.secondary,width:0.5}});
    s.addText(label,{x:RX+0.3,y:parseFloat(y2)+0.1,w:RW-0.6,h:0.22,fontSize:8,color:C.muted});
  });
  s.addShape(pptx.ShapeType.roundRect,{x:RX+1.5,y:5.8,w:3.2,h:0.45,fill:{color:C.primary},rectRadius:0.05});
  s.addText("Réserver",{x:RX+1.5,y:5.82,w:3.2,h:0.41,fontSize:10,bold:true,color:C.white,align:"center"});

  fn(s,"Wireframes de conception — réalisés avant le développement");
}

// ── 13. Parcours utilisateur ──────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Parcours utilisateur — Conception"); sNum(s,13);
  s.addText("Parcours réservation (utilisateur non connecté)",{x:0.35,y:1.2,w:8,h:0.35,fontSize:13,bold:true,color:C.brown});

  // Flux haut
  const steps1=[["Accueil",C.brown],["La carte",C.brown],["Réservation",C.primary],["Confirmation",C.green]];
  steps1.forEach(([label,col],i)=>{
    const x=i*3.0+0.5;
    s.addShape(pptx.ShapeType.roundRect,{x,y:1.65,w:2.5,h:0.7,fill:{color:col},rectRadius:0.08});
    s.addText(label,{x,y:1.68,w:2.5,h:0.64,fontSize:12,bold:true,color:C.white,align:"center",valign:"middle"});
    if(i<3){
      s.addShape(pptx.ShapeType.line,{x:x+2.5,y:2.0,w:0.5,h:0,line:{color:C.primary,width:2}});
      s.addShape(pptx.ShapeType.line,{x:x+2.9,y:1.88,w:0,h:0.24,line:{color:C.primary,width:2}});
    }
  });

  s.addText("Parcours réservation (utilisateur connecté)",{x:0.35,y:2.7,w:8,h:0.35,fontSize:13,bold:true,color:C.brown});
  const steps2=[["Connexion",C.blue],["Réservation\npréremplie",C.primary],["Envoi API",C.teal],["Confirmation",C.green]];
  steps2.forEach(([label,col],i)=>{
    const x=i*3.0+0.5;
    s.addShape(pptx.ShapeType.roundRect,{x,y:3.15,w:2.5,h:0.8,fill:{color:col},rectRadius:0.08});
    s.addText(label,{x,y:3.18,w:2.5,h:0.74,fontSize:12,bold:true,color:C.white,align:"center",valign:"middle"});
    if(i<3){
      s.addShape(pptx.ShapeType.line,{x:x+2.5,y:3.55,w:0.5,h:0,line:{color:C.primary,width:2}});
      s.addShape(pptx.ShapeType.line,{x:x+2.9,y:3.43,w:0,h:0.24,line:{color:C.primary,width:2}});
    }
  });

  s.addText("Parcours administrateur",{x:0.35,y:4.3,w:8,h:0.35,fontSize:13,bold:true,color:C.brown});
  const steps3=[["Accès /admin",C.brown],["Chargement API",C.primary],["Tableau\nréservations",C.teal],["Consultation",C.green]];
  steps3.forEach(([label,col],i)=>{
    const x=i*3.0+0.5;
    s.addShape(pptx.ShapeType.roundRect,{x,y:4.7,w:2.5,h:0.8,fill:{color:col},rectRadius:0.08});
    s.addText(label,{x,y:4.73,w:2.5,h:0.74,fontSize:12,bold:true,color:C.white,align:"center",valign:"middle"});
    if(i<3){
      s.addShape(pptx.ShapeType.line,{x:x+2.5,y:5.1,w:0.5,h:0,line:{color:C.primary,width:2}});
      s.addShape(pptx.ShapeType.line,{x:x+2.9,y:4.98,w:0,h:0.24,line:{color:C.primary,width:2}});
    }
  });

  // Légende
  const lgnd=[["Étape frontend",C.brown],["Action utilisateur",C.primary],["Traitement API/BDD",C.teal],["Résultat",C.green]];
  lgnd.forEach(([l,c],i)=>{
    s.addShape(pptx.ShapeType.rect,{x:0.35+i*3.0,y:6.15,w:0.3,h:0.3,fill:{color:c}});
    s.addText(l,{x:0.75+i*3.0,y:6.15,w:2.1,h:0.3,fontSize:10,color:C.text});
  });
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 4 — ENVIRONNEMENT & ARCHITECTURE (slides 14–20)
// ════════════════════════════════════════════════════════════════════════════
{ const s=intercalaire("04","Environnement","& Architecture"); sNum(s,14); }

// ── 15. Environnement de travail ──────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Environnement de travail"); sNum(s,15);
  const tools=[
    {name:"VS Code",  role:"Éditeur de code",              color:C.blue},
    {name:"Git",      role:"Versioning local",              color:C.brown},
    {name:"GitHub",   role:"Dépôt distant & CI/CD",         color:C.dark},
    {name:"Node.js",  role:"Runtime JavaScript backend",    color:C.green},
    {name:"npm",      role:"Gestionnaire de dépendances",   color:C.brown},
    {name:"Postman",  role:"Test des routes API",           color:C.primary},
    {name:"Chrome",   role:"Navigateur & DevTools",         color:C.blue},
    {name:"Supabase", role:"Base de données PostgreSQL",    color:C.teal},
  ];
  tools.forEach((t,i)=>{
    const col=i%4; const row=Math.floor(i/4);
    const x=col*3.15+0.35; const y=row*2.55+1.3;
    s.addShape(pptx.ShapeType.roundRect,{x,y,w:2.9,h:2.2,fill:{color:C.white},line:{color:t.color,width:2},rectRadius:0.1});
    s.addShape(pptx.ShapeType.rect,{x,y,w:2.9,h:0.55,fill:{color:t.color},rectRadius:0.05});
    s.addText(t.name,{x,y:y+0.1,w:2.9,h:0.38,fontSize:13,bold:true,color:C.white,align:"center"});
    s.addText(t.role,{x:x+0.1,y:y+0.75,w:2.7,h:1.2,fontSize:11,color:C.text,align:"center",wrap:true,valign:"middle"});
  });
}

// ── 16. Stack technique ───────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Stack technique"); sNum(s,16);
  const cols=[
    {title:"Frontend",color:C.primary,items:["HTML5","CSS3","JavaScript ES6+","Vanilla (sans framework)","styles.css · 400 lignes","app.js · 178 lignes"]},
    {title:"Backend", color:C.brown,  items:["Node.js 24","Express 4","bcryptjs","jsonwebtoken (JWT)","dotenv","pg (node-postgres)"]},
    {title:"Base de données",color:C.teal,items:["PostgreSQL","Supabase (cloud)","Requêtes préparées","2 tables (users + reservations)","Initialisation automatique","SSL activé"]},
    {title:"Déploiement",color:C.blue,items:["Netlify (frontend)","Railway (backend)","GitHub CI/CD","Nixpacks builder","Docker + Nginx (local)","HTTPS automatique"]},
  ];
  cols.forEach((c,i)=>{
    const x=i*3.15+0.35;
    s.addShape(pptx.ShapeType.rect,{x,y:1.2,w:2.9,h:0.55,fill:{color:c.color},rectRadius:0.05});
    s.addText(c.title,{x,y:1.25,w:2.9,h:0.45,fontSize:13,bold:true,color:C.white,align:"center"});
    c.items.forEach((item,j)=>s.addText("• "+item,{x:x+0.1,y:1.9+j*0.72,w:2.7,h:0.62,fontSize:11,color:C.text}));
  });
}

// ── 17. Justification des choix ───────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Justification des choix techniques"); sNum(s,17);
  const rows=[
    [{text:"Technologie",options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Pourquoi ce choix ?",options:{bold:true,fill:{color:C.brown},color:C.white}}],
    ["HTML / CSS / JS vanilla","Maîtrise complète du code · Idéal pour apprendre les fondamentaux web"],
    ["Node.js + Express","JavaScript côté serveur · Léger · Parfait pour une API REST"],
    ["PostgreSQL / Supabase","Base relationnelle robuste · Gratuit · Gestion cloud simplifiée"],
    ["JWT","Authentification légère, sécurisée et stateless (sans session serveur)"],
    ["bcrypt","Standard de référence pour le hashage sécurisé des mots de passe"],
    ["Netlify","Déploiement frontend automatique en 30 secondes · CDN mondial · HTTPS"],
    ["Railway","Déploiement backend Node.js simple · Variables d'env sécurisées"],
    ["Git / GitHub","Versioning essentiel · CI/CD automatique · Traçabilité complète"],
  ];
  s.addTable(rows,{x:0.35,y:1.2,w:12.6,colW:[3.2,9.4],border:{color:C.secondary},
    fontSize:12,fontFace:"Arial",fill:{color:C.white},color:C.text,rowH:0.5});
}

// ── 18. Architecture globale ──────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Architecture globale de l'application"); sNum(s,18);
  const svg=img(path.join(ASSETS,"architecture.svg"));
  if(svg) s.addImage({path:svg,x:0.35,y:1.15,w:12.6,h:6.0,sizing:{type:"contain",w:12.6,h:6.0}});
}

// ── 19. Pattern MVC ───────────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Pattern MVC — Organisation du backend"); sNum(s,19);
  const svg=img(path.join(ASSETS,"mvc.svg"));
  if(svg) s.addImage({path:svg,x:0.35,y:1.15,w:12.6,h:6.0,sizing:{type:"contain",w:12.6,h:6.0}});
}

// ── 20. Git / GitHub ──────────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Git & GitHub — Versioning & CI/CD"); sNum(s,20);
  const ghSc=img(path.join(ROOT,"screens/github.png"));
  if(ghSc) s.addImage({path:ghSc,x:0.35,y:1.2,w:7.2,h:4.2,sizing:{type:"contain",w:7.2,h:4.2}});
  s.addText("20 commits documentés",{x:7.8,y:1.2,w:5.1,h:0.4,fontSize:14,bold:true,color:C.brown});
  const pts=["Messages de commit clairs et structurés","Conventions : feat: / fix: / add:","Push → déploiement Netlify automatique (~30s)","Push → rebuild Railway automatique (~2min)","Fichiers sensibles exclus du dépôt (.env)","Historique complet et traçable"];
  pts.forEach((p,i)=>s.addText("▸  "+p,{x:7.8,y:1.75+i*0.72,w:5.1,h:0.6,fontSize:11,color:C.text}));
  fn(s,"Dépôt : github.com/catcodecat/Quai_Antique_Project");
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 5 — BASE DE DONNÉES (slides 21–25)
// ════════════════════════════════════════════════════════════════════════════
{ const s=intercalaire("05","Base de données"); sNum(s,21); }

// ── 22. ERD ───────────────────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Modèle Entité-Relation (ERD)"); sNum(s,22);
  const svg=img(path.join(ASSETS,"erd.svg"));
  if(svg) s.addImage({path:svg,x:0.35,y:1.15,w:12.6,h:6.0,sizing:{type:"contain",w:12.6,h:6.0}});
}

// ── 23. Table users ───────────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Table users — Structure & sécurité"); sNum(s,23);
  s.addText(`CREATE TABLE IF NOT EXISTS users (\n  id            SERIAL PRIMARY KEY,\n  first_name    VARCHAR(100) NOT NULL,\n  last_name     VARCHAR(100) NOT NULL,\n  email         VARCHAR(255) UNIQUE NOT NULL,\n  password_hash VARCHAR(255) NOT NULL,\n  role          VARCHAR(20)  DEFAULT 'user',\n  created_at    TIMESTAMP    DEFAULT NOW()\n);`,
    {x:0.35,y:1.25,w:7.2,h:4.1,fontSize:12,fontFace:"Courier New",fill:{color:C.dark},color:"D4D4D4",insets:{left:0.2,right:0.2,top:0.18,bottom:0.18}});
  s.addText("Points clés",{x:7.8,y:1.3,w:5.1,h:0.4,fontSize:14,bold:true,color:C.brown});
  const pts=[["SERIAL PK","Identifiant auto-incrémenté"],["UNIQUE email","Un seul compte par adresse"],["password_hash","Mot de passe jamais stocké en clair"],["role DEFAULT 'user'","Deux rôles : user et admin"],["Créé automatiquement","Tables générées au démarrage"]];
  pts.forEach(([k,v],i)=>{
    s.addText(k,{x:7.8,y:1.9+i*0.92,w:2.3,h:0.46,fontSize:11,bold:true,color:C.white,fill:{color:C.primary},align:"center"});
    s.addText(v,{x:10.2,y:1.9+i*0.92,w:2.85,h:0.46,fontSize:11,color:C.text});
  });
  fn(s,"Fichier : backend/src/config/initDatabase.js · Initialisation automatique avec retry x5");
}

// ── 24. Table reservations ────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Table reservations — Statuts & contraintes"); sNum(s,24);
  s.addText(`CREATE TABLE IF NOT EXISTS reservations (\n  id               SERIAL PRIMARY KEY,\n  first_name       VARCHAR(100) NOT NULL,\n  last_name        VARCHAR(100) NOT NULL,\n  email            VARCHAR(255) NOT NULL,\n  reservation_date DATE         NOT NULL,\n  reservation_time TIME         NOT NULL,\n  guests           INTEGER  CHECK (guests > 0),\n  allergies        TEXT,\n  status           VARCHAR(30)  DEFAULT 'pending',\n  created_at       TIMESTAMP    DEFAULT NOW()\n);`,
    {x:0.35,y:1.25,w:7.2,h:5.1,fontSize:11,fontFace:"Courier New",fill:{color:C.dark},color:"D4D4D4",insets:{left:0.2,right:0.2,top:0.15,bottom:0.15}});
  s.addText("Statuts de réservation",{x:7.8,y:1.3,w:5.1,h:0.4,fontSize:14,bold:true,color:C.brown});
  [["pending","En attente","E65100"],["confirmed","Confirmée",C.green],["cancelled","Annulée","9E9E9E"]]
    .forEach(([v,l,c],i)=>{
      s.addShape(pptx.ShapeType.roundRect,{x:7.8,y:1.9+i*0.9,w:5.1,h:0.72,fill:{color:c},rectRadius:0.08});
      s.addText(`${v}  →  ${l}`,{x:7.8,y:1.9+i*0.9,w:5.1,h:0.72,fontSize:13,bold:true,color:C.white,align:"center",valign:"middle"});
    });
  fn(s,"guests : CHECK (guests > 0) · allergies : optionnel (TEXT nullable)");
  sNum(s,24);
}

// ── 25. Requêtes préparées ────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Requêtes préparées — Sécurité SQL"); sNum(s,25);
  s.addText(
`// user.repository.js — Protection injection SQL

// ✅ Requête préparée — paramètre $1 séparé
const result = await db.query(
  \`SELECT id, first_name AS "firstName", email,
          password_hash AS "passwordHash"
   FROM users
   WHERE email = $1\`,
  [email]   ← valeur traitée comme donnée
);

// reservation.repository.js
await db.query(
  \`INSERT INTO reservations (first_name, email, ...)
   VALUES ($1, $2, $3, $4, $5, $6, $7)
   RETURNING *\`,
  [firstName, email, date, time, guests, allergies]
);`,
    {x:0.35,y:1.25,w:7.5,h:5.1,fontSize:10,fontFace:"Courier New",fill:{color:C.dark},color:"D4D4D4",insets:{left:0.2,right:0.2,top:0.18,bottom:0.18}});
  s.addText("Principe de sécurité",{x:8.0,y:1.3,w:5.0,h:0.4,fontSize:14,bold:true,color:C.brown});
  const pts=["Les données utilisateur ne sont\njamais concaténées dans le SQL","Le paramètre $1, $2… est traité\ncomme une donnée, pas comme du code","Protection contre les injections SQL\n(OWASP Top 10)","Appliqué dans tous les\nrepositories du projet"];
  pts.forEach((p,i)=>s.addText("▸  "+p,{x:8.0,y:1.9+i*1.32,w:5.0,h:1.1,fontSize:11,color:C.text,wrap:true}));
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 6 — BACKEND (slides 26–32)
// ════════════════════════════════════════════════════════════════════════════
{ const s=intercalaire("06","Backend","API & Authentification"); sNum(s,26); }

// ── 27. Routes API ────────────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Routes API — Quai Antique"); sNum(s,27);
  s.addText("Base URL : https://quaiantiqueproject-production.up.railway.app",
    {x:0.35,y:1.15,w:12.6,h:0.3,fontSize:11,fontFace:"Courier New",color:C.primary});
  const rows=[
    [{text:"Méthode",   options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Route",     options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Description",options:{bold:true,fill:{color:C.brown},color:C.white}}],
    [{text:"GET",options:{fill:{color:C.blue},color:C.white,bold:true}},"/api/health","Vérification de la disponibilité du serveur"],
    [{text:"POST",options:{fill:{color:C.green},color:C.white,bold:true}},"/api/auth/register","Créer un compte utilisateur (bcrypt + JWT)"],
    [{text:"POST",options:{fill:{color:C.green},color:C.white,bold:true}},"/api/auth/login","Connexion et obtention d'un token JWT"],
    [{text:"GET",options:{fill:{color:C.blue},color:C.white,bold:true}},"/api/reservations","Consulter les réservations (dashboard admin)"],
    [{text:"POST",options:{fill:{color:C.green},color:C.white,bold:true}},"/api/reservations","Créer une nouvelle réservation"],
  ];
  s.addTable(rows,{x:0.35,y:1.5,w:12.6,colW:[1.6,4.2,6.8],border:{color:C.secondary},
    fontSize:12,fontFace:"Arial",fill:{color:C.white},color:C.text,rowH:0.62});
  s.addShape(pptx.ShapeType.roundRect,{x:0.35,y:5.7,w:12.6,h:0.5,fill:{color:"E8F5E9"},line:{color:C.green,width:1.5},rectRadius:0.08});
  s.addText(tick+"  API REST opérationnelle · Gestion des réservations et de l'authentification",
    {x:0.5,y:5.73,w:12.3,h:0.44,fontSize:12,bold:true,color:C.green});
  fn(s,"API REST opérationnelle · Authentification JWT · Gestion complète des réservations");
}

// ── 28. Flux d'authentification — happy path uniquement ──────────────────────
{
  const s=pptx.addSlide(); lightBg(s);
  titleBar(s,"Flux d'authentification — register · login · session"); sNum(s,28);

  // ── Paramètres de colonne ──────────────────────────────────────────────────
  const LX=0.35, LW=5.85;   // colonne gauche
  const RX=7.15, RW=5.85;   // colonne droite
  const HDR_Y=1.28, HDR_H=0.52;
  const BOX_Y=1.88, BOX_H=0.9, BOX_STEP=1.07;

  // En-têtes des colonnes
  s.addShape(pptx.ShapeType.roundRect,{x:LX,y:HDR_Y,w:LW,h:HDR_H,fill:{color:C.brown},rectRadius:0.07});
  s.addText("Inscription (register)",{x:LX,y:HDR_Y,w:LW,h:HDR_H,fontSize:15,bold:true,color:C.white,align:"center",valign:"middle"});

  s.addShape(pptx.ShapeType.roundRect,{x:RX,y:HDR_Y,w:RW,h:HDR_H,fill:{color:C.blue},rectRadius:0.07});
  s.addText("Connexion (login)",{x:RX,y:HDR_Y,w:RW,h:HDR_H,fontSize:15,bold:true,color:C.white,align:"center",valign:"middle"});

  // Séparateur vertical central
  s.addShape(pptx.ShapeType.line,{x:6.67,y:1.25,w:0,h:5.3,line:{color:C.secondary,width:1.2,dashType:"dash"}});

  // ── Étapes colonne gauche — INSCRIPTION ───────────────────────────────────
  const L=[
    {t:"Formulaire d'inscription",      sub:"Prénom · Nom · Email · Mot de passe",c:C.brown},
    {t:"Hashage bcrypt",                sub:"bcrypt.hash(password, 10) · irréversible",c:"3C2E24"},
    {t:"Compte créé en base",           sub:"INSERT INTO users · Données sécurisées",c:C.teal},
    {t:"Token JWT + Session active",    sub:"jwt.sign() · 7 jours · localStorage",c:C.green},
  ];
  L.forEach(({t,sub,c},i)=>{
    const y=BOX_Y+i*BOX_STEP;
    s.addShape(pptx.ShapeType.roundRect,{x:LX,y,w:LW,h:BOX_H,fill:{color:c},rectRadius:0.08});
    s.addText(t,  {x:LX+0.14,y:y+0.06,w:LW-0.28,h:0.42,fontSize:13,bold:true,color:C.white});
    s.addText(sub,{x:LX+0.14,y:y+0.52,w:LW-0.28,h:0.30,fontSize:10,italic:true,color:"E8E8E8"});
    if(i<3){
      const ay=y+BOX_H+0.03;
      s.addShape(pptx.ShapeType.line,{x:LX+LW/2,y:ay,w:0,h:BOX_STEP-BOX_H-0.06,line:{color:C.primary,width:2}});
      s.addShape(pptx.ShapeType.line,{x:LX+LW/2-0.1,y:ay+BOX_STEP-BOX_H-0.18,w:0.1,h:0.12,line:{color:C.primary,width:2}});
      s.addShape(pptx.ShapeType.line,{x:LX+LW/2,       y:ay+BOX_STEP-BOX_H-0.18,w:0.1,h:0.12,line:{color:C.primary,width:2}});
    }
  });

  // ── Étapes colonne droite — CONNEXION ─────────────────────────────────────
  const R=[
    {t:"Formulaire de connexion",       sub:"Email · Mot de passe",c:C.blue},
    {t:"Vérification bcrypt",           sub:"bcrypt.compare(mdp, hash) · Identité confirmée",c:"3C2E24"},
    {t:"Token JWT généré",              sub:"jwt.sign() · userId · role · 7 jours",c:C.purple},
    {t:"Token JWT + Session active",    sub:"localStorage · qaToken · qaUser",c:C.green},
  ];
  R.forEach(({t,sub,c},i)=>{
    const y=BOX_Y+i*BOX_STEP;
    s.addShape(pptx.ShapeType.roundRect,{x:RX,y,w:RW,h:BOX_H,fill:{color:c},rectRadius:0.08});
    s.addText(t,  {x:RX+0.14,y:y+0.06,w:RW-0.28,h:0.42,fontSize:13,bold:true,color:C.white});
    s.addText(sub,{x:RX+0.14,y:y+0.52,w:RW-0.28,h:0.30,fontSize:10,italic:true,color:"E8E8E8"});
    if(i<3){
      const ay=y+BOX_H+0.03;
      s.addShape(pptx.ShapeType.line,{x:RX+RW/2,y:ay,w:0,h:BOX_STEP-BOX_H-0.06,line:{color:C.primary,width:2}});
      s.addShape(pptx.ShapeType.line,{x:RX+RW/2-0.1,y:ay+BOX_STEP-BOX_H-0.18,w:0.1,h:0.12,line:{color:C.primary,width:2}});
      s.addShape(pptx.ShapeType.line,{x:RX+RW/2,       y:ay+BOX_STEP-BOX_H-0.18,w:0.1,h:0.12,line:{color:C.primary,width:2}});
    }
  });

  // ── Bande résultat ─────────────────────────────────────────────────────────
  const RES_Y=6.22;
  s.addShape(pptx.ShapeType.roundRect,{x:LX,y:RES_Y,w:LX+LW+(RX-LX-LW)+LW,h:0.92,
    fill:{color:C.green},rectRadius:0.08});
  // width = RX+RW-LX = 7.15+5.85-0.35 = 12.65
  s.addShape(pptx.ShapeType.roundRect,{x:LX,y:RES_Y,w:12.65,h:0.92,fill:{color:C.green},rectRadius:0.08});
  s.addText(
    tick+"  Session active   ·   Token JWT (7 jours)   ·   Formulaire de réservation prérempli automatiquement",
    {x:LX+0.2,y:RES_Y+0.05,w:12.25,h:0.82,fontSize:13,bold:true,color:C.white,align:"center",valign:"middle"});
}

// ── 29. JWT (simplifié) ───────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"JSON Web Token (JWT) — Authentification sécurisée"); sNum(s,29);
  s.addText(
`// auth.controller.js
const token = jwt.sign(
  { userId: user.id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// app.js (frontend)
localStorage.setItem("qaToken", token);
localStorage.setItem("qaUser", JSON.stringify(user));`,
    {x:0.35,y:1.25,w:6.5,h:3.6,fontSize:12,fontFace:"Courier New",fill:{color:C.dark},color:"D4D4D4",insets:{left:0.2,right:0.2,top:0.2,bottom:0.2}});
  s.addText("Ce que cela apporte",{x:7.2,y:1.3,w:5.8,h:0.4,fontSize:14,bold:true,color:C.brown});
  const pts=["Session sans stockage serveur (stateless)","Token contient userId, email, rôle","Expiration automatique après 7 jours","Sécurisé par une clé secrète (JWT_SECRET)"];
  pts.forEach((p,i)=>{
    s.addShape(pptx.ShapeType.roundRect,{x:7.2,y:1.9+i*1.2,w:5.8,h:0.95,fill:{color:C.white},line:{color:C.primary,width:1.5},rectRadius:0.08});
    s.addText("▸  "+p,{x:7.35,y:1.97+i*1.2,w:5.5,h:0.82,fontSize:12,color:C.text,wrap:true,valign:"middle"});
  });
  fn(s,"JWT_SECRET = variable d'environnement Railway · jamais écrite dans le code source");
  sNum(s,29);
}

// ── 30. Gestion réservations ──────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Gestion des réservations — Parcours complet"); sNum(s,30);
  s.addText(
`// reservation.controller.js
async function createReservation(req, res) {
  const { firstName, lastName, email,
          date, time, guests, allergies } = req.body;

  // Validation des champs obligatoires
  if (!firstName || !email || !date || !time || !guests)
    return res.status(400).json({ message: 'Champs manquants' });

  // Insertion en base
  const reservation = await reservationRepository
    .createReservation({ firstName, lastName, email,
                         date, time, guests, allergies });

  return res.status(201).json({ reservation });
}`,
    {x:0.35,y:1.25,w:7.2,h:5.0,fontSize:10,fontFace:"Courier New",fill:{color:C.dark},color:"D4D4D4",insets:{left:0.2,right:0.2,top:0.2,bottom:0.2}});
  s.addText("Parcours de réservation",{x:7.7,y:1.25,w:5.2,h:0.4,fontSize:14,bold:true,color:C.brown});
  const steps=["Formulaire rempli par l'utilisateur","fetch() POST → API Railway","Validation des données côté serveur","INSERT SQL préparé → PostgreSQL","Réservation créée (statut : En attente)","Réponse 201 → message de succès","Visible dans le dashboard admin"];
  steps.forEach((st,i)=>{
    s.addShape(pptx.ShapeType.rect,{x:7.7,y:1.75+i*0.72,w:0.38,h:0.38,fill:{color:C.primary},rectRadius:0.03});
    s.addText(String(i+1),{x:7.7,y:1.78+i*0.72,w:0.38,h:0.32,fontSize:11,bold:true,color:C.white,align:"center"});
    s.addText(st,{x:8.15,y:1.78+i*0.72,w:4.7,h:0.5,fontSize:11,color:C.text});
  });
  sNum(s,30);
}

// ── 31. Sécurité & Variables env (combiné, simplifié) ─────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Sécurité — Mesures implémentées"); sNum(s,31);
  const rows=[
    [{text:"Mesure",          options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Implémentation",  options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:tick,              options:{bold:true,fill:{color:C.brown},color:C.white}}],
    ["Hash mots de passe","bcrypt 10 rounds · irréversible",tick],
    ["Authentification","JWT signé · expiration 7 jours",tick],
    ["Variables secrètes","dotenv · .env exclu du dépôt Git",tick],
    ["Protection SQL","Requêtes préparées ($1, $2…)",tick],
    ["CORS","Origines autorisées via variable d'environnement",tick],
    ["HTTPS","Automatique sur Netlify et Railway",tick],
    ["Validation des entrées","Vérification côté serveur dans les controllers",tick],
    ["Tests fonctionnels","Réalisés et validés sur le site de production",tick],
  ];
  s.addTable(rows,{x:0.35,y:1.2,w:12.6,colW:[3.5,7.2,1.0],border:{color:C.secondary},
    fontSize:12,fontFace:"Arial",fill:{color:C.white},color:C.text,rowH:0.52});
  s.addShape(pptx.ShapeType.roundRect,{x:0.35,y:6.35,w:12.6,h:0.45,fill:{color:"E8F5E9"},line:{color:C.green,width:1.5},rectRadius:0.08});
  s.addText(tick+"  Toutes les mesures de sécurité essentielles sont implémentées et opérationnelles",
    {x:0.5,y:6.37,w:12.3,h:0.41,fontSize:11,bold:true,color:C.green});
}

// ── 32. CORS & Variables d'env ────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"CORS & Variables d'environnement"); sNum(s,32);
  s.addText("CORS — Contrôle des origines autorisées",{x:0.35,y:1.2,w:6.3,h:0.4,fontSize:13,bold:true,color:C.brown});
  s.addText(
`// backend/src/app.js
const allowedOrigins =
  (process.env.CORS_ORIGIN || 'http://localhost:8080')
  .split(',').map(o => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin))
      callback(null, true);   // ✅ autorisé
    else
      callback(new Error('Non autorisé'));
  }
}));`,
    {x:0.35,y:1.7,w:6.3,h:3.6,fontSize:10,fontFace:"Courier New",fill:{color:C.dark},color:"D4D4D4",insets:{left:0.15,right:0.15,top:0.15,bottom:0.15}});
  s.addText("Variables d'environnement Railway",{x:6.9,y:1.2,w:6.1,h:0.4,fontSize:13,bold:true,color:C.brown});
  const vars=[["DATABASE_URL","Connexion PostgreSQL Supabase"],["JWT_SECRET","Signature des tokens JWT"],["PORT","Port Express (3000)"],["CORS_ORIGIN","Domaines autorisés à appeler l'API"]];
  vars.forEach(([k,v],i)=>{
    s.addText(k,{x:6.9,y:1.75+i*1.1,w:3.0,h:0.42,fontSize:10,fontFace:"Courier New",bold:true,fill:{color:C.dark},color:C.primary,align:"center"});
    s.addText(v,{x:10.0,y:1.75+i*1.1,w:3.0,h:0.42,fontSize:10,color:C.text});
  });
  s.addShape(pptx.ShapeType.roundRect,{x:6.9,y:6.15,w:6.1,h:0.55,fill:{color:"E8F5E9"},line:{color:C.green,width:1.5},rectRadius:0.08});
  s.addText(tick+"  Aucune donnée sensible dans le code source",{x:7.0,y:6.18,w:5.9,h:0.49,fontSize:12,bold:true,color:C.green,valign:"middle"});
  fn(s,"Fichier .env.example documente les variables attendues sans exposer les valeurs réelles");
  sNum(s,32);
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 7 — FRONTEND (slides 33–42)
// ════════════════════════════════════════════════════════════════════════════
{ const s=intercalaire("07","Frontend","Interface utilisateur"); sNum(s,33); }

// ── 34. Charte graphique ──────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Charte graphique"); sNum(s,34);

  // Sous-titre
  s.addText("Palette utilisée dans l'application Quai Antique",
    {x:0.35,y:1.13,w:12.6,h:0.26,fontSize:11,italic:true,color:C.muted,align:"center"});

  // 6 échantillons — taille uniforme, espacement calculé
  // Largeur slide utile : 13.333 - 0.35*2 = 12.633
  // 6 cases × 1.9 + 5 espaces × 0.28 = 11.4 + 1.4 = 12.8 → ok avec marges ajustées
  const SX=0.27, SW=1.9, SH=2.0, SY=1.45, STEP=2.18;
  const swatches=[
    {hex:"3C2E24",name:"Brun foncé",    role:"Header · titres"},
    {hex:"9B6A22",name:"Or · Principal",role:"Boutons · accents"},
    {hex:"C5BAA4",name:"Beige",         role:"Textes secondaires"},
    {hex:"F7F7F7",name:"Gris clair",    role:"Fond des pages"},
    {hex:"211817",name:"Noir brun",     role:"Sections sombres"},
    {hex:"222222",name:"Anthracite",    role:"Texte courant"},
  ];
  swatches.forEach((sw,i)=>{
    const x=SX+i*STEP;
    const isLight=(sw.hex==="F7F7F7"||sw.hex==="C5BAA4");
    // Case couleur — bordure sur les couleurs claires pour les rendre visibles
    s.addShape(pptx.ShapeType.roundRect,{x,y:SY,w:SW,h:SH,
      fill:{color:sw.hex},
      line:{color:isLight?C.secondary:"F7F7F7",width:isLight?1.5:0.5},
      rectRadius:0.09});
    // Code hex
    s.addText("#"+sw.hex,{x,y:SY+SH+0.07,w:SW,h:0.24,
      fontSize:8,fontFace:"Courier New",color:C.muted,align:"center"});
    // Nom
    s.addText(sw.name,{x,y:SY+SH+0.34,w:SW,h:0.32,
      fontSize:11,bold:true,color:C.text,align:"center"});
    // Utilisation
    s.addText(sw.role,{x,y:SY+SH+0.68,w:SW,h:0.28,
      fontSize:9,color:C.muted,align:"center"});
  });

  hline(s,4.95);

  // Typographies
  s.addText("Typographies",{x:0.35,y:5.08,w:5.8,h:0.35,fontSize:13,bold:true,color:C.brown});
  s.addShape(pptx.ShapeType.roundRect,{x:0.35,y:5.5,w:5.6,h:0.52,fill:{color:C.white},line:{color:C.secondary,width:1},rectRadius:0.06});
  s.addText("Titres  :  Montserrat  —  font-weight: 500",{x:0.5,y:5.53,w:5.3,h:0.46,fontSize:12,bold:true,color:C.brown,valign:"middle"});
  s.addShape(pptx.ShapeType.roundRect,{x:0.35,y:6.1,w:5.6,h:0.52,fill:{color:C.white},line:{color:C.secondary,width:1},rectRadius:0.06});
  s.addText("Corps    :  Hind Madurai",{x:0.5,y:6.13,w:5.3,h:0.46,fontSize:12,color:C.text,valign:"middle"});

  // Bouton centré dans la colonne droite (x=7.3, w=5.7 → centre bouton à 7.3+5.7/2-1.6=8.55)
  s.addText("Bouton principal",{x:7.3,y:5.08,w:5.7,h:0.35,fontSize:13,bold:true,color:C.brown,align:"center"});
  s.addShape(pptx.ShapeType.roundRect,{x:8.55,y:5.5,w:3.2,h:0.8,fill:{color:C.primary},rectRadius:0.08});
  s.addText("Réserver",{x:8.55,y:5.52,w:3.2,h:0.76,fontSize:16,bold:true,color:C.white,align:"center",valign:"middle"});

  // Objectif
  hline(s,6.78);
  s.addText("Objectif : ambiance gastronomique haut de gamme, chaleureuse et élégante.",
    {x:0.35,y:6.88,w:12.6,h:0.32,fontSize:11,italic:true,color:C.primary,align:"center"});
}

// ── 35. Pages statiques ───────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Pages statiques — Accueil & Galerie"); sNum(s,35);
  const acc=img(path.join(SS,"desktop-accueil.png")), gal=img(path.join(SS,"desktop-galerie.png"));
  if(acc) s.addImage({path:acc,x:0.35,y:1.2,w:6.2,h:4.0,sizing:{type:"contain",w:6.2,h:4.0}});
  if(gal) s.addImage({path:gal,x:6.75,y:1.2,w:6.2,h:4.0,sizing:{type:"contain",w:6.2,h:4.0}});
  s.addText("index.html",{x:0.35,y:5.3,w:6.2,h:0.25,fontSize:9,italic:true,color:C.muted,align:"center"});
  s.addText("gallery.html",{x:6.75,y:5.3,w:6.2,h:0.25,fontSize:9,italic:true,color:C.muted,align:"center"});
  const pts=["Header + nav identiques sur toutes les pages","Hero avec image plein largeur","Sections alternées clair/foncé","Boutons CTA vers réservation","Footer : horaires, adresse, contact"];
  pts.forEach((p,i)=>s.addText("▸  "+p,{x:0.35,y:5.65+i*0.32,w:12.6,h:0.28,fontSize:10,color:C.text}));
}

// ── 36. Carte dynamique ───────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"La carte — Navigation par onglets"); sNum(s,36);
  const m1=img(path.join(SS,"desktop-menu-entrees.png")), m2=img(path.join(SS,"desktop-menu-plats.png"));
  if(m1) s.addImage({path:m1,x:0.35,y:1.2,w:5.8,h:3.8,sizing:{type:"contain",w:5.8,h:3.8}});
  if(m2) s.addImage({path:m2,x:6.6,y:1.2,w:5.8,h:3.8,sizing:{type:"contain",w:5.8,h:3.8}});
  s.addText("Onglet Entrées",{x:0.35,y:5.1,w:5.8,h:0.25,fontSize:9,italic:true,color:C.muted,align:"center"});
  s.addText("Onglet Plats",{x:6.6,y:5.1,w:5.8,h:0.25,fontSize:9,italic:true,color:C.muted,align:"center"});
  s.addText("Implémentation JavaScript : fonction showMenuPanel()",{x:0.35,y:5.45,w:12.6,h:0.3,fontSize:11,bold:true,color:C.brown});
  s.addText("classList.toggle('active') · classList.toggle('is-visible') · history.replaceState() · data-tab / data-panel",{x:0.35,y:5.8,w:12.6,h:0.28,fontSize:10,fontFace:"Courier New",color:C.text});
}

// ── 37. Formulaires login/register ────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Formulaires — Connexion & Inscription"); sNum(s,37);
  const lg=img(path.join(SS,"desktop-login.png")), rg=img(path.join(SS,"desktop-register.png"));
  if(lg) s.addImage({path:lg,x:0.35,y:1.2,w:6.2,h:4.3,sizing:{type:"contain",w:6.2,h:4.3}});
  if(rg) s.addImage({path:rg,x:6.75,y:1.2,w:6.2,h:4.3,sizing:{type:"contain",w:6.2,h:4.3}});
  s.addText("login.html",{x:0.35,y:5.6,w:6.2,h:0.25,fontSize:9,italic:true,color:C.muted,align:"center"});
  s.addText("register.html",{x:6.75,y:5.6,w:6.2,h:0.25,fontSize:9,italic:true,color:C.muted,align:"center"});
  s.addText("Messages de validation affichés · Redirection automatique vers la réservation après connexion",{x:0.35,y:5.95,w:12.6,h:0.3,fontSize:10,color:C.text,align:"center"});
}

// ── 38. Session utilisateur ───────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Session utilisateur — Gestion de la connexion"); sNum(s,38);
  const nav=img(path.join(SS,"desktop-nav-connectee.png"));
  if(nav) s.addImage({path:nav,x:0.35,y:1.2,w:7.8,h:3.5,sizing:{type:"contain",w:7.8,h:3.5}});
  s.addText(
`function updateNav() {
  const user = JSON.parse(
    localStorage.getItem("qaUser") || "null");

  if (user) {
    navLink.textContent =
      \`\${user.firstName} — Déconnexion\`;
    navLink.addEventListener("click", () => {
      localStorage.removeItem("qaToken");
      localStorage.removeItem("qaUser");
      window.location.href = "index.html";
    });
  }
}`,
    {x:8.1,y:1.2,w:5.0,h:4.3,fontSize:10,fontFace:"Courier New",fill:{color:C.dark},color:"D4D4D4",insets:{left:0.15,right:0.15,top:0.1,bottom:0.1}});
  s.addText("La navigation affiche «Prénom — Déconnexion» quand l'utilisateur est connecté",{x:0.35,y:4.85,w:7.6,h:0.35,fontSize:10,italic:true,color:C.muted});
  sNum(s,38);
}

// ── 39. Préremplissage ────────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Préremplissage automatique du formulaire"); sNum(s,39);
  const sc=img(path.join(SS,"desktop-reservation-connectee.png"));
  if(sc) s.addImage({path:sc,x:0.35,y:1.2,w:7.0,h:4.9,sizing:{type:"contain",w:7.0,h:4.9}});
  s.addText(
`// app.js — réservation.html
const user = JSON.parse(
  localStorage.getItem("qaUser") || "null"
);

if (user) {
  document.getElementById("firstName").value
    = user.firstName || "";
  document.getElementById("lastName").value
    = user.lastName  || "";
  document.getElementById("email").value
    = user.email     || "";
}`,
    {x:7.5,y:1.2,w:5.5,h:4.3,fontSize:10,fontFace:"Courier New",fill:{color:C.dark},color:"D4D4D4",insets:{left:0.15,right:0.15,top:0.15,bottom:0.15}});
  s.addText("Prénom, nom et email préremplis automatiquement dès la connexion",{x:0.35,y:6.2,w:7.0,h:0.35,fontSize:10,italic:true,color:C.muted,align:"center"});
  sNum(s,39);
}

// ── 40. Dashboard admin ───────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Dashboard Administrateur"); sNum(s,40);
  const sc=img(path.join(SS,"desktop-admin-data.png"));
  if(sc) s.addImage({path:sc,x:0.35,y:1.2,w:12.6,h:5.2,sizing:{type:"contain",w:12.6,h:5.2}});
  s.addShape(pptx.ShapeType.roundRect,{x:0.35,y:6.5,w:12.6,h:0.45,fill:{color:"E8F5E9"},line:{color:C.green,width:1.5},rectRadius:0.08});
  s.addText(tick+"  Tableau d'administration opérationnel · Consultation centralisée des réservations",{x:0.5,y:6.52,w:12.3,h:0.41,fontSize:11,bold:true,color:C.green});
}

// ── 41. Responsive mobile ─────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Responsive Design — Mobile 390×844"); sNum(s,41);
  const pages=[[path.join(SS,"mobile-accueil.png"),"Accueil"],[path.join(SS,"mobile-menu-entrees.png"),"Carte"],[path.join(SS,"mobile-reservation.png"),"Réservation"],[path.join(SS,"mobile-login.png"),"Connexion"],[path.join(SS,"mobile-admin.png"),"Admin"]];
  pages.forEach(([p,label],i)=>{
    const x=i*2.5+0.3, sc=img(p);
    if(sc) s.addImage({path:sc,x,y:1.2,w:2.2,h:4.6,sizing:{type:"contain",w:2.2,h:4.6}});
    s.addText(label,{x,y:5.9,w:2.2,h:0.28,fontSize:10,italic:true,color:C.muted,align:"center"});
  });
  s.addText("CSS Flexbox + Grid + media query · Rendu à 390px (iPhone 14)",{x:0.35,y:6.3,w:12.6,h:0.28,fontSize:10,color:C.muted,align:"center"});
}

// ── 42. Flux utilisateur complet ──────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Parcours utilisateur — Scénario nominal"); sNum(s,42);

  // ── Paramètres recalculés pour rester dans la zone de sécurité 16:9 ───────
  // Slide : 13.333 in. Marge gauche 0.38 in (~1cm), droite 0.52 in (~1.3cm).
  // Phase label LW=1.72 + gap 0.16 → BX=2.26
  // 5 boxes × BW + 4 gaps × GAP = 13.333 - 2.26 - 0.52 = 10.553
  // BW=1.78, GAP=0.37, STEP=2.15 → 5×1.78 + 4×0.37 = 8.9 + 1.48 = 10.38 ✓ (marge droite ~0.67in)
  const PX_  = 0.38;    // marge gauche
  const LW_  = 1.72;    // largeur pastille de phase
  const BX_  = 2.26;    // x du premier bloc (PX_+LW_+0.16)
  const BW_  = 1.78;    // largeur d'un bloc  (−17% vs ancienne valeur)
  const BH_  = 1.0;     // hauteur uniforme de toutes les cartes
  const GAP_ = 0.37;    // espace entre blocs (flèche)
  const STEP_= BW_+GAP_;// 2.15

  // Dernière carte : BX_ + 4*STEP_ + BW_ = 2.26+8.60+1.78 = 12.64 → marge droite 0.69 in ✓

  function fBox_(label, x, y, col) {
    s.addShape(pptx.ShapeType.roundRect,
      {x,y,w:BW_,h:BH_,fill:{color:col},rectRadius:0.08});
    s.addText(label,{x:x+0.1,y:y+0.1,w:BW_-0.2,h:BH_-0.2,
      fontSize:11,bold:true,color:C.white,
      align:"center",valign:"middle",wrap:true});
  }
  function fArrow_(x, y) {
    const mid=y+BH_/2;
    s.addShape(pptx.ShapeType.line,
      {x,y:mid,w:GAP_,h:0,line:{color:C.primary,width:2.5}});
    s.addShape(pptx.ShapeType.line,
      {x:x+GAP_-0.14,y:mid-0.11,w:0.14,h:0.11,line:{color:C.primary,width:2.5}});
    s.addShape(pptx.ShapeType.line,
      {x:x+GAP_-0.14,y:mid,      w:0.14,h:0.11,line:{color:C.primary,width:2.5}});
  }
  function phase_(text, y, col) {
    s.addShape(pptx.ShapeType.roundRect,
      {x:PX_,y,w:LW_,h:BH_,fill:{color:col},rectRadius:0.08});
    s.addText(text,{x:PX_,y,w:LW_,h:BH_,
      fontSize:10,bold:true,color:C.white,align:"center",valign:"middle"});
  }

  // ── ROW 1 — INSCRIPTION (y=1.35) ──────────────────────────────────────────
  const Y1_=1.35;
  phase_("Inscription",Y1_,C.brown);
  [{t:"Formulaire\nd'inscription",c:C.brown},
   {t:"Hashage\nbcrypt",          c:"3C2E24"},
   {t:"Compte créé\nen base",     c:C.teal},
   {t:"Token JWT\ngénéré",        c:C.purple},
   {t:"Session\nactive",          c:C.green}
  ].forEach(({t,c},i)=>{
    fBox_(t,BX_+i*STEP_,Y1_,c);
    if(i<4) fArrow_(BX_+i*STEP_+BW_,Y1_);
  });

  // ── ROW 2 — CONNEXION (y=2.70) ────────────────────────────────────────────
  const Y2_=2.70;
  phase_("Connexion",Y2_,C.blue);
  [{t:"Formulaire\nde connexion",c:C.brown},
   {t:"Vérification\nbcrypt",    c:"3C2E24"},
   {t:"Identité\nconfirmée",     c:C.teal},
   {t:"Token JWT\ngénéré",       c:C.purple},
   {t:"Session\nactive",         c:C.green}
  ].forEach(({t,c},i)=>{
    fBox_(t,BX_+i*STEP_,Y2_,c);
    if(i<4) fArrow_(BX_+i*STEP_+BW_,Y2_);
  });

  // Connecteur vertical pointillé entre les deux sessions (même résultat)
  s.addShape(pptx.ShapeType.line,{
    x:BX_+4*STEP_+BW_/2, y:Y1_+BH_, w:0, h:Y2_-Y1_-BH_,
    line:{color:C.green,width:1.5,dashType:"dash"}
  });

  // ── ROW 3 — PRÉREMPLISSAGE (y=4.05) ───────────────────────────────────────
  const Y3_=4.05;
  phase_("Réservation\npréremplie",Y3_,"3ECF8E");
  [{t:"Session\nlocalStorage",      c:C.green},
   {t:"Lecture\nprofil utilisateur",c:C.blue},
   {t:"Prénom · Nom\nEmail",        c:C.brown},
   {t:"Formulaire\nautorempli",     c:C.primary},
   {t:"Prêt à\nenvoyer",            c:C.green}
  ].forEach(({t,c},i)=>{
    fBox_(t,BX_+i*STEP_,Y3_,c);
    if(i<4) fArrow_(BX_+i*STEP_+BW_,Y3_);
  });

  // ── BANDE RÉSULTAT (y=5.45) ───────────────────────────────────────────────
  // Largeur = de PX_ à dernière carte droite = 12.64, donc w=12.64-PX_=12.26
  const YR_=5.45, RW_=12.64-PX_;
  s.addShape(pptx.ShapeType.roundRect,
    {x:PX_,y:YR_,w:RW_,h:1.75,
     fill:{color:C.white},line:{color:C.green,width:2},rectRadius:0.1});
  s.addShape(pptx.ShapeType.rect,
    {x:PX_,y:YR_,w:RW_,h:0.5,fill:{color:C.green},rectRadius:0.05});
  s.addText(tick+"  Résultat — Parcours utilisateur validé",{
    x:PX_+0.2,y:YR_+0.07,w:RW_-0.4,h:0.36,
    fontSize:13,bold:true,color:C.white,align:"center"});
  const OCOL_W = (RW_-0.6)/4;
  ["Token JWT stocké en localStorage",
   "Navigation affiche le prénom",
   "Formulaire prérempli automatiquement",
   "Réservation envoyée avec succès"
  ].forEach((o,i)=>s.addText(tick+"  "+o,{
    x:PX_+0.3+i*OCOL_W, y:YR_+0.64,
    w:OCOL_W-0.1, h:0.88,
    fontSize:10,color:C.text,wrap:true,valign:"top"
  }));
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 8 — DÉPLOIEMENT (slides 43–46)
// ════════════════════════════════════════════════════════════════════════════
{ const s=intercalaire("08","Déploiement"); sNum(s,43); }

// ── 44. Netlify ───────────────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Netlify — Déploiement Frontend"); sNum(s,44);
  const sc=img(path.join(ROOT,"screens/netlify.png"));
  if(sc) s.addImage({path:sc,x:0.35,y:1.2,w:7.5,h:4.5,sizing:{type:"contain",w:7.5,h:4.5}});
  s.addText("Points clés",{x:8.1,y:1.2,w:4.9,h:0.4,fontSize:14,bold:true,color:C.brown});
  const pts=["quai-antique-projet.netlify.app","Déploiement automatique à chaque push","HTTPS activé automatiquement","CDN mondial · disponible partout","Déploiement en ~30 secondes","Plan gratuit"];
  pts.forEach((p,i)=>s.addText("▸  "+p,{x:8.1,y:1.75+i*0.72,w:4.9,h:0.6,fontSize:11,color:C.text}));
}

// ── 45. Railway ───────────────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Railway — Déploiement Backend Node.js"); sNum(s,45);
  s.addText("railway.json",{x:0.35,y:1.2,w:6.0,h:0.35,fontSize:12,bold:true,color:C.brown});
  s.addText(`{\n  "build": { "builder": "NIXPACKS" },\n  "deploy": {\n    "startCommand": "node src/server.js",\n    "restartPolicyType": "ON_FAILURE"\n  }\n}`,
    {x:0.35,y:1.62,w:6.0,h:2.4,fontSize:11,fontFace:"Courier New",fill:{color:C.dark},color:"D4D4D4",insets:{left:0.2,right:0.2,top:0.15,bottom:0.15}});
  s.addText("Problèmes résolus pendant le déploiement",{x:0.35,y:4.2,w:6.0,h:0.35,fontSize:12,bold:true,color:C.primary});
  const issues=[["Variable PORT","process.env.PORT intégré"],["Builder","Switch vers Nixpacks"],["Health endpoint","Route /api/health ajoutée"]];
  issues.forEach(([p,sol],i)=>{
    s.addShape(pptx.ShapeType.roundRect,{x:0.35,y:4.65+i*0.72,w:5.8,h:0.6,fill:{color:"E8F5E9"},line:{color:C.green,width:1},rectRadius:0.06});
    s.addText(tick+"  "+p+" → "+sol,{x:0.5,y:4.67+i*0.72,w:5.6,h:0.56,fontSize:11,color:C.text,valign:"middle"});
  });
  s.addText("Points clés",{x:6.7,y:1.2,w:6.0,h:0.4,fontSize:14,bold:true,color:C.brown});
  const pts2=["API disponible en production","Déploiement auto depuis GitHub (~2min)","Variables d'env sécurisées dans Railway","Restart automatique en cas d'erreur"];
  pts2.forEach((p,i)=>s.addText("▸  "+p,{x:6.7,y:1.75+i*0.82,w:6.0,h:0.7,fontSize:12,color:C.text}));
  sNum(s,45);
}

// ── 46. Supabase + Docker ──────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Supabase (BDD cloud) & Docker (local)"); sNum(s,46);
  s.addText("Supabase — PostgreSQL cloud",{x:0.35,y:1.2,w:6.0,h:0.4,fontSize:14,bold:true,color:C.teal});
  const ptsSupa=["PostgreSQL managé, sans serveur à gérer","Connexion via DATABASE_URL (variable sécurisée)","SSL activé · Backups automatiques","Tables créées automatiquement au démarrage","Interface visuelle pour inspecter les données"];
  ptsSupa.forEach((p,i)=>s.addText("▸  "+p,{x:0.35,y:1.7+i*0.72,w:5.8,h:0.6,fontSize:11,color:C.text}));
  s.addText("Docker — Lancement local",{x:6.7,y:1.2,w:6.2,h:0.4,fontSize:14,bold:true,color:C.brown});
  s.addText(`# Frontend via Nginx
docker compose up --build
# → http://localhost:8080

# Backend en développement
cd backend && npm run dev`,
    {x:6.7,y:1.7,w:6.2,h:2.5,fontSize:11,fontFace:"Courier New",fill:{color:C.dark},color:"D4D4D4",insets:{left:0.2,right:0.2,top:0.15,bottom:0.15}});
  s.addText("Utilité du Docker",{x:6.7,y:4.3,w:6.2,h:0.35,fontSize:12,bold:true,color:C.brown});
  const ptsDock=["Tester le site sans dépendances locales","Environnement identique pour tous","Isolation du frontend (Nginx)"];
  ptsDock.forEach((p,i)=>s.addText("▸  "+p,{x:6.7,y:4.75+i*0.62,w:6.2,h:0.55,fontSize:11,color:C.text}));
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 9 — DÉMONSTRATION (slide 47)
// ════════════════════════════════════════════════════════════════════════════
{
  const s=pptx.addSlide(); darkBg(s);
  s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:"100%",h:1.25,fill:{color:C.primary}});
  s.addText("Démonstration du projet",{x:0.35,y:0.2,w:12.6,h:0.85,fontSize:28,bold:true,color:C.white,align:"center"});
  sNum(s,47);
  const blocks=[
    {title:"Site Netlify",      url:"quai-antique-projet.netlify.app",     color:C.blue,  desc:"Accueil · Galerie · Carte · Réservation\nLogin · Inscription · Admin"},
    {title:"API Railway",       url:".../api/health → { status: 'ok' }",   color:C.purple,desc:"GET /api/health\nGET & POST /api/reservations\nPOST /api/auth/register & login"},
    {title:"Dépôt GitHub",      url:"github.com/catcodecat/Quai_Antique_Project",color:C.brown,desc:"20 commits · branche main\nHistorique complet du développement"},
    {title:"Compte de démonstration",url:"demo@quaiantique.com · demo123",color:C.green,desc:"Créer avant la soutenance\nParcours : login → réservation préremplie"},
  ];
  blocks.forEach((b,i)=>{
    const col=i%2, row=Math.floor(i/2);
    const x=col*6.45+0.35, y=row*2.7+1.45;
    s.addShape(pptx.ShapeType.roundRect,{x,y,w:6.05,h:2.4,fill:{color:C.brown},line:{color:b.color,width:2.5},rectRadius:0.1});
    s.addShape(pptx.ShapeType.rect,{x,y,w:6.05,h:0.52,fill:{color:b.color},rectRadius:0.05});
    s.addText(b.title,{x:x+0.15,y:y+0.08,w:5.8,h:0.36,fontSize:13,bold:true,color:C.white});
    s.addText(b.url,{x:x+0.15,y:y+0.65,w:5.8,h:0.32,fontSize:10,fontFace:"Courier New",color:"90CAF9"});
    s.addText(b.desc,{x:x+0.15,y:y+1.05,w:5.8,h:1.15,fontSize:11,color:C.secondary,wrap:true});
  });
  s.addText("Parcours à montrer : Accueil → Register → Login → Réservation préremplie → Dashboard Admin",
    {x:0.35,y:6.9,w:12.6,h:0.3,fontSize:10,italic:true,color:C.secondary,align:"center"});
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 10 — VALIDATION & TESTS (slides 48–49)
// ════════════════════════════════════════════════════════════════════════════

// ── 48. Validation fonctionnelle ──────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Validation fonctionnelle",C.green); sNum(s,48);
  const rows=[
    [{text:"Fonctionnalité",options:{bold:true,fill:{color:C.green},color:C.white}},
     {text:"Résultat",      options:{bold:true,fill:{color:C.green},color:C.white}},
     {text:"Statut",        options:{bold:true,fill:{color:C.green},color:C.white}}],
    ["Inscription utilisateur","Compte créé · token JWT retourné · redirection",tick+" Validée"],
    ["Connexion utilisateur","Authentification réussie · session active",tick+" Validée"],
    ["Réservation en ligne","Données enregistrées en base PostgreSQL",tick+" Validée"],
    ["Préremplissage formulaire","Champs remplis automatiquement depuis la session",tick+" Validé"],
    ["API REST","Toutes les routes répondent correctement",tick+" Validée"],
    ["Dashboard administrateur","Réservations affichées avec indicateurs",tick+" Validé"],
    ["Responsive mobile","Affichage correct sur iPhone 14 (390px)",tick+" Validé"],
    ["Déploiement Netlify","Site accessible en production · HTTPS",tick+" Validé"],
    ["Déploiement Railway","API accessible en production · auto-deploy",tick+" Validé"],
    ["Base PostgreSQL","Tables créées · données persistées · requêtes OK",tick+" Validée"],
  ];
  s.addTable(rows,{x:0.35,y:1.2,w:12.6,colW:[4.5,5.5,2.0],border:{color:"A5D6A7"},
    fontSize:12,fontFace:"Arial",fill:{color:C.white},color:C.text,rowH:0.47});
  s.addShape(pptx.ShapeType.roundRect,{x:0.35,y:6.55,w:12.6,h:0.45,fill:{color:"E8F5E9"},line:{color:C.green,width:1.5},rectRadius:0.08});
  s.addText(tick+"  10 fonctionnalités clés validées — projet opérationnel en production",{x:0.5,y:6.57,w:12.3,h:0.41,fontSize:12,bold:true,color:C.green});
}

// ── 49. Tests réalisés ────────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Tests réalisés"); sNum(s,49);
  s.addText("Tests fonctionnels manuels réalisés sur le site de production",{x:0.35,y:1.15,w:12.6,h:0.32,fontSize:11,italic:true,color:C.muted});
  const tests=[
    {cat:"Authentification",items:["Création d'un compte avec données valides","Tentative d'inscription avec email déjà utilisé → erreur affichée","Connexion avec identifiants corrects","Connexion avec mauvais mot de passe → erreur affichée","Déconnexion et vérification de la session supprimée"]},
    {cat:"Réservation",items:["Soumission d'une réservation complète → enregistrée en base","Préremplissage automatique après connexion","Envoi sans champs obligatoires → message d'erreur","Réservation visible immédiatement dans le dashboard admin"]},
    {cat:"Interface & API",items:["Navigation entre les onglets de la carte","Affichage sur mobile (390px)","Actualisation du dashboard admin","Vérification de la route /api/health","Test des routes POST via le formulaire de production"]},
  ];
  tests.forEach((block,bi)=>{
    const col=bi%3, baseX=col*4.3+0.35, baseY=1.55;
    s.addShape(pptx.ShapeType.rect,{x:baseX,y:baseY,w:4.1,h:0.5,fill:{color:C.primary},rectRadius:0.05});
    s.addText(block.cat,{x:baseX,y:baseY+0.07,w:4.1,h:0.36,fontSize:12,bold:true,color:C.white,align:"center"});
    block.items.forEach((item,i)=>{
      s.addShape(pptx.ShapeType.roundRect,{x:baseX,y:baseY+0.6+i*0.95,w:4.1,h:0.82,fill:{color:"E8F5E9"},line:{color:"A5D6A7",width:1},rectRadius:0.06});
      s.addText(tick+"  "+item,{x:baseX+0.1,y:baseY+0.65+i*0.95,w:3.9,h:0.72,fontSize:10,color:C.text,wrap:true,valign:"top"});
    });
  });
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 11 — BILAN & ÉVOLUTION (slides 50–56)
// ════════════════════════════════════════════════════════════════════════════
{ const s=intercalaire("11","Bilan","& Évolution du projet"); sNum(s,50); }

// ── 51. Timeline Git — 5 grandes étapes ──────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s);
  titleBar(s,"Gestion du projet avec Git"); sNum(s,51);

  // ── Géométrie : 5 colonnes centrées, police ≥ 20pt ──────────────────────
  // 5 boîtes × 2.20 + 4 espaces × 0.29 = 11.0 + 1.16 = 12.16
  // Marge : (13.333 − 12.16) / 2 = 0.587 → ~1.5cm de chaque côté
  const N  = 5;
  const BW = 2.20;   // largeur d'une boîte
  const GAP= 0.29;   // espace entre boîtes (connecteur)
  const ST = BW+GAP; // pas = 2.49
  const X0 = (13.333 - N*BW - (N-1)*GAP) / 2;  // ~0.587
  const BY = 1.25;   // y de départ des boîtes
  const BH = 5.55;   // hauteur des boîtes

  const phases=[
    {
      num:"01", title:"Initialisation",
      items:["Structure HTML / CSS","Dépôt GitHub créé","Premier commit"],
      header:C.brown, dark:false,
    },
    {
      num:"02", title:"Frontend",
      items:["7 pages HTML","Navigation responsive","Galerie & Carte"],
      header:C.primary, dark:false,
    },
    {
      num:"03", title:"Backend",
      items:["API Express REST","Pattern MVC","PostgreSQL"],
      header:"1565C0", dark:false,
    },
    {
      num:"04", title:"Authentification",
      items:["bcrypt (hashage)","JWT","Session localStorage"],
      header:C.purple, dark:false,
    },
    {
      num:"05", title:"Déploiement",
      items:["Railway (backend)","Netlify (frontend)","Production ✓"],
      header:C.green, dark:false,
    },
  ];

  phases.forEach((ph,i)=>{
    const bx=X0+i*ST;

    // ── Corps de la boîte ──────────────────────────────────────────────────
    s.addShape(pptx.ShapeType.roundRect,{
      x:bx, y:BY, w:BW, h:BH,
      fill:{color:C.white},
      line:{color:ph.header, width:2.5},
      rectRadius:0.1
    });

    // ── Bandeau couleur en haut ────────────────────────────────────────────
    s.addShape(pptx.ShapeType.rect,{
      x:bx, y:BY, w:BW, h:1.15,
      fill:{color:ph.header}, rectRadius:0.05
    });
    s.addShape(pptx.ShapeType.roundRect,{
      x:bx, y:BY, w:BW, h:1.15,
      fill:{color:ph.header},
      line:{color:ph.header, width:0},
      rectRadius:0.1
    });

    // Numéro
    s.addText(ph.num,{
      x:bx, y:BY+0.06, w:BW, h:0.52,
      fontSize:28, bold:true, color:C.white,
      align:"center", fontFace:"Arial"
    });

    // ── Titre de la phase ──────────────────────────────────────────────────
    s.addText(ph.title,{
      x:bx+0.05, y:BY+1.3, w:BW-0.1, h:0.68,
      fontSize:20, bold:true, color:C.text,
      align:"center", fontFace:"Arial", wrap:false
    });

    // Ligne de séparation sous le titre
    s.addShape(pptx.ShapeType.line,{
      x:bx+0.2, y:BY+2.1, w:BW-0.4, h:0,
      line:{color:C.secondary, width:1}
    });

    // ── 3 items lisibles depuis 5 mètres ──────────────────────────────────
    ph.items.forEach((item,j)=>{
      s.addShape(pptx.ShapeType.roundRect,{
        x:bx+0.12, y:BY+2.3+j*1.0, w:BW-0.24, h:0.78,
        fill:{color:C.bg},
        line:{color:C.secondary, width:0.8},
        rectRadius:0.06
      });
      s.addText(tick+"  "+item,{
        x:bx+0.18, y:BY+2.3+j*1.0+0.05,
        w:BW-0.36, h:0.68,
        fontSize:20, bold:false, color:C.text,
        align:"center", valign:"middle", wrap:true
      });
    });

    // ── Connecteur entre boîtes ────────────────────────────────────────────
    if(i<N-1){
      const cx=bx+BW, cy=BY+BH/2;
      s.addShape(pptx.ShapeType.line,{
        x:cx, y:cy, w:GAP, h:0,
        line:{color:C.primary, width:2.5}
      });
      // Tête de flèche
      s.addShape(pptx.ShapeType.line,{
        x:cx+GAP-0.12, y:cy-0.11, w:0.12, h:0.11,
        line:{color:C.primary, width:2.5}
      });
      s.addShape(pptx.ShapeType.line,{
        x:cx+GAP-0.12, y:cy, w:0.12, h:0.11,
        line:{color:C.primary, width:2.5}
      });
    }
  });

  // ── Bande de synthèse en bas ───────────────────────────────────────────────
  const SY=BY+BH+0.18;
  s.addShape(pptx.ShapeType.roundRect,{
    x:X0, y:SY, w:N*ST-GAP, h:0.52,
    fill:{color:C.brown}, rectRadius:0.08
  });
  s.addText(
    tick+" 20 commits réalisés   ·   "+tick+" Historique Git complet   ·   "+tick+" Développement progressif et documenté",
    { x:X0+0.2, y:SY+0.04, w:N*ST-GAP-0.4, h:0.44,
      fontSize:20, bold:true, color:C.white,
      align:"center", valign:"middle" }
  );
}

// ── 52. Comparatif réservation ────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Évolution — Formulaire de réservation"); sNum(s,52);
  const sc=img(path.join(EVO,"comparatif-reservation.png"));
  if(sc) s.addImage({path:sc,x:0.35,y:1.15,w:12.6,h:5.7,sizing:{type:"contain",w:12.6,h:5.7}});
  s.addText("AVANT : 4 champs · statique · aucune API  →  APRÈS : 7 champs · fetch() · PostgreSQL · préremplissage",{x:0.35,y:6.95,w:12.6,h:0.28,fontSize:10,italic:true,color:C.muted,align:"center"});
}

// ── 53. Comparatif menu ───────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Évolution — Carte du restaurant"); sNum(s,53);
  const sc=img(path.join(EVO,"comparatif-menu.png"));
  if(sc) s.addImage({path:sc,x:0.35,y:1.15,w:12.6,h:5.7,sizing:{type:"contain",w:12.6,h:5.7}});
  s.addText("AVANT : placeholders génériques  →  APRÈS : vrais plats gastronomiques avec descriptions et prix réels",{x:0.35,y:6.95,w:12.6,h:0.28,fontSize:10,italic:true,color:C.muted,align:"center"});
}

// ── 54. Fonctionnalités livrées ───────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Fonctionnalités livrées"); sNum(s,54);
  const items=["Vitrine restaurant (accueil, galerie, footer)","Carte avec onglets dynamiques (Entrées / Plats / Desserts)","Formulaire de réservation connecté à PostgreSQL","Inscription sécurisée (hash bcrypt)","Connexion avec authentification JWT","Navigation adaptative (session localStorage)","Préremplissage automatique du formulaire","Dashboard administrateur des réservations","Indicateurs de statut colorés (En attente / Confirmée)","Responsive design mobile et desktop","CORS multi-origine sécurisé","CI/CD automatique GitHub → Netlify + Railway","Docker pour exécution locale","Tests fonctionnels réalisés","Déploiement production opérationnel","Documentation technique complète"];
  const half=Math.ceil(items.length/2);
  items.forEach((item,i)=>{
    const col=Math.floor(i/half), row=i%half;
    const x=col*6.45+0.35, y=row*0.49+1.2;
    s.addShape(pptx.ShapeType.roundRect,{x,y,w:6.05,h:0.42,fill:{color:"E8F5E9"},line:{color:"A5D6A7",width:0.8},rectRadius:0.05});
    s.addText(check+"  "+item,{x:x+0.1,y:y+0.04,w:5.85,h:0.34,fontSize:10,color:C.text});
  });
}

// ── 55. Difficultés & Solutions ───────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Difficultés rencontrées & Solutions apportées"); sNum(s,55);
  const cases=[
    {prob:"Déploiement Railway — serveur inaccessible en production",sol:"Variable PORT · EXPOSE 3000 · switch vers Nixpacks · health endpoint",c:C.primary},
    {prob:"URL API hardcodée (localhost) — non fonctionnel en ligne",sol:"Création de config.js avec l'URL Railway · API_BASE_URL dans tout app.js",c:C.blue},
    {prob:"Formulaire de réservation vide après connexion",          sol:"Lecture localStorage au chargement de la page · préremplissage automatique",c:C.teal},
  ];
  cases.forEach((c,i)=>{
    const y=1.25+i*1.12;
    s.addShape(pptx.ShapeType.roundRect,{x:0.35,y,w:5.9,h:0.88,fill:{"color":C.white},line:{color:c.c,width:2},rectRadius:0.08});
    s.addShape(pptx.ShapeType.rect,{x:0.35,y,w:0.5,h:0.88,fill:{color:c.c},rectRadius:0.05});
    s.addText(c.prob,{x:1.0,y:y+0.15,w:5.1,h:0.6,fontSize:11,color:C.text,wrap:true,valign:"middle"});
    s.addShape(pptx.ShapeType.roundRect,{x:6.5,y,w:6.5,h:0.88,fill:{color:"E8F5E9"},line:{color:C.green,width:2},rectRadius:0.08});
    s.addText(tick+"  "+c.sol,{x:6.65,y:y+0.15,w:6.2,h:0.6,fontSize:11,color:C.text,wrap:true,valign:"middle"});
  });
  s.addShape(pptx.ShapeType.line,{x:6.2,y:1.25,w:0,h:5.6,line:{color:C.secondary,width:0.5}});
  s.addText("Problème rencontré",{x:0.35,y:6.95,w:5.9,h:0.25,fontSize:9,bold:true,color:C.muted,align:"center"});
  s.addText("Solution apportée",{x:6.5,y:6.95,w:6.5,h:0.25,fontSize:9,bold:true,color:C.green,align:"center"});
}

// ── 56. Compétences développées ───────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Compétences développées"); sNum(s,56);
  const skills=[
    {icon:"📋",title:"Analyse du besoin client",         desc:"Identification des besoins visiteur, utilisateur et administrateur"},
    {icon:"🗄",title:"Conception de base de données",    desc:"Modèle ERD · 2 tables · contraintes SQL · initialisation automatique"},
    {icon:"🖥",title:"Développement frontend",           desc:"7 pages HTML/CSS/JS · responsive · onglets dynamiques · formulaires"},
    {icon:"⚙",title:"Développement backend",            desc:"API REST Express · MVC · controllers · repositories · routes"},
    {icon:"🔐",title:"Authentification JWT",             desc:"bcrypt · JWT · localStorage · session côté client"},
    {icon:"📡",title:"Création d'API REST",              desc:"5 routes actives · méthodes GET et POST · réponses JSON"},
    {icon:"🚀",title:"Déploiement cloud",               desc:"Netlify (frontend) · Railway (backend) · Supabase (BDD)"},
    {icon:"🔄",title:"Gestion Git / GitHub",             desc:"20 commits · CI/CD automatique · historique documenté"},
    {icon:"🔧",title:"Résolution de problèmes",          desc:"Debug Railway · refactoring URLs · fix UX post-login"},
  ];
  skills.forEach((sk,i)=>{
    const col=i%3, row=Math.floor(i/3);
    const x=col*4.25+0.35, y=row*1.85+1.25;
    s.addShape(pptx.ShapeType.roundRect,{x,y,w:4.0,h:1.65,fill:{color:C.white},line:{color:C.primary,width:1.5},rectRadius:0.1});
    s.addText(sk.title,{x:x+0.15,y:y+0.12,w:3.7,h:0.4,fontSize:11,bold:true,color:C.brown});
    s.addText(sk.desc,{x:x+0.15,y:y+0.58,w:3.7,h:0.9,fontSize:10,color:C.text,wrap:true,valign:"top"});
  });
}

// ════════════════════════════════════════════════════════════════════════════
// PARTIE 12 — COMPÉTENCES DNC (slides 57–60)
// ════════════════════════════════════════════════════════════════════════════
{ const s=intercalaire("12","Compétences DNC","validées par le projet"); sNum(s,57); }

// ── 58. Tableau compétences DNC ───────────────────────────────────────────────
{
  const s=pptx.addSlide(); lightBg(s); titleBar(s,"Compétences DNC — Correspondance référentiel"); sNum(s,58);
  const rows=[
    [{text:"Compétence DNC",   options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Preuve dans le projet",options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:"Fichier(s) clé",  options:{bold:true,fill:{color:C.brown},color:C.white}},
     {text:tick,              options:{bold:true,fill:{color:C.brown},color:C.white}}],
    ["Concevoir des interfaces","7 pages HTML responsives · charte graphique CSS","styles.css · HTML",tick],
    ["Développer des interfaces statiques","Pages accueil, galerie, menu, footer complet","index.html · gallery.html",tick],
    ["Développer des interfaces dynamiques","Onglets menu · préremplissage · updateNav()","app.js",tick],
    ["Intégrer des formulaires","3 formulaires : réservation, login, register","reservation.html · login.html",tick],
    ["Connecter une interface à une API","fetch() vers Railway API (POST/GET)","app.js · config.js",tick],
    ["Mettre en place une base de données","PostgreSQL Supabase · 2 tables · SQL préparé","repositories/ · initDatabase.js",tick],
    ["Gérer l'authentification","bcrypt (hashage) + JWT (token) + localStorage","auth.controller.js · app.js",tick],
    ["Déployer une application web","Netlify + Railway + CI/CD GitHub automatique","railway.json · Dockerfile",tick],
    ["Documenter le projet","README · docs/ · diagrammes techniques","docs/ · README.md",tick],
    ["Bonnes pratiques sécurité",".gitignore · .env · CORS · requêtes préparées","Backend complet",tick],
  ];
  s.addTable(rows,{x:0.35,y:1.2,w:12.6,colW:[3.5,4.6,3.0,0.8],border:{color:C.secondary},
    fontSize:10,fontFace:"Arial",fill:{color:C.white},color:C.text,rowH:0.45});
  s.addShape(pptx.ShapeType.roundRect,{x:0.35,y:6.55,w:12.6,h:0.45,fill:{color:"E8F5E9"},line:{color:C.green,width:1.5},rectRadius:0.08});
  s.addText(tick+"  10 compétences DNC démontrées et validées par le projet Quai Antique",{x:0.5,y:6.57,w:12.3,h:0.41,fontSize:11,bold:true,color:C.green});
}

// ── 59. Conclusion ────────────────────────────────────────────────────────────
{
  const s=pptx.addSlide();
  s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:"100%",h:"100%",fill:{color:C.dark}});
  s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:"100%",h:1.25,fill:{color:C.primary}});
  s.addText("Conclusion",{x:0.35,y:0.2,w:12.6,h:0.85,fontSize:28,bold:true,color:C.white,align:"center"});
  const chef=img(path.join(ROOT,"assets/images/chef-quality.jpg"));
  if(chef) s.addImage({path:chef,x:8.8,y:1.3,w:4.2,h:5.8,sizing:{type:"cover",w:4.2,h:5.8},transparency:42});
  const pts=["J'ai conçu et développé un site web gastronomique de A à Z","J'ai structuré le backend selon le pattern MVC (Routes → Controllers → Repositories)","J'ai sécurisé les accès utilisateur avec bcrypt et JWT","J'ai connecté un frontend à une API REST et une base de données PostgreSQL","J'ai déployé l'application en production sur Netlify et Railway","J'ai géré l'intégralité du projet avec Git et un CI/CD automatique"];
  pts.forEach((p,i)=>{
    s.addShape(pptx.ShapeType.roundRect,{x:0.35,y:1.5+i*0.9,w:8.1,h:0.75,fill:{color:C.brown},line:{color:C.primary,width:1},rectRadius:0.08});
    s.addText(check+"  "+p,{x:0.5,y:1.54+i*0.9,w:7.8,h:0.67,fontSize:12,color:C.white,wrap:true,valign:"middle"});
  });
  sNum(s,59);
}

// ── 60. Liens & Ressources ────────────────────────────────────────────────────
{
  const s=pptx.addSlide(); darkBg(s);
  s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:"100%",h:1.1,fill:{color:C.primary}});
  s.addText("Liens & Ressources",{x:0.35,y:0.15,w:12.6,h:0.8,fontSize:24,bold:true,color:C.white,align:"center"});
  sNum(s,60);
  const links=[
    ["Site Netlify","https://quai-antique-projet.netlify.app/",C.blue],
    ["API Railway","https://quaiantiqueproject-production.up.railway.app",C.purple],
    ["Dépôt GitHub","github.com/catcodecat/Quai_Antique_Project",C.brown],
    ["Compte démo","demo@quaiantique.com · mot de passe : demo123",C.green],
  ];
  links.forEach((l,i)=>{
    s.addShape(pptx.ShapeType.roundRect,{x:0.35,y:1.3+i*1.38,w:12.6,h:1.15,fill:{color:C.brown},line:{color:l[2],width:2.5},rectRadius:0.1});
    s.addText(l[0],{x:0.6,y:1.47+i*1.38,w:2.8,h:0.5,fontSize:13,bold:true,color:C.secondary});
    s.addText(l[1],{x:3.55,y:1.47+i*1.38,w:9.1,h:0.5,fontSize:12,fontFace:"Courier New",color:"90CAF9"});
  });
  s.addText("Larisa Faessel · Dossier Projet · Développeur No Code (DNC) · Studi · Cohorte Sept–Oct 2026",
    {x:0.35,y:6.9,w:12.6,h:0.3,fontSize:10,italic:true,color:C.muted,align:"center"});
}

// ════════════════════════════════════════════════════════════════════════════
// EXPORT
// ════════════════════════════════════════════════════════════════════════════
const outPath = path.join(__dirname,"Quai_Antique_Dossier_Projet_DNC_FINAL.pptx");
pptx.writeFile({ fileName: outPath })
  .then(()=>console.log(`\n✅ PowerPoint FINAL généré :\n   ${outPath}\n   ${TOTAL} diapositives\n`))
  .catch(err=>{ console.error("Erreur:", err.message); process.exit(1); });
