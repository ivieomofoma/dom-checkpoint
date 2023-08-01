// Sample array of preselected items
const items = [
    { id: 1, name: "Item 1", price: 10, image: "item1.jpg" },
    { id: 2, name: "Item 2", price: 20, image: "item2.jpg" },
    { id: 3, name: "Item 3", price: 15, image: "item3.jpg" },
  ];
  
  let cartItems = [];
  
  function renderCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    cartItemsDiv.innerHTML = "";
  
    cartItems.forEach((item) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");
  
      cartItemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <span>${item.name}</span>
        <button onclick="removeItem(${item.id})">-</button>
        <span>${item.quantity}</span>
        <button onclick="addItem(${item.id})">+</button>
        <i class="heart-icon ${item.liked ? 'liked' : ''}" onclick="toggleLike(${item.id})">&hearts;</i>
      `;
  
      cartItemsDiv.appendChild(cartItemDiv);
    });
  
    updateTotalPrice();
  }
  
  function updateTotalPrice() {
    const totalPriceDiv = document.getElementById("total-price");
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    totalPriceDiv.textContent = `Total Price: $${totalPrice}`;
  }
  
  function addItem(itemId) {
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);
  
    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity++;
    }
  
    renderCart();
  }
  
  function removeItem(itemId) {
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);
  
    if (itemIndex !== -1) {
      if (cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity--;
      } else {
        cartItems.splice(itemIndex, 1);
      }
    }
  
    renderCart();
  }
  
  function toggleLike(itemId) {
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);
  
    if (itemIndex !== -1) {
      cartItems[itemIndex].liked = !cartItems[itemIndex].liked;
    }
  
    renderCart();
  }
  
  // Add the preselected items to the cart with a default quantity of 1
  items.forEach((item) => cartItems.push({ ...item, quantity: 1, liked: false }));
  
  // Initial rendering of the cart
  renderCart();
  