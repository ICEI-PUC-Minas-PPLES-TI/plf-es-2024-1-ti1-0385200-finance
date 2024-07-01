// modal adicionar contas
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("cardModal");
    const btn = document.getElementById("addConta");
    const span = document.getElementsByClassName("closecard")[0];

    if (btn && modal && span) {
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
    } else {
        console.error('Elementos não encontrados');
    }

    const form = document.getElementById('cardForm');
});

// adicao de contas

const contaPage = "pages/Exibir_Contas.html";
const contaUrl = 'http://localhost:3000/contas';

var db_contas = {};
var contaCorrente = {};

var idConta = 0;

function addContas(nome, valor, vencimento, status){
    let novoId = idConta;
    let contas = {
        "id": novoId,
        "nome": nome,
        "valor": valor,
        "vencimento": vencimento,
        "status": status
    };

    fetch(contaUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contas),
    })        
    .then(response => response.json())
    .then(data => {
        // Adiciona o novo usuário na variável db_usuarios em memória
        db_contas.push (contas);
        displayMessage("Conta inserida com sucesso");
    })
    .catch(error => {
        console.error('Erro ao inserir conta via API JSONServer:', error);
        displayMessage("Erro ao inserir conta");
    });
    idConta++;
}

function saveContas(){
    let nome = document.getElementById('name').value;
    let valor = document.getElementById('value').value;
    let vencimento = document.getElementById('date').value;
    let status = document.querySelector('input[name="type"]:checked').value;

    addContas(nome, valor, vencimento, status);
    alert ('Conta salva com sucesso.');
}

function showContas(){
    fetch(contaUrl)
        .then(res => res.json ())
        .then(data => {
            let str = ''
                for(let i=0; i<data.length; i++){
                    let contas = data[i]
                    str += `
                    <div class="bills-section">
                        <p>${contas.nome}</p>
                        <p>${contas.valor}</p>
                        <p><br>${contas.vencimento}</p>
                        <div class="bill-status">
                        <p>${contas.status}</p>
                    </div>
                    </div>
                    
                    `
                }
            document.getElementById('bills-section').innerHTML = str;
        })
}
showContas();