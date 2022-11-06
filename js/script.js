
//Utilisation de la fonction Fletch pour faire un appel API//
//Afin d'obtenir les données des produits sur le localhost:3000//
fetch("http://localhost:3000/api/products")
 .then((res ) => res.json())
 .then ((data)  => addProducts(data))

//recueper les donnees , puis va créer les elements apres il va les ratacher a appendElementsArticle et appendAnchorElement
function addProducts(data) { 

 //création d'une boucle pour avoir les données pour chaque produit
 data.forEach((kanap) => {
    const { _id, imageUrl, altTxt, name, description } = kanap
    const anchorElement = createAnchourElement(_id)
        
    //variable pour créer la balise article//
    const article = document.createElement("article")

    // donnée et détail pour l'image::
    const image = createImage (imageUrl, altTxt)

    // donnée et détail dans la balise h3
    const h3 = createH3(name)

    // donné et détail dans la balise//
    const p = createParagraph(description)

    appendElementsArticle(article, image, h3, p)
    appendAnchorElement(anchorElement, article)   
    })
}  
// Rattachement des éléments enfants à l'article//
function appendElementsArticle(article, image, h3, p){
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
}
//recuperer unique id  //
function createAnchourElement(id){
    const anchorElement = document.createElement ("a")
    anchorElement.href = "./product.html?id=" + id
    return anchorElement
}
//Fonction qui permet de donner des enfants au parent #items afin
//de le rendre visible dans le code html dans le DOM//
function  appendAnchorElement(anchorElement, article) {
    const items = document.querySelector("#items")
    if (items != null){
        items.appendChild(anchorElement)
       anchorElement.appendChild(article)
   }
}
// Création de l'image//
function createImage(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

// Création d'un titre pour le produit//
function createH3 (name){
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}
// Création de la description du produit//
function createParagraph(description){
    const p = document.createElement ("p")
    p.textContent = description
    p.classList.add ("productDescription")
    return p
}

