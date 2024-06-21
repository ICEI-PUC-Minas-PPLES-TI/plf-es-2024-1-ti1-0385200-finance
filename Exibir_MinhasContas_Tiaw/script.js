
document.addEventListener('DOMContentLoaded', function() {
    const billsSection = document.getElementById('bills-section');
    const monthPicker = document.getElementById('monthPicker');

    const bills = [
        {
            "nome": "Conta de água",
            "valor": "R$ 169,90",
            "vencimento": "14/04/2022",
            "status": "Pendente"
        },
        {
            "nome": "Conta de Luz",
            "valor": "R$ 200,90",
            "vencimento": "14/04/2022",
            "status": "Pendente"
        },
        {
            "nome": "Conta de Internet",
            "valor": "R$ 100,00",
            "vencimento": "10/04/2022",
            "status": "Paga"
        }
    ];

    function loadBills(filterStatus = null) {
        billsSection.innerHTML = '';
        const filteredBills = filterStatus ? bills.filter(bill => bill.status === filterStatus) : bills;

        if (filteredBills.length === 0) {
            alert('Não existe contas com este status');
        } else {
            filteredBills.forEach(bill => {
                const billElement = document.createElement('div');
                billElement.classList.add('bill');
                
                billElement.innerHTML = `
                    <div class="bill-info">
                        <p>${bill.nome}</p>
                        <p>${bill.valor}</p>
                        <p>vencimento<br>${bill.vencimento}</p>
                    </div>
                    <div class="bill-status">
                        <p>${bill.status}</p>
                    </div>
                `;

                billsSection.appendChild(billElement);
            });
        }
    }

    monthPicker.addEventListener('change', function() {
        const selectedDate = this.value;
        console.log(`Data selecionada: ${selectedDate}`);
        
    });

    document.getElementById('allButton').addEventListener('click', () => loadBills());
    document.getElementById('paidButton').addEventListener('click', () => loadBills('Paga'));
    document.getElementById('pendingButton').addEventListener('click', () => loadBills('Pendente'));
    document.getElementById('overdueButton').addEventListener('click', () => loadBills('Atrasada'));

    loadBills();
});
