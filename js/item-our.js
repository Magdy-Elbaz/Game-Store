
function d(button_head_our) {
    button_head_our.forEach((e) => {
        button_head_our.forEach((btn) => btn.classList.remove("active"))
        console.log(e)
    })
}

// console.log(button_head_our)

fetch(`../data.json`)
    .then((re) => re.json())
    .then((data) => {

        const cards_our = document.getElementById("cards_our");
        const cards_home = document.getElementById("cards-home");
        const box = document.querySelector(".box .container");
        const product = document.querySelector(".background");
        const marquee_home = document.querySelector(".marquee .box");

        let items = [];
        let aray_sessionstorage = [];

        if (localStorage.getItem("data")) {
            items = JSON.parse(localStorage.getItem("data"));
        } else {
            items = []
        };

        if (sessionStorage.getItem("data")) {
            aray_sessionstorage = JSON.parse(sessionStorage.getItem("data"));
        } else (
            aray_sessionstorage = []
        );

        // Populate our-shop cards if the container exists
        if (cards_our) {
            data.forEach((card) => {
                let discound = Math.floor((card.old_price - card.price) / card.old_price * 100) + "%";

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

            });
        };

        // Populate home cards if the container exists
        if (cards_home) {
            data.forEach((card) => {
                if (card.old_price) {
                    let discound = Math.floor((card.old_price - card.price) / card.old_price * 100) + "%";
                    cards_home.innerHTML += `
                        <div class="card hover" data-card="${card.data_card}">
                            <span class="discound">${discound}</span>
                            <img class="thumb" src="../${card.img}" draggable="false">
                            <div class="card-info">
                                <div>
                                    <p>${card.description}</</p>
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
                };

            });
        };

        if (box) {
            if (items) {
                items.forEach((e) => {
                    data.forEach((card) => {
                        if (e.title === card.data_cart) {
                            box.innerHTML += `
                                <div class="item" id="${e.id}">
                                    <div class="image-and-name">
                                        <img src="../${card.img}" alt="">
                                        <div class="info">
                                            <h3>${card.name}</h3>
                                            <span class="price">${card.price}$</span>
                                        </div>
                                    </div>
                                    <div class="number">
                                        <div>
                                            <button class="minus" id="${e.id}">-</button>
                                            <span class="quantity" id="${e.id}">1</span>
                                            <button class="plus" id="${e.id}">+</button>
                                        </div>
                                        <span>Final Price: <span class="price-item" id="${e.id}">0</span></span>
                                        <i class="fa-solid fa-trash-can trash" id="${e.id}"></i>
                                    </div>
                                </div>
                            `
                        };
                    });
                });
            };
        };

        if (product) {
            if (aray_sessionstorage) {
                aray_sessionstorage.forEach((e) => {
                    data.forEach((card) => {
                        if (e.title === card.data_cart || e.search === card.name) {
                            if (card.old_price) {
                                product.innerHTML = `
                                    <div class="background-image">
                                        <img src="../${card.img}" draggable="false">
                                    </div>
                                    <div>
                                        <div>
                                            <h2>${card.name}</h2>
                                        </div>
                                        <div class="discond">
                                            <span>${card.old_price}$</span>
                                            <h3 data-price="${card.price}">${card.price}$</h3>
                                        </div>
                                        <div class="paragraph">
                                            <p>
                                                ${card.paragraph}
                                            </p>
                                        </div>
                                        <div class="game-id">
                                            <span>Game ID:</span>
                                            <h4>COD MMII</h4>
                                        </div>
                                        <div class="game-id">
                                            <span>Genre:</span>
                                            <h4>${card.description}</h4>
                                        </div>
                                        <div class="game-id">
                                            <span>Multi-tags:</span>
                                            <h4>War, Battle, Royal</h4>
                                        </div>
                                    </div>
                                `
                            } else {
                                product.innerHTML = `
                                    <div class="background-image">
                                        <img src="../${card.img}" draggable="false">
                                    </div>
                                    <div>
                                        <div>
                                            <h2>${card.name}</h2>
                                        </div>
                                        <div class="discond">
                                            <h3 data-price="${card.price}">${card.price}$</h3>
                                        </div>
                                        <div class="paragraph">
                                            <p>
                                                ${card.paragraph}
                                            </p>
                                        </div>
                                        <div class="game-id">
                                            <span>Game ID:</span>
                                            <h4>COD MMII</h4>
                                        </div>
                                        <div class="game-id">
                                            <span>Genre:</span>
                                            <h4>${card.description}</h4>
                                        </div>
                                        <div class="game-id">
                                            <span>Multi-tags:</span>
                                            <h4>War, Battle, Royal</h4>
                                        </div>
                                    </div>
                                `
                            };
                        };
                        sessionStorage.setItem("data", "");
                    });
                });
            };
        };

        if (marquee_home) {
            data.forEach((card) => {
                marquee_home.innerHTML += `
                    <div class="card">
                        <img class="image_marquee" src="../${card.img}" draggable="false">
                    </div>
                `
            })
        }

    });