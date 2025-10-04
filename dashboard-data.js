// Dashboard Data Module - Dados mockados para 15 dias
class DashboardData {
    constructor() {
        this.generateMockData();
    }

    generateMockData() {
        // Gerar datas dos últimos 15 dias
        this.dates = this.generateDates(15);
        
        // Dados de concentração de pólen (grãos/m³)
        this.pollenData = {
            labels: this.dates,
            datasets: [{
                label: 'Concentração de Pólen (grãos/m³)',
                data: [
                    245, 312, 428, 156, 289, 367, 445, 523, 389, 298,
                    234, 345, 467, 398, 312
                ],
                borderColor: '#FFD700',
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#FFD700',
                pointBorderColor: '#FFA000',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        };

        // Dados de níveis de floração (0-100%)
        this.floweringData = {
            labels: this.dates,
            datasets: [{
                label: 'Nível de Floração (%)',
                data: [
                    65, 72, 85, 45, 58, 78, 92, 88, 76, 63,
                    54, 69, 83, 79, 67
                ],
                borderColor: '#FF69B4',
                backgroundColor: 'rgba(255, 105, 180, 0.2)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#FF69B4',
                pointBorderColor: '#FF1493',
                pointBorderWidth: 2,
                pointRadius: 4
            }]
        };

        // Dados de índice pluviométrico (mm)
        this.rainData = {
            labels: this.dates,
            datasets: [{
                label: 'Precipitação (mm)',
                data: [
                    0, 12.5, 8.2, 0, 15.7, 3.4, 0, 22.1, 7.8, 0,
                    4.3, 18.9, 0, 9.6, 1.2
                ],
                backgroundColor: 'rgba(0, 191, 255, 0.8)',
                borderColor: '#00BFFF',
                borderWidth: 2,
                borderRadius: 4,
                borderSkipped: false,
            }]
        };

        // Dados meteorológicos médios (para todo o período)
        this.weatherData = {
            temperature: {
                avg: 24.5,
                max: 32.1,
                min: 18.3
            },
            humidity: {
                avg: 68
            },
            wind: {
                speed: 12.8,
                direction: 'NE',
                directionDegrees: 45
            },
            pressure: {
                avg: 1013.2,
                trend: 'stable'
            },
            uv: {
                avg: 7.2,
                level: 'Alto'
            },
            visibility: {
                avg: 15.4
            }
        };

        // Alertas mockados
        this.alerts = [
            {
                id: 1,
                type: 'warning',
                icon: 'fas fa-exclamation-triangle',
                message: 'Alto nível de pólen detectado - Risco para alérgicos',
                time: '2 horas atrás',
                priority: 'high'
            },
            {
                id: 2,
                type: 'info',
                icon: 'fas fa-cloud-rain',
                message: 'Previsão de chuva nas próximas 6 horas',
                time: '4 horas atrás',
                priority: 'medium'
            },
            {
                id: 3,
                type: 'success',
                icon: 'fas fa-leaf',
                message: 'Condições ideais para atividade de polinização',
                time: '1 dia atrás',
                priority: 'low'
            }
        ];
    }

    generateDates(days) {
        const dates = [];
        const today = new Date();
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            dates.push(date.toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: '2-digit' 
            }));
        }
        
        return dates;
    }

    // Métodos para obter dados específicos
    getPollenData() {
        return this.pollenData;
    }

    getFloweringData() {
        return this.floweringData;
    }

    getRainData() {
        return this.rainData;
    }

    getWeatherData() {
        return this.weatherData;
    }

    getAlerts() {
        return this.alerts;
    }

    // Calcular estatísticas
    getPollenStats() {
        const data = this.pollenData.datasets[0].data;
        const average = Math.round(data.reduce((a, b) => a + b, 0) / data.length);
        const max = Math.max(...data);
        
        let status = 'Normal';
        if (average > 350) status = 'Alto';
        else if (average > 250) status = 'Moderado';
        
        return { average, max, status };
    }

    getRainStats() {
        const data = this.rainData.datasets[0].data;
        const total = Math.round(data.reduce((a, b) => a + b, 0) * 10) / 10;
        const average = Math.round(total / data.length * 10) / 10;
        
        return { total, average };
    }

    // Simular atualização de dados em tempo real
    updateData() {
        // Atualizar dados de pólen
        const pollenDataset = this.pollenData.datasets[0];
        pollenDataset.data.shift(); // Remove primeiro elemento
        pollenDataset.data.push(Math.floor(Math.random() * 400) + 100); // Adiciona novo

        // Atualizar dados de floração
        const floweringDataset = this.floweringData.datasets[0];
        floweringDataset.data.shift();
        floweringDataset.data.push(Math.floor(Math.random() * 50) + 40);

        // Atualizar dados de chuva
        const rainDataset = this.rainData.datasets[0];
        rainDataset.data.shift();
        rainDataset.data.push(Math.round(Math.random() * 25 * 10) / 10);

        // Atualizar datas
        this.dates.shift();
        const today = new Date();
        this.dates.push(today.toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: '2-digit' 
        }));

        // Atualizar labels dos gráficos
        this.pollenData.labels = [...this.dates];
        this.floweringData.labels = [...this.dates];
        this.rainData.labels = [...this.dates];
    }

    // Simular novos alertas
    addRandomAlert() {
        const alertTypes = [
            {
                type: 'warning',
                icon: 'fas fa-exclamation-triangle',
                message: 'Condições meteorológicas adversas detectadas',
                priority: 'high'
            },
            {
                type: 'info',
                icon: 'fas fa-wind',
                message: 'Ventos fortes podem afetar dispersão de pólen',
                priority: 'medium'
            },
            {
                type: 'success',
                icon: 'fas fa-check-circle',
                message: 'Sistema de monitoramento funcionando normalmente',
                priority: 'low'
            }
        ];

        const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        const newAlert = {
            id: Date.now(),
            ...randomAlert,
            time: 'Agora',
        };

        this.alerts.unshift(newAlert);
        
        // Manter apenas os 5 alertas mais recentes
        if (this.alerts.length > 5) {
            this.alerts = this.alerts.slice(0, 5);
        }

        return newAlert;
    }

    // Configurações dos gráficos
    getChartOptions(type) {
        const baseOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 20, 25, 0.9)',
                    titleColor: '#FFD700',
                    bodyColor: '#ffffff',
                    borderColor: '#FFD700',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        color: '#ffffff',
                        maxTicksLimit: 8
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                }
            }
        };

        if (type === 'bar') {
            return {
                ...baseOptions,
                plugins: {
                    ...baseOptions.plugins,
                    tooltip: {
                        ...baseOptions.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `${context.parsed.y}mm`;
                            }
                        }
                    }
                }
            };
        }

        return baseOptions;
    }
}

// Exportar para uso global
window.DashboardData = DashboardData;