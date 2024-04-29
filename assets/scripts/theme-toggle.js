// theme-toggle.js
const storageKey = "theme-preference";
const themeToggle = document.querySelector("#theme-toggle");

const getColorPreference = () => {
  if (localStorage.getItem(storageKey)) return localStorage.getItem(storageKey);
  else
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
};

const setPreference = () => {
  localStorage.setItem(
    storageKey,
    themeToggle.classList.contains("dark") ? "light" : "dark"
  );
  reflectPreference();
};

const reflectPreference = () => {
  const themeValue = getColorPreference();
  document.firstElementChild.setAttribute("data-theme", themeValue);
  themeToggle.setAttribute("aria-label", themeValue);
  // Adicionando ou removendo a classe 'dark' dependendo do tema selecionado
  themeToggle.classList.toggle("dark", themeValue === "dark");
};

reflectPreference();

window.onload = () => {
  // set on load so screen readers can get the latest value on the button
  reflectPreference();

  // now this script can find and listen for clicks on the control
  themeToggle.addEventListener("click", onClick);
};

const onClick = () => {
  themeToggle.classList.toggle("dark");
  setPreference();
};

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    const themeValue = isDark ? "dark" : "light";
    themeToggle.classList.toggle("dark", isDark);
    localStorage.setItem(storageKey, themeValue);
    reflectPreference();
  });
