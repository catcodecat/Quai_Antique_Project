const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'https://quai-antique-projet.netlify.app';
const OUT_DIR = path.join(__dirname, 'screenshots');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const DESKTOP = { width: 1280, height: 800 };
const MOBILE  = { width: 390,  height: 844 };

const PAGES = [
  { slug: 'accueil',      path: '/',                name: 'Accueil' },
  { slug: 'galerie',      path: '/gallery.html',    name: 'Galerie' },
  { slug: 'menu-entrees', path: '/menu.html#entrees', name: 'Carte — Entrées' },
  { slug: 'menu-plats',   path: '/menu.html#plats',   name: 'Carte — Plats' },
  { slug: 'menu-desserts',path: '/menu.html#desserts', name: 'Carte — Desserts' },
  { slug: 'reservation',  path: '/reservation.html',name: 'Réservation' },
  { slug: 'login',        path: '/login.html',      name: 'Connexion' },
  { slug: 'register',     path: '/register.html',   name: 'Inscription' },
  { slug: 'admin',        path: '/admin.html',      name: 'Dashboard Admin' },
];

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function takeDesktop(page, pageConfig) {
  await page.setViewportSize(DESKTOP);
  await page.goto(`${BASE_URL}${pageConfig.path}`, { waitUntil: 'networkidle', timeout: 20000 });
  await wait(1000);
  const file = path.join(OUT_DIR, `desktop-${pageConfig.slug}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`  ✓ desktop-${pageConfig.slug}.png`);
}

async function takeMobile(page, pageConfig) {
  await page.setViewportSize(MOBILE);
  await page.goto(`${BASE_URL}${pageConfig.path}`, { waitUntil: 'networkidle', timeout: 20000 });
  await wait(800);
  const file = path.join(OUT_DIR, `mobile-${pageConfig.slug}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`  ✓ mobile-${pageConfig.slug}.png`);
}

async function takeWithUser(page) {
  // Simulate logged-in user via localStorage then reload reservation page
  await page.setViewportSize(DESKTOP);
  await page.goto(`${BASE_URL}/reservation.html`, { waitUntil: 'networkidle', timeout: 20000 });
  await page.evaluate(() => {
    localStorage.setItem('qaToken', 'demo-token-presentation');
    localStorage.setItem('qaUser', JSON.stringify({
      id: 1,
      firstName: 'Marie',
      lastName: 'Dupont',
      email: 'marie.dupont@example.com',
      role: 'user'
    }));
  });
  await page.reload({ waitUntil: 'networkidle', timeout: 20000 });
  await wait(800);
  const file = path.join(OUT_DIR, 'desktop-reservation-connectee.png');
  await page.screenshot({ path: file, fullPage: false });
  console.log('  ✓ desktop-reservation-connectee.png');

  // Nav connected state (any page)
  await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'networkidle', timeout: 20000 });
  await wait(500);
  const file2 = path.join(OUT_DIR, 'desktop-nav-connectee.png');
  await page.screenshot({ path: file2, fullPage: false });
  console.log('  ✓ desktop-nav-connectee.png');

  // Clean up
  await page.evaluate(() => {
    localStorage.removeItem('qaToken');
    localStorage.removeItem('qaUser');
  });
}

async function takeAdminWithData(page) {
  await page.setViewportSize(DESKTOP);
  await page.goto(`${BASE_URL}/admin.html`, { waitUntil: 'networkidle', timeout: 30000 });
  // Wait for table to load (API call)
  await wait(3000);
  const file = path.join(OUT_DIR, 'desktop-admin-data.png');
  await page.screenshot({ path: file, fullPage: false });
  console.log('  ✓ desktop-admin-data.png');
}

async function takeMenuTabs(page) {
  await page.setViewportSize(DESKTOP);
  await page.goto(`${BASE_URL}/menu.html`, { waitUntil: 'networkidle', timeout: 20000 });
  await wait(600);

  const tabs = ['entrees', 'plats', 'desserts'];
  for (const tab of tabs) {
    try {
      await page.click(`[data-tab="${tab}"]`);
      await wait(400);
      const file = path.join(OUT_DIR, `desktop-menu-${tab}.png`);
      await page.screenshot({ path: file, fullPage: false });
      console.log(`  ✓ desktop-menu-${tab}.png`);
    } catch (e) {
      console.log(`  ⚠ tab ${tab} not clickable, skipping`);
    }
  }
}

async function main() {
  console.log('\n=== Quai Antique — Captures d\'écran pour DWWM ===\n');
  console.log(`Site : ${BASE_URL}`);
  console.log(`Dossier : ${OUT_DIR}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36'
  });
  const page = await context.newPage();

  // ── DESKTOP captures ──
  console.log('── Desktop (1280×800) ──');
  for (const p of PAGES) {
    try {
      await takeDesktop(page, p);
    } catch (e) {
      console.log(`  ✗ ${p.slug}: ${e.message.slice(0, 80)}`);
    }
  }

  // ── Menu tabs ──
  console.log('\n── Menu onglets ──');
  try {
    await takeMenuTabs(page);
  } catch (e) {
    console.log(`  ✗ menu tabs: ${e.message.slice(0, 80)}`);
  }

  // ── Admin with loaded data ──
  console.log('\n── Admin avec données ──');
  try {
    await takeAdminWithData(page);
  } catch (e) {
    console.log(`  ✗ admin: ${e.message.slice(0, 80)}`);
  }

  // ── Connected user state ──
  console.log('\n── Utilisateur connecté ──');
  try {
    await takeWithUser(page);
  } catch (e) {
    console.log(`  ✗ user connecté: ${e.message.slice(0, 80)}`);
  }

  // ── MOBILE captures ──
  console.log('\n── Mobile (390×844) ──');
  const mobilePages = ['accueil', 'menu-entrees', 'reservation', 'login', 'admin'];
  for (const slug of mobilePages) {
    const p = PAGES.find(x => x.slug === slug);
    if (!p) continue;
    try {
      await takeMobile(page, p);
    } catch (e) {
      console.log(`  ✗ mobile-${slug}: ${e.message.slice(0, 80)}`);
    }
  }

  await browser.close();

  // ── Summary ──
  const files = fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.png'));
  console.log(`\n=== Terminé : ${files.length} captures dans ${OUT_DIR} ===`);
  files.forEach(f => console.log(`  ${f}`));
}

main().catch(err => {
  console.error('\nErreur fatale:', err.message);
  process.exit(1);
});
