import * as all from "./index.js";
let navbar = document.querySelector(".heads");
let up = document.querySelector('.up');

window.onscroll = function () {
    if (window.scrollY >= 30) {
        navbar.style.backgroundColor = "rgb(195, 11, 11)"
    } else {
        navbar.style.backgroundColor = ""
    };

    if (window.scrollY >= 300) {
        up.style.display = "flex"
    } else {
        up.style.display = "none"
    };

    all.scrollSection(document.querySelector(".trending-cards-a"), document.querySelectorAll("[data-align='1']"), document.querySelectorAll("[data-align='2']"), "transform: translateY(0); transition-delay: .2s;", "transform: translateX(0);");
};

up.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

clearInterval(all.imgTime);