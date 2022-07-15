//ABRE SIDEBAR

const cartSidebar = document.querySelector('.cart-sidebar') /* var declarada globalmente */

function openSidebar() {
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
// acima vc pode jogar a funcao direto (e nem precisa nomear)

const bttnOpenCart = document.getElementById('bttn-cart')
//pode criar uma função com o caminho para melhorar a organização
bttnOpenCart.addEventListener('click', openSidebar)

const bttnCloseCart = document.getElementById('bttn-close-cart')
bttnCloseCart.addEventListener('click', closeSidebar)/* executa uma função de callback*/

const addMore = document.getElementById('add-more')
addMore.addEventListener('click', closeSidebar)

//BUSCAR PRODUTOS

const fetchProducts = () => {
    const groupsRootEl = document.querySelector('#groups-root')
    fetch('http://127.0.0.1:5500/products.json')
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
                        <p class="price">R$ ${product.price.toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
                        <button class="bttn bttn-main bttn-block">Comprar</button>
                    </div>
                </article>`
                })
                groupHTML += '</div></section>'
                groupsRootEl.innerHTML += groupHTML
            })
            //    console.log(body)
        })
        .catch((error) => {
            console.log(error)
            groupsRootEl.innerHTML = '<p class="alert-error"><strong>Desculpe, houve uma falha ao carregar nossos produtos. Por favor, verifique sua conexão e recarregue a página.</strong></p>'
        })
}
fetchProducts() 