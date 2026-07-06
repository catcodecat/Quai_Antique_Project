/**
 * Captures d'écran évolution — Quai Antique
 * Reconstruit les anciennes versions à partir de l'historique Git
 * et génère des comparatifs AVANT → APRÈS
 */
const { chromium } = require('playwright');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT    = path.join(__dirname, '..');
const CSS     = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8');
const OUT     = path.join(__dirname, 'evolution');

// ─── Helper : récupérer un fichier à un commit donné ───────────────────────
function gitShow(commit, filePath) {
  try {
    return execSync(`git -C "${ROOT}" show ${commit}:${filePath}`, { encoding: 'utf8' });
  } catch {
    return null;
  }
}

// ─── Helper : rendre un HTML autonome (CSS inline, assets en URL absolues) ─
function selfContained(html, commit, pageTitle) {
  // Inject inline CSS so no external file needed
  const withCss = html.replace(
    /<link[^>]+styles\.css[^>]*>/,
    `<style>${CSS}</style>`
  );
  // Add version badge
  return withCss.replace(
    '</body>',
    `<div style="position:fixed;bottom:16px;right:16px;background:#9b6a22;color:#fff;
      padding:6px 14px;border-radius:20px;font-family:Arial,sans-serif;
      font-size:12px;font-weight:700;z-index:9999;box-shadow:0 2px 8px rgba(0,0,0,0.3)">
      ${pageTitle}
    </div></body>`
  );
}

// ─── Helper : capture d'une page HTML locale ────────────────────────────────
async function capture(page, htmlContent, filename, viewport = { width: 1280, height: 800 }) {
  const tmpFile = path.join(OUT, `_tmp_${Date.now()}.html`);
  fs.writeFileSync(tmpFile, htmlContent, 'utf8');
  await page.setViewportSize(viewport);
  await page.goto(`file:///${tmpFile.replace(/\\/g, '/')}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);
  const outPath = path.join(OUT, filename);
  await page.screenshot({ path: outPath, fullPage: false });
  fs.unlinkSync(tmpFile);
  console.log(`  ✓ ${filename}`);
  return outPath;
}

// ─── Helper : créer image comparative AVANT → APRÈS ─────────────────────────
async function makeSideBySide(page, beforePath, afterPath, title, outFile) {
  const beforeB64 = fs.readFileSync(beforePath).toString('base64');
  const afterB64  = fs.readFileSync(afterPath).toString('base64');

  const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#211817; font-family:'Segoe UI',Arial,sans-serif; }
  .header { background:#3c2e24; padding:18px 32px; }
  .header h2 { color:#c5baa4; font-size:18px; font-weight:700; letter-spacing:1px; }
  .header p  { color:#5f5a54; font-size:12px; margin-top:4px; }
  .row { display:flex; gap:0; }
  .col { flex:1; }
  .label { padding:10px 20px; font-size:13px; font-weight:700; text-align:center; }
  .avant { background:#c62828; color:#fff; }
  .apres { background:#2e7d32; color:#fff; }
  img { width:100%; display:block; border:0; }
  .divider { width:6px; background:#9b6a22; flex-shrink:0; }
</style>
</head>
<body>
  <div class="header">
    <h2>${title}</h2>
    <p>Évolution du projet Quai Antique · Soutenance DWWM</p>
  </div>
  <div class="row">
    <div class="col">
      <div class="label avant">AVANT</div>
      <img src="data:image/png;base64,${beforeB64}"/>
    </div>
    <div class="divider"></div>
    <div class="col">
      <div class="label apres">APRÈS</div>
      <img src="data:image/png;base64,${afterB64}"/>
    </div>
  </div>
</body></html>`;

  const tmpFile = path.join(OUT, `_cmp_${Date.now()}.html`);
  fs.writeFileSync(tmpFile, html, 'utf8');
  await page.setViewportSize({ width: 2560, height: 850 });
  await page.goto(`file:///${tmpFile.replace(/\\/g, '/')}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);
  const outPath = path.join(OUT, outFile);
  await page.screenshot({ path: outPath, fullPage: true });
  fs.unlinkSync(tmpFile);
  console.log(`  ✓ [comparatif] ${outFile}`);
}

// ────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n=== Quai Antique — Captures évolution (AVANT→APRÈS) ===\n');
  const browser = await chromium.launch({ headless: true });
  const ctx  = await browser.newContext();
  const page = await ctx.newPage();

  // ── 1. FORMULAIRE DE RÉSERVATION ──────────────────────────────────────────
  console.log('── 1. Formulaire de réservation ──');
  // V1 : première remise — pas de nom/email, formulaire générique
  const resV1raw = gitShow('e243fd5', 'reservation.html');
  const resV1 = selfContained(resV1raw, 'e243fd5', 'v1 · 19 mai — formulaire basique');
  const resV1path = await capture(page, resV1, 'reservation-v1-avant.png');

  // V3 : connecté au backend avec nom/prénom/email
  const resV3raw = gitShow('a3db5b7', 'reservation.html');
  const resV3 = selfContained(resV3raw, 'a3db5b7', 'v3 · 20 mai — connecté à l\'API');
  const resV3path = await capture(page, resV3, 'reservation-v2-apres.png');

  await makeSideBySide(page, resV1path, resV3path,
    'Formulaire de réservation — AVANT → APRÈS',
    'comparatif-reservation.png');

  // ── 2. CARTE DU RESTAURANT ────────────────────────────────────────────────
  console.log('\n── 2. Carte du restaurant ──');
  // V1 : placeholders "Entrée 1", "Plat 1"
  const menuV1raw = gitShow('e243fd5', 'menu.html');
  const menuV1 = selfContained(menuV1raw, 'e243fd5', 'v1 · 19 mai — placeholders');
  const menuV1path = await capture(page, menuV1, 'menu-v1-avant.png');

  // V3 : vrais plats + vrais prix
  const menuV3raw = gitShow('7bd7efb', 'menu.html');
  const menuV3 = selfContained(menuV3raw, '7bd7efb', 'v3 · 27 mai — vrais plats + prix');
  const menuV3path = await capture(page, menuV3, 'menu-v3-apres.png');

  await makeSideBySide(page, menuV1path, menuV3path,
    'Carte du restaurant — AVANT (placeholders) → APRÈS (vrais plats)',
    'comparatif-menu.png');

  // Intermédiaire : plats réels mais prix "— €"
  const menuV2raw = gitShow('e3b0d92', 'menu.html');
  const menuV2 = selfContained(menuV2raw, 'e3b0d92', 'v2 · 27 mai — plats réels, prix manquants');
  await capture(page, menuV2, 'menu-v2-intermediaire.png');

  // ── 3. APP.JS — ÉVOLUTION DU CODE ─────────────────────────────────────────
  console.log('\n── 3. app.js — évolution ──');
  // V1 : formulaire générique (affiche juste "demande prise en compte")
  const appV1 = gitShow('e243fd5', 'app.js');
  // V2 : fetch localhost:3003 hardcodé
  const appV2 = gitShow('a3db5b7', 'app.js');
  // V_final : API_BASE_URL + auth + préremplissage
  const appVf = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');

  const appCompareHtml = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#1e1e1e; font-family:'Segoe UI',Arial,sans-serif; }
  .header { background:#3c2e24; padding:16px 24px; }
  .header h2 { color:#c5baa4; font-size:16px; font-weight:700; }
  .grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:0; }
  .col { border-right:3px solid #9b6a22; }
  .col:last-child { border-right:0; }
  .label { padding:8px 16px; font-size:12px; font-weight:700; text-align:center; }
  .l1 { background:#b71c1c; color:#fff; }
  .l2 { background:#e65100; color:#fff; }
  .l3 { background:#1b5e20; color:#fff; }
  pre { padding:16px; font-size:10px; line-height:1.6; color:#d4d4d4;
        white-space:pre-wrap; word-break:break-word; overflow:hidden;
        max-height:600px; background:#1e1e1e; }
  .kw  { color:#569cd6; }
  .str { color:#ce9178; }
  .cmt { color:#6a9955; }
</style>
</head>
<body>
  <div class="header"><h2>app.js — Évolution en 3 étapes</h2></div>
  <div class="grid">
    <div class="col">
      <div class="label l1">V1 · 19 mai · Formulaire statique (37 lignes)</div>
      <pre>${escapeHtml(appV1.slice(0, 1200))}</pre>
    </div>
    <div class="col">
      <div class="label l2">V2 · 20 mai · fetch() localhost hardcodé</div>
      <pre>${escapeHtml((appV2 || '').slice(0, 1200))}</pre>
    </div>
    <div class="col">
      <div class="label l3">V3 · 27 mai · API_BASE_URL + Auth + Préremplissage (178 lignes)</div>
      <pre>${escapeHtml(appVf.slice(0, 1200))}</pre>
    </div>
  </div>
</body></html>`;

  function escapeHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  const appTmp = path.join(OUT, '_app_compare.html');
  fs.writeFileSync(appTmp, appCompareHtml, 'utf8');
  await page.setViewportSize({ width: 1800, height: 900 });
  await page.goto(`file:///${appTmp.replace(/\\/g, '/')}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, 'comparatif-appjs.png'), fullPage: true });
  fs.unlinkSync(appTmp);
  console.log('  ✓ comparatif-appjs.png');

  // ── 4. BACKEND — PREMIÈRE ROUTE API ───────────────────────────────────────
  console.log('\n── 4. Backend — évolution routes API ──');
  const routeV1 = gitShow('92ce011', 'backend/src/routes/reservation.routes.js');
  const routeVf = fs.readFileSync(path.join(ROOT, 'backend/src/routes/reservation.routes.js'), 'utf8');
  const authRoute = fs.readFileSync(path.join(ROOT, 'backend/src/routes/auth.routes.js'), 'utf8');
  const ctrlV1 = gitShow('92ce011', 'backend/src/controllers/reservation.controller.js');
  const dbV1 = gitShow('92ce011', 'backend/src/config/initDatabase.js');

  const backendHtml = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#1e1e1e; font-family:'Segoe UI',Arial,sans-serif; }
  .header { background:#3c2e24; padding:16px 24px; }
  .header h2 { color:#c5baa4; font-size:16px; font-weight:700; }
  .header p  { color:#5f5a54; font-size:12px; margin-top:3px; }
  .grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:0; }
  .col { border-right:3px solid #9b6a22; }
  .col:last-child { border-right:0; }
  .label { padding:8px 16px; font-size:11px; font-weight:700; text-align:center; background:#3c2e24; color:#c5baa4; }
  .sublabel { padding:4px 16px; font-size:10px; text-align:center; background:#211817; color:#5f5a54; }
  pre { padding:14px; font-size:10px; line-height:1.6; color:#d4d4d4;
        white-space:pre-wrap; word-break:break-word; background:#1e1e1e;
        border-top:1px solid #333; max-height:520px; overflow:hidden; }
</style>
</head>
<body>
  <div class="header">
    <h2>Backend Express — Évolution des routes et de la base de données</h2>
    <p>Commit 92ce011 (19 mai) → Commit cd0d6fa (27 mai)</p>
  </div>
  <div class="grid">
    <div class="col">
      <div class="label">Routes — V1 (19 mai)</div>
      <div class="sublabel">Seulement POST /api/reservations</div>
      <pre>${escHtml(routeV1 || '')}</pre>
      <div class="label" style="margin-top:2px">Routes — FINAL (27 mai)</div>
      <div class="sublabel">+ GET /api/reservations + auth routes</div>
      <pre>${escHtml(routeVf + '\n\n// auth.routes.js\n' + authRoute)}</pre>
    </div>
    <div class="col">
      <div class="label">Controller réservation V1</div>
      <div class="sublabel">Pas de gestion d'erreur DB avancée</div>
      <pre>${escHtml((ctrlV1 || '').slice(0, 1400))}</pre>
    </div>
    <div class="col">
      <div class="label">initDatabase.js V1</div>
      <div class="sublabel">Seulement table reservations</div>
      <pre>${escHtml((dbV1 || '').slice(0, 900))}</pre>
      <div class="label" style="margin-top:2px">initDatabase.js FINAL</div>
      <div class="sublabel">+ table users (bcrypt)</div>
      <pre>/* Table users ajoutée au commit 62421b7 */
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);</pre>
    </div>
  </div>
</body></html>`;

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  const beTmp = path.join(OUT, '_be_compare.html');
  fs.writeFileSync(beTmp, backendHtml, 'utf8');
  await page.setViewportSize({ width: 1800, height: 900 });
  await page.goto(`file:///${beTmp.replace(/\\/g, '/')}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, 'comparatif-backend.png'), fullPage: true });
  fs.unlinkSync(beTmp);
  console.log('  ✓ comparatif-backend.png');

  // ── 5. CHRONOLOGIE VISUELLE ───────────────────────────────────────────────
  console.log('\n── 5. Timeline visuelle ──');
  const timelineHtml = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#211817; font-family:'Segoe UI',Arial,sans-serif; padding:32px; min-height:500px; }
  h1 { color:#c5baa4; font-size:20px; text-align:center; margin-bottom:8px; font-weight:700; letter-spacing:1px; }
  p.sub { color:#5f5a54; font-size:12px; text-align:center; margin-bottom:40px; }
  .timeline { position:relative; }
  .timeline::before {
    content:''; position:absolute; left:160px; top:0; bottom:0;
    width:3px; background:#9b6a22; opacity:0.4;
  }
  .entry { display:flex; gap:0; margin-bottom:24px; align-items:flex-start; }
  .date  { width:150px; text-align:right; padding-right:24px; padding-top:10px;
           flex-shrink:0; }
  .date-label { font-size:11px; font-weight:700; color:#9b6a22; }
  .date-hash  { font-size:9px; color:#5f5a54; font-family:monospace; margin-top:2px; }
  .dot { width:14px; height:14px; border-radius:50%; flex-shrink:0;
         margin-top:12px; margin-right:0; border:3px solid #9b6a22; }
  .dot.first  { background:#9b6a22; }
  .dot.feat   { background:#2e7d32; border-color:#2e7d32; }
  .dot.fix    { background:#1565c0; border-color:#1565c0; }
  .dot.backend{ background:#7c3fe4; border-color:#7c3fe4; }
  .dot.deploy { background:#e65100; border-color:#e65100; }
  .card { margin-left:20px; background:#3c2e24; border-radius:8px;
          padding:12px 16px; flex:1; }
  .card h3 { color:#ffffff; font-size:13px; font-weight:700; margin-bottom:4px; }
  .card p  { color:#c5baa4; font-size:11px; line-height:1.6; }
  .tag { display:inline-block; padding:2px 8px; border-radius:10px;
         font-size:9px; font-weight:700; margin-right:4px; margin-top:4px; }
  .t-feat   { background:#1b5e20; color:#a5d6a7; }
  .t-fix    { background:#0d47a1; color:#90caf9; }
  .t-backend{ background:#4a148c; color:#ce93d8; }
  .t-deploy { background:#bf360c; color:#ffccbc; }
  .t-front  { background:#3c2e24; color:#c5baa4; border:1px solid #9b6a22; }
</style>
</head>
<body>
  <h1>Chronologie du projet Quai Antique</h1>
  <p class="sub">20 commits · 19 mai 2026 → 27 mai 2026 · 9 jours de développement</p>
  <div class="timeline">

    <div class="entry">
      <div class="date"><div class="date-label">19 mai · 13h28</div><div class="date-hash">e243fd5</div></div>
      <div class="dot first"></div>
      <div class="card">
        <h3>Premier commit — Site vitrine statique</h3>
        <p>Pages HTML : accueil, galerie, carte, réservation, login, register. CSS complet (400 lignes). app.js basique (tabs + message générique). Formulaire sans backend.</p>
        <span class="tag t-front">HTML5</span><span class="tag t-front">CSS3</span><span class="tag t-front">JS vanilla</span><span class="tag t-front">Docker Nginx</span>
      </div>
    </div>

    <div class="entry">
      <div class="date"><div class="date-label">19 mai · 13h31–33</div><div class="date-hash">ae6a55b → f3242e4</div></div>
      <div class="dot feat"></div>
      <div class="card">
        <h3>Documentation ajoutée</h3>
        <p>docs/git-github.md, docs/docker.md — documentation de l'environnement de travail.</p>
        <span class="tag t-front">Docs</span>
      </div>
    </div>

    <div class="entry">
      <div class="date"><div class="date-label">19 mai · 16h36–39</div><div class="date-hash">b7478c2 → e62f531</div></div>
      <div class="dot feat"></div>
      <div class="card">
        <h3>Présentation première remise</h3>
        <p>PPTX + PDF générés, mini présentation optimisée. Captures d'écran du site statique.</p>
        <span class="tag t-front">Présentation</span>
      </div>
    </div>

    <div class="entry">
      <div class="date"><div class="date-label">19 mai · 17h24</div><div class="date-hash">92ce011</div></div>
      <div class="dot backend"></div>
      <div class="card">
        <h3>Ajout du backend Node.js / Express</h3>
        <p>Structure MVC complète : server.js, app.js, routes, controllers, repositories. Table reservations en PostgreSQL. Seule route : POST /api/reservations. Pas d'auth encore.</p>
        <span class="tag t-backend">Node.js</span><span class="tag t-backend">Express</span><span class="tag t-backend">PostgreSQL</span><span class="tag t-backend">MVC</span>
      </div>
    </div>

    <div class="entry">
      <div class="date"><div class="date-label">19 mai · 17h46</div><div class="date-hash">d5656dc</div></div>
      <div class="dot fix"></div>
      <div class="card">
        <h3>Fix démarrage backend</h3>
        <p>Correction du point d'entrée serveur.</p>
        <span class="tag t-fix">Fix</span>
      </div>
    </div>

    <div class="entry">
      <div class="date"><div class="date-label">20 mai · 11h37</div><div class="date-hash">3775f61</div></div>
      <div class="dot feat"></div>
      <div class="card">
        <h3>Test des routes API</h3>
        <p>Vérification des endpoints, ajout GET /api/reservations.</p>
        <span class="tag t-backend">Test API</span>
      </div>
    </div>

    <div class="entry">
      <div class="date"><div class="date-label">20 mai · 15h10</div><div class="date-hash">a3db5b7</div></div>
      <div class="dot feat"></div>
      <div class="card">
        <h3>Connexion formulaire → backend → base de données</h3>
        <p>reservation.html : ajout prénom, nom, email. app.js : fetch() vers localhost:3003. Première réservation réelle envoyée en base PostgreSQL.</p>
        <span class="tag t-feat">Formulaire complet</span><span class="tag t-backend">fetch() API</span>
      </div>
    </div>

    <div class="entry">
      <div class="date"><div class="date-label">26 mai · 17h50–18h39</div><div class="date-hash">bd8536d → 2587c92</div></div>
      <div class="dot deploy"></div>
      <div class="card">
        <h3>Déploiement Railway — fixes successifs</h3>
        <p>4 commits pour résoudre les problèmes Railway : PORT binding, EXPOSE 3000, switch Nixpacks, health endpoint.</p>
        <span class="tag t-deploy">Railway</span><span class="tag t-deploy">Nixpacks</span><span class="tag t-fix">PORT fix</span>
      </div>
    </div>

    <div class="entry">
      <div class="date"><div class="date-label">27 mai · 14h53</div><div class="date-hash">d29e74c</div></div>
      <div class="dot feat"></div>
      <div class="card">
        <h3>Connexion frontend ↔ Railway (production)</h3>
        <p>config.js créé avec URL Railway. app.js utilise API_BASE_URL. Le site Netlify appelle enfin la vraie API en production.</p>
        <span class="tag t-deploy">Netlify</span><span class="tag t-deploy">Railway</span><span class="tag t-front">config.js</span>
      </div>
    </div>

    <div class="entry">
      <div class="date"><div class="date-label">27 mai · 15h24</div><div class="date-hash">231f4a2</div></div>
      <div class="dot feat"></div>
      <div class="card">
        <h3>Option 1 personne ajoutée</h3>
        <p>Sélecteur de convives étendu à 1 personne.</p>
        <span class="tag t-front">UX</span>
      </div>
    </div>

    <div class="entry">
      <div class="date"><div class="date-label">27 mai · 16h32–33</div><div class="date-hash">e3b0d92 → 7bd7efb</div></div>
      <div class="dot feat"></div>
      <div class="card">
        <h3>Vrais plats + vrais prix sur la carte</h3>
        <p>menu.html : remplacement des placeholders par les vraies descriptions gastronomiques. Puis ajout des prix réels (9€, 11€, 24€, 23€…).</p>
        <span class="tag t-front">Contenu réel</span><span class="tag t-front">Prix</span>
      </div>
    </div>

    <div class="entry">
      <div class="date"><div class="date-label">27 mai · 17h45</div><div class="date-hash">62421b7</div></div>
      <div class="dot backend"></div>
      <div class="card">
        <h3>Système d'authentification + Dashboard admin</h3>
        <p>auth.controller.js : register + login avec bcrypt + JWT. user.repository.js, auth.routes.js. Table users créée. admin.html : tableau réservations avec statuts colorés.</p>
        <span class="tag t-backend">bcrypt</span><span class="tag t-backend">JWT</span><span class="tag t-backend">Auth</span><span class="tag t-front">admin.html</span>
      </div>
    </div>

    <div class="entry">
      <div class="date"><div class="date-label">27 mai · 18h40</div><div class="date-hash">cd0d6fa</div></div>
      <div class="dot fix"></div>
      <div class="card">
        <h3>Fix UX post-login : redirection + préremplissage</h3>
        <p>Après login → redirect reservation.html. Formulaire réservation prérempli automatiquement depuis localStorage (prénom, nom, email).</p>
        <span class="tag t-fix">UX fix</span><span class="tag t-front">localStorage</span><span class="tag t-front">Préremplissage</span>
      </div>
    </div>

  </div>
</body></html>`;

  const tlTmp = path.join(OUT, '_timeline.html');
  fs.writeFileSync(tlTmp, timelineHtml, 'utf8');
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`file:///${tlTmp.replace(/\\/g, '/')}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, 'chronologie.png'), fullPage: true });
  fs.unlinkSync(tlTmp);
  console.log('  ✓ chronologie.png');

  await browser.close();

  // ── Summary ──
  const files = fs.readdirSync(OUT).filter(f => f.endsWith('.png'));
  console.log(`\n=== Terminé : ${files.length} images dans ${OUT} ===`);
  files.forEach(f => console.log(`  ${f}`));
}

main().catch(err => {
  console.error('\nErreur:', err.message);
  process.exit(1);
});
