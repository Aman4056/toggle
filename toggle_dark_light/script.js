/* ===========================================================
   Daybreak — theme toggle logic
   =========================================================== */

const STORAGE_KEY = "daybreak-theme";

const root = document.documentElement;
const toggleBtn = document.getElementById("themeToggle");
const modeStatus = document.getElementById("modeStatus");

/* ---------- resolve initial theme ---------- */
function getPreferredTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") {
    return saved;
  }
  // fall back to the device's preferred colour scheme
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  return systemPrefersDark ? "dark" : "light";
}

function applyTheme(theme) {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
    toggleBtn.setAttribute("aria-checked", "true");
    toggleBtn.setAttribute("aria-label", "Switch to light mode");
    modeStatus.textContent = "dark mode";
  } else {
    root.removeAttribute("data-theme");
    toggleBtn.setAttribute("aria-checked", "false");
    toggleBtn.setAttribute("aria-label", "Switch to dark mode");
    modeStatus.textContent = "light mode";
  }
}

function setTheme(theme) {
  applyTheme(theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

/* ---------- init ---------- */
applyTheme(getPreferredTheme());

/* ---------- interactions ---------- */
toggleBtn.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  setTheme(isDark ? "light" : "dark");
});

// keyboard shortcut: press "t" to toggle
document.addEventListener("keydown", (event) => {
  const tag = document.activeElement.tagName;
  const isTyping = tag === "INPUT" || tag === "TEXTAREA";
  if (!isTyping && event.key.toLowerCase() === "t") {
    toggleBtn.click();
  }
});

// stay in sync if the user changes their OS theme and hasn't chosen manually
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  const hasManualChoice = localStorage.getItem(STORAGE_KEY);
  if (!hasManualChoice) {
    applyTheme(event.matches ? "dark" : "light");
  }
});