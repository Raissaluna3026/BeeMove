// Dashboard Main Module
class BeeMoveeDashboard {
    constructor() {
        this.data = new DashboardData();
        this.charts = {};
        this.updateInterval = null;
        this.init();
    }

    async init() {
        await this.showLoadingScreen();
        this.setupEventListeners();
        this.initializeCharts();
        this.updateWeatherData();
        this.updateStatistics();
        this.renderAlerts();
        this.startAutoUpdate();
        this.hideLoadingScreen();
    }

    showLoadingScreen() {
        return new Promise(resolve => {
            const overlay = document.getElementById('loadingOverlay');
            overlay.style.display = 'flex';
            
            // Simular carregamento
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }

    hideLoadingScreen() {
        const overlay = document.getElementById('loadingOverlay');
        overlay.classList.add('hidden');
        
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);
    }

    setupEventListeners() {
        // Atualizar data atual
        this.updateCurrentDate();
        
        // Atualizar a cada minuto
        setInterval(() => {
            this.updateCurrentDate();
        }, 60000);

        // Adicionar listeners para responsividade
        window.addEventListener('resize', () => {
            this.resizeCharts();
        });
    }

    updateCurrentDate() {
        const dateElement = document.getElementById('currentDate');
        const now = new Date();
        const dateString = now.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        dateElement.textContent = dateString;
    }

    initializeCharts() {
        this.createPollenChart();
        this.createFloweringChart();
        this.createRainChart();
    }

    createPollenChart() {
        const ctx = document.getElementById('pollenChart').getContext('2d');
        
        this.charts.pollen = new Chart(ctx, {
            type: 'line',
            data: this.data.getPollenData(),
            options: {
                ...this.data.getChartOptions('line'),
                plugins: {
                    ...this.data.getChartOptions('line').plugins,
                    tooltip: {
                        ...this.data.getChartOptions('line').plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `${context.parsed.y} grãos/m³`;
                            }
                        }
                    }
                },
                scales: {
                    ...this.data.getChartOptions('line').scales,
                    y: {
                        ...this.data.getChartOptions('line').scales.y,
                        beginAtZero: true,
                        max: 600
                    }
                }
            }
        });
    }

    createFloweringChart() {
        const ctx = document.getElementById('floweringChart').getContext('2d');
        
        this.charts.flowering = new Chart(ctx, {
            type: 'line',
            data: this.data.getFloweringData(),
            options: {
                ...this.data.getChartOptions('line'),
                plugins: {
                    ...this.data.getChartOptions('line').plugins,
                    tooltip: {
                        ...this.data.getChartOptions('line').plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `${context.parsed.y}%`;
                            }
                        }
                    }
                },
                scales: {
                    ...this.data.getChartOptions('line').scales,
                    y: {
                        ...this.data.getChartOptions('line').scales.y,
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    createRainChart() {
        const ctx = document.getElementById('rainChart').getContext('2d');
        
        this.charts.rain = new Chart(ctx, {
            type: 'bar',
            data: this.data.getRainData(),
            options: this.data.getChartOptions('bar')
        });
    }

    updateWeatherData() {
        const weather = this.data.getWeatherData();
        
        // Temperatura
        document.getElementById('avgTemp').textContent = `${weather.temperature.avg}°C`;
        document.getElementById('maxTemp').textContent = `${weather.temperature.max}°C`;
        document.getElementById('minTemp').textContent = `${weather.temperature.min}°C`;
        
        // Umidade
        document.getElementById('avgHumidity').textContent = `${weather.humidity.avg}%`;
        const humidityProgress = document.getElementById('humidityProgress');
        humidityProgress.style.width = `${weather.humidity.avg}%`;
        
        // Vento
        document.getElementById('avgWind').textContent = `${weather.wind.speed} km/h`;
        document.getElementById('windDirectionText').textContent = weather.wind.direction;
        const windDirection = document.getElementById('windDirection');
        windDirection.style.transform = `rotate(${weather.wind.directionDegrees}deg)`;
        
        // Pressão
        document.getElementById('avgPressure').textContent = `${weather.pressure.avg} hPa`;
        const pressureTrend = document.getElementById('pressureTrend');
        const pressureTrendText = document.getElementById('pressureTrendText');
        
        if (weather.pressure.trend === 'rising') {
            pressureTrend.className = 'fas fa-arrow-up';
            pressureTrend.style.color = '#00ff88';
            pressureTrendText.textContent = 'Subindo';
        } else if (weather.pressure.trend === 'falling') {
            pressureTrend.className = 'fas fa-arrow-down';
            pressureTrend.style.color = '#ff6b6b';
            pressureTrendText.textContent = 'Descendo';
        } else {
            pressureTrend.className = 'fas fa-minus';
            pressureTrend.style.color = '#FFD700';
            pressureTrendText.textContent = 'Estável';
        }
        
        // UV
        document.getElementById('avgUV').textContent = weather.uv.avg;
        document.getElementById('uvLevel').textContent = weather.uv.level;
        
        // Visibilidade
        document.getElementById('avgVisibility').textContent = `${weather.visibility.avg} km`;
    }

    updateStatistics() {
        // Estatísticas de pólen
        const pollenStats = this.data.getPollenStats();
        document.getElementById('pollenAverage').textContent = `${pollenStats.average} grãos/m³`;
        document.getElementById('pollenMax').textContent = `${pollenStats.max} grãos/m³`;
        
        const statusElement = document.getElementById('pollenStatus');
        statusElement.textContent = pollenStats.status;
        
        // Definir cor do status
        if (pollenStats.status === 'Alto') {
            statusElement.style.color = '#ff6b6b';
        } else if (pollenStats.status === 'Moderado') {
            statusElement.style.color = '#FFD700';
        } else {
            statusElement.style.color = '#00ff88';
        }
        
        // Estatísticas de chuva
        const rainStats = this.data.getRainStats();
        document.getElementById('rainTotal').textContent = `${rainStats.total}mm`;
        document.getElementById('rainAverage').textContent = `${rainStats.average}mm`;
    }

    renderAlerts() {
        const container = document.getElementById('alertsContainer');
        const alerts = this.data.getAlerts();
        
        if (alerts.length === 0) {
            container.innerHTML = `
                <div class="alert-item">
                    <div class="alert-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="alert-text">Nenhum alerta ativo no momento</div>
                    <div class="alert-time">-</div>
                </div>
            `;
            return;
        }
        
        container.innerHTML = alerts.map(alert => `
            <div class="alert-item" data-priority="${alert.priority}">
                <div class="alert-icon">
                    <i class="${alert.icon}"></i>
                </div>
                <div class="alert-text">${alert.message}</div>
                <div class="alert-time">${alert.time}</div>
            </div>
        `).join('');
    }

    updateCharts() {
        // Atualizar dados
        this.data.updateData();
        
        // Atualizar gráficos
        this.charts.pollen.data = this.data.getPollenData();
        this.charts.pollen.update('none');
        
        this.charts.flowering.data = this.data.getFloweringData();
        this.charts.flowering.update('none');
        
        this.charts.rain.data = this.data.getRainData();
        this.charts.rain.update('none');
        
        // Atualizar estatísticas
        this.updateStatistics();
    }

    startAutoUpdate() {
        // Atualizar dados a cada 30 segundos
        this.updateInterval = setInterval(() => {
            this.updateCharts();
            
            // Ocasionalmente adicionar novos alertas
            if (Math.random() < 0.3) {
                const newAlert = this.data.addRandomAlert();
                this.renderAlerts();
                this.showNotification(newAlert);
            }
        }, 30000);
    }

    showNotification(alert) {
        // Criar notificação visual
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="${alert.icon}"></i>
                <span>${alert.message}</span>
            </div>
        `;
        
        // Adicionar estilos
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(255, 99, 71, 0.9);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover após 5 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    resizeCharts() {
        Object.values(this.charts).forEach(chart => {
            chart.resize();
        });
    }

    // Método para parar atualizações automáticas
    stopAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    // Método para exportar dados
    exportData() {
        const exportData = {
            timestamp: new Date().toISOString(),
            pollen: this.data.getPollenData(),
            flowering: this.data.getFloweringData(),
            rain: this.data.getRainData(),
            weather: this.data.getWeatherData(),
            alerts: this.data.getAlerts()
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `beemove-dashboard-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }

    // Método para modo de demonstração
    startDemo() {
        this.stopAutoUpdate();
        
        // Demonstração rápida com atualizações a cada 2 segundos
        const demoInterval = setInterval(() => {
            this.updateCharts();
            
            if (Math.random() < 0.7) {
                const newAlert = this.data.addRandomAlert();
                this.renderAlerts();
                this.showNotification(newAlert);
            }
        }, 2000);
        
        // Parar demo após 30 segundos e voltar ao normal
        setTimeout(() => {
            clearInterval(demoInterval);
            this.startAutoUpdate();
        }, 30000);
    }
}

// Inicializar dashboard quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new BeeMoveeDashboard();
    
    // Adicionar atalhos de teclado para funcionalidades extras
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            window.dashboard.exportData();
        }
        
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            window.dashboard.startDemo();
        }
    });
});

// Limpar intervalos quando a página for fechada
window.addEventListener('beforeunload', () => {
    if (window.dashboard) {
        window.dashboard.stopAutoUpdate();
    }
});