const items = [{
        title: "Мемо «Мир динозавров»",
        description: "Нескучные игры",
        tags: ["Скоро закончится!"],
        price: 8.97,
        img: "./img/1.jpeg",
        rating: 4,
    },
    {
        title: "Взрывные котята",
        description: "Мир Хобби",
        tags: ["Скоро закончится!"],
        price: 39,
        img: "./img/2.jpeg",
        rating: 3,
    },
    {
        title: "ДаНетка",
        description: "Нескучные игры",
        tags: ["Лидер продаж"],
        price: 9.77,
        img: "./img/3.jpeg",
        rating: 3.1,
    },
    {
        title: "Словодел",
        description: "Десятое Королевство",
        tags: ["Лидер продаж"],
        price: 9.73,
        img: "./img/4.jpeg",
        rating: 3.7,

    },
    {
        title: "Неудержимые единорожки",
        description: "Мир Хобби",
        tags: ["Лидер продаж"],
        price: 39,
        img: "./img/5.jpeg",
        rating: 4.3,

    },
    {
        title: "Мемов бокс",
        description: "Нескучные игры",
        tags: ["Скоро закончится!"],
        price: 79,
        img: "./img/6.jpeg",
        rating: 3.8,

    },
    {
        title: "101 игра для всей семьи",
        description: "Настольные игры для компании",
        tags: ["Лидер продаж"],
        price: 300,
        img: "./img/7.jpeg",
        rating: 4.9,

    },
    {
        title: "Настольная игра «Вокруг света»",
        description: "Подойдёт как детям, так и взрослым",
        tags: ["Лидер продаж"],
        price: 88.43,
        img: "./img/8.jpeg",
        rating: 5,
    },
    {
        title: "Рик и Морти «Близкие риконтакты риковой степени»",
        description: "Нескучные игры",
        tags: ["Лидер продаж"],
        price: 70,
        img: "./img/9.jpeg",
        rating: 4.1,
    },
    {
        title: "Калейдос",
        description: "Стиль жизни",
        tags: ["Лидер продаж"],
        price: 60,
        img: "./img/10.jpeg",
        rating: 3.8,
    },
    {
        title: "Настольная игра «Фефекты фикции»",
        description: "Коммуникация и общение, развивающая",
        tags: ["Лидер продаж"],
        price: 52.96,
        img: "./img/11.jpeg",
        rating: 4.1,

    },
    {
        title: "Сочетай фигуры",
        description: "Головоломки, развивающая",
        tags: ["Скоро закончится!"],
        price: 30,
        img: "./img/12.jpeg",
        rating: 3.8,

    },
];


const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");


function prepareShopItem(shopItem) {
    const { title, description, tags, img, price, rating } = shopItem;
    const item = itemTemplate.content.cloneNode(true);
    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price} руб.`;


    const ratingContainer = item.querySelector(".rating");
    for (let i = 0; i < rating; i++) {
        const star = document.createElement("i");
        star.classList.add("fa", "fa-star");
        ratingContainer.append(star);
    }


    const tagsHolder = item.querySelector(".tags");
    tags.forEach((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        element.classList.add("tag");
        tagsHolder.append(element);
    });


    return item;

}


let currentState = [...items];

function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";
    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });
    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}


renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));


function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }


    if (a.title < b.title) {
        return -1;
    }

    return 0;
}


const sortControl = document.querySelector("#sort");


sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
        case "expensive":
            {

                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {

                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "rating":
            {

                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case "alphabet":
            {

                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }

    renderItems(currentState);
});


const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();
    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString));
    currentState.sort((a, b) => sortByAlphabet(a, b));
    sortControl.selectedIndex = 0;
    renderItems(currentState);
}


searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);