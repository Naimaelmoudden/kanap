fetch("http://localhost:3000/api/products")
 .then((res ) => res.json())
 .then ((data)  => addProducts(data))

 function addProducts(data) { 

    data.forEach((kanap) => {
        
     const { _id, imageUrl, altTxt, name, description } = kanap
     const anchorElement=createAnchourElement(_id)
     const article = document.createElement("article")
     const image= createImage (imageUrl, altTxt)
     const h3= createH3(name)
     const p =createParagraph(description)

     appendElementsArticle(article, image, h3, p)
     appendAnchorElement(anchorElement, article)
    })
}     
function appendElementsArticle(article,image,h3,p){
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
}
function createAnchourElement(id){
    const anchorElement = document.createElement ("a")
    anchorElement.href = "./product.html?id=" + id
    return anchorElement
}
function  appendAnchorElement(anchorElement, article) {
    const items = document.querySelector("#items")
    if (items){
        items.appendChild(anchorElement)
       anchorElement.appendChild(article)
   }
}
function createImage(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}
  
function createH3 (name){
const h3 =document.createElement("h3")
h3.textContent = name
h3.classList.add("productName")
return h3
}

function createParagraph(description){
    const p = document.createElement ("p")
    p.textContent=description
    p.classList.add ("productDescription")
    return p
}