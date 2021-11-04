
// Fetching the cart list from localStorage
let cart = JSON.parse(localStorage.getItem("cart"));

// Cart quantity function. Will apply the quantity of the products beside the cart in the header
function printNrOfElements() {

    let numberHeader = document.getElementById("qty")
    let cart = localStorage.getItem("cart")

    if(cart) {
        cart = JSON.parse(cart)
    } else {
        cart = []
    }
    // summing the total quantity in the list 
    let totalSum = cart.reduce((sum,item) => sum + item.quantity, 0);

    numberHeader.innerText = totalSum
}

// Adding the products to webpage
function renderCart() {

    // Taking out main from html
    let main = document.getElementsByTagName("main")[0]
    
    // Will not make a duplicate when clearing the cart from local Storage / Victor, var det så här du menade? 
    main.innerHTML = "";


    // container to cart title and button 
    let titleContainer = document.createElement("div")
        titleContainer.classList.add("titleContainer")
        main.appendChild(titleContainer)

    // Create cart Icon
    let cartIcon = document.createElement("div")
        cartIcon.classList.add("cartIcon")
        titleContainer.appendChild(cartIcon)
        cartIcon.innerHTML = '<i class="fas fa-shopping-cart"></i>'

    // Create Title "Kundvagn"
        let title = document.createElement("h1")
        title.classList.add("cartTitle")
        title.innerText = "Kundvagn"
        titleContainer.appendChild(title)

    // Container that wraps all the shopping items together
    let wrapper = document.createElement("div")
        wrapper.classList.add("wrapper")
        main.appendChild(wrapper)

    // Loop for the list with added items into the shopping cart  
    for(let i = 0 ; i < cart.length ; i++ ) {

        let cartItem = cart[i]  

        // Container to added item
        let div = document.createElement("div")
            div.classList.add("containerAddedItem")
            wrapper.appendChild(div)

        // Container to image 
        let imageContainer = document.createElement("div")
            imageContainer.classList.add("imageContainer")
            div.appendChild(imageContainer)

        // Image // Add the list to source!    
        let productImg = document.createElement("img")
            productImg.classList.add("productImg")
            productImg.src="./assets/" + cartItem.product.image 
            imageContainer.appendChild(productImg)

        // PhoneModel    
        let phoneModelText = document.createElement("h2")
            phoneModelText.innerText = cartItem.product.title
            div.appendChild(phoneModelText)


        // Price on phone     
        let priceItem = document.createElement("h3")
            priceItem.innerText = cartItem.product.price + " kr" + " x " + cartItem.quantity
            div.appendChild(priceItem)


        // Container to "ta bort"-button
        let buttonContainer = document.createElement("div")
            buttonContainer.classList.add("buttonContainer")
            buttonContainer.style = "cursor:pointer" 
            buttonContainer.title = cartItem.product.title;
            buttonContainer.onclick = function() {
            deleteItem(this.title); 
            }; 

            div.appendChild(buttonContainer)
        
        // div to trashcan in buttoncontainer
        let trashIcon = document.createElement("div")
            trashIcon.classList.add("trashIcon")
            buttonContainer.appendChild(trashIcon)
            trashIcon.innerHTML = '<i class="far fa-trash-alt"></i>'

        // Container to text in buttoncontainer // Onödig? 
        let divButtonText = document.createElement("div")
            divButtonText.classList.add("divButtonText")
            buttonContainer.appendChild(divButtonText)

        // ButtonText
        let buttonText = document.createElement("p")
            buttonText.innerText = "Ta bort"
            divButtonText.appendChild(buttonText)

    }

    // Summing the total price of the products in the cart    
    let totalSum = cart.reduce((sum,item) => sum + item.product.price * item.quantity, 0);

    // totalPrice . Fetching the sum from "totalSum"
    let totalPrice = document.createElement("h3")
        totalPrice.innerText = "Totalt pris: " + totalSum + " kr"  
        totalPrice.classList.add("totalPrice")  
        main.appendChild(totalPrice)

    // ButtonCompletePurchase
    let buttonCompletePurchase = document.createElement("div")
        buttonCompletePurchase.classList.add("buttonCompletePurchase")
        main.appendChild(buttonCompletePurchase)
        buttonCompletePurchase.addEventListener("click", completeTheOrder) 
        buttonCompletePurchase.style = "cursor:pointer" 

    // Container to check-icon    
    let divComplete = document.createElement("div")
        divComplete.classList.add("divComplete")
        divComplete.innerHTML = ('<i class="fas fa-check"></i>')
        buttonCompletePurchase.appendChild(divComplete)

    // ButtonCompletePurchaseText 
    let buttonCompletePurchaseText = document.createElement("p")
        buttonCompletePurchaseText.innerText = "Slutför ditt köp"
        buttonCompletePurchase.appendChild(buttonCompletePurchaseText)    
}


// Shows the users previous orders 
function loggedIn() {

    let main = document.getElementsByTagName("main")[0]
    let loggedInUser = localStorage.getItem("loggedInUser");
    let userList = JSON.parse(localStorage.getItem("users"));

    // If someone is logged in, then: 
    if(loggedInUser){
    
        let myOrders = document.createElement("h2");
            myOrders.innerText = "Mina tidigare beställningar"
            myOrders.classList.add("myOrders")
            main.appendChild(myOrders)

        for(let i = 0 ; i < userList.length ; i++) {

            let user = userList[i]
            // Matching the logged in user with the userlist. If match, then:
            if(user.username == loggedInUser) {

                user.orders.forEach(order => {
                    let containerprevious = document.createElement("div")
                    containerprevious.classList.add("containerprevious")
                    main.appendChild(containerprevious)

                    let orderNumber = document.createElement("h3")
                    orderNumber.innerText = "Order: " + order.order
                    orderNumber.classList.add("orderNumber")
                    containerprevious.appendChild(orderNumber)

                    let dateOfOrder = document.createElement("h3")
                    dateOfOrder.innerText = order.Date
                    dateOfOrder.classList.add("dateOfOrder")
                    containerprevious.appendChild(dateOfOrder)

                    order.products.forEach((product) => {
                        let containerOfPreviousOrders = document.createElement("div")
                            containerOfPreviousOrders.classList.add("containerOfPreviousOrders")
                            main.appendChild(containerOfPreviousOrders)

                        let productsOfOrder = document.createElement("div")
                            productsOfOrder.innerText = product.product.title
                            productsOfOrder.classList.add("containingProducts")
                            containerOfPreviousOrders.appendChild(productsOfOrder)

                        let qtyOfProduct = document.createElement("div")
                            qtyOfProduct.innerText = product.quantity + " st  x  " + product.product.price + " kr"
                            qtyOfProduct.classList.add("containingProducts")
                            containerOfPreviousOrders.appendChild(qtyOfProduct)
                    })
                });
            }
        }   
    }              
}
 
// This function will delete the object from the cart list  
function deleteItem(title) {

    let productToDelete = title;

    for (let i = 0; i < cart.length; i++) {

        // comparing the object towards the list. If true:
        if (productToDelete == cart[i].product.title) {
        
            // Deletes the unique item from the list
            if(cart[i].quantity == 1) {
            cart.splice(i, 1);
            } else {
            cart[i].quantity--
            }
            // Updates the key "cart" in localStorage
            localStorage.setItem("cart", JSON.stringify(cart)); 

            // Calling the function deleteIt and printNrOfElements
            deleteIt();
            printNrOfElements();
        }
    } 
}

function deleteIt() {

    // fetch the updated list from localStorage
    let cart = JSON.parse(localStorage.getItem("cart"));
    
    // If my cart is empty:
    if (cart == [] || cart == "") {
        
        /* localStorage.clear(); */  // kan ej använda denna då den tar bort användaruppgifter
        localStorage.removeItem("cart");

        let cart = JSON.parse(localStorage.getItem("cart"));
        
        let wrapper = document.getElementsByClassName("wrapper")[0].style.display = "none"
        let totalPrice = document.getElementsByClassName("totalPrice")[0].style.display = "none"
        let buttonCompletePurchase = document.getElementsByClassName("buttonCompletePurchase")[0].style.display = "none"

        alert("Nu är din kundvagn tom!")

        printNrOfElements();

    } else {
        renderCart();  
    }
}

// Clear cart from local storage and clear the website from innecessary information
function completeTheOrder() {
 
    let loggedInUser = localStorage.getItem("loggedInUser");
    let userList = JSON.parse(localStorage.getItem("users"));
    let cart = JSON.parse(localStorage.getItem("cart"));


    if(loggedInUser) {

        for( let i = 0 ; i < userList.length ; i++) {

            let user = userList[i]            
            
            if(user.username == loggedInUser) {
                
                let orderNr = Math.floor(Math.random() * 100) + 1;
                let now = new Date().toLocaleString()
         
                user.orders.push({
                    order: orderNr,
                    Date: now,
                    products: cart,
                })

                localStorage.setItem("users", JSON.stringify(userList));

                localStorage.removeItem("cart")

                let wrapper = document.getElementsByClassName("wrapper")[0].style.display = "none"
                let totalPrice = document.getElementsByClassName("totalPrice")[0].style.display = "none"
                let buttonCompletePurchase = document.getElementsByClassName("buttonCompletePurchase")[0].style.display = "none"

                alert("Tack för din beställning!")

                printNrOfElements();

            } 

        }
        return
    } 

    localStorage.removeItem("cart");
    
    let wrapper = document.getElementsByClassName("wrapper")[0].style.display = "none"
    let totalPrice = document.getElementsByClassName("totalPrice")[0].style.display = "none"
    let buttonCompletePurchase = document.getElementsByClassName("buttonCompletePurchase")[0].style.display = "none"

    alert("Tack för din beställning!")

    printNrOfElements();
}


// What will be shown if you're logged in or not
function showCorrectAuthBoxes() {

    let loggedInUser = localStorage.getItem("loggedInUser")


    if(loggedInUser) {

        document.getElementsByClassName("myPage")[0].classList.add("hidden")
        document.getElementsByClassName("logOut")[0].classList.remove("hidden")

        return
    } 
        document.getElementsByClassName("myPage")[0].classList.remove("hidden")
        document.getElementsByClassName("logOut")[0].classList.add("hidden")
        loggedInUser = []
}

// When you click on logOut-link
document.querySelector(".logOut").addEventListener("click", () => {
    document.getElementsByClassName("myPage")[0].classList.remove("hidden")
    document.getElementsByClassName("logOut")[0].classList.add("hidden")
    localStorage.removeItem("loggedInUser")
    alert("Du är utloggad!")
})

// Calling this function when the window opens
window.addEventListener("load", renderCart)
window.addEventListener("load", printNrOfElements)
window.addEventListener("load", showCorrectAuthBoxes);
window.addEventListener("load", loggedIn);
