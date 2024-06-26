document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("cardModal");
    const btn = document.getElementById("addButton");
    const span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    const form = document.getElementById('cardForm');
});

// REQUISIÇÃO PARA ADIÇÃO DE CARTAO EM JSON SERVER

const cartaoPage = "pages/Exibir_Cartoes.html";
const cartaoUrl = 'http://localhost:3000/cartoes';

var db_cartoes = {};
var cartaoCorrente = {};

var idCartao = 0;

function addCard(bandeira, final, titular, validade){
    let novoId = idCartao;
    let cartao = {
        "id": novoId,
        "bandeira": bandeira,
        "final": final,
        "titular": titular,
        "validade": validade
    };

    fetch(cartaoUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartao),
    })        
    .then(response => response.json())
    .then(data => {
        // Adiciona o novo usuário na variável db_usuarios em memória
        db_cartoes.push (cartao);
        displayMessage("Cartao inserido com sucesso");
    })
    .catch(error => {
        console.error('Erro ao inserir usuário via API JSONServer:', error);
        displayMessage("Erro ao inserir usuário");
    });
    idCartao++;
}

function saveCard(){
    let bandeira = document.getElementById('card-flag').value;
    let final = document.getElementById('card-number').value;
    let titular = document.getElementById('card-name').value;
    let validade = document.getElementById('expiration-date').value;

    addCard(bandeira, final, titular, validade);
    alert ('Cartao salvo com sucesso.');
}

// REQUISIÇÃO PARA A EXBIÇãO DE CARTAO EM JSON SERVER

