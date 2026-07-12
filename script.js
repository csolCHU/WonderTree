// This is product ID, img, price, description, and tag assignment
const products = [
    {
        id: 1, 
        name:"Cat Collar", 
        img:"images/catcollar.jpg",
        price:800, 
        description:"This product is a collar for cats. Not too tight to be uncomfortable for them.",
        tags:["cat","collar"]
    },
    {
        id: 2, 
        name:"Cat Food", 
        img:"images/catfood.jpg",
        price:1000, 
        description:"This product is organic catfood. Please send a message if your cat is allergic.",
        tags:["cat","food"]
    },
    {
        id: 3, 
        name:"Cat Harness", 
        img:"images/catharness.jpg",
        price:800, 
        description:"This product is a harness for cats.",
        tags:["cat","saddle_harness"]
    },
    {
        id: 4, 
        name:"Cat Saddle", 
        img:"images/catsaddle.jpg",
        price:1200, 
        description:"This product is a saddle for cats.",
        tags:["cat","saddle_harness"]
    },
    {
        id: 5, 
        name:"Cat toy", 
        img:"images/cattoy.jpg",
        price:600, 
        description:"This product is a toy for cats.",
        tags:["cat","toys"]
    },
    {
        id: 6, 
        name:"Dog Collar", 
        img:"images/dogcollar.jpg",
        price:700, 
        description:"This product is a collar for dogs.",
        tags:["dog","collar"]
    },
    {
        id: 7, 
        name:"Dog Food", 
        img:"images/dogfood.jpg",
        price:1000, 
        description:"This product is food for dogs. Please send a message if your dog is allergic.",
        tags:["dog","food"]
    },
    {
        id: 8, 
        name:"Dog Harness", 
        img:"images/dogharness.jpg",
        price:600, 
        description:"This product is a harness for dogs.",
        tags:["dog","saddle_harness"]
    },
    {
        id: 9, 
        name:"Dog Saddle", 
        img:"images/dogsaddle.jpg",
        price:800, 
        description:"This product is a saddle for dogs.",
        tags:["dog","saddle_harness"]
    },
    {
        id: 10, 
        name:"Dog Toy", 
        img:"images/dogtoy.jpg",
        price:400, 
        description:"This product is a toy for dogs.",
        tags:["dog","toys"]
    },
    {
        id: 11, 
        name:"Fish Feed", 
        img:"images/fishfood.jpg",
        price:1000, 
        description:"This product is food for fish.",
        tags:["fish","food"]
    },
    {
        id: 12, 
        name:"Fish Tank", 
        img:"images/fishtank.jpg",
        price:1200, 
        description:"This product is a fishtank.",
        tags:["fish","cage"]
    },
    {
        id: 13, 
        name:"Aquarium Toy", 
        img:"images/fishtoy.jpg",
        price:600, 
        description:"This product is a toy for your aquarium.",
        tags:["fish","toys"]
    },
    {
        id: 14, 
        name:"Litter Box", 
        img:"images/litterbox.jpg",
        price:600, 
        description:"This product is a litterbox.",
        tags:["cat","deco"]
    },
    {
        id: 15, 
        name:"Parrot Collar", 
        img:"images/parrotcollar.jpg",
        price:800, 
        description:"This product is a collar for parrots.",
        tags:["parrot","collar"]
    },
    {
        id: 16, 
        name:"Parrot Food", 
        img:"images/parrotfood.jpg",
        price:1000, 
        description:"This product is food for parrots.",
        tags:["parrot","food"]
    },
    {
        id: 17, 
        name:"Parrot Harness", 
        img:"images/parrotharness.jpg",
        price:600, 
        description:"This product is a harness for parrots.",
        tags:["parrot","saddle_harness"]
    },
    {
        id: 18, 
        name:"Parrot Toy", 
        img:"images/parrottoy.jpg",
        price:400, 
        description:"This product is a toy for parrots.",
        tags:["parrot","toys"]
    },
    {
        id: 19, 
        name:"Cage Decoration", 
        img:"images/petdeco1.jpg",
        price:500, 
        description:"This product is a decoration for your cage.",
        tags:["deco"]
    }
]

/// Array for cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/// Callout. Testing Product Categories
console.log(products[17].description)

/// Landing Page (Can ignore, no functionality aside from display)
const featuredCards = document.querySelectorAll(".featured-card");

if (featuredCards.length > 0) {

    for (let i = 0; i < Math.min(4, products.length); i++) {

        const product = products[i];
        const card = featuredCards[i];

        const image = card.querySelector("img");
        const price = card.querySelector(".product-price");
        const name = card.querySelector(".product-name");
        const description = card.querySelector(".product-desc");

        image.src = product.img;
        image.alt = product.name;

        price.textContent = `₱${product.price}`;
        name.textContent = product.name;
        description.textContent = product.description;
    }

}

// Products Page + Filters (Do not ignore!)
const productGrid = document.getElementById("product-grid");

function displayProducts(productList) {
    if (!productGrid) return;
    let cards = "";
    productList.forEach(product => {
        cards += `
            <div class="product-card" data-id="${product.id}">
                <img src="${product.img}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>₱${product.price}</p>
                <div class="quantity-selector">
                    <button class="minus-btn">-</button>
                    <span class="quantity">0</span>
                    <button class="plus-btn">+</button>
                </div>

                <button class="add-cart-btn">Add to Cart</button>
            </div>
        `;
    });
    productGrid.innerHTML = cards;
    /// Makes funny add to cart button work 
    initializeProductButtons();

    const resultCount = document.getElementById("result-count");
    if (resultCount) {
        resultCount.textContent = `${productList.length} Product(s) Found`;
    }
}

// Show all products first
if (productGrid) {
    displayProducts(products);
}

// Filter Selection
const filters = document.querySelectorAll(".filter-selection input[type='checkbox']");

// Filter Functionality
function filterProducts() {
    let selectedTags = [];
    filters.forEach(filter => {
        if (filter.checked) {
            selectedTags.push(filter.value);
        }
    });

    if (selectedTags.length === 0) {
        displayProducts(products);
        return;
    }
    const filteredProducts = products.filter(product => {
        return selectedTags.every(tag => product.tags.includes(tag));
    });

    displayProducts(filteredProducts);
}

filters.forEach(filter => {
    filter.addEventListener("change", filterProducts);
});

/// Product Search Function
const searchInput = document.getElementById("search-input");
const searchForm = document.querySelector(".search-container");

if (searchForm) {
    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const searchTerm = searchInput.value.trim();
        /// If already on Products Page
        if (productGrid) {
            const searchResults = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            displayProducts(searchResults);
        }

        /// If on Homepage/About/Cart
        else {
            window.location.href =
                `productspage.html?search=${encodeURIComponent(searchTerm)}`;

        }
    });
}

// Check if the user came from another page with a search
const params = new URLSearchParams(window.location.search);
const search = params.get("search");
if (search) {
    searchInput.value = search;
    const searchResults = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );
    displayProducts(searchResults);
}

/// Add to Cart function and quantity selector!!!
function initializeProductButtons() {
    const plusButtons = document.querySelectorAll(".plus-btn");
    const minusButtons = document.querySelectorAll(".minus-btn");
    const addCartButtons = document.querySelectorAll(".add-cart-btn");
    /// Plus
    plusButtons.forEach(button => {
        button.addEventListener("click", function () {
            const quantity =
                button.parentElement.querySelector(".quantity");
            quantity.textContent =
                Number(quantity.textContent) + 1;
        });
    });

    /// Minus
    minusButtons.forEach(button => {
        button.addEventListener("click", function () {
            const quantity =
                button.parentElement.querySelector(".quantity");
            quantity.textContent =
                Math.max(
                    0,
                    Number(quantity.textContent) - 1
                );
        });
    });

    /// Add to Cart
    addCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const card = button.closest(".product-card");
            const productId = Number(card.dataset.id);
            const quantity = Number(
                card.querySelector(".quantity").textContent
            );
            if (quantity === 0) {
                alert("Please select a quantity first.");
                return;
            }
            addToCart(productId, quantity);
        });
    });
}

function addToCart(productId, quantity) {
    const existingProduct = cart.find(item => item.id === productId);
    if(existingProduct){
        existingProduct.quantity += quantity;
    }else{
        cart.push({
            id: productId,
            quantity: quantity
        });
    }
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    console.log(cart);
}

///Cart page functionality
const cartList = document.getElementById("cart-list");
function displayCart() {
    if (!cartList) return;
    cartList.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        cartList.innerHTML += `
            <div class="cart-item">
                <img src="${product.img}" alt="${product.name}" width="100">
                <h3>${product.name}</h3>
                <p>Price: ₱${product.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Subtotal: ₱${itemTotal}</p>
                <hr>
            </div>
        `;
    });
    document.getElementById("cart-count").textContent =
        `Items in Cart: ${cart.length}`;

    document.getElementById("cart-total").textContent =
        `Total Price: ₱${total}`;
}

displayCart();

/// Clears user cart
const clearCartButton = document.getElementById("clear-cart-btn");

if (clearCartButton) {
    clearCartButton.addEventListener("click", function () {
        // Empty the cart array
        cart = [];
        // Remove saved cart from localStorage
        localStorage.removeItem("cart");
        // Refresh the cart display
        displayCart();
    });
}