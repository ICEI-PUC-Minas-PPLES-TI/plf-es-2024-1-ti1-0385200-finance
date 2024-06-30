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
        console.error('Erro ao inserir transacao via API JSONServer:', error);
        displayMessage("Erro ao inserir transacao");
    });
    idTrans++;
}

function saveTrans(){
    let nome = document.getElementById('name').value;
    let valor = document.getElementById('value').value;
    let data = document.getElementById('date').value;
    let tipo = document.querySelector('input[name="type"]:checked').value;

    addTrans(nome, valor, data, tipo);
    alert ('Transacao salva com sucesso.');
}


// Mostra entradas e saidas
fetch(transUrl)
    .then(res => res.json())
    .then(data => {
        if (data && data.length > 0) {
            console.log(data[0].id);
        } else {
            console.log('Nenhuma transação encontrada');
        }
    })
    .catch(error => console.error('Erro:', error)); 

function showTrans(){
    fetch(transUrl)
        .then(res => res.json ())
        .then(data => {
            let str = ''
                for(let i=0; i<data.length; i++){
                    let trans = data[i]
                    str += `
                            <ul class="extrato">
                                <li>${trans.nome}</li>
                                <li>R$${trans.valor}</li>
                                <li>${trans.data}</li>
                                <li>${trans.tipo}</li>
                            </ul>
                            `
                }
            document.getElementById('transacoes').innerHTML = str;
        })
}
showTrans();

function Extrato(){
    fetch(transUrl)
        .then(res => res.json ())
        .then(data => {
            let saldo=0, entradas=0, saidas=0
                for(let i=0; i<data.length; i++){
                    let extrato = data[i]
                    if(extrato.tipo == "Saida"){
                        saidas += parseFloat(extrato.valor, 10)
                    }else if(extrato.tipo == "Entrada"){
                        entradas += parseFloat(extrato.valor, 10)
                    }
                    saldo = entradas - saidas
                }
            document.getElementById('saldo').innerHTML = 'R$ ' + saldo;
            document.getElementById('entradas').innerHTML = 'R$ ' + entradas;
            document.getElementById('saidas').innerHTML = 'R$ ' + saidas;
        })
}
Extrato();