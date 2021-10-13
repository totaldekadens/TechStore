
// Lista för att testa
let shoppingBag = [
    {
        title: "iPhone X",
        Description: "Last years phone from Apple with a beautiful all display front.",
        Image: "iphoneX.png",
        Price: 4999
    },{
        title: "iPhone 13",
        Description: "Last years phone from Apple with a beautiful all display front.",
        Image: "iphone13.png",
        Price: 10299 
    },{
        title: "iPhone 13 Pro",
        Description: "Last years phone from Apple with a beautiful all display front.",
        Image: "iphone13Pro.png",
        Price: 12566
    },{
        title: "Samsung S22",
        Description: "Last years phone from Apple with a beautiful all display front.",
        Image: "SamsungS22.png",
        Price: 6000
    }
]




// Taking out main from html
let main = document.getElementsByTagName("main")[0]

// Create Title "Kundvagn"
let title = document.createElement("h1")
title.classList.add("cartTitle")
title.innerText = "Kundvagn"
main.appendChild(title)

// Container that wraps all the shopping items together
let wrapper = document.createElement("div")
    wrapper.classList.add("wrapper")
    main.appendChild(wrapper)








// Loop for the list with added items into the shopping cart    
for(let i = 0 ; i < shoppingBag.length ; i++ ) {


let shopping = shoppingBag[i]  


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
    productImg.src= "/assets/" + shopping.Image 
    imageContainer.appendChild(productImg)

// PhoneModel // Add the list to innerText!    
let phoneModelText = document.createElement("h2")
    phoneModelText.innerText = shopping.title
    div.appendChild(phoneModelText)


// Price on phone // Add the list to innerText!     
let priceItem = document.createElement("h3")
    priceItem.innerText = shopping.Price + " kr"
    div.appendChild(priceItem)

// Button
let buttonContainer = document.createElement("button")
    buttonContainer.classList.add("buttonContainer")
    div.appendChild(buttonContainer)

// ButtonText // Add trash-icon
let buttonText = document.createElement("h4")
    buttonText.innerText = "Ta bort"
    buttonContainer.appendChild(buttonText)

}







// totalPrice // Add sum of the list in innerText "4999"!
let totalPrice = document.createElement("h3")
    totalPrice.innerText = "Totalt pris:" + " 4999" + " kr"  
    totalPrice.classList.add("totalPrice")  
    main.appendChild(totalPrice)


// ButtonCompletePurchase
let buttonCompletePurchase = document.createElement("button")
    buttonCompletePurchase.classList.add("buttonCompletePurchase")
    main.appendChild(buttonCompletePurchase)

// ButtonCompletePurchaseText // Add a complete-icon
let buttonCompletePurchaseText = document.createElement("h4")
    buttonCompletePurchaseText.innerText = "Slutför ditt köp"
    buttonCompletePurchase.appendChild(buttonCompletePurchaseText)    




