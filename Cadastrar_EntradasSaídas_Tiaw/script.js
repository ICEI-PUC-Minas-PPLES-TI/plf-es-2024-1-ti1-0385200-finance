document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('operationForm');
    const backButton = document.getElementById('backButton');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); 
        
        
        const name = document.getElementById('name').value.trim();
        const value = document.getElementById('value').value.trim();
        const date = document.getElementById('date').value.trim();
        const category = document.getElementById('category').value;
        const card = document.getElementById('card').value;
        const type = document.querySelector('input[name="type"]:checked');

        if (!name || !value || !date || !category || !card || !type) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

       
        const transaction = {
            name: name,
            value: parseFloat(value),
            date: date,
            category: category,
            card: card,
            type: type.value
        };

        
        fetch('http://localhost:3000/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        })
        .then(response => response.json())
        .then(data => {
            alert('Cadastro realizado com sucesso!');
            console.log('Success:', data);
            form.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Ocorreu um erro ao salvar os dados.');
        });
    });

   
    backButton.addEventListener('click', function () {
        history.back();
    });
});
