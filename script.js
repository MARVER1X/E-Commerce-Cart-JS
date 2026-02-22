// --- DOM Nodes & Global State ---
let shop = document.getElementById("shop");

// Mock JSON Database (Product Catalog)
let shopItemsData = [
    {
        id: "cassss",
        name: "Casual Shirt",
        price: 45,
        desc: "Casual shirt to go out and look at trees or something.",
        img: "images/img-1.jpg"
    },
    { 
        id: "offff",
        name: "Office Shirt",
        price: 100,
        desc: "Office shirt for work, you know the official look.",
        img: "images/img-2.jpg"
    },
    { 
        id: "tshiii",
        name: "T-Shirt",
        price: 25,
        desc: "Cool T-shirt for random events like buying milo or something.",
        img: "images/img-3.jpg"
    },
    { 
        id: "menssss",
        name: "Mens Suit",
        price: 300,
        desc: "A cool shirt that proves you are a man. So get it and prove it.",
        img: "images/img-4.jpg"
    }
];

// Application State Array (Shopping Cart)
let basket = [];

// --- View Rendering Logic ---
let generateShop = () => {
    // Map over JSON data and inject HTML components directly into the DOM
    return (shop.innerHTML = shopItemsData.map((dataItems) => {
        let { id, price, img, desc, name } = dataItems;
        return `
        <div id="product-id-${id}" class="item">
            <img width="220" src="${img}" alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                        <div id="${id}" class="quantity">0</div>
                        <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join(""));
};

// Initialize DOM render on load
generateShop();

// --- State Mutation Handlers ---
let increment = (id) => {
    let search = basket.find((x) => x.id === id);

    // If item doesn't exist in basket state, push it. Otherwise, increment quantity.
    if (search === undefined) {
        basket.push({
            id: id,
            item: 1
        });
    } else {
        search.item += 1; 
    }
    update(id);
};

let decrement = (id) => {
    let search = basket.find((x) => x.id === id);

    // Guard clause: Prevent decrementing below 0 or throwing errors if undefined
    if (search === undefined) {
        basket.push({
            id: id,
            item: 0
        });
    } else if (search.item > 0) {
        search.item -= 1; 
    }
    update(id);
};

// --- UI Update & Calculation Logic ---
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // Mutate the specific quantity DOM node for the interacted item
    document.getElementById(id).innerHTML = search.item;
    cartCal();
};

let cartCal = () => {
    let cartCount = document.getElementById("cart-amount");
    // Reduce array to calculate total sum of items currently in the basket state
    cartCount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

