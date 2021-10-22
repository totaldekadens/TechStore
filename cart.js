
// Fetching the list from localStorage
let shoppingBag = JSON.parse(localStorage.getItem("addItem"));

let totalCount = JSON.parse(localStorage.getItem("count"));
document.getElementById("qty").innerHTML = totalCount



                                        /* console.log(shoppingBag)
                                        console.log(totalCount) */


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
            productImg.src="/assets/" + shopping.image 
            imageContainer.appendChild(productImg)

        // PhoneModel    
        let phoneModelText = document.createElement("h2")
            phoneModelText.innerText = shopping.title
            div.appendChild(phoneModelText)


        // Price on phone     
        let priceItem = document.createElement("h3")
            priceItem.innerText = shopping.price + " kr"
            div.appendChild(priceItem)








            // Container to "ta bort"-button
        let buttonContainer = document.createElement("div")
            buttonContainer.classList.add("buttonContainer")
            buttonContainer.style = "cursor:pointer" 
            buttonContainer.title = shopping.title;
            buttonContainer.onclick = function() {
            deleteItem(this.title); 

/*              console.log(this)
                console.log(shopping)
                console.log(this.title)
                console.log(shopping.title) */
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

// sum the prices from the list
let totalSum = shoppingBag.reduce(function (accumulator, item) {
    return accumulator + item.price;
}, 0);
            /* console.log(totalSum) */

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
 







// This function will delete the object from the array (shoppingBag)   
function deleteItem(title) {

     let productToDelete = title;

    for (let i = 0; i < shoppingBag.length; i++) {

        // comparing the object towards the list. If true:
        if (productToDelete == shoppingBag[i].title) {
            
                        /*  console.log(productToDelete)
                            console.log(shoppingBag[i]) */
                        /*  console.log(shoppingBag) */

                // Deletes the unique item from the list
                shoppingBag.splice(i, 1);
                
                // Updates the key "addItem" in localStorage
                let myAddedItems = JSON.stringify(shoppingBag);
                localStorage.addItem = myAddedItems;

                // Calling the function deleteIt
                deleteIt();
        }
    } 
}

function deleteIt() {

    // fetch the updated list from localStorage
    let shoppingBag = JSON.parse(localStorage.getItem("addItem"));
    // Puts the new value of the list into "wrapper" (container to the products)
    let wrapper = document.getElementsByClassName("wrapper")[0].innerHTML = shoppingBag 

    // Updates the quantity next to the cart with the the lists length.
     let counting = document.getElementById("qty").innerHTML = shoppingBag.length; 
    
    // Updates "count" in localstorage
    let cartItems = JSON.stringify(counting);
    localStorage.count = cartItems;

    // / fetch the updated quantity from localStorage
    let totalCount = JSON.parse(localStorage.getItem("count"));
    
    // Calling the function "renderCart"
    renderCart(); 

    // If my shoppingbag is empty:
    if (shoppingBag == [] || totalCount == 0) {
        localStorage.clear();
        alert("Nu är din kundvagn tom!")
        
        // works but not works. I get the result I want, but i getting errors in the console
        let buttonCompletePurchase = document.getElementsByClassName("buttonCompletePurchase")[0].style.display = "none"
        let totalPrice = document.getElementsByClassName("totalPrice")[0].innerHTML = shoppingBag  // Getting an error. Check!     
    }
}







// this function will clear localStorage and the products from webpage
function completeTheOrder() {

    localStorage.clear();

    updateCartWhenComplete();

}


function updateCartWhenComplete() {

    // Vill ta bort samtliga förutom kundvagnen.  Vet att det finns ett smidigare sätt. Detta är en nödlösning :P      
    let shoppingBag = JSON.parse(localStorage.getItem("addItem"));
    
    let wrapper = document.getElementsByClassName("wrapper")[0].innerHTML = shoppingBag
    let totalPrice = document.getElementsByClassName("totalPrice")[0].innerHTML = shoppingBag // Blir knas just nu då summeringen inte är gjord på totalen. 
    let buttonCompletePurchase = document.getElementsByClassName("buttonCompletePurchase")[0].style.display = "none"


    let totalCount = JSON.parse(localStorage.getItem("count"));
    document.getElementById("qty").innerHTML = totalCount


    alert("Tack för din beställning!")

    }






// Calling this function when the window opens
window.addEventListener("load", renderCart)
