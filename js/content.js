import * as all from "./index.js";

let up = document.querySelector('.up');
let navbar = document.querySelector(".heads");

window.onscroll = () => {
    if (window.scrollY >= 30) {
        navbar.style.cssText = "background-color: rgb(195, 11, 11);"
    } else {
        navbar.style.cssText = "background-color: transparent "
    };

    if (window.scrollY >= 300) {
        up.style.cssText = "display: flex; right: 10px;";
    } else {
        up.style.display = "none"
    };
};

document.querySelector(".btn-login").addEventListener("click", () => {
    window.open(`../html/sign-in.html`, "_self")
});

document.querySelector(".cart-shop").addEventListener("click", () => {
    window.open("../html/car-shop.html", "_self")
});

clearInterval(all.imgTime);

up.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});