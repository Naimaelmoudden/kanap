const queryString = window.location.search
const urlParams= new URLSearchParams(queryString)
const productId =urlParams.get ('id')

fetch( `http://localhost:3000/api/products/${productId} ` )
.then((response ) => response.json())
.then((res ) => imageData(res))
//IMAGE//
function imageData(kanap){
    const{altTxt,colors,description,imageUrl,name,price}=kanap
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