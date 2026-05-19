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

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = form.querySelector(".form-message");

    if (message) {
      message.textContent = "Votre demande a bien été prise en compte.";
    }
  });
});
