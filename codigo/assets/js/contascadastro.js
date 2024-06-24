document.addEventListener('DOMContentLoaded', function() {
    var botao = document.getElementById('botao');

    botao.addEventListener('click', function(event) {
        var nomeConta = document.getElementById('nome').value.trim();
        var valorConta = document.getElementById('valorConta').value.trim();
        var statusConta = document.querySelector('input[name="statusConta"]:checked').value;
        
        if (!nomeConta) {
            alert('Por favor, preencha o nome da conta.');
            return;
        }
        
        if (!valorConta) {
            alert('Por favor, preencha o valor da conta.');
            return;
        }
        
        if (!/^R\$ \d+(\.\d{2})?$/.test(valorConta)) {
            alert('Por favor, insira o valor da conta no formato correto (ex: R$ 150.00).');
            return;
        }

        valorConta = parseFloat(valorConta.replace('R$', '').trim());

        var conta = {
            nome: nomeConta,
            valor: valorConta,
            status: statusConta
        };

        fetch('http://localhost:3000/contas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(conta)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Sucesso:', data);
            var successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();
            document.getElementById('conta-form').reset();
        })
        .catch((error) => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao salvar a conta.');
        });
    });
});