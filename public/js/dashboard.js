

        var revenueChartCanvas = $("#revenue-chart").get(0).getContext("2d");
        var temp='900'
        
        var revenueChart = new Chart(revenueChartCanvas, {
            type: 'bar',
            data: {
            labels: ["1", "2", "3", "4", "5", "6"],
            datasets: [{
                data: [105, 195, 290, 320, 500, temp],
                backgroundColor: ["rgba(255, 86, 48, 0.3)", "rgba(255, 86, 48, 0.3)", "rgba(255, 86, 48, 0.3)", "rgb(255, 86, 48,0.3)", "rgba(255, 86, 48, 0.3)", "rgba(255, 86, 48, 0.3)"],
                }
            ]
            },
            options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                gridLines: {
                    drawBorder: false,
                    zeroLineColor: "rgba(0, 0, 0, 0.09)",
                    color: "rgba(0, 0, 0, 0.09)"
                },
                ticks: {
                    fontColor: '#bababa',
                    min:0,
                    stepSize: 100,
                }
                }],
                xAxes: [{
                ticks: {
                    fontColor: '#bababa',
                    beginAtZero: true
                },
                gridLines: {
                    display: false,
                    drawBorder: false
                },
                barPercentage: 0.4
                }]
            },
            legend: {
                display: false
            }
            }
            
        });
    

    



