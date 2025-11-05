let input = document.querySelector("label input");
let numberShop = document.querySelector(".number-shop");

export let aray = [];
export let aray_sessionstorage = [];

if (localStorage.getItem("data")) {
    aray = JSON.parse(localStorage.getItem("data"));
} else {
    aray = [];
}

if (localStorage.getItem("color")) {
    document.body.classList = localStorage.getItem("color");
};

if (localStorage.getItem("input") === "false") {
    input.checked = false
};

localStorage.setItem("numberShop", aray.length);

if (localStorage.getItem("numberShop")) {
    numberShop.innerHTML = +localStorage.getItem("numberShop");
};

let trending = document.getElementById("cards-home");
let btn_less = document.querySelector(".mobility .less");
let btn_greater = document.querySelector(".mobility .greater");

if (btn_less && trending) {
    btn_less.addEventListener("click", () => {
        trending.scrollBy({ left: -360, behavior: "smooth" });
    });
}

if (btn_greater && trending) {
    btn_greater.addEventListener("click", () => {
        trending.scrollBy({ left: 360, behavior: "smooth" });
    });
}

input.addEventListener("click", () => {
    if (input.checked === false) {
        document.body.classList = "dark";
        document.body.dataset.color = "dark";
    } else {
        document.body.classList = "lign";
        document.body.dataset.color = "lign";
    }

    window.localStorage.setItem("color", document.body.dataset.color);
    window.localStorage.setItem("input", input.checked);
});

let nav = document.querySelector("nav");
let btns = document.querySelector(".btns");
let up = document.querySelector('.up');
let toggle_menu = document.querySelector(".toggle-menu");

toggle_menu.addEventListener("click", () => {
    up.style.cssText = "z-index: -1;";
    toggle_menu.classList.toggle("active");
    if (toggle_menu.classList.value === "toggle-menu active") {
        document.querySelectorAll(".toggle-menu span").forEach((span) => span.style.backgroundColor = "red");
        btns.style.cssText = "right: 20px;";
        nav.style.cssText = "width: 70%;";
    } else {
        document.querySelectorAll(".toggle-menu span").forEach((span) => span.style.backgroundColor = "#ccc");
        btns.style.cssText = "right: -300px;";
        nav.style.width = "0";
    };
});

document.querySelector(".btn-login").addEventListener("click", () => {
    window.open(`sign-in.html`, "_self")
});

document.querySelector(".cart-shop").addEventListener("click", () => {
    window.open("car-shop.html", "_self")
});

let navbar = document.querySelector(".heads");

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

    scrollSection(document.querySelector(".trendingHeader"), document.querySelectorAll("[data-card='1']"), document.querySelectorAll("[data-card='2']"), "transform: scale(1); transition-delay: .2s;", "transform: scale(1);");

    scrollSection(document.querySelector(".images-m"), document.querySelectorAll("[data-cards='1']"), document.querySelectorAll("[data-cards='2']"), "transform: translateY(0);");

    scrollSection(document.querySelector(".trending-cards-a"), document.querySelectorAll("[data-align='1']"), document.querySelectorAll("[data-align='2']"), "transform: translateY(0); transition-delay: .2s;", "transform: translateX(0);");

};

let landingPage = document.querySelector(".image-containe img");

let imagesArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"];

export let imgTime = setInterval(() => {
    let randomNumber = Math.floor(Math.random() * imagesArray.length);
    let img = imagesArray[randomNumber]
    landingPage.src = 'images/images/' + img + '';
}, 7000);

let View = document.querySelectorAll(".view");

View.forEach((e) => {
    e.addEventListener("click", () => {
        setTimeout(() => { location.href = "html/our-shop.html"; }, 200);
    });
});

let explore = document.querySelectorAll(".explore");

openProduct(explore, aray_sessionstorage);

fetch(`../data.json`).then((re) => re.json()).then((data) => {
    let icon_eye = document.querySelectorAll(".icon-eye i");
    openProduct(icon_eye, aray_sessionstorage);

    let bagShopping = document.querySelectorAll(".bag-shopping");
    if (aray) {
        bagShopping.forEach((e) => {
            for (let i = 0; i < aray.length; i++) {
                if (e.dataset.cart === aray[i].title) {
                    e.classList = aray[i].class
                }
            };

            e.addEventListener("click", function () {

                if (e.classList.value !== "bag-shopping active") {
                    window.localStorage.setItem("numberShop", numberShop.innerHTML++);
                    addData(e.dataset.cart, e.dataset.price);
                    shopInfo()
                    setTimeout(sayMag, 3000);
                };

                e.classList = "bag-shopping active";
            });
        })
    };

    let hover = document.querySelectorAll(".hover");

    hover.forEach(function (e) {
        e.addEventListener("mouseenter", () => {
            e.style.cssText = "transform: translate(0,-10px) scale(1);"
        });
        e.addEventListener("mouseleave", () => {
            e.style.cssText = "transform: translate(0 ,0) scale(1);"
        });
    });

    let input_landingPage = document.querySelector(".landing-page-search input");
    let btn_landingPage = document.querySelector(".landing-page-search button");
    let msg_not_product = document.querySelector(".msg_not_product");
    let str = "";

    if (input_landingPage) {

        btn_landingPage.addEventListener("click", () => {

            if (input_landingPage.value !== "") {
                let themp = input_landingPage.value;
                str = input_landingPage.value.match(/\d+/g);
                str = themp.slice(0, -1) + " " + str;
            };
        });

        data.forEach((card) => {
            btn_landingPage.addEventListener("click", () => {

                if (input_landingPage.value.toLowerCase() === card.name.toLowerCase()) {
                    window.open(`html/product.html`, "_self");
                    const data = {
                        search: capitalString(input_landingPage.value)
                    };

                    aray_sessionstorage.push(data)
                    sessionStorage.setItem("data", JSON.stringify(aray_sessionstorage))
                    input_landingPage.value = "";

                } else if (str.toLowerCase() === card.name.toLowerCase()) {
                    window.open(`html/product.html`, "_self");

                    const data = {
                        search: capitalString(str)
                    };

                    aray_sessionstorage.push(data);
                    sessionStorage.setItem("data", JSON.stringify(aray_sessionstorage));
                    input_landingPage.value = "";

                } else {
                    if (input_landingPage.value === "") {
                        msg_not_product.innerHTML = `<span>!</span> The search field is empty.`;
                    } else if (input_landingPage.value.toLowerCase() !== card.name.toLowerCase() || str.toLowerCase() !== card.name.toLowerCase()) {
                        msg_not_product.innerHTML = `<span>!</span> The product is not available.`
                    };

                    msg_not_product.style.cssText = "scale: 1;";
                    setTimeout(() => {
                        msg_not_product.style.cssText = "scale: 0;";
                    }, 3000);
                };

            });
        });
    };
});

export function addData(dataset, price) {
    const data = {
        id: Date.now(),
        title: dataset,
        class: "bag-shopping active",
        price: price,
        quantity: 1
    };

    aray.push(data);
    addlocal(aray);
};

function addlocal(aray) {
    window.localStorage.setItem("data", JSON.stringify(aray))
};

export function shopInfo() {
    let div = document.createElement("div");
    div.className = "massage-shop";

    let divInfo = document.createElement("div");
    divInfo.className = "shop-info";

    let icon = document.createElement("i");
    icon.classList = "fa-solid fa-check check";
    divInfo.appendChild(icon);

    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode("Added To Cart"));
    divInfo.appendChild(h3);

    div.appendChild(divInfo);

    let massage = document.querySelector(".massage")
    massage.append(div);

    massage.style.cssText = "transform: translateX(0)";
};

export function sayMag() {
    let massageShop = document.querySelector(".massage-shop");
    massageShop.remove()
};

function capitalString(str) {
    var stringLiter = str.split(' '),
        newArray = [];

    for (var i = 0; i < stringLiter.length; i++) {
        newArray.push(stringLiter[i].charAt(0).toUpperCase() + stringLiter[i].slice(1).toLowerCase());
    }

    return newArray.join(' ');
};

export function openProduct(el, aray_sessionstorage) {
    el.forEach((btn) => {
        btn.addEventListener("click", () => {
            window.open(`../html/product.html`, "_self");
            const data = {
                title: btn.dataset.cart,
            };

            aray_sessionstorage.push(data);
            sessionStorage.setItem("data", JSON.stringify(aray_sessionstorage));
        });
    });
}

export function scrollSection(ev, el1, el2, amendment, amendment2) {
    if (window.scrollY >= ev.offsetTop - 600) {
        el1.forEach(e => e.style.cssText = amendment);
        el2.forEach(e => e.style.cssText = amendment2 || amendment);
    };
};

up.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});