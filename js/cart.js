import * as all from "./index.js";

let delet_All = document.querySelector(".btn-deleteAll");

let massage_cart = document.querySelector(".massage-cart");
let text_massage = document.querySelector(".massage-cart h1")
let total = document.querySelector(".total");

let items = [];

if (localStorage.getItem("data")) {
    items = JSON.parse(localStorage.getItem("data"));
} else {
    items = []
};

if (items.length !== 0) {
    massage_cart.style.display = "none";
    total.style.display = "block";
} else {
    massage_cart.style.display = "block";
    text_massage.innerHTML = "The Shopping Cart is Empty.";
    total.style.display = "none";
};

delet_All.addEventListener("click", () => {
    items.splice(0);
    localStorage.setItem("data", JSON.stringify(items));
    window.location.reload();
})

let total_price = 0;
let up = document.querySelector('.up');
let navbar = document.querySelector(".heads");

window.onscroll = () => {
    if (window.scrollY >= 30) {
        navbar.style.cssText = "background-color: rgb(195, 11, 11);"
    } else {
        navbar.style.cssText = "background-color: transparent "
    };

    if (window.scrollY >= 300) {
        up.style.cssText = "display: flex; right: 10px;"
    } else {
        up.style.display = "none"
    };
};

let num_products = document.querySelector(".num-products");
num_products.innerHTML = items.length;

fetch("../data.json").then((re) => re.json()).then(() => {
    let item_quantity = document.querySelectorAll(".quantity");
    let fullPrice_item = document.querySelectorAll(".price-item");
    let div_total = document.querySelector(".total .container  h3 span");

    items.forEach((item) => {
        item_quantity.forEach((qyt) => {
            if (item.id === +qyt.id) {
                qyt.innerHTML = item.quantity;
                total_price += item.price * item.quantity;
                div_total.innerHTML = total_price;
                fullPrice_item.forEach((pr) => {
                    if (item.id === +pr.id) {
                        pr.innerHTML = item.price * item.quantity
                    };
                });
            };
        });
    });

    deleteData(div_total, total_price);

    let plus = document.querySelectorAll(".plus");
    let minus = document.querySelectorAll(".minus");

    plus.forEach((btn) => {
        items.forEach((item) => {
            item_quantity.forEach((qyt) => {
                if (item.id === +qyt.id) {
                    if (btn.id === qyt.id) {
                        if (qyt.innerHTML === "20") {
                            btn.classList.add("disabled");
                        }
                    };
                };
            });
        });

        btn.addEventListener("click", (e) => {
            item_quantity.forEach((qyt) => {
                updateQuntityPlus(items, e.target, qyt, fullPrice_item, div_total);
                items.forEach((item) => {
                    if (item.id === +qyt.id) {
                        if (btn.id === qyt.id) {
                            minus.forEach((btn) => {
                                if (btn.id === qyt.id) {
                                    btn.classList.remove("disabled");
                                };
                            });
                            if (qyt.innerHTML === "20") {
                                btn.classList.add("disabled");
                            };
                        };
                    };
                });
            });
        });
    });

    minus.forEach((btn) => {
        items.forEach((item) => {
            item_quantity.forEach((qyt) => {
                if (item.id === +qyt.id) {
                    if (btn.id === qyt.id) {
                        if (qyt.innerHTML === "1") {
                            btn.classList.add("disabled");
                        }
                    };
                };
            });
        });

        btn.addEventListener("click", (e) => {
            item_quantity.forEach((qyt) => {
                updateQuntityMinus(items, e.target, qyt, fullPrice_item, div_total);
                items.forEach((item) => {
                    if (item.id == btn.id) {
                        if (btn.id === qyt.id) {
                            // reflect updated total_price already handled in updateQuntityMinus
                            div_total.innerHTML = total_price;
                            plus.forEach((btn) => {
                                if (btn.id === qyt.id) {
                                    btn.classList.remove("disabled");
                                };
                            });
                            if (qyt.innerHTML === "1") {
                                btn.classList.add("disabled");
                            };
                        };
                    };
                });
            });
        });
    });
})

function updateQuntityPlus(items, btn, qyt, fullPrice_item, div_total) {
    items.forEach((item) => {
        if (item.id === +btn.id) {
            if (btn.id === qyt.id) {
                // increment quantity and add one unit price to total_price
                item.quantity++;
                qyt.innerHTML = item.quantity;
                total_price += Number(item.price);
                div_total.innerHTML = total_price;
                let full_price = item.price * item.quantity;
                fullPrice_item.forEach((pr) => {
                    if (item.id === +pr.id) {
                        pr.innerHTML = full_price;
                    }
                });
                localStorage.setItem("data", JSON.stringify(items));
            };
        };
    });
};

function updateQuntityMinus(items, btn, qyt, fullPrice_item, div_total) {
    items.forEach((item) => {
        if (item.id === +btn.id) {
            if (btn.id === qyt.id) {
                // ensure quantity doesn't go below 1
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    qyt.innerHTML = item.quantity;
                    // subtract one unit price from total_price
                    total_price -= Number(item.price);
                    // ensure total_price doesn't go negative
                    if (total_price < 0) total_price = 0;
                    div_total.innerHTML = total_price;
                    let full_price = item.price * item.quantity;
                    fullPrice_item.forEach((pr) => {
                        if (item.id === +pr.id) {
                            pr.innerHTML = full_price;
                        }
                    });
                    localStorage.setItem("data", JSON.stringify(items));
                };
            };
        };
    });
};

function deleteData(div_total, total_price) {
    const trash = document.querySelectorAll(".trash");

    trash.forEach((tr) => {
        tr.addEventListener("click", (e) => {
            items.forEach((item) => {
                if (e.target.id == item.id) {
                    for (let i = 0; i < items.length; i++) {
                        if (items[i].id === item.id) {
                            let num = items.indexOf(item);
                            items.splice(num, 1);
                            if (items.length !== 0) {
                                document.querySelectorAll(".item").forEach((it) => {
                                    if (item.id == it.id) {
                                        it.remove();
                                        num_products.innerHTML -= 1;
                                        total_price -= item.price * item.quantity;
                                        div_total.innerHTML = total_price;
                                    };
                                });
                            } else {
                                document.querySelectorAll(".item").forEach((it) => {
                                    if (item.id == it.id) {
                                        it.remove();
                                        num_products.innerHTML -= 1;
                                        total_price -= item.price * item.quantity;
                                        div_total.innerHTML = total_price;
                                    };
                                    massage_cart.style.display = "block";
                                    text_massage.innerHTML = "The Shopping Cart is Empty.";
                                    total.style.display = "none";
                                });
                            };
                        };
                    };
                    localStorage.setItem("data", JSON.stringify(items));
                };
            });
        });
    });
};


clearInterval(all.imgTime);

up.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

let toggle_menu = document.querySelector(".toggle-menu");

toggle_menu.addEventListener("click", () => {
    up.style.cssText = "z-index: -1;";
});