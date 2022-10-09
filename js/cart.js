
const cart = []
//recupérer les items de cache et le mettre dans la variable const cart[]//
ReclaimItemCache ()
cart.forEach((item) => showItems(item))


const buttonCommander = document.querySelector("#order")
buttonCommander.addEventListener("click", (e) => accedeForm(e))

// récuperation du Panier dans le localstorage et une fois trouver la conversion de l'objet on push dans item objetcs//
function ReclaimItemCache() {  
    const numberObjects = localStorage.length
    for (let i = 0; i < numberObjects; i++) {
    const item = localStorage.getItem(localStorage.key (i)) || ""
    const itemObjects = JSON.parse(item)
    cart.push (itemObjects)

    }
}
//fabriquer les item//
function showItems(item) {
    const article = createArticle(item)
    const divImage = createImageDiv(item)
    article.appendChild(divImage)

    const cartItemContent = showCartContent(item)
    article.appendChild(cartItemContent)
    showArticle(article)
    showTotalQuantity(item)
    showTotalPrice()
}
function  showTotalQuantity (item) {
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
}
// Calcul du total prix//
function showTotalPrice() {
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    totalPrice.textContent = total
}
    //div// 
function showCartItemContent (item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content")
}
function showCartContent (item) {
    const cartItemContent = document.createElement ("div")
    cartItemContent.classList.add ("cart__item__content")

    const description = showDescription(item)
    const settings = showSettings(item)

    cartItemContent.appendChild (description)
    cartItemContent.appendChild (settings)

    return cartItemContent
}
// Création des contenus des settings
function showSettings (item){
    const settings = document.createElement ("div")
    settings.classList.add ("cart__item__content__settings")

    appendQuantityToSettings(settings, item)
    appendDeleteToSettings (settings,item)
    return settings
}
function appendDeleteToSettings (settings, item){
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))

    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}
// Supression de la ligne  au clic du bouton suppr//
function deleteItem (item) {
    const  itemDelete =  cart.findIndex (
        (products) => products.id === item.id && products.colors === item.colors
   )
    cart.splice (itemDelete , 1)
        showTotalPrice()
        showTotalQuantity()
        removeDataCache(item)
        removeArticlePanier(item)
}
    //supprimer les articles de panier//
    function  removeArticlePanier (item) {
        const articleToDelete = document.querySelector(
            `article[data-id="${item.id}"][data-colors="${item.colors}"]`
            )
        articleToDelete.remove()
}
//ratacher quantity a settings//
    function appendQuantityToSettings(settings, item){
        const quantity = document.createElement ("div")
        quantity.classList.add ("cart__item__content__settings__quantity")
        const p  = document.createElement ("p")
        p.textContent = "Qté : "
        quantity.appendChild(p)
        const input = document.createElement ("input")
        input.type = "number"
        input.classList.add ("itemQuantity")
        input.name = "itemQuantity"
        input.min = "1"
        input.max = "100"
        input.value = item.quantity
        //recalculer input showtotal price et quantity//
        input.addEventListener ("input" , () => updatesPriceQuantity (item.id, input.value, item))

        quantity.appendChild(input)
        settings.appendChild(quantity)
} 

//recuperer la nouvelle valeur dans cette function quand  il a un input et appele cette function aller cella  chercher dans cart chercher le  item qu'il se situe dans l' id  et changer la Qté//
function updatesPriceQuantity (id, valueChanged, item) {
    const itemUpdates = cart.find ((item) => item.id === id)
    itemUpdates.quantity = Number(valueChanged) 
    item.quantity = itemUpdates.quantity
    showTotalPrice()
    showTotalQuantity ()
    removeDataCache(item)
}
//effacer le cacher une fois que la commande est fait//
function  removeDataCache(item) {
    const key = `${item.id}-${item.colors}`
    localStorage.removeItem(key)

}

//enregistrer le changement de qte dans localstorage //
function savedataCacheChange(item) {

    const dataSaveChanged = JSON.stringify (item)

    const key = `${item.id}-${ item.colors}`
    localStorage.setItem(key , dataSaveChanged)

}
    //fabriquer decription,h2,P,Price//       
function showDescription (item) {
    const description = document.createElement("div")
    description.classList.add ("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent= item.name

    const p = document.createElement ("p")
    p.textContent = item.colors

    const p1 = document.createElement ("p")
    p1.textContent = item.price + "€"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p1)
    return description
}

//abriquer article//
function showArticle(article){
    document.querySelector("#cart__items").appendChild(article)
}
//fabriquer article//
function  createArticle(item) {
    const article = document.createElement ("article")
    article.classList.add ("cart__item")
    article.dataset.id = item.id
    article.dataset.colors = item.colors
    return article
}
//fabriquer imagediv//
function createImageDiv(item) {
    const div = document.createElement ("div")
    div.classList.add ("cart__item__img")
    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

    // FORM//
// POST du formulaire et création d'un bon de commande - Redirection vers la page confirmation //
function accedeForm (e){
    e.preventDefault ()
    if (cart.length === 0){

    alert ("Veuillez sélectionner les articles à acheter")
    return
    }
    if ( FormInValid()) return
    if (firstNameInvalid()) return
    if (lastNameInvalid()) return
    if (cityInvalid()) return
    if (addresseInvalid()) return
    if (emaimInvalid())return

    const body = createRequetBody()
    fetch("http://localhost:3000/api/products/order",{
        method: "POST",
        body: JSON.stringify(body),
        headers: {
        "content-type": "application/json",
       }
    })
    //on recupere les orderId de data ensuite il nous dirige vers page confirmation.html//
    .then((res)=>res.json())
    .then((data) => {
    const orderId = data.orderId
    window.location.href= "./confirmation.html" + "?orderId=" + orderId
    return console.log (data)  
    })
    .catch ((err) => console.log (err))
}

//pour tout les inputs si un champs est vide afficher les message ("Veuillez remplir tous les champs") 
function FormInValid(){
    const form = document.querySelector(".cart__order__form")
    const inputs = form.querySelectorAll("input")
    inputs.forEach((input) => {
    if (input.value === "") {
        alert("Veuillez remplir tous les champs")
        return true
}
        return false
    })
}
//Verification si Prenom est valide //
function firstNameInvalid (){
    const name = document.querySelector ("#firstName").value
    const regex =  /^[a-z-À-ÖØ-öø-ÿ ]+$/i;
    if (regex.test(name) == false) {
        alert (" erreur dans le champs de saisie")
        return true;
        }
        return false;
}
//Verification si nom  est valide//
function lastNameInvalid (){
    const name = document.querySelector ("#lastName").value
    const regex =  /^[a-z-À-ÖØ-öø-ÿ ]+$/i;
    if (regex.test(name) == false) {
        alert (" erreur dans le champs de saisie")
        return true;
    }
        return false;

}

//Verification si ville est valide//
function cityInvalid(){
    const name = document.querySelector ("#city").value
    const regex=  /^[a-zA-Zéêëèîïâäçù ,'-]{3,20}$/;
    if(regex.test(name)== false){ 
        alert ("Ne peut contenir de chiffres ou caractères spéciaux")
        return true;
    }
        return false;
}
// //Verification si l'adresse est valide//
function addresseInvalid (){
    const name = document.querySelector ("#address").value
    const regex = /^[0-9]{1,3}[a-zA-Zéêëèîïâäçù ,'-]+$/;
    if (regex.test (name) == false){
        alert ("Veuillez saisir une adresse valide <br> Exemple: <i>10 rue de Paris" )
        return true;
    }
    return false;
}
// verification si le email est valide)
function emaimInvalid(){
    const email = document.querySelector ("#email").value
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/
    if (regex.test(email) === false) {
        alert ("Veuillez saisir une adresse email valide")
        return true
    }
    return false
}
function createRequetBody() { 
    const form = document.querySelector (".cart__order__form") 
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
    const body = {  

    contact:{
        firstName:firstName,
        lastName:lastName,
        address:address,
        city: city,
        email: email
    },
    products:  getIdsFromCart()

    }
    return body
}

//Récupération la valeur 0 de numero de la clé//
function  getIdsFromCart() {
    const numbersProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numbersProducts; i ++) { 

    const key = localStorage.key(i)
    const id = key.split("-")[0]
    ids.push(id)
    }
    return ids
}
function  getIdsFromCart() {
    const numbersProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numbersProducts; i ++) { 

    const key = localStorage.key(i)
    const id = key.split("-")[0]
    ids.push(id)
    }
    return ids
}

function  getIdsFromCart() {
    const numbersProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numbersProducts; i ++) { 

    const key = localStorage.key(i)
    const id = key.split("-")[0]
    ids.push(id)
    }
    return ids
}

function  getIdsFromCart() {
    const numbersProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numbersProducts; i ++) { 

    const key = localStorage.key(i)
    const id = key.split("-")[0]
    ids.push(id)
    }
    return ids
}


