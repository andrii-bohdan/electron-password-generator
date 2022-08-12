const nativeTheme = require("electron").nativeTheme;
const wrapper = document.querySelector(".wrapper");
const toggleDarkMode = document.getElementById("toggle-dark-mode");
const themeSource = document.getElementById("theme-source");
const btnThemeSwitch = document.querySelector(".btn__theme_switch");
const moonSVGItem = document.querySelector(".moon__svg__item");
const sunSVGItem = document.querySelector(".sun__svg__item");
const mainTitle = document.querySelector(".main_title");

toggleDarkMode.addEventListener("click", async () => {
  const isDarkMode = await window.darkMode.toggle();
  console.log(window);
  wrapper.style.background = isDarkMode ? "#251d3a" : "#ffff";
  mainTitle.style.color = isDarkMode ? "#00ffc6" : "#251d3a";
  moonSVGItem.style.display = isDarkMode ? "none" : "block";
  sunSVGItem.style.display = isDarkMode ? "block" : "none";
  themeSource.innerHTML = isDarkMode ? "Dark" : "Light";
});
