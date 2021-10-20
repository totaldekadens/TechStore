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
    // This would also be a good place to initialize other parts of the UI


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

    // Create container for button

    let buttonContainer = document.createElement("div")
    buttonContainer.classList.add("buttonContainer")
    buttonContainer.addEventListener("click", addItem) 
    div.appendChild(buttonContainer)

    function addItem() {
        alert ("Produkten ska adderas i varukorgen")
    }

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