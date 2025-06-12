
const foodMenu = document.querySelector('.food-menu');
const searchInput = document.getElementById('searchInput');
const cartItemsList = document.getElementById('cart-items');
const cartTotalPriceElement = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');
let cart = [];

const foodItemsData = [
    {
        id: 1,
        name: "Chicken Burger",
        description: "Juicy grilled chicken patty with fresh toppings.",
        price: 850,
        image:
            "img/pic1.webp"
    },
    {
        id: 2,
        name: "Beef Steak",
        description: "Tender and flavorful grilled beef steak.",
        price: 1800,
        image:
            "img/Grilled-Beef.jpg"
    },
    {
        id: 3,
        name: "Vegetable Pizza",
        description: "Delicious pizza loaded with fresh vegetables.",
        price: 1200,
        image:
            "img/images.jpg"
    },
    {
        id: 4,
        name: "Spaghetti Carbonara",
        description: "Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
        price: 950,
        image:
            "img/spaghetti.jpg"
    },
    {
        id: 5,
        name: "Fish and Chips",
        description: "Crispy battered fish served with thick-cut fries.",
        price: 1100,
        image:
            "img/fish-and-chips.jpg"
    },
    {
        id: 6,
        name: "Mutton Biryani",
        description: "Fragrant rice dish cooked with tender mutton pieces and spices.",
        price: 1500,
        image: "img/Mutton.jpg"
    },
    {
        id: 8,
        name: "Samosa (2 pcs)",
        description: "Crispy and savory fried pastries filled with spiced potatoes and peas.",
        price: 200,
        image: "img/Samosa.webp"
    },
    {
        id: 9,
        name: "Fruit Salad",
        description: "A refreshing mix of seasonal fresh fruits.",
        price: 600,
        image:
            "img/FruitSalad.jpg"
    },
    {
        id: 10,
        name: "Chocolate Cake",
        description: "Rich and decadent chocolate cake slice.",
        price: 700,
        image:
            "img/cake.jpg"
    }
];

//Here we fetch the food cards in container
function fetching(items) {
    foodMenu.innerHTML = "";
    items.forEach(food => {
        let card = document.createElement("div");
        card.classList.add("food-card");
        card.innerHTML = `<img src="${food.image}" alt="img">
            <div class="food-details">
                <h3 class="food-title">${food.name}</h3>
                <p class="food-description">${food.description}</p>
                <p class="food-price">PKR ${food.price}</p>
                <button class="btn-addToCart" data-id="${food.id}">Add to Cart</button>
            </div>`
        foodMenu.appendChild(card);
    });
    const addtocartButtons = document.querySelectorAll(".btn-addToCart");
    addtocartButtons.forEach(button => {
        button.addEventListener("click", addToCart)
    })
}

//Here we add the the items into Carts.
function addToCart(event) {
    const foodId = parseInt(event.target.dataset.id);
    const selectedFood = foodItemsData.find(food => food.id === foodId);
    if (selectedFood) {
        const existingItem = cart.find(item => item.id === foodId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...selectedFood, quantity: 1 });
        }
        updateCart();
    }
}

//Here we search the item by name in searchBar
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredFood = foodItemsData.filter(food =>
        food.name.toLowerCase().includes(searchTerm)
    );
    fetching(filteredFood);
});

//Here we remove the item from Cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

//Here we update the Cart to remove/add
function updateCart() {
    cartItemsList.innerHTML = "";
    let totalprice = 0;
    if (cart.length === 0) {
        const emptyCartMessage = document.createElement('li');
        emptyCartMessage.classList.add('empty-cart');
        emptyCartMessage.textContent = 'Your cart is empty.';
        cartItemsList.appendChild(emptyCartMessage);
        checkoutBtn.disabled = true;
    } else {
        cart.forEach(item => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <div class="cart-item-details">
                    <span class="cart-item-name">${item.name}</span>                     
                    <div class="plusminus">
                    <img src="img/minus-sign.png" class="minus" data-id="${item.id}" alt="" ></div>
                    <span class="cart-item-quantity">${item.quantity} </span>
                    <img src="img/pluss.png" class="plus" data-id="${item.id}" alt="">
                </div>
                <span class="cart-item-price">PKR ${(item.price * item.quantity).toFixed(0)} </span>
                <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
                `;
            cartItemsList.appendChild(listItem);
            totalprice += item.price * item.quantity;
        });
        checkoutBtn.disabled = false;

        //Here we plus the cart item
        const plus = document.querySelectorAll(".plus");
        plus.forEach(button => {
            button.addEventListener("click", (e) => {
                const foodId = parseInt(e.target.dataset.id);
                const existingItem = cart.find(item => item.id === foodId);
                if (existingItem) {
                    existingItem.quantity++;
                }
                updateCart();
            })
        })

        //Here we minus the cart item 
        const minus = document.querySelectorAll(".minus");
        minus.forEach(button => {
            button.addEventListener("click", (e) => {
                const foodId = parseInt(e.target.dataset.id);
                const existingItem = cart.find(item => item.id === foodId);
                if (existingItem) {
                    if (existingItem.quantity !== 1) {                        
                        existingItem.quantity--;
                    }
                }
                updateCart();
            })
        })
        // Add event listeners to the "Remove" buttons
        const removeButtons = document.querySelectorAll('.remove-from-cart-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const itemId = parseInt(event.target.dataset.id);
                removeFromCart(itemId);
            });
        });
    }
    cartTotalPriceElement.textContent = `PKR ${totalprice.toFixed(0)}`;
}

//Here we first Fetch the Food Cards
fetching(foodItemsData);
updateCart();

//Here we check the button to order/delay
checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Checkout functionality is not implemented yet. Your order details:\n');
        cart = [];
        updateCart();
    }
});
