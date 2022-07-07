
const cart = []

ReclaimItemCache ()
cart.forEach((item) => showItems(item))


const buttonCommander = document.querySelector("#order")
buttonCommander.addEventListener("click", (e) => accedeForm(e))


        function ReclaimItemCache() {  
           const numberObjects = localStorage.length
           for (let i = 0; i < numberObjects; i++) {
           const item = localStorage.getItem(localStorage.key (i)) || ""
           const itemObjects = JSON.parse(item)
           cart.push (itemObjects)

         }
    }
       
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
        function showTotalPrice() {
            const totalPrice = document.querySelector("#totalPrice")
            const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
            totalPrice.textContent = total
          }
          
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

        function deleteItem (item) {
            const  itemDelete =  cart.findIndex (
                 (products) => products.id === item.id && products.colors === item.colors
 )
            cart.splice (itemDelete ,1)
              showTotalPrice()
              showTotalQuantity()
              removeDataCache(item)
              removeArticlePanier(item)
            }
            //VERIFICAR REPETIR
            function  removeArticlePanier (item) {
                const articleToDelete = document.querySelector(
                    `article[data-id="${item.id}"][data-colors="${item.colors}"]`
                  )
              articleToDelete.remove()
            }
        
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
            const itemUpdates = cart.find (item => item.id === id)
            itemUpdates.quantity = Number (valueChanged) 
            item.quantity = itemUpdates.quantity
                    showTotalPrice()
                    showTotalQuantity ()
                    removeDataCache(item)
             }
        
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

        function showArticle(article){
            document.querySelector("#cart__items").appendChild(article)
        }
        function  createArticle(item) {
            const article = document.createElement ("article")
            article.classList.add ("cart__item")
            article.dataset.id = item.id
            article.dataset.colors = item.colors
           return article
        }

        function createImageDiv(item) {
            const div = document.createElement ("div")
            div.classList.add ("cart__item__img")
            const image = document.createElement("img")
            image.src = item.imageUrl
            image.alt = item.altTxt
            div.appendChild(image)
            return div
        }

        //recuperer donnes pourformulaire//
       

     function accedeForm (e){
        e.preventDefault ()
          if (cart.length === 0) 
          alert ("Veuillez sélectionner les articles à acheter")
          const body = createRequetBody ()
      fetch ("http://localhost:3000/api/products/order",{
        method: "POST",
        body: JSON.stringify (body),
        headers:{
            "content-type": "application/json"
        }
              })
          
          .then((res)=> res.json())
          .then((data)=> console.log (data))
            }

function createRequetBody() { 
    const form= document.querySelector (".cart__order__form") 
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
    email: email,
  },
  products: getIdsFromCache()
}
console.log (body)
return (body)

 }
 function  getIdsFromCache(){
    const numbersProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numbersProducts; i ++){ 
        const key = localStorage.key (i)

        const id = key.split(".")[0]

        ids.push(id)
    }
    return ids
     }
    

