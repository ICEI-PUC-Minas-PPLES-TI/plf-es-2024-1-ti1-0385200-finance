ocument.addEventListener('DOMContentLoaded', () => {
    loadCardPreview();

    document.getElementById('card-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const cardNumber = document.getElementById('card-number').value;
        const cardHolder = document.getElementById('card-holder').value;
        const expirationDate = document.getElementById('expiration-date').value;
        const cvv = document.getElementById('cvv').value;

        const cardData = {
            number: cardNumber,
            holder: cardHolder,
            expiration: expirationDate,
            cvv: cvv
        };

        fetch('http://localhost:3000/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cardData),
        })
        .then(response => response.json())
        .then(data => {
            updateCardPreview(cardData);
            document.getElementById('card-form').reset();
        })
        .catch(error => console.error('Erro ao adicionar cartão:', error));
    });
});

function loadCardPreview() {
    fetch('http://localhost:3000/cards')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const latestCard = data[data.length - 1];
                updateCardPreview(latestCard);
            }
        })
        .catch(error => console.error('Erro ao carregar cartão:', error));
}

function updateCardPreview(cardData) {
    document.getElementById('preview-card-number').textContent = maskCardNumber(cardData.number);
    document.getElementById('preview-card-holder').textContent = cardData.holder;
    document.getElementById('preview-expiration-date').textContent = cardData.expiration;
}

function maskCardNumber(number) {
    return number.replace(/\d(?=\d{4})/g, '*');
}