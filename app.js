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
      const response = await fetch("http://localhost:3003/api/reservations", {
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
