const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const out = path.join(__dirname, "pptx-src");
const mediaDir = path.join(out, "ppt", "media");
const slidesDir = path.join(out, "ppt", "slides");
const slideRelsDir = path.join(slidesDir, "_rels");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function cleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  ensureDir(dir);
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function textRuns(text, size = 20, color = "222222", bold = false) {
  return String(text)
    .split("\n")
    .map((line) => {
      const b = bold ? "<a:b/>" : "";
      return `<a:p><a:r><a:rPr lang="fr-FR" sz="${size * 100}">${b}<a:solidFill><a:srgbClr val="${color}"/></a:solidFill></a:rPr><a:t>${xmlEscape(line)}</a:t></a:r></a:p>`;
    })
    .join("");
}

function textBox(id, x, y, w, h, text, options = {}) {
  const size = options.size || 20;
  const color = options.color || "222222";
  const bold = options.bold || false;
  const fill = options.fill
    ? `<a:solidFill><a:srgbClr val="${options.fill}"/></a:solidFill>`
    : "<a:noFill/>";
  const line = options.line
    ? `<a:ln><a:solidFill><a:srgbClr val="${options.line}"/></a:solidFill></a:ln>`
    : "<a:ln><a:noFill/></a:ln>";
  return `
    <p:sp>
      <p:nvSpPr><p:cNvPr id="${id}" name="Text ${id}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>
      <p:spPr>
        <a:xfrm><a:off x="${x}" y="${y}"/><a:ext cx="${w}" cy="${h}"/></a:xfrm>
        <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
        ${fill}${line}
      </p:spPr>
      <p:txBody>
        <a:bodyPr wrap="square" lIns="120000" tIns="90000" rIns="120000" bIns="90000"/>
        <a:lstStyle/>
        ${textRuns(text, size, color, bold)}
      </p:txBody>
    </p:sp>`;
}

function imageShape(id, relId, x, y, w, h) {
  return `
    <p:pic>
      <p:nvPicPr><p:cNvPr id="${id}" name="Image ${id}"/><p:cNvPicPr/><p:nvPr/></p:nvPicPr>
      <p:blipFill>
        <a:blip r:embed="${relId}"/>
        <a:stretch><a:fillRect/></a:stretch>
      </p:blipFill>
      <p:spPr>
        <a:xfrm><a:off x="${x}" y="${y}"/><a:ext cx="${w}" cy="${h}"/></a:xfrm>
        <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
      </p:spPr>
    </p:pic>`;
}

function slideXml(bg, shapes) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
       xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
       xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:bg><p:bgPr><a:solidFill><a:srgbClr val="${bg}"/></a:solidFill></p:bgPr></p:bg>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
      ${shapes.join("\n")}
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>`;
}

function slideRelXml(imageName) {
  const imageRel = imageName
    ? `<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/${imageName}"/>`
    : "";
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
  ${imageRel}
</Relationships>`;
}

const EMU = 914400;
const inch = (v) => Math.round(v * EMU);
const slides = [
  {
    title: "Projet Quai Antique",
    subtitle: "Site vitrine d'un restaurant gastronomique",
    text: "Présentation du code, des pages et des outils utilisés.",
    img: "01-home.png",
  },
  {
    title: "Objectif du projet",
    text:
      "Créer un site clair et responsive pour le restaurant Quai Antique.\nPrésenter la structure HTML, les styles CSS et l'interactivité JavaScript.\nPréparer un support facile à expliquer pendant l'examen.",
    code: "HTML5 + CSS3 + JavaScript\nPages : Accueil, Galerie, La carte,\nRéservation, Connexion, Inscription",
  },
  {
    title: "Charte graphique",
    text:
      "La maquette utilise une ambiance élégante et chaleureuse.\nLes couleurs principales sont le brun foncé, le doré et le blanc.\nLes boutons dorés sont réutilisés sur toutes les pages.",
    code: ":root {\n  --primary: #9b6a22;\n  --dark: #3c2e24;\n  --bg-dark: #211817;\n}",
    img: "01-home.png",
  },
  {
    title: "Header et navigation",
    text:
      "Le header contient le nom du restaurant et le menu principal.\nChaque lien ouvre une page HTML différente.\nLa navigation reste identique sur toutes les pages.",
    code: '<header class="site-header">\n  <a class="brand">Quai Antique</a>\n  <nav class="main-nav">...</nav>\n</header>',
    img: "01-home.png",
  },
  {
    title: "Page Accueil : hero",
    text:
      "Le hero est le premier bloc visible.\nIl présente le restaurant avec une image de fond, un titre et un bouton de réservation.\nL'image est maintenant nette et sauvegardée localement.",
    code: '<section class="hero hero-home">\n  <h1>Quai Antique</h1>\n  <a class="btn">Réserver</a>\n</section>',
    img: "01-home.png",
  },
  {
    title: "Body de la page Accueil",
    text:
      "Le contenu principal est organisé avec plusieurs sections.\nChaque section utilise du texte, une image et parfois un bouton.\nCSS Grid permet d'aligner proprement le texte et l'image.",
    code: '<main>\n  <section class="intro section-light">...</section>\n  <section class="fresh section-dark">...</section>\n</main>',
    img: "01-home.png",
  },
  {
    title: "Galerie",
    text:
      "La galerie présente les photos du restaurant et des plats.\nLes images ont été remplacées par des photos de meilleure qualité.\nLes cartes sont organisées avec une grille responsive.",
    code: '<div class="gallery-grid">\n  <article class="gallery-card">\n    <img src="assets/images/dish-salmon.jpg">\n  </article>\n</div>',
    img: "02-gallery.png",
  },
  {
    title: "La carte",
    text:
      "La page La carte contient trois catégories : Entrées, Plats et Desserts.\nLes boutons de catégories sont maintenant actifs.\nJavaScript affiche uniquement la catégorie sélectionnée.",
    code: 'tab.addEventListener("click", (event) => {\n  event.preventDefault();\n  showMenuPanel(tab.dataset.tab);\n});',
    img: "04-menu-desserts.png",
  },
  {
    title: "Réservation en ligne",
    text:
      "La page réservation utilise un formulaire HTML.\nL'utilisateur peut choisir une date, une heure, le nombre de personnes et ajouter ses allergies.\nLe bouton est actif et affiche un message de confirmation.",
    code: '<form class="form-panel">\n  <input type="date">\n  <input type="time">\n  <select>...</select>\n</form>',
    img: "05-reservation.png",
  },
  {
    title: "Connexion et inscription",
    text:
      "La page Mon compte contient une connexion avec des champs vides.\nL'e-mail et le mot de passe de test ont été supprimés.\nLe lien Inscrivez-vous ici ouvre une page d'inscription.",
    code: '<input id="email" type="email">\n<input id="password" type="password">\n<a href="register.html">Inscrivez-vous ici !</a>',
    img: "06-login.png",
  },
  {
    title: "Footer et responsive",
    text:
      "Le footer affiche les horaires, l'adresse et le contact.\nIl utilise une image de fond plus nette.\nLa règle @media adapte la mise en page aux petits écrans.",
    code: '@media (max-width: 760px) {\n  .gallery-grid,\n  .site-footer {\n    grid-template-columns: 1fr;\n  }\n}',
    img: "01-home.png",
  },
  {
    title: "Conclusion",
    text:
      "Le projet respecte la structure demandée : header, body, pages, formulaires et footer.\nLe site est consultable localement depuis index.html.\nLa présentation montre le résultat, le code et les choix techniques.",
    code: "Fichiers principaux :\nindex.html\nstyles.css\napp.js\nassets/images/",
  },
];

cleanDir(out);
ensureDir(mediaDir);
ensureDir(slidesDir);
ensureDir(slideRelsDir);
ensureDir(path.join(out, "_rels"));
ensureDir(path.join(out, "docProps"));
ensureDir(path.join(out, "ppt", "_rels"));
ensureDir(path.join(out, "ppt", "slideLayouts"));
ensureDir(path.join(out, "ppt", "slideLayouts", "_rels"));
ensureDir(path.join(out, "ppt", "slideMasters"));
ensureDir(path.join(out, "ppt", "slideMasters", "_rels"));
ensureDir(path.join(out, "ppt", "theme"));

const screenshotDir = path.join(__dirname, "screenshots");
const mediaNames = new Map();
slides.forEach((slide, index) => {
  if (!slide.img) return;
  const name = `image${index + 1}.png`;
  fs.copyFileSync(path.join(screenshotDir, slide.img), path.join(mediaDir, name));
  mediaNames.set(index, name);
});

slides.forEach((slide, i) => {
  let id = 2;
  const shapes = [];
  shapes.push(textBox(id++, inch(0.55), inch(0.35), inch(12.2), inch(0.72), slide.title, {
    size: 30,
    color: i === 0 ? "FFFFFF" : "9B6A22",
    bold: true,
  }));

  if (i === 0) {
    shapes.push(textBox(id++, inch(0.8), inch(1.25), inch(5.5), inch(1.3), slide.subtitle, {
      size: 25,
      color: "FFFFFF",
      bold: true,
    }));
    shapes.push(textBox(id++, inch(0.8), inch(2.55), inch(5.2), inch(1), slide.text, {
      size: 18,
      color: "F6E7D6",
    }));
    shapes.push(imageShape(id++, "rId2", inch(6.25), inch(1.15), inch(6.3), inch(4.65)));
  } else {
    shapes.push(textBox(id++, inch(0.6), inch(1.15), inch(5.3), inch(2.15), slide.text, {
      size: 18,
      color: "222222",
    }));
    if (slide.code) {
      shapes.push(textBox(id++, inch(0.6), inch(3.45), inch(5.3), inch(2.65), slide.code, {
        size: 14,
        color: "FFFFFF",
        fill: "211817",
        line: "3C2E24",
      }));
    }
    if (slide.img) {
      shapes.push(imageShape(id++, "rId2", inch(6.25), inch(1.2), inch(6.45), inch(4.85)));
    } else {
      shapes.push(textBox(id++, inch(6.25), inch(1.45), inch(5.8), inch(3.7), "Quai Antique\nHTML • CSS • JavaScript", {
        size: 28,
        color: "FFFFFF",
        bold: true,
        fill: "3C2E24",
      }));
    }
  }

  fs.writeFileSync(
    path.join(slidesDir, `slide${i + 1}.xml`),
    slideXml(i === 0 ? "3C2E24" : "F7F7F7", shapes),
  );
  fs.writeFileSync(path.join(slideRelsDir, `slide${i + 1}.xml.rels`), slideRelXml(mediaNames.get(i)));
});

const slideOverrides = slides
  .map((_, i) => `<Override PartName="/ppt/slides/slide${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`)
  .join("");

fs.writeFileSync(path.join(out, "[Content_Types].xml"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Default Extension="png" ContentType="image/png"/>
  ${slideOverrides}
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>
  <Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>
  <Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`);

fs.writeFileSync(path.join(out, "_rels", ".rels"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`);

fs.writeFileSync(path.join(out, "docProps", "core.xml"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:dcterms="http://purl.org/dc/terms/"
  xmlns:dcmitype="http://purl.org/dc/dcmitype/"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Projet Quai Antique</dc:title>
  <dc:creator>Codex</dc:creator>
  <cp:lastModifiedBy>Codex</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">2026-04-26T00:00:00Z</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">2026-04-26T00:00:00Z</dcterms:modified>
</cp:coreProperties>`);

fs.writeFileSync(path.join(out, "docProps", "app.xml"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"
  xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Codex</Application>
  <PresentationFormat>On-screen Show (16:9)</PresentationFormat>
  <Slides>${slides.length}</Slides>
</Properties>`);

const slideIds = slides.map((_, i) => `<p:sldId id="${256 + i}" r:id="rId${i + 2}"/>`).join("");
fs.writeFileSync(path.join(out, "ppt", "presentation.xml"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
  xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
  xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>
  <p:sldIdLst>${slideIds}</p:sldIdLst>
  <p:sldSz cx="12192000" cy="6858000" type="screen16x9"/>
  <p:notesSz cx="6858000" cy="9144000"/>
</p:presentation>`);

const presentationRels = [
  '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>',
  ...slides.map((_, i) => `<Relationship Id="rId${i + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i + 1}.xml"/>`),
  `<Relationship Id="rId${slides.length + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>`,
].join("");
fs.writeFileSync(path.join(out, "ppt", "_rels", "presentation.xml.rels"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${presentationRels}</Relationships>`);

fs.writeFileSync(path.join(out, "ppt", "slideLayouts", "slideLayout1.xml"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
  xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
  xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank" preserve="1">
  <p:cSld name="Blank"><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/></p:spTree></p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sldLayout>`);
fs.writeFileSync(path.join(out, "ppt", "slideLayouts", "_rels", "slideLayout1.xml.rels"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/>
</Relationships>`);

fs.writeFileSync(path.join(out, "ppt", "slideMasters", "slideMaster1.xml"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
  xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
  xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/></p:spTree></p:cSld>
  <p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
  <p:sldLayoutIdLst><p:sldLayoutId id="1" r:id="rId1"/></p:sldLayoutIdLst>
</p:sldMaster>`);
fs.writeFileSync(path.join(out, "ppt", "slideMasters", "_rels", "slideMaster1.xml.rels"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/>
</Relationships>`);

fs.writeFileSync(path.join(out, "ppt", "theme", "theme1.xml"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Quai Antique">
  <a:themeElements>
    <a:clrScheme name="Quai Antique">
      <a:dk1><a:srgbClr val="211817"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1>
      <a:dk2><a:srgbClr val="3C2E24"/></a:dk2><a:lt2><a:srgbClr val="F7F7F7"/></a:lt2>
      <a:accent1><a:srgbClr val="9B6A22"/></a:accent1><a:accent2><a:srgbClr val="C5BAA4"/></a:accent2>
      <a:accent3><a:srgbClr val="6B4B2A"/></a:accent3><a:accent4><a:srgbClr val="8C7A64"/></a:accent4>
      <a:accent5><a:srgbClr val="FFFFFF"/></a:accent5><a:accent6><a:srgbClr val="222222"/></a:accent6>
      <a:hlink><a:srgbClr val="9B6A22"/></a:hlink><a:folHlink><a:srgbClr val="9B6A22"/></a:folHlink>
    </a:clrScheme>
    <a:fontScheme name="Quai Antique"><a:majorFont><a:latin typeface="Montserrat"/></a:majorFont><a:minorFont><a:latin typeface="Arial"/></a:minorFont></a:fontScheme>
    <a:fmtScheme name="Quai Antique"><a:fillStyleLst/><a:lnStyleLst/><a:effectStyleLst/><a:bgFillStyleLst/></a:fmtScheme>
  </a:themeElements>
</a:theme>`);

console.log(out);
