const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const navLinks = [...document.querySelectorAll(".nav-link")];

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Highlight the navigation item for the section currently in view.
const sections = [...document.querySelectorAll("main section[id]")];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => sectionObserver.observe(section));

// Reveal elements gently as they enter the viewport.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Live clock in the visual mockup.
function updateClock() {
  const now = new Date();
  document.getElementById("digitalClock").textContent =
    now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false });
  document.getElementById("digitalDate").textContent =
    now.toLocaleDateString("en-US", { weekday: "long", day: "2-digit", month: "long" }).toUpperCase();
}
updateClock();
setInterval(updateClock, 1000);
document.getElementById("year").textContent = new Date().getFullYear();

// Small project detail modal.
const projectDetails = {
  lunova: {
    eyebrow: "INTERNET OF THINGS · 001",
    title: "LUNOVA Smart Clock IoT",
    description: "A digital clock and running-text display concept built around an ESP8266 and P10 LED panel. The planned system connects a web interface with the device so display content and settings can be managed more easily. Add your final architecture, wiring photos, MQTT flow, and project results here.",
    tags: ["ESP8266", "MQTT", "DS3231", "P10 LED", "Web Control"]
  },
  dashboard: {
    eyebrow: "WEB DEVELOPMENT · 002",
    title: "IoT Control Dashboard",
    description: "A web interface concept for managing display messages, brightness, scrolling speed, and device connection status. Use this section to document the actual features you have implemented and the technologies behind them.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive UI"]
  },
  experiments: {
    eyebrow: "ELECTRONICS · 003",
    title: "Microcontroller Experiments",
    description: "A collection of learning experiments involving microcontroller inputs and outputs, sensors, and basic device integration. Add experiment notes, circuit diagrams, and photos as your documentation grows.",
    tags: ["Arduino", "C++", "ESP8266", "Electronics"]
  }
};

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalEyebrow = document.getElementById("modalEyebrow");
const modalTags = document.getElementById("modalTags");

function openProject(key) {
  const project = projectDetails[key];
  if (!project) return;
  modalEyebrow.textContent = project.eyebrow;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalTags.innerHTML = project.tags.map(tag => `<span>${tag}</span>`).join("");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.getElementById("modalClose").focus();
}
function closeProject() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.querySelectorAll("[data-project]").forEach(button => {
  button.addEventListener("click", () => openProject(button.dataset.project));
});
document.getElementById("modalClose").addEventListener("click", closeProject);
document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeProject));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeProject();
});
