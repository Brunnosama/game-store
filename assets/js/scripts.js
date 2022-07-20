//ABRE SIDEBAR

const cartSidebar = document.querySelector('.cart-sidebar') /* var declarada globalmente */

function openSidebar(event) {
    event.stopPropagation()
    cartSidebar.classList.add('cart-sidebar-open')
}

//FECHA SIDEBAR
function closeSidebar() {
    cartSidebar.classList.remove('cart-sidebar-open')
}

// document.getElementById('bttn-cart').onclick = openSidebar 
// no ex acima apenas uma função pode ser executada por vez

/* document.getElementById('bttn-cart').addEventListener('click', function () {
    cartSidebar.classList.add('cart-sidebar-open')) */
// acima vc pode jogar a função direto (e nem precisa nomear)

const bttnOpenCart = document.getElementById('bttn-cart')
//pode criar uma função com o caminho para melhorar a organização
bttnOpenCart.addEventListener('click', openSidebar)

const bttnCloseCart = document.getElementById('bttn-close-cart')
bttnCloseCart.addEventListener('click', closeSidebar)/* executa uma função de callback*/

const addMore = document.getElementById('add-more')
addMore.addEventListener('click', closeSidebar)
document.addEventListener('click', closeSidebar)
cartSidebar.addEventListener('click', event => event.stopPropagation())

//BUSCAR PRODUTOS

const fetchProducts = () => {
    const groupsRootEl = document.querySelector('#groups-root')
    fetch('/products.json')
        .then(response => response.json())
        .then(body => {

            groupsRootEl.innerHTML = ''
            body.groups.forEach((group) => {
                // groupsRootEl.innerHTML = groupsRootEl.innerHTML + group.name 
                /*sempre que a variável for receber ela mesma, pode colocar o sinal de '+' antes do '=' para concatenar */
                let groupHTML = `<section><h2>${group.name}</h2><div class="products-grid">`
                group.products.forEach(product => {
                    groupHTML +=
                        `<article class="card">
                            <img src="${product.image}" alt="${product.imgAlt}" width="190" height="170" />
                            <div class="card-content">
                                <h3>${product.name}</h3>
                                <p class="price">R$ ${product.price.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</p>
                                <button
                                    class="bttn bttn-main bttn-block bttn-add-cart"
                                    data-id="${product.id}"
                                    data-name="${product.name}"
                                    data-image="${product.image}"
                                    data-imgalt="${product.imgAlt/* no productsCart vai reconhecer o "imgalt" pq o data transforma td em minusculo */}" 
                                    data-price="${product.price}"
                                >Adicionar</button>
                            </div>
                        </article>`
                })
                groupHTML += '</div></section>'
                groupsRootEl.innerHTML += groupHTML
            })
            setupAddToCart()
        })
        .catch((error) => {
            console.log(error)
            groupsRootEl.innerHTML = '<p class="alert-error"><strong>Desculpe, houve uma falha ao carregar nossos produtos. Por favor, verifique sua conexão e recarregue a página.</strong></p>'
        })
}
fetchProducts()

//PRODUTOS NO CARRINHO

let productsCart = []
const addToCart = (event) => {
    const product = event.target.dataset
    /*Veja se o product está no array: Se não estiver, adicione ao array. Se já estiver, aumente o valor de qty*/

    const index = productsCart.findIndex((item) => item.id == product.id)
    if (index == -1) {
        productsCart.push({
            ...product,
            price: Number(product.price),
            qty: 1
        })
    } else {
        productsCart[index].qty++
        /* "++" adiciona +1 à quantidade, igual a "+=" */
    }
    handleCartUpdate()
}
/* function aponta para onde ela é declarada/chamada */
function removeOfCart() {
    const { id } = this.dataset
    productsCart = productsCart.filter((product) => product.id != id)
    handleCartUpdate()
}


const setupAddToCart = () => {
    const bttnAddCartEls = document.querySelectorAll('.bttn-add-cart')
    bttnAddCartEls.forEach((bttn) => {
        bttn.addEventListener('click', addToCart)
    })
}

const handleKeydown = event => {
    if (event.key == '-' || event.key == '.') {
        event.preventDefault()
    }
}
const handleUpdateQty = (event) => {
    const { id } = event.target.dataset
    const qty = parseInt(event.target.value)
    if (qty > 0) {
        const index = productsCart.findIndex(item => item.id == id)
        productsCart[index].qty = qty
        handleCartUpdate(false)
    } else {
        productsCart = productsCart.filter((product) => product.id != id)
        handleCartUpdate()
    }
}

const setupCartEvents = () => {
    const bttnRemoveCartEls = document.querySelectorAll('.bttn-remove-cart')
    bttnRemoveCartEls.forEach((bttn) => {
        bttn.addEventListener('click', removeOfCart)
    })
    const inputsQtyEl = document.querySelectorAll('.input-qty-cart')
    inputsQtyEl.forEach((input) => {
        input.addEventListener('keydown', handleKeydown)
        input.addEventListener('keyup', handleUpdateQty)
        input.addEventListener('change', handleUpdateQty)
    })
}
const keyCart = '@whazaa/productsCart'
const handleCartUpdate = (renderItens = true) => {
    //COLOCAR OS ITENS NO STORAGE
    localStorage.setItem(keyCart, JSON.stringify(productsCart))
    const badgeEl = document.querySelector('#bttn-cart .badge')
    const emptyCartEl = document.querySelector('#empty-cart')
    const fullCartEl = document.querySelector('#full-cart')
    const cartItensParent = fullCartEl.querySelector('ul')
    const cartTotalValueEl = document.querySelector('#cart-total-value')
    const totalCart = productsCart.reduce((total, item) => total + item.qty, 0)

    if (totalCart > 0) {
        badgeEl.classList.add('badge-show')
        badgeEl.innerText = totalCart
        fullCartEl.classList.add('full-cart-show')
        emptyCartEl.classList.remove('empty-cart-show')
        if (renderItens) {
            cartItensParent.innerHTML = ''
            productsCart.forEach((product) => {
                cartItensParent.innerHTML +=
                    `<li class="cart-item" >
                        <img src="${product.image}" alt="${product.imgalt /*dataset transformou imgAlt em imgalt*/}" width="70" height="70" />
                        <div>
                            <p class="h4">${product.name}</p>
                            <p class="price">R$ ${product.price.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</p>
                        </div>
                        <input class="form-input input-qty-cart" type="number" min="0" value="${product.qty}" data-id="${product.id}" />
                        <button 
                            class="bttn-remove-cart"
                            data-id="${product.id}"
                        >
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </li >`
              })
              setupCartEvents()
          }

        const totalPrice = productsCart.reduce((total, item) => total + item.qty * item.price, 0)
        cartTotalValueEl.innerText = 'R$ ' + totalPrice.toLocaleString('pt-br', { minimumFractionDigits: 2 })
    } else {
        badgeEl.classList.remove('badge-show')
        emptyCartEl.classList.add('empty-cart-show')
        fullCartEl.classList.remove('full-cart-show')
    }
}


const initCart = () => {
    const savedProducts = localStorage.getItem(keyCart)
    if (savedProducts) {
        productsCart = JSON.parse(savedProducts)
    }
    handleCartUpdate()
}
initCart()