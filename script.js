

        let count = Number(localStorage.getItem("count")) || 0;
        let total = Number(localStorage.getItem("total")) || 0;
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        function addToCart(name, price) {
            count++;
            total += price;

            const existingPszza = cart.find(item => item.name === name);
            if (existingPszza) {
                existingPszza.quantity++;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });

            }
            
        

            document.getElementById("cart").innerHTML =
            "🛒 У кошику: " + count;

            document.getElementById("order-total").innerHTML =
            "(" + total + " грн)";
            localStorage.setItem("count", count);
            localStorage.setItem("total", total);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();

            showToast("🍕 Додано піцу з " + name);
        }

        function clearCart() {
            if (confirm("Ви точно бажаєте очистити кошик?")) {
                
                resetCart();
            }
        }

        function makeOrder() {

            if (count === 0) {

                alert("Ваш кошик порожній🥲");

            } else {
        
                alert(
                    "Дякуємо за замовлення! 👌\n\n" +
                    "Піц у кошику: " + count + 
                    "\nСума: "+ total + " грн"
                );

                resetCart()
            }
        }   

        function resetCart() {
            count = 0;
            total = 0;

            document.getElementById("cart").innerHTML =
            "🛒 У кошику: 0";

            document.getElementById("cart-items").innerHTML = "";

            document.getElementById("order-total").innerHTML =
            "(0 грн)";
            localStorage.removeItem("count");
            localStorage.removeItem("total");
            
            cart = []
            localStorage.removeItem("cart");
        }

        function removeItem(price, button) {

            count--;
            total -= price;
            cart.pop();

            document.getElementById("cart").innerHTML =
            "🛒 У кошику: " + count;

            document.getElementById("order-total").innerHTML =
            "(" + total + " грн)";

            button.parentElement.remove();

            localStorage.setItem("count", count);
            localStorage.setItem("total", total);
            localStorage.setItem("cart",JSON.stringify(cart));
            renderCart();

            if (count === 0) {
                document.getElementById("cart-items").innerHTML =
                "<p>Кошик порожній🥲</p>";
            }
            
        }

        function increaseQuantity(name) {
            const pizza = cart.find(item => item.name === name);

            pizza.quantity++;

            count++;
            total += pizza.price;

            localStorage.setItem("count",count);
            localStorage.setItem("total", total);
            localStorage.setItem("cart", JSON.stringify(cart));

            renderCart();

            document.getElementById("cart").innerHTML = 
            "🛒 У кошику: " + count;

            document.getElementById("order-total").innerHTML =
            "(" + total + " грн)";
            
        }

        function decreaseQuantity(name) {
            const pizza = cart.find(item => item.name === name);

            pizza.quantity--;

            count--;
            total -= pizza.price;

            if (pizza.quantity <= 0) {
                cart = cart.filter(item => item.name !== name)
            }

            localStorage.setItem("count",count);
            localStorage.setItem("total", total);
            localStorage.setItem("cart", JSON.stringify(cart));

            renderCart();

            document.getElementById("cart").innerHTML = 
            "🛒 У кошику: " + count;

            document.getElementById("order-total").innerHTML =
            "(" + total + " грн)";
            
        }


        function showToast(text) {
            const toast = document.getElementById("toast");

            toast.innerHTML = text;

            toast.classList.add("show");

            setTimeout(() => {
                toast.classList.remove("show");
            },  2000);

        }

        function searchPizza() {

            const input = document
            .getElementById("search")
            .value
            .toLowerCase();

            const cards = document.querySelectorAll(".pizza-card");

            cards.forEach(card => {

                const title = card
                    .querySelector("h2")
                    .innerText
                    .toLowerCase();

                if (title.includes(input)) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none"
                }
            });
        }

        function renderCart() {
            const cartItems = document.getElementById("cart-items");

            cartItems.innerHTML = "";

            if (cart.length === 0) {
                cartItems.innerHTML = "<p>Кошик порожній🥲</p>";
                return;
            }

            cart.forEach(item => {
                cartItems.innerHTML += `
                <div class="cart-item">  
                    <div>
                        <p>
                            🍕${item.name}
                        </p>
                        <div>
                            <button onclick="decreaseQuantity('${item.name}')">
                                -
                            </button>
                            <span>
                                ${item.quantity}
                            </span>

                            <button onclick="increaseQuantity('${item.name}')">
                                +
                            </button>

                        </div>

                    </div>      

                    <button class="remove-btn"
                    onclick="removeItem(${item.price}, this)">
                        ❌
                    </button>            
                </div>
                `;
            });

        }
        
        document.getElementById("cart").innerHTML =
        "🛒 У кошику: " + count;

        document.getElementById("order-total").innerHTML =
        "(" + total + " грн)";

       renderCart();
        
