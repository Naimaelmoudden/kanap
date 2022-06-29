
const cart = []

ReclaimItemCache ()
cart.forEach((item) => showItems(item))

        function ReclaimItemCache (){
           const numberObjects = localStorage.length
           for (let i = 0; i < numberObjects; i++) {
           const item = localStorage.getItem(localStorage.key (i)) || ""
           const itemObjects= JSON.parse(item)
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
           showTotalQuantity (item)
        }
        function showTotalQuantity(item) {
            const totalQuantity = document.querySelector("#totalQuantity")
            const total = cart.reduce((total, item) => total + item.quantity, 0)
            totalQuantity.textContent = total
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
            appendDeleteToSettings (settings)
            return settings
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
            input.value = item. quantity

            quantity.appendChild(input)
            settings.appendChild(quantity)
        } 
        
        function appendDeleteToSettings (settings){
            const div = document.createElement("div")
            div.classList.add("cart__item__content__settings__delete")
            const p = document.createElement("p")
            p.textContent = "Supprimer"
            div.appendChild(p)
            settings.appendChild(div)
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