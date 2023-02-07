const nav = document.querySelector(".nav");
const searchIcon = document.querySelector(".search-icon");
const hamburgerIcon = document.querySelector(".nav-hamburger");
const closeIcon = document.querySelector(".nav-hamburger-close");

searchIcon.addEventListener("click", () => {
   nav.classList.toggle("openSearch");
   nav.classList.remove("open-navigation");
   if(nav.classList.contains("openSearch")) {
      return searchIcon.classList.replace("fa-magnifying-glass", "fa-xmark")
   }
   searchIcon.classList.replace("fa-xmark", "fa-magnifying-glass");
});

hamburgerIcon.addEventListener("click", () => {
   nav.classList.add("open-navigation");
   nav.classList.remove("openSearch");
   searchIcon.classList.replace("fa-xmark", "fa-magnifying-glass");
});

closeIcon.addEventListener("click", () => {
   nav.classList.remove("open-navigation");
});