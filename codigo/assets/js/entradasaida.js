// modal adicionar cartao
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("entrasaiModal");
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


// REQUISIÇÃO PARA ADIÇÃO DE TRANSACAO EM JSON SERVER

const transPage = "pages/Exibir_Cartoes.html";
const transUrl = 'http://localhost:3000/transacoes';

var db_trans = {};
var transCorrente = {};

var idTrans = 0;

function addTrans(nome, valor, data, tipo){
    let novoId = idTrans;
    let trans = {
        "id": novoId,
        "nome": nome,
        "valor": valor,
        "data": data,
        "tipo": tipo
    };

    fetch(transUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(trans),
    })        
    .then(response => response.json())
    .then(data => {
        // Adiciona o novo usuário na variável db_usuarios em memória
        db_trans.push (trans);
        displayMessage("Transacao inserida com sucesso");
    })
    .catch(error => {
        console.error('Erro ao inserir usuário via API JSONServer:', error);
        displayMessage("Erro ao inserir usuário");
    });
    idTrans++;
}

function saveTrans(){
    let nome = document.getElementById('name').value;
    let valor = document.getElementById('value').value;
    let data = document.getElementById('date').value;
    let tipo = document.getElementById('transacao').value;

    addTrans(nome, valor, data, tipo);
    alert ('Transacao salva com sucesso.');
}
