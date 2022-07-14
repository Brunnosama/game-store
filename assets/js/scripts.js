//ABRE SIDEBAR
function openSidebar () {
    var cartSidebar = document.querySelector('.cart-sidebar')
    cartSidebar.classList.add('cart-sidebar-open')
}

//FECHA SIDEBAR
function closeSidebar () {
    var cartSidebar = document.querySelector('.cart-sidebar')
    cartSidebar.classList.remove('cart-sidebar-open')
}

// document.getElementById('bttn-cart').onclick = openSidebar 
// no ex acima apenas uma função pode ser executada por vez

// document.getElementById('bttn-cart').addEventListener('click', openSidebar) 
// vc ainda pode jogar a funcao direto (e nem precisa nomear)

const bttnOpenCart = document.getElementById('bttn-cart')
//pode criar uma função com o caminho para melhorar a organização
bttnOpenCart.addEventListener('click', openSidebar)

const bttnCloseCart = document.getElementById('bttn-close-cart')
bttnCloseCart.addEventListener('click', closeSidebar)

const addMore = document.getElementById('add-more')
addMore.addEventListener('click', closeSidebar)