var listOfProducts;

/** Get products from the json file and store it in a gobal variable */
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


/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {
    let main = document.getElementsByTagName("main")[0]

    for(i = 0; i < listOfProducts.length; i++) 
    {        
    let CreatePackage = createProduct(listOfProducts[i])
    main.appendChild(CreatePackage)
    }
}

// Creating function for products 
function createProduct(product) {

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


    // Create container for button and send the unique value of the card to addToCart
    let buttonContainer = document.createElement("div")
    buttonContainer.classList.add("buttonContainer")
    buttonContainer.title = product.title;           // title (your keyword) = "title" from the card 
    buttonContainer.onclick = function() {          // onclick - function() 
    addToCart(this.title);                           // (this.title) =  (product.title)  // Takes the title (this is the one you want to compare) from the card and sending it in to "addToCart"

    console.log(this)
    console.log(product)
    console.log(this.title)
    console.log(product.title) 
    
};

console.log()

    div.appendChild(buttonContainer)

    // Button Text
    
    let buttonText = document.createElement("h4")
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


// Creating an empty list
let cart = []


// Will add item to local storage and my cart
function addToCart(title) {   // (title) = represent product.title from the card 
    
    // Will use productToAdd as a reference to "title".
    let productToAdd = title;
    
                        /* console.log(productToAdd) */

    // creating a loop to find the unique product from listOfProducts
    for (let i = 0; i < listOfProducts.length; i++) {
      
        // Searching for the same title. If they sync the item will be pushed from "listOfProducts" to the "cart"
        if (productToAdd == listOfProducts[i].title) {
        
            cart.push(listOfProducts[i]);
        
                /*      console.log(productToAdd)
                        console.log(listOfProducts[i])
                        console.log(listOfProducts[i].title) */

        // adding the cart to localstorage
        let myAddedItems = JSON.stringify(cart);    
        localStorage.addItem = myAddedItems;

        // Fetching the cart from localStorage
        let AddedToCart = JSON.parse(localStorage.getItem("addItem"));

        // Calling on the function "counter"
        counter(); 
      }
    }
  }


  //adding + 1 to my cart everytime I click "Lägg till i kundvagnen" . 
     function counter() {
        let counting = document.getElementById("qty").innerHTML = cart.length;
    
        let cartItems = JSON.stringify(counting);
        localStorage.count = cartItems;

  } 

  let totalCount = JSON.parse(localStorage.getItem("count"));
  document.getElementById("qty").innerHTML = totalCount
  





















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