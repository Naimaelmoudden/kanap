const queryString = window.location.search
const urlParams= new URLSearchParams(queryString)
const id =urlParams.get ("id")
if (id!=null){
    let dataPrice = 0
    let altText, imagUrl

}

fetch( `http://localhost:3000/api/products/${id} ` )
.then((response ) => response.json())
.then((res ) => imageData(res))
//IMAGE//
function imageData(kanap){
    const{altTxt,colors,description,imageUrl,name,price}=kanap
    dataPrice=price
    altText = altTxt
    imagUrl= imageUrl
    createImage(imageUrl,altTxt)
    createTitle(name)
    createPrice(price)
    createDescription(description)
    createColors(colors)
}
function createImage(imageUrl,altTxt) {
    const image= document.createElement('img')
    image.src=imageUrl
    image.alt=altTxt
   const parent =document.querySelector (".item__img")
  parent.appendChild(image)

}
//title h1//
function createTitle(name) { 
const h1 = document.querySelector("#title")
 h1.textContent = name
}
//price//
function createPrice(price){
    const span = document.querySelector ("#price")
    span.textContent= price
}
//description//
function createDescription(description){
    const p =document.querySelector ('#description')
    p.textContent= description
}

//colors//
function createColors(colors) {
    const select=document.querySelector('#colors')
    colors.forEach ((colors) => {
    const option=document.createElement("option")
    option.value=colors
    option.textContent=colors
    select.appendChild(option)
   }) 
}
const button=document.querySelector ("#addToCart")
button.addEventListener ("click",clickOrder)

function clickOrder() { 
    const colors = document.querySelector("#colors").value
    const quantity= document.querySelector("#quantity").value
    
if (isOrderInvalid(colors,quantity)) return
saveOrder (colors,quantity)
   redirectionCart()
  }
function saveOrder (colors, quantity) {
    const key = `${id}-${colors}`
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
function isOrderInvalid(colors,quantity) {
    if (colors == null ||  colors  ===  ""  ||  quantity  ==  null  ||  quantity  ==  0){
        alert ( "Veuillez sélectionner une couleur et une quantité" )
        return true
   }
}
function redirectionCart(){
    window.location.href= "cart.html"
}