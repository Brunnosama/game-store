//ABRE SIDEBAR

const cartSidebar = document.querySelector('.cart-sidebar')

function openSidebar(event) {
    event.stopPropagation()
    cartSidebar.classList.add('cart-sidebar-open')
}

//FECHA SIDEBAR
function closeSidebar() {
    cartSidebar.classList.remove('cart-sidebar-open')
}

const bttnOpenCart = document.getElementById('bttn-cart')
bttnOpenCart.addEventListener('click', openSidebar)

const bttnCloseCart = document.getElementById('bttn-close-cart')
bttnCloseCart.addEventListener('click', closeSidebar)

const addMore = document.getElementById('add-more')
addMore.addEventListener('click', closeSidebar)
document.addEventListener('click', closeSidebar)
cartSidebar.addEventListener('click', event => event.stopPropagation())

//BUSCAR PRODUTOS

const groupsRootEl = document.querySelector('#groups-root')
const fetchProducts = () => {
    fetch('/products.json')
        .then(response => response.json())
        .then(body => {

            groupsRootEl.innerHTML = ''
            body.groups.forEach((group) => {
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
                                    data-imgalt="${product.imgAlt}" 
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
            groupsRootEl.innerHTML =
                '<p class="alert-error"><strong>Desculpe, houve uma falha ao carregar nossos produtos. Por favor, verifique sua conexão e recarregue a página.</strong></p>'
        })
}
if (groupsRootEl) {
    fetchProducts()
}

//PRODUTOS NO CARRINHO

let productsCart = []
const addToCart = (event) => {
    const product = event.target.dataset

    const index = productsCart.findIndex((item) => item.id == product.id)
    if (index == -1) {
        productsCart.push({
            ...product,
            price: Number(product.price),
            qty: 1
        })
    } else {
        productsCart[index].qty++
    }
    handleCartUpdate()
}

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
                        <img src="${product.image}" alt="${product.imgalt}" width="70" height="70" />
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

/* CEP SERVICE */

function limpa_formulário_cep() {
    document.getElementById('input-address').value=("");
    document.getElementById('input-neighborhood').value=("");
    document.getElementById('input-city').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    document.getElementById('input-address').value=(conteudo.logradouro);
    document.getElementById('input-neighborhood').value=(conteudo.bairro);
    document.getElementById('input-city').value=(conteudo.localidade);
}
else {
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {
var cep = valor.replace(/\D/g, '');
var cep = valor.replace('-', '')
if (cep != "") {
    var validacep = /^[0-9]{8}$/;
    if(validacep.test(cep)) {
        document.getElementById('input-address').value="...";
        document.getElementById('input-neighborhood').value="...";
        document.getElementById('input-city').value="...";
        var script = document.createElement('script');
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';
        document.body.appendChild(script);

    }
    else {
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
}
else {
    limpa_formulário_cep();
}
};

/* FORM CHECKOUT */
const handleCheckoutSubmit = event => {
    event.preventDefault()
    if (productsCart.length == 0) {
        alert('Nenhum produto no Carrinho.')
        return
    }
    let text = "Confira o pedido\n\n-------------------------------------\n\n"
    productsCart.forEach((product) => {
        text += `*${product.qty}x ${product.name}* - R${product.price.toLocaleString('pt-br', { minimumFractionDigits: 2 })}\n`
    })

    const inputEls = event.target.elements
    const totalPrice = productsCart.reduce((total, item) => total + item.qty * item.price, 0)
    const complement = inputEls['input-complement'].value ? ` - ${inputEls['input-complement'].value}` : ''

    text += `\n*Taxa de Entrega:* A Combinar\n*Total: R$ ${totalPrice.toLocaleString('pt-br', { minimumFractionDigits: 2 })}*`
    text += '\n\n-------------------------------------\n\n'
    text += `*${inputEls['input-name'].value}*`
    text += `\n${inputEls['input-phone'].value}\n\n`
    text += `${inputEls['input-address'].value}, ${inputEls['input-number'].value}${complement}\n`
    text += `${inputEls['input-neighborhood'].value}, ${inputEls['input-city'].value}\n`
    text += `${inputEls['input-cep'].value}`

    text = encodeURI(text)

    const subdomain = window.innerWidth > 768 ? 'web' : 'api'
    window.open(`https://${subdomain}.whatsapp.com/send/?phone=5581999999999&text=${text}`, "_blank")
}
const formCheckoutEl = document.querySelector('#form-checkout')
formCheckoutEl?.addEventListener('submit', handleCheckoutSubmit)

/* MASKS */

const inputPhoneEl = document.querySelector('#input-phone')
IMask(inputPhoneEl, {
    mask:'(00) 00000-0000'
})

const inputCepEl = document.querySelector('#input-cep')
IMask(inputCepEl, {
    mask:'00000-000'
})