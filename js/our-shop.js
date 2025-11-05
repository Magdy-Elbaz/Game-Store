import * as all from "./index.js";
let navbar = document.querySelector(".heads");
const cards_our = document.getElementById("cards_our");
let up = document.querySelector('.up');

window.onscroll = function () {
    if (window.scrollY >= 30) {
        navbar.style.backgroundColor = "rgb(195, 11, 11)"
    } else {
        navbar.style.backgroundColor = ""
    };

    if (window.scrollY >= 400) {
        up.style.display = "flex"
    } else {
        up.style.display = "none"
    };

    all.scrollSection(document.querySelector(".trending-cards"), document.querySelectorAll("[data-card='1']"), document.querySelectorAll("[data-card='2']"), "transform: scale(1); transition-delay: .2s;", "transform: scale(1);");
};

let button_head = document.querySelectorAll(".button-head button");

button_head.forEach((btn) => {
    btn.addEventListener("click", () => cards_our.innerHTML = "");
});

let numberShop = document.querySelector(".number-shop");

fetch(`../data.json`)
    .then((re) => re.json())
    .then((data) => {
        data.forEach((card) => {
            button_head.forEach((btn) => {
                btn.addEventListener("click", (e) => {

                    document.querySelectorAll("[data-card='1']").forEach((e) => e.style.cssText = "transform: scale(1);");
                    document.querySelectorAll("[data-card='2']").forEach((e) => e.style.cssText = "transform: scale(1);");

                    let discound = Math.floor((card.old_price - card.price) / card.old_price * 100) + "%";
                    button_head.forEach((btn) => btn.classList.remove("active"));
                    e.target.className = "active";

                    let bagShopping = document.querySelectorAll(".bag-shopping");
                    if (all.aray) {
                        bagShopping.forEach((e) => {
                            for (let i = 0; i < all.aray.length; i++) {
                                if (e.dataset.cart === all.aray[i].title) {
                                    e.classList = all.aray[i].class
                                }
                            };

                            e.addEventListener("click", function () {

                                if (e.classList.value !== "bag-shopping active") {
                                    window.localStorage.setItem("numberShop", numberShop.innerHTML++);
                                    all.addData(e.dataset.cart, e.dataset.price);
                                    all.shopInfo()
                                    setTimeout(all.sayMag, 3000);
                                };

                                e.classList = "bag-shopping active";
                            });
                        })
                    };

                    if (e.target.innerHTML.toLowerCase() === "show all" || e.target.innerHTML.toLowerCase() === card.description.toLowerCase()) {
                        if (card.old_price) {
                            cards_our.innerHTML += `
                        <div class="card hover" data-card="${card.data_card}">
                            <span class="discound">${discound}</span>
                            <img class="thumb" src="../${card.img}" draggable="false">
                            <div class="card-info">
                                <div>
                                    <p>${card.description}</p>
                                    <h3>${card.name}</h3>
                                </div>
                                <div class="to-request">
                                    <div>
                                        <span class="price">${card.price}$</span>
                                        <span class="old_price">${card.old_price}$</span>
                                    </div>
                                    <div class="icons">
                                        <div class="icon-eye"><i class="fa-solid fa-eye" data-cart="${card.data_cart}"></i></div>
                                        <div class="bag-shopping" data-cart="${+card.data_cart}" data-price="${card.price}">
                                            <i class="fa-solid fa-bag-shopping background-colors"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                        } else {
                            cards_our.innerHTML += `
                        <div class="card hover" data-card="${card.data_card}">
                            <img class="thumb" src="../${card.img}" draggable="false">
                            <div class="card-info">
                                <div>
                                    <p>${card.description}</</p>
                                    <h3>${card.name}</h3>
                                </div>
                                <div class="to-request">
                                    <div>
                                        <span class="price">${card.price}$</span>
                                    </div>
                                    <div class="icons">
                                        <div class="icon-eye"><i class="fa-solid fa-eye" data-cart="${card.data_cart}"></i></div>
                                        <div class="bag-shopping" data-cart="${+card.data_cart}" data-price="${card.price}">
                                            <i class="fa-solid fa-bag-shopping background-colors"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `

                        };

                        let bagShopping = document.querySelectorAll(".bag-shopping");
                        bagShopping.forEach((e) => {
                            e.addEventListener("click", function () {

                                if (e.classList.value !== "bag-shopping active") {
                                    window.localStorage.setItem("numberShop", numberShop.innerHTML++);
                                    all.addData(e.dataset.cart, e.dataset.price);
                                    all.shopInfo()
                                    setTimeout(all.sayMag, 3000);
                                };

                                e.classList = "bag-shopping active";
                            });
                        });

                        let hover = document.querySelectorAll(".hover");

                        hover.forEach(function (e) {
                            e.addEventListener("mouseenter", () => {
                                e.style.cssText = "transform: translateY(-10px); scale: 1;"
                            });
                            e.addEventListener("mouseleave", () => {
                                e.style.cssText = "transform: translateY(0); scale: 1;"
                            });
                        });

                        let icon_eye = document.querySelectorAll(".icon-eye i");
                        all.openProduct(icon_eye, all.aray_sessionstorage);

                    };
                });

            });
        });
    });

document.querySelector(".btn-login").addEventListener("click", () => {
    window.open(`../html/sign-in.html`, "_self")
});

document.querySelector(".cart-shop").addEventListener("click", () => {
    window.open("../html/car-shop.html", "_self")
});

up.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

clearInterval(all.imgTime);