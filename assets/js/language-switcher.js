export const initLanguageSwitcher = () => {
  const switcher = document.querySelector(".language-switcher");
  if (!switcher) return;

  switcher.addEventListener("click", (event) => {
    const target = event.target;

    if (target.tagName === "LI") {
      [...switcher.children].forEach((li) => li.classList.remove("active"));
      target.classList.add("active");
      localStorage.setItem("language", target.dataset.lang);
      window.popup.close?.();
    }
  });

  let savedLang = localStorage.getItem("language");

  if (!savedLang) {
    savedLang = "ru";
    localStorage.setItem("language", savedLang);
  }

  const activeItem = switcher.querySelector(`li[data-lang="${savedLang}"]`);
  if (activeItem) {
    activeItem.classList.add("active");
  }
};
