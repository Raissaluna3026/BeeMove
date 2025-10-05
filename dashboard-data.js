// Dashboard Data Module - Mock data for 15 days
class DashboardData {
    constructor() {
        this.generateMockData();
    }

    generateMockData() {
        // Generate dates for the last 15 days
        this.dates = this.generateDates(15);
        
        // Pollen concentration data (grains/m³)
        this.pollenData = {
            labels: this.dates,
            datasets: [{
                label: 'Pollen Concentration (grains/m³)',
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

        // Flowering level data (0-100%)
        this.floweringData = {
            labels: this.dates,
            datasets: [{
                label: 'Flowering Level (%)',
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

        // Precipitation index data (mm)
        this.rainData = {
            labels: this.dates,
            datasets: [{
                label: 'Precipitation (mm)',
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

        // Average meteorological data (for the entire period)
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

        // Mock alerts
        this.alerts = [
            {
                id: 1,
                type: 'warning',
                icon: 'fas fa-exclamation-triangle',
                message: 'High pollen level detected - Risk for allergic individuals',
                time: '2 hours ago',
                priority: 'high'
            },
            {
                id: 2,
                type: 'info',
                icon: 'fas fa-cloud-rain',
                message: 'Rain forecast for the next 6 hours',
                time: '4 hours ago',
                priority: 'medium'
            },
            {
                id: 3,
                type: 'success',
                icon: 'fas fa-leaf',
                message: 'Ideal conditions for pollination activity',
                time: '1 day ago',
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

    // Methods to get specific data
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

    // Calculate statistics
    getPollenStats() {
        const data = this.pollenData.datasets[0].data;
        const average = Math.round(data.reduce((a, b) => a + b, 0) / data.length);
        const max = Math.max(...data);
        
        let status = 'Normal';
        if (average > 350) status = 'High';
        else if (average > 250) status = 'Moderate';
        
        return { average, max, status };
    }

    getRainStats() {
        const data = this.rainData.datasets[0].data;
        const total = Math.round(data.reduce((a, b) => a + b, 0) * 10) / 10;
        const average = Math.round(total / data.length * 10) / 10;
        
        return { total, average };
    }

    // Simulate real-time data updates
    updateData() {
        // Update pollen data
        const pollenDataset = this.pollenData.datasets[0];
        pollenDataset.data.shift(); // Remove first element
        pollenDataset.data.push(Math.floor(Math.random() * 400) + 100); // Add new

        // Update flowering data
        const floweringDataset = this.floweringData.datasets[0];
        floweringDataset.data.shift();
        floweringDataset.data.push(Math.floor(Math.random() * 50) + 40);

        // Update rain data
        const rainDataset = this.rainData.datasets[0];
        rainDataset.data.shift();
        rainDataset.data.push(Math.round(Math.random() * 25 * 10) / 10);

        // Update dates
        this.dates.shift();
        const today = new Date();
        this.dates.push(today.toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: '2-digit' 
        }));

        // Update chart labels
        this.pollenData.labels = [...this.dates];
        this.floweringData.labels = [...this.dates];
        this.rainData.labels = [...this.dates];
    }

    // Simulate new alerts
    addRandomAlert() {
        const alertTypes = [
            {
                type: 'warning',
                icon: 'fas fa-exclamation-triangle',
                message: 'Adverse weather conditions detected',
                priority: 'high'
            },
            {
                type: 'info',
                icon: 'fas fa-wind',
                message: 'Strong winds may affect pollen dispersal',
                priority: 'medium'
            },
            {
                type: 'success',
                icon: 'fas fa-check-circle',
                message: 'Monitoring system operating normally',
                priority: 'low'
            }
        ];

        const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        const newAlert = {
            id: Date.now(),
            ...randomAlert,
            time: 'Now',
        };

        this.alerts.unshift(newAlert);
        
        // Keep only the 5 most recent alerts
        if (this.alerts.length > 5) {
            this.alerts = this.alerts.slice(0, 5);
        }

        return newAlert;
    }

    // Chart settings
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

// Export for global use
window.DashboardData = DashboardData;