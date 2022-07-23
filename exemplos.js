// strings - mude no index.html o 'scripts.js' para 'exemplos.js'

var userName = 'Brunno Pessôa' /*caixinha na memória do pc que guarda informação (não pode ser alterado um pedaço dela, apenas a variável inteira)
var pode usar aspas duplas ou individuais*/
console.log('userName', userName) /*console.log - exibe o resultado no console lateral das ferramentas de desenvolvedor*/
var email = 'brunno567@gmail.com'
console.log('email', email)
var userDescription = 'O usuário se chama ' + userName + ' e o seu email é ' + email
console.log('userDescription', userDescription)
var userDescription2 = `O usuário se chama ${userName} e o seu e-mail é ${email}`
console.log('userDescription2', userDescription2) /*simbolo de + concatena, bem como template string `${}` */

//number
var idade = 32 //int
console.log('idade', idade)
var peso = 68.5 //float
console.log('peso', peso)

//boolean
var temFilho = false
console.log('temFilho', temFilho)
var eCasado = true
console.log('eCasado', eCasado)

//objects
var endereco = {
    rua: 'Princesa Isabel',
    numero: 654,
    bairro: 'Santo Amaro',
    cidade: 'Recife',
    estado: 'PE',
    localizacao: {
        lat: 123,
        long: 456
    }
}
console.log('endereco', endereco)

//array
var telefones = [
    '(81) 9999-8888',
    '(81) 7777-6666',
    '(81) 5555-4444'
]
console.log('telefones', telefones)

var registroEscolar = [
    {
        nome: 'Escola Menino Jesus',
        entrada: 2005,
        saida: 2006
    },
    {
        nome: 'UFRPE',
        entrada: 2008,
        saida: 2019
    },
    'Escola Y'
]
console.log('registroEscolar', registroEscolar)

//function
function showMessage (msg) {
    alert(msg)
}
var showOtherMessage = () => {
    alert('Other message')
}

console.log('typeof', typeof showMessageOtherMessage) /*console.log(typeof something) - mostra o tipo de uma variável no console*/
console.log(Array.isArray(peso))/* typeof não verifica arrays (sempre considera arrays como objetos). Para isso existe o Array.isArray()*/

//HOISTING

console.log('antes da function', retornaTrue) /* TRUE - a função é uma var, e o hoisting declarada as var globais no início da leitura do script */ 
function retornaTrue () {return true}
console.log('depois da function', retornaTrue)/* TRUE - foi declarada anteriormente no hoisting */

console.log('antes userName') /*UNDEFINED - apesar de declarar a var no hoisting, seus valores não são passados */
var userName = 'Brunno'
console.log('depois userName') /* BRUNNO - o valor da var declarada inicialmente pelo hoisting é atribuído após a leitura da linha 81 */

console.log('antes da arrow', retornaFalse) /*ERROR - a arrow function é trazida para o hoisting como var, sem valor, logo não executa */
var retornaFalse = () => false
console.log('depois da arrow', retornaFalse) /* FALSE - mesmo a var no hoisting, a arrow function só é executada após ser declarada */ 
