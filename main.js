var listOfProducts;

/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
    fetch("./products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        listOfProducts = products;
        addProductsToWebpage(); // Ropar på functionen addProductsToWebpage, nedan..
    });
}

    loadProducts();


/** Uses the loaded products data to create a visible product list on the website */

function addProductsToWebpage() { 
    let main = document.getElementsByTagName("main")[0] // Added element

    for(i = 0; i < listOfProducts.length; i++) 
    {        
    let CreatePackage = createProduct(listOfProducts[i])
    main.appendChild(CreatePackage) // Push element into HTML
    }
}

// Creating function for products 
function createProduct(product) {
    // console.log(product);
    // Creates container for all PhoneModels
    let div = document.createElement("div") 
    div.classList.add("phoneModelContainer")

    // Creates h1 for PhoneModels  
    let phoneModelText = document.createElement("h1") 
    phoneModelText.innerText = product.title
    div.appendChild(phoneModelText)

    // Creates PhoneDescription
    let phoneDescription = document.createElement("h2")
    phoneDescription.innerText = product.description
    div.appendChild(phoneDescription)

    // Creates container for Phoneimage
    let imageContainer = document.createElement("div")
    imageContainer.classList.add("imageContainer")
    div.appendChild(imageContainer)

    // Creates PhoneImage
    let productImg = document.createElement("img")
    productImg.src = "./assets/" + product.image
    productImg.classList.add("productImg")
    imageContainer.appendChild(productImg)

    // Creates Price 

    let priceContainer = document.createElement("h3")
    priceContainer.innerText = product.price + " kr"
    div.appendChild(priceContainer)

    // Create container for button
    let buttonContainer = document.createElement("productCard") 
    buttonContainer.classList.add("buttonContainer")
    
    // Add to cart button
    let addToCartButton = document.createElement("button")
    addToCartButton.title = product.title; 
    buttonContainer.onclick = function () 
    {addToCart(product);};
    //addToCartButton.addEventListener("click", {addToCart(product);}) - Varför funkar inte detta?
    div.appendChild(buttonContainer)  
    
     // Button Text
     let buttonText = document.createElement("p")
     buttonText.innerText = "Lägg till i kundvagnen"
     buttonText.classList.add("white")
     buttonContainer.appendChild(buttonText)
     
     // Button Icon
     
     let buttonIcon = document.createElement("div") 
     buttonIcon.classList.add("buttonIcon")
     buttonIcon.innerHTML = '<i class="fas fa-cart-arrow-down"></i>' 
     buttonContainer.appendChild(buttonIcon)

     return div

    }
    
    //  A empty array 
    let cart = []
     
    // This function collect and return cartlist from localStorage. If not existing, returns a empty array 
    function addToCart(product) {     
        let cart = localStorage.getItem("cart")
        if(cart) {
            cart = JSON.parse(cart)
        } else {
            cart = []
        }

        let index = cart.findIndex((cartItem) => { // FindIndex fungerar om true 
        
            if(cartItem.product.title == product.title) {
                return true // Hittar vi match kommer det ta indexet i listan och spara det
            }
            /* går att skriva det nedan också, det gör samma sak som ifsatsen
            return cartItem.product.name == product.name  */
        })

            if(index < 0) {
                cart.push({
                    product: product, // om nyckeln och variablen heter samma räcker det att skriva product
                    quantity: 1
         })
            } else {
                cart[index].quantity++
            }

            localStorage.setItem("cart", JSON.stringify
            (cart));

            printNrOfElements();

        // Calling the function
        //printNrOfElements();
        }

// Creating the function for cartnumber
 function printNrOfElements() {
    let numberCart = document.getElementById("qty") //Detta är H1 från HTML () = document.querySelector(".h1") // Får ut h1:a
    // För att hämta ut listan 
    let cart = localStorage.getItem("cart")

    // Vi kollar om det finns lista i cart
    if(cart) {
        cart = JSON.parse(cart)
    } else { // Annars 
        cart = []
    }

    let totalSum = cart.reduce((sum,item) => sum + item.quantity, 0);
    
    numberCart.innerText = totalSum

 }

// What will be shown if you're logged in or not
function showCorrectAuthBoxes() {

    let loggedInUser = localStorage.getItem("loggedInUser")

    if(loggedInUser) {
        /* loggedInUser = JSON.parse(loggedInUser) */
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

    showCorrectAuthBoxes();
})

// Fungerar ej än. Skall lägga till carten i loggedinuser (localstorage). Eller skall man lägga till det vid pushen? If logged in user är true Pusha här annars pusha i den vanliga carten? 
/* function cartToUser() {

    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));  
    let cart = JSON.parse(localStorage.getItem("cart"));


    if(loggedInUser.length == 1) {
        console.log("Någon är inloggad!")
        // Tankevurpa!!
        loggedInUser.push({cart})
    }
} */



window.addEventListener("load", showCorrectAuthBoxes);
window.addEventListener("load", printNrOfElements);

 





















// TODO: Remove the console.log and these comments when you've read them.
    
/*var listOfProducts;

/** Get products from the json file and store it in a gobal variable */

/*
function loadProducts() {
    fetch("./products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        listOfProducts = products;
        addProductsToWebpage();
    });
}


loadProducts();
    // This would also be a good place to initialize other parts of the UI

/** Uses the loaded products data to create a visible product list on the website */
/*
function addProductsToWebpage() {
    
    let main = document.getElementsByTagName("main")[0]

    for(let i = 0; i < listOfProducts.length; i++)
    {
        let CreatePackage = createProduct(listOfProducts[i])
        main.appendChild(CreatePackage)
    }
}

   // Creating the function for all the content
    function createProduct(product) {

        // PhoneModelContainer
        let div = document.createElement("div")
        div.classList = "phoneModelContainer"
        
        // PhoneModel
        let phoneModelText = document.createElement("h1")
        phoneModelText.innerText = product.title
        div.appendChild(phoneModelText)

        // PhoneDescription
        let descriptionContainer = document.createElement("h3")
        descriptionContainer.innerText = product.description
        div.appendChild(descriptionContainer)

        // Container to Image
        let imageContainer = document.createElement("div")
        imageContainer.classList.add("imageContainer")
        div.appendChild(imageContainer)

        // PhoneImage
        let productImg = document.createElement("img")
        productImg.src = "./assets/" + product.image
        productImg.classList.add("productImg")
        imageContainer.appendChild(productImg)

        // Price
        let priceContainer = document.createElement("h2")
        priceContainer.innerText = product.price + " kr"
        div.appendChild(priceContainer)

        // Button
        let buttonContainer = document.createElement("button")
        buttonContainer.classList.add("buttonContainer")
        div.appendChild(buttonContainer)

        // ButtonText
        let buttonText = document.createElement("h4")
        buttonText.innerText = "Lägg till i kundvagnen"
        buttonText.classList.add("white")
        buttonContainer.appendChild(buttonText)

        return div

}


    // Add your code here, remember to brake your code in to smaller function blocks
    // to reduce complexity and increase readability. Each function should have
    // an explainetory comment like the one for this function, see row 22.
    
    // TODO: Remove the console.log and these comments when you've read them.
/* } */