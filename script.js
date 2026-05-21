
        let count = 0;
        let total = 0;
        
        function addToCart(name, price) {
            count++;
            total += price;

            document.getElementById("cart").innerHTML =
            "🛒 У кошику: " + count;

            document.getElementById("order-total").innerHTML =
            "(" + total + " грн)";

            const cartItems = document.getElementById("cart-items");

            if (count === 1) {
                cartItems.innerHTML ="";
            }

            cartItems.innerHTML += `
                <div class="cart-item">
                    <span>🍕 ${name}</span>

                    <button class="remove-btn"
                    onclick="removeItem(${price}, this)">
                        ❌
                    </button>
                </div>
            `;

            alert("Додано піцу з " + name);
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
            "( 0 грн)";
        }

        function removeItem(price, button) {

            count--;
            total -= price;

            document.getElementById("cart").innerHTML =
            "🛒 У кошику: " + count;

            document.getElementById("order-total").innerHTML =
            "(" + total + " грн)";

            button.parentElement.remove();

            if (count === 0) {
                document.getElementById("cart-items").innerHTML =
                "<p>Кошик порожній🥲</p>";
            }
            
        }
            
