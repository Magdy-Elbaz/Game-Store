let navbar = document.querySelector(".heads");
window.onscroll = function () {
    if (window.scrollY >= 30) {
        navbar.style.backgroundColor = "rgb(195, 11, 11)"
    } else {
        navbar.style.backgroundColor = ""
    };
};

let toggle_box = document.querySelector(".toggle-box");
let btn = document.querySelector(".register-btn");

btn.addEventListener("click", () => {

    toggle_box.classList.toggle("active");
    if (toggle_box.classList.value === "toggle-box active") {
        btn.innerHTML = "Login";
        document.querySelector(".toggle-box h1").innerHTML = "Welcome Back!";
        document.querySelector(".toggle-box p").innerHTML = "Already have an account?";
    } else {
        btn.innerHTML = "Register";
        document.querySelector(".toggle-box h1").innerHTML = "Welcome";
        document.querySelector(".toggle-box p").innerHTML = "Don't have an account?";
    }
});

let nav = document.querySelector("nav");
let toggle_menu = document.querySelector(".toggle-menu");

toggle_menu.addEventListener("click", () => {
    toggle_menu.classList.toggle("active");
    if (toggle_menu.classList.value === "toggle-menu active") {
        document.querySelectorAll(".toggle-menu span").forEach((span) => span.style.backgroundColor = "red");
        nav.style.width = "70%";
    } else {
        document.querySelectorAll(".toggle-menu span").forEach((span) => span.style.backgroundColor = "#ccc");
        nav.style.width = "0";
    }
});