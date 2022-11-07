
const cart = []
//recupérer les items de cache et le mettre dans la variable const cart[]//
ReclaimItemCache ()
cart.forEach((item) => showItems(item))


// Ecoute de l'évenement sur l'envoi du formulaire//
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


/*                        AFFICHAGE DU cart_item                            */

//Permet de mettre un article dans le dom//
function showArticle(article){
    document.querySelector("#cart__items").appendChild(article)
}

//Permet de mettre un article dans le dom//
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
   //Permet de ajouter la div a cart__item__content//
   function showCartItemContent (item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content")
}
// Permet la Création des cartes contanant la description et les settings
function showCartContent (item, price) {
    const cartItemContent = document.createElement ("div")
    cartItemContent.classList.add ("cart__item__content")

    const description = showDescription(item, price)
    const settings = showSettings(item)

    cartItemContent.appendChild (description)
    cartItemContent.appendChild (settings)

    return cartItemContent
}

//Permet de mettre dans le dom,h2,P,Price//
    
function showDescription (item, price) {
    const description = document.createElement("div")
    description.classList.add ("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent= item.name

    const p = document.createElement ("p")
    p.textContent = item.colors

    const p1 = document.createElement ("p")
    p1.textContent = price + "€"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p1)
    return description
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
//enregistrer le changement de qte dans localstorage //
function savedataCacheChange(item) {
    const key = `${item.id}-${ item.colors}`
    const dataSaveChanged = JSON.stringify (item)
    localStorage.setItem(key , dataSaveChanged)

}
// Affichage des produits dans le panier//
async function showItems(item) {
     //Requête vers API pour récupérer le prix//
    let response = await fetch( `http://localhost:3000/api/products/${item.id} ` )
   ////Récupération des données en format json
    let product = await response.json()
    const article = createArticle(item)
    const divImage = createImageDiv(item)
    article.appendChild(divImage)

    const cartItemContent = showCartContent(item, product.price)
    article.appendChild(cartItemContent)
    showArticle(article)
    showTotalQuantity(item)
    showTotalPrice(product.price)
}

//recuperer la nouvelle valeur dans cette function quand  il a un input et appele cette function aller cella  chercher dans cart chercher le  item qu'il se situe dans l' id  et changer la Qté//
async function updatesPriceQuantity (id, valueChanged, item) {
    if(Number(valueChanged) < 0) {
        alert('Vous devez fournir une quantité positive!')
        return
    }
    const itemUpdates = cart.find ((item) => item.id === id)
    itemUpdates.quantity = Number(valueChanged)

    let response = await fetch( `http://localhost:3000/api/products/${itemUpdates.id} ` )
    let product= await response.json()
    item.quantity = itemUpdates.quantity
    localStorage.setItem(item.id, JSON.stringify(itemUpdates));

    showTotalPrice()
    showTotalQuantity(product.price)
    removeDataCache(item)
    setTimeout(function(){
         //On rafraichit la page
        window.location.reload()
    }, 1000)
}
 
/*                        AFFICHAGE DU CART_PRICE                          */

   //Calcul de la quantité totale des articles sélectionés
   function  showTotalQuantity (item) {
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
}

//Calcul du prix total des articles sélectionnés
function showTotalPrice(price) {
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total, item) => total + price * item.quantity, 0)
    totalPrice.textContent = total   
}

/*                        GESTION DE SUPPRESION                    */

// Supression de la ligne  au clic du bouton suppr//
async function deleteItem (item) {
    const  itemDelete =  cart.findIndex(
        (product) => product.id === item.id && product.colors === item.colors
   )
   alert("Êtes-vous sûr de vouloir supprimer cette article")
    cart.splice (itemDelete , 1)
    localStorage.removeItem(item.id)
    let response = await fetch( `http://localhost:3000/api/products/${item.id} ` )
    let product= await response.json()
    showTotalPrice(product.price)
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

//effacer le cacher une fois que la commande est fait//
function  removeDataCache(item) {
    const key = `${item.id}-${item.colors}`
    localStorage.removeItem(key)
}

    // FORM//
// POST du formulaire et création d'un bon de commande - Redirection vers la page confirmation //
function accedeForm (e){
    e.preventDefault ()
    
    if (cart.length === 0){

    alert ("Veuillez sélectionner les articles à acheter")
    return
    }
    const body = createRequetBody()
    if (firstNameInvalid(body.contact.firstName)) return
    if (lastNameInvalid(body.contact.lastName)) return
    if (cityInvalid(body.contact.city)) return
    if (addresseInvalid(body.contact.address)) return
    if (emaimInvalid(body.contact.email))return
  
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
    })
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
  //Création de la regexp pour la validation du prénom
function firstNameInvalid (firstName){
    let firstNameRegExp = new RegExp('^[A-Za-z- ]+$');
  //On test la regexp prenom
  let testPrenom = firstNameRegExp.test(firstName.value);
  if (testPrenom === true) {
    firstNameErrorMsg.innerText = "";
  } else {
    firstNameErrorMsg.textContent = "Le prénom n'est pas valide";
    return true
  }
}
  //Création de la regexp pour la validation du nom
function lastNameInvalid (last_name){
    const lastName =  new RegExp (`^[a-zA-Z- ]{2,32}$`, `g`)
    //On test la regexp nom
   const testNom = lastName.test(last_name.value);
    if (testNom === true) {
      lastNameErrorMsg.textContent = "";
    } else {
      lastNameErrorMsg.textContent = "Le nom n'est pas valide";
      return true
    }
}

//Création de la regexp pour la validation de la ville
function cityInvalid(city_name){
  const city =  new RegExp(`^[a-zA-Z-0-9 ]{2,31}$`, `g`);
  const testVille = city.test(city_name.value);
  if (testVille === true) {
    cityErrorMsg.textContent = "";
  } else {
    cityErrorMsg.textContent = "La ville n'est pas valide";
    return true
  }

}
 //Création de la regexp pour la validation de l'adresse
function addresseInvalid (address){
   let adresseRegExp= new RegExp(`^[a-zA-Z0-9-,'.; ]{2,70}$`, `g`);
    //On test la regexp adresse
    let testAdresse = adresseRegExp.test(address.value);
    if (testAdresse === true) {
      addressErrorMsg.textContent = "";
    } else {
      addressErrorMsg.textContent = "L'adresse n'est pas valide";
      return true
    }
}
  //Création de la regexp pour la validation de l'Email
function emaimInvalid(email){
    let emailRegExp = new RegExp(
        `^[A-Za-z0-9+_.-]+@(.+)$`,
        `g`
      );
      //On test la regexp email
      let testEmail = emailRegExp.test(email.value);
      if (testEmail === true) {
        emailErrorMsg.textContent = "";
      } else {
        emailErrorMsg.textContent = "L'email n'est pas valide";
        return true
      }
}
// Création des éléments requis pour le formulaire
function createRequetBody() { 
    const form = document.querySelector (".cart__order__form") 
    const firstName = form.elements.firstName
    const lastName = form.elements.lastName
    const address = form.elements.address
    const city = form.elements.city
    const email = form.elements.email
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