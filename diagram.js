const adatTablazat = document.getElementById('adat-tablazat');
        const chartCanvas = document.getElementById('myChart');
        let myChart;

        function letrehozDiagram(adatok) {
            const ctx = chartCanvas.getContext('2d');
            myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Oszlop 1', 'Oszlop 2', 'Oszlop 3', 'Oszlop 4', 'Oszlop 5'],
                    datasets: [{
                        label: 'Sor adatai',
                        data: adatok,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        pointRadius: 5,
                        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                        pointBorderColor: '#fff',
                        pointHoverRadius: 8,
                        pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
                        pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
                        fill: false,
                    }]
                },
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'A táblázat kiválasztott sorának adatai',
                        fontSize: 16,
                    },
                    legend: {
                        position: 'bottom',
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Oszlopok',
                                fontSize: 14,
                            },
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Értékek',
                                fontSize: 14,
                            },
                            ticks: {
                                beginAtZero: true,
                            },
                        }],
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: false,
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                },
            });
        }

        function frissitDiagram(ujAdatok) {
            myChart.data.datasets[0].data = ujAdatok;
            myChart.update();
        }

        function getSorAdatok(sor) {
            const cellak = sor.querySelectorAll('td');
            const sorAdatok = [];
            cellak.forEach(cell => {
                const value = parseInt(cell.textContent);
                if (!isNaN(value)) {
                    sorAdatok.push(value);
                }
            });
            return sorAdatok;
        }

        adatTablazat.addEventListener('click', (event) => {
            const target = event.target;
            if (target.tagName === 'TD') {
                const sor = target.parentNode;
                const sorAdatok = getSorAdatok(sor);
                if (!myChart) {
                    letrehozDiagram(sorAdatok);
                } else {
                    frissitDiagram(sorAdatok);
                }
            }
        });

        const kezdetiAdatok = [10, 20, 30, 40, 50];
        letrehozDiagram(kezdetiAdatok);