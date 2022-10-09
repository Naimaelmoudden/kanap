//Utilisation de window location search pour obtenir l'url a partir de l'id et faire appel API avec 
//fletch sur la page produit//
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get ("id")
if (id!= null){
    let dataPrice = 0
    let altText, imagUrl

}
//Utlisation de l'interpolation de chaine avec la fonction fletch afin
//d'ajouter la variable de l'id obtenu grace à URLSearchParams()//
fetch( `http://localhost:3000/api/products/${id} ` )
    .then((response ) => response.json())
    .then((res ) => imageData(res))
//IMAGE//
function imageData(kanap){
    const {altTxt, colors, description, imageUrl, name, price} = kanap
    dataPrice = price
    altText = altTxt
    imagUrl= imageUrl
    createImage(imageUrl, altTxt)
    createTitle(name)
    createPrice(price)
    createDescription(description)
    createColors(colors)
}
 // Créer une image et intégré l'url et alt // 
function createImage(imageUrl,altTxt) {
    const image = document.createElement('img')
    image.src = imageUrl
    image.alt = altTxt
    
   // sélection direct de l'id pour donné un parent à image pour apparaitre dans le Dom//
    const parent = document.querySelector (".item__img")
    parent.appendChild(image)

}
 //sélection direct de l'id Title pour lier le nom du produit aux données du tableau//
function createTitle(name) { 
    const h1 = document.querySelector("#title")
    h1.textContent = name
}

 //séléction direct de l'id prix pour le lier au donné le prix du produit//
function createPrice(price){
    const span = document.querySelector ("#price")
    span.textContent = price
}

  //séléction direct de l'id description pour le lier au donné pour la description du produit//
function createDescription(description){
    const p = document.querySelector ('#description')
    p.textContent = description
}

//intégration des couleur avec son document query Selector "select"//
function createColors(colors) {
    const select = document.querySelector('#colors');
    colors.forEach ((colors) => {
    const option = document.createElement("option");
    option.value = colors
    option.textContent = colors
    select.appendChild(option)
   }) 
}

//Faire l'évènement sur le bouton "ajouter au panier"
const button = document.querySelector ("#addToCart")
button.addEventListener ("click", clickOrder)

//Ajouter produit au panier lors du clique
function clickOrder() { 
    const colors = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    //si order invalide return//
    if (isOrderInvalid(colors, quantity)) return
    saveOrder (colors, quantity)
    redirectionCart()
}

 // Select des elements à mettre dans le panier
function saveOrder (colors, quantity) {
    const key = `${id}-${colors}`

    // création d'un objet pour identfier les donner à stocker dans le localStorage//
    const dataPanier = {
        id: id,
        colors: colors,
        quantity: Number(quantity),
        price: dataPrice,
        altTxt: altText,
        imageUrl: imagUrl,
    }
    localStorage.setItem(key ,JSON.stringify (dataPanier )) 
}
//si il a une mauvaise valeur afficher l'erreur//
function isOrderInvalid(colors, quantity) {
    if (colors == null ||  colors  ===  ""  ||  quantity  ==  null  ||  quantity  ==  0){
        alert ( "Veuillez sélectionner une couleur et une quantité" )
        return true
   }
}
//rediriction vers le pannier//
function redirectionCart(){
    window.location.href= "cart.html"

}
//rediriction vers le pannier//
function redirectionCart(){
    window.location.href= "cart.html"
}