document.addEventListener("DOMContentLoaded", function() {
    var cardData = getCardData();

    var legendPanel = document.getElementById('legendPanel');
    var originSelector = document.getElementById('originSelector');
    var startDateInput = document.getElementById('startDate');
    var endDateInput = document.getElementById('endDate');
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Valor',
                data: [],
                backgroundColor: 'rgba(0, 123, 255, 0.6)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    function getCardData() {
        // Simulação de dados de cartões e contas
        // TO DO: método para buscar todos os valores do banco de dados
        var cardData = [
            { data: '2024-05-01', valor: 50, tipoDeGasto: 'Alimentação', origem: 'Cartão NuBank' },
            { data: '2024-03-21', valor: 100, tipoDeGasto: 'Compras', origem: 'Cartão NuBank' },
            { data: '2024-04-25', valor: 30, tipoDeGasto: 'Transporte', origem: 'Cartão NuBank' },
            { data: '2024-02-04', valor: 150, tipoDeGasto: 'Saúde', origem: 'Cartão NuBank' },
            { data: '2024-02-18', valor: 75, tipoDeGasto: 'Contas', origem: 'Cartão NuBank' },
            { data: '2024-03-29', valor: 200, tipoDeGasto: 'Lazer', origem: 'Cartão NuBank' },
            { data: '2024-04-19', valor: 60, tipoDeGasto: 'Alimentação', origem: 'Cartão NuBank' },
            { data: '2024-04-30', valor: 120, tipoDeGasto: 'Compras', origem: 'Cartão NuBank' },
            { data: '2024-04-20', valor: 40, tipoDeGasto: 'Transporte', origem: 'Cartão Itaú' },
            { data: '2024-02-19', valor: 180, tipoDeGasto: 'Saúde', origem: 'Cartão NuBank' },
            { data: '2024-06-04', valor: 85, tipoDeGasto: 'Contas', origem: 'Cartão NuBank' },
            { data: '2024-05-10', valor: 220, tipoDeGasto: 'Lazer', origem: 'Cartão Itaú' },
            { data: '2024-01-28', valor: 70, tipoDeGasto: 'Alimentação', origem: 'Cartão Itaú' },
            { data: '2024-03-20', valor: 140, tipoDeGasto: 'Compras', origem: 'Cartão Itaú' },
            { data: '2024-01-15', valor: 50, tipoDeGasto: 'Transporte', origem: 'Cartão Itaú' },
            { data: '2024-02-16', valor: 160, tipoDeGasto: 'Saúde', origem: 'Cartão Itaú' },
            { data: '2024-03-17', valor: 95, tipoDeGasto: 'Contas', origem: 'Cartão Itaú' },
            { data: '2024-04-18', valor: 240, tipoDeGasto: 'Lazer', origem: 'Cartão Itaú' },
            { data: '2024-05-19', valor: 80, tipoDeGasto: 'Alimentação', origem: 'Cartão Itaú' },
            { data: '2024-06-06', valor: 160, tipoDeGasto: 'Compras', origem: 'Cartão Itaú' },
            { data: '2024-01-29', valor: 60, tipoDeGasto: 'Transporte', origem: 'Cartão Inter' },
            { data: '2024-06-02', valor: 170, tipoDeGasto: 'Saúde', origem: 'Cartão Inter' },
            { data: '2024-04-13', valor: 105, tipoDeGasto: 'Contas', origem: 'Cartão Inter' },
            { data: '2024-01-14', valor: 260, tipoDeGasto: 'Lazer', origem: 'Cartão Inter' },
            { data: '2024-04-15', valor: 90, tipoDeGasto: 'Alimentação', origem: 'Cartão Inter' },
            { data: '2024-05-16', valor: 180, tipoDeGasto: 'Compras', origem: 'Cartão Inter' },
            { data: '2024-02-07', valor: 70, tipoDeGasto: 'Transporte', origem: 'Cartão Inter' },
            { data: '2024-03-28', valor: 190, tipoDeGasto: 'Saúde', origem: 'Cartão Inter' },
            { data: '2024-02-21', valor: 115, tipoDeGasto: 'Contas', origem: 'Cartão Inter' },
            { data: '2024-01-08', valor: 280, tipoDeGasto: 'Lazer', origem: 'Cartão Inter' }
        ];
        localStorage.setItem("cardData", JSON.stringify(cardData));
        return JSON.parse(localStorage.getItem("cardData"));
    }

    function createLegends(labels, values) {
        legendPanel.innerHTML = '<h5>Legenda</h5>';
        labels.forEach((label, index) => {
            var legendItem = document.createElement('div');
            legendItem.className = 'legend-item';
            legendItem.innerText = `${label}: ${values[index]}`;
            legendPanel.appendChild(legendItem);
        });
    }

    function updateChartAndLegends(startDate, endDate, origin) {
        var labels = [];
        var values = [];
        var valideEntrys = [];

        cardData.forEach((entry) => {
            var entryDate = new Date(entry.data);
            var isWithinDateRange = (!startDate || entryDate >= new Date(startDate)) && (!endDate || entryDate <= new Date(endDate));
            var isMatchingOrigin = !origin || entry.origem === origin;

            if (isWithinDateRange && isMatchingOrigin) {
                var labelIndex = labels.indexOf(entry.tipoDeGasto);
                if (labelIndex === -1) {
                    labels.push(entry.tipoDeGasto);
                    values.push(entry.valor);
                } else {
                    values[labelIndex] += entry.valor;
                }
                valideEntrys.push(entry);
            }
        });

        myChart.data.labels = labels;
        myChart.data.datasets[0].data = values;
        myChart.update();
        localStorage.setItem("validEntrys", JSON.stringify(valideEntrys));

        createLegends(labels, values);
    }

    originSelector.addEventListener('change', () => {
        updateChartAndLegends(startDateInput.value, endDateInput.value, originSelector.value);
    });

    startDateInput.addEventListener('change', () => {
        updateChartAndLegends(startDateInput.value, endDateInput.value, originSelector.value);
    });

    endDateInput.addEventListener('change', () => {
        updateChartAndLegends(startDateInput.value, endDateInput.value, originSelector.value);
    });

    // Initial chart update
    updateChartAndLegends(startDateInput.value, endDateInput.value, originSelector.value);
});