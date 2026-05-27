
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

                return;

            }

            const orderModal = document.getElementById("order-modal");
            orderModal.style.display = "flex";

            //мікротаймаут, щоб браузер встиг помітити display перед початком анімації
            setTimeout(() => {
                orderModal.classList.add("show");
            }, 10);
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

                        <small>
                            ${item.quantity} *${item.price} грн =
                            ${item.quantity * item.price} грн
                        </small>

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

        function toggleTheme() {
            document.body.classList.toggle("light-theme");
        }

        function openModal(title, description, price, image) {

            document.getElementById("pizza-modal")
            const modal = document.getElementById("pizza-modal");

            modal.style.display = "flex";

            setTimeout(() => {
                modal.classList.add("show");
            }, 10);

            document.getElementById("modal-title")
            .innerHTML = title;

            document.getElementById("modal-description")
            .innerHTML = description;

            document.getElementById("modal-price")
            .innerHTML = price + " грн";

            document.getElementById("modal-img")
            .src = image;
        }

        function closeModal(event) {
            if (event.target.id === "pizza-modal") {
                
                const modal = document.getElementById("pizza-modal");

                modal.classList.remove("show");

                setTimeout(() => {
                    modal.style.display = "none";
                }, 300);
            }   
        }

        function closeModalButton() {

           const modal = document.getElementById("pizza-modal");

           modal.classList.remove("show");

           setTimeout(() => {

           }, 300);
 
        }

        const btn = document.getElementById("scrollToTopBtn");

                //показуєт кнопку, коли юзер прокручує сторінку до низу
        window.addEventListener("scroll", function() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                btn.classList.add("show");
            } else {
                btn.classList.remove("show");
            }
        });

        
                //прокручує сторінку плавно до самого верху при наимсканні
        btn.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"//забезпечує плавний скролінг
            });
        });


        //функції форми замовлення
        function closeOrderModal() {
            
            const orderModal = document.getElementById("order-modal");
            orderModal.classList.remove("show");

            //чекає 300мс (поки триває transition в css), а потім повністю ховає
            setTimeout(() => {
                orderModal.style.display = "none";
            }, 300);
        }

        function submitOrder() {

            const name =
            document.getElementById("customer-name").value;

            const phone =
            document.getElementById("customer-phone").value;

            const address =
            document.getElementById("customer-address").value;

            if (!name || !phone || !address) {
                alert(
                    "Заповніть всі обов'язкові поля😉");
                
                return;
            }

            alert(
                "Дякуємо за замовлення, " + name + "🍕\n\n" +
                "Наш кур'єр вже мчить до Вас😎"
            );

            closeOrderModal();

            resetCart();
        }



         
        document.getElementById("cart").innerHTML =
        "🛒 У кошику: " + count;

        document.getElementById("order-total").innerHTML =
        "(" + total + " грн)";

       renderCart();
        



            

