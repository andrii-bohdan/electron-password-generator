const wrapper = document.querySelector(".wrapper");
const toggleDarkMode = document.getElementById("toggle-dark-mode");
const btnThemeSwitch = document.querySelector(".btn__theme_switch");
const moonSVGItem = document.querySelector(".moon__svg__item");
const sunSVGItem = document.querySelector(".sun__svg__item");
const mainTitle = document.querySelector(".main_title");
const btnGenerate = document.getElementById("btn_generate");
const inputPassword = document.querySelector(".input__password");
const generatedPasswordContainer = document.querySelector(
  ".generate_password_container"
);
const generatedPassword = document.querySelector(".generate_password_title");

api.handle(
  "generate-password",
  (event, data) =>
    function (event, data) {
      generatedPassword.innerHTML = data;
    },
  event
);
toggleDarkMode.addEventListener("click", toggleTheme);
document.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    generatePassword();
  }
});
btnGenerate.addEventListener("click", generatePassword);
inputPassword.addEventListener("input", resetPasswordInput);
generatedPasswordContainer.addEventListener("click", copy_password);

function copy_password() {
  let textArea = document.createElement("textarea");
  let textCopied = document.createElement("div");
  textCopied.classList.add("copy_message");
  textCopied.innerHTML = "Copied!";
  textArea.value = generatedPassword.textContent;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("Copy");
  generatedPasswordContainer.appendChild(textCopied);
  textArea.remove();
  setTimeout(() => {
    textCopied.remove();
  }, 2500);
}

function generatePassword() {
  if (!inputPassword.value) {
    btnGenerate.disable = true;
    alert("Password can't be empty!");
  } else {
    api.send("generate-password", inputPassword.value);
  }
}

async function toggleTheme() {
  const isDarkMode = await api.toggle();
  wrapper.style.background = isDarkMode ? "#251d3a" : "#ffff";
  mainTitle.style.color = isDarkMode ? "#00ffc6" : "#251d3a";
  moonSVGItem.style.display = isDarkMode ? "none" : "block";
  sunSVGItem.style.display = isDarkMode ? "block" : "none";
  btnGenerate.style.backgroundColor = isDarkMode ? "#ffff" : "#251d3a";
  btnGenerate.style.color = isDarkMode ? "#251d3a" : "#ffff";
}

function resetPasswordInput() {
  if (!this.value) {
    btnGenerate.disable = true;
    generatedPassword.innerHTML = "";
  }
}
