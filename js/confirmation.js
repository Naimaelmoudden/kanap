//Utilisation de window location search pour obtenir l'orderId contenu dans l'url qui a été créé depuis la page cart.js 
//afin de l'afficher dans la balise span pour communiquer au client son numéro de commande// 
const orderId = getOrderId()
showOrderId (orderId)
removeCache ()
//recupérer les les params et l'orderId //
function getOrderId() {

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const orderId = urlParams.get ("orderId")
    
    return orderId
}
// fabriquer text order id//
function showOrderId(orderId){
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}
//supprimmer les cache//
 function removeCache(){
    const cache = window.localStorage
    cache.clear()
}
