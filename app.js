const tabs = document.querySelectorAll("[data-tab]");
const panels = document.querySelectorAll("[data-panel]");

function showMenuPanel(panelId) {
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === panelId);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("is-visible", panel.dataset.panel === panelId);
  });
}

if (tabs.length && panels.length) {
  const initialPanel = window.location.hash.replace("#", "") || "entrees";
  showMenuPanel(initialPanel);

  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      const panelId = tab.dataset.tab;
      history.replaceState(null, "", `#${panelId}`);
      showMenuPanel(panelId);
    });
  });
}

// --- Navigation : affiche Déconnexion si connecté ---
function updateNav() {
  const user = JSON.parse(localStorage.getItem("qaUser") || "null");
  const navLink = document.querySelector('.main-nav a[href="login.html"]');
  if (!navLink) return;

  if (user) {
    navLink.textContent = `${user.firstName} — Déconnexion`;
    navLink.href = "#";
    navLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("qaToken");
      localStorage.removeItem("qaUser");
      window.location.href = "index.html";
    });
  }
}
updateNav();

// --- Formulaire d'inscription ---
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = registerForm.querySelector(".form-message");
    message.style.color = "";
    message.textContent = "Inscription en cours…";

    const data = {
      firstName: document.getElementById("firstname").value.trim(),
      lastName:  document.getElementById("lastname").value.trim(),
      email:     document.getElementById("email").value.trim(),
      password:  document.getElementById("password").value,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await res.json();

      if (!res.ok) {
        message.style.color = "#c62828";
        message.textContent = payload.message || "Erreur lors de l'inscription.";
        return;
      }

      localStorage.setItem("qaToken", payload.token);
      localStorage.setItem("qaUser", JSON.stringify(payload.user));
      message.style.color = "#2e7d32";
      message.textContent = "Compte créé ! Redirection…";
      setTimeout(() => { window.location.href = "index.html"; }, 1500);
    } catch (err) {
      message.style.color = "#c62828";
      message.textContent = "Impossible de contacter le serveur.";
    }
  });
}

// --- Formulaire de connexion ---
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = loginForm.querySelector(".form-message");
    message.style.color = "";
    message.textContent = "Connexion en cours…";

    const data = {
      email:    document.getElementById("email").value.trim(),
      password: document.getElementById("password").value,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await res.json();

      if (!res.ok) {
        message.style.color = "#c62828";
        message.textContent = payload.message || "Erreur lors de la connexion.";
        return;
      }

      localStorage.setItem("qaToken", payload.token);
      localStorage.setItem("qaUser", JSON.stringify(payload.user));
      message.style.color = "#2e7d32";
      message.textContent = "Connexion réussie ! Redirection…";
      setTimeout(() => { window.location.href = "index.html"; }, 1200);
    } catch (err) {
      message.style.color = "#c62828";
      message.textContent = "Impossible de contacter le serveur.";
    }
  });
}

// --- Formulaire de réservation ---
const reservationForm = document.getElementById("reservationForm");

if (reservationForm) {
  reservationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = reservationForm.querySelector(".form-message");

    const reservationData = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      date: document.getElementById("date").value,
      time: document.getElementById("time").value,
      guests: Number(document.getElementById("guests").value),
      allergies: document.getElementById("allergies").value
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reservationData)
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la réservation");
      }

      message.textContent = "Votre réservation a bien été enregistrée.";
      reservationForm.reset();
    } catch (error) {
      message.textContent = "Erreur : la réservation n'a pas pu être envoyée.";
    }
  });
}
