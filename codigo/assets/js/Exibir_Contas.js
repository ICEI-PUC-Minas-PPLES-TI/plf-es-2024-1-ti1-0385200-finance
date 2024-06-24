document.addEventListener('DOMContentLoaded', function() {
    const billsSection = document.getElementById('bills-section');
    const monthPicker = document.getElementById('monthPicker');

    const bills = [
        {
            "nome": "Conta de água",
            "valor": "R$ 169,90",
            "vencimento": "2024-04-14",  // Ajustado para formato YYYY-MM-DD
            "status": "Pendente"
        },
        {
            "nome": "Conta de Luz",
            "valor": "R$ 200,90",
            "vencimento": "2024-04-14",  // Ajustado para formato YYYY-MM-DD
            "status": "Pendente"
        },
        {
            "nome": "Conta de Internet",
            "valor": "R$ 100,00",
            "vencimento": "2024-04-10",  // Ajustado para formato YYYY-MM-DD
            "status": "Paga"
        }
    ];

    function loadBills(filterStatus = null) {
        const selectedMonth = monthPicker.value; // Formato: YYYY-MM
        billsSection.innerHTML = '';

        const filteredBills = bills.filter(bill => {
            const billDate = bill.vencimento.slice(0, 7); // Extrair o mês e ano no formato YYYY-MM
            return (!filterStatus || bill.status === filterStatus) && (!selectedMonth || billDate === selectedMonth);
        });

        if (filteredBills.length === 0) {
            alert('Não existe contas para os filtros selecionados');
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
        loadBills();
    });

    document.getElementById('allButton').addEventListener('click', () => loadBills());
    document.getElementById('paidButton').addEventListener('click', () => loadBills('Paga'));
    document.getElementById('pendingButton').addEventListener('click', () => loadBills('Pendente'));
    document.getElementById('overdueButton').addEventListener('click', () => loadBills('Atrasada'));

    loadBills();
});
