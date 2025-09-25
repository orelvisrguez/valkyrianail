// Service Management Application
class ServiceManager {
    constructor() {
        this.services = [];
        this.currentEditId = null;
        this.deleteId = null;
        this.init();
    }

    init() {
        // Load services from localStorage
        this.loadServices();
        // Render initial state
        this.renderServices();
        this.updateStats();
        // Add event listeners
        this.addEventListeners();
        // Load theme preference
        this.loadTheme();
    }

    addEventListeners() {
        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
                this.closeDeleteModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                this.closeDeleteModal();
            }
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                this.openAddModal();
            }
        });
    }

    loadServices() {
        const savedServices = localStorage.getItem('valkyria_services');
        if (savedServices) {
            try {
                this.services = JSON.parse(savedServices);
            } catch (e) {
                console.error('Error loading services:', e);
                this.services = [];
            }
        } else {
            // Initialize with sample data
            this.services = this.getSampleServices();
            this.saveServices();
        }
    }

    getSampleServices() {
        return [
            {
                id: 1,
                name: "Manicure Clásico",
                category: "Manicure",
                price: 25000,
                duration: 45,
                description: "Manicure tradicional con lima, cutícula y esmaltado"
            },
            {
                id: 2,
                name: "Pedicure Spa",
                category: "Pedicure",
                price: 35000,
                duration: 60,
                description: "Pedicure completo con exfoliación y masaje relajante"
            },
            {
                id: 3,
                name: "Nail Art Básico",
                category: "Nail Art",
                price: 40000,
                duration: 75,
                description: "Diseños artísticos personalizados en tus uñas"
            },
            {
                id: 4,
                name: "Extensiones de Gel",
                category: "Extensiones",
                price: 65000,
                duration: 120,
                description: "Extensiones duraderas con gel de alta calidad"
            },
            {
                id: 5,
                name: "Tratamiento Fortalecedor",
                category: "Tratamientos",
                price: 20000,
                duration: 30,
                description: "Tratamiento nutritivo para uñas débiles"
            }
        ];
    }

    saveServices() {
        localStorage.setItem('valkyria_services', JSON.stringify(this.services));
    }

    generateId() {
        return Date.now() + Math.random();
    }

    formatPrice(price) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    }

    // Service CRUD operations
    addService(serviceData) {
        const service = {
            id: this.generateId(),
            name: serviceData.name,
            category: serviceData.category,
            price: parseFloat(serviceData.price),
            duration: parseInt(serviceData.duration) || null,
            description: serviceData.description || ''
        };

        this.services.push(service);
        this.saveServices();
        this.renderServices();
        this.updateStats();
        this.showToast('Servicio agregado exitosamente', 'success');
    }

    updateService(id, serviceData) {
        const index = this.services.findIndex(s => s.id === id);
        if (index !== -1) {
            this.services[index] = {
                ...this.services[index],
                name: serviceData.name,
                category: serviceData.category,
                price: parseFloat(serviceData.price),
                duration: parseInt(serviceData.duration) || null,
                description: serviceData.description || ''
            };
            
            this.saveServices();
            this.renderServices();
            this.updateStats();
            this.showToast('Servicio actualizado exitosamente', 'success');
        }
    }

    deleteService(id) {
        const index = this.services.findIndex(s => s.id === id);
        if (index !== -1) {
            const serviceName = this.services[index].name;
            this.services.splice(index, 1);
            this.saveServices();
            this.renderServices();
            this.updateStats();
            this.showToast(`"${serviceName}" eliminado correctamente`, 'success');
        }
    }

    // UI Rendering
    renderServices() {
        const container = document.getElementById('services-container');
        const noServicesDiv = document.getElementById('no-services');
        
        if (this.services.length === 0) {
            container.style.display = 'none';
            noServicesDiv.classList.remove('hidden');
            return;
        }
        
        container.style.display = 'grid';
        noServicesDiv.classList.add('hidden');
        
        container.innerHTML = this.services.map(service => this.createServiceCard(service)).join('');
    }

    createServiceCard(service) {
        const durationText = service.duration ? 
            `<div class="service-detail"><i class="fas fa-clock"></i><span>${service.duration} min</span></div>` : '';
        
        const descriptionText = service.description ? 
            `<div class="service-description">${service.description}</div>` : '';

        return `
            <div class="service-card">
                <div class="service-header">
                    <div>
                        <div class="service-title">${service.name}</div>
                        <span class="service-category">${service.category}</span>
                    </div>
                    <div class="service-price">${this.formatPrice(service.price)}</div>
                </div>
                <div class="service-details">
                    ${durationText}
                    <div class="service-detail">
                        <i class="fas fa-tag"></i>
                        <span>ID: ${service.id.toString().slice(-4)}</span>
                    </div>
                </div>
                ${descriptionText}
                <div class="service-actions">
                    <button class="edit-btn" onclick="serviceManager.editService(${service.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="delete-btn" onclick="serviceManager.openDeleteModal(${service.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `;
    }

    updateStats() {
        const totalServices = this.services.length;
        const prices = this.services.map(s => s.price).filter(p => p > 0);
        const avgPrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
        const categories = [...new Set(this.services.map(s => s.category))];
        const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
        const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
        
        document.getElementById('total-services').textContent = totalServices;
        document.getElementById('avg-price').textContent = this.formatPrice(avgPrice);
        document.getElementById('total-categories').textContent = categories.length;
        
        const priceRangeText = minPrice === maxPrice ? 
            this.formatPrice(minPrice) : 
            `${this.formatPrice(minPrice)} - ${this.formatPrice(maxPrice)}`;
        document.getElementById('price-range').textContent = priceRangeText;
    }

    // Modal Management
    openAddModal() {
        this.currentEditId = null;
        document.getElementById('modal-title').textContent = 'Nuevo Servicio';
        document.getElementById('service-form').reset();
        document.getElementById('service-modal').classList.remove('hidden');
        document.getElementById('service-name').focus();
    }

    editService(id) {
        const service = this.services.find(s => s.id === id);
        if (!service) return;
        
        this.currentEditId = id;
        document.getElementById('modal-title').textContent = 'Editar Servicio';
        
        // Populate form
        document.getElementById('service-name').value = service.name;
        document.getElementById('service-category').value = service.category;
        document.getElementById('service-price').value = service.price;
        document.getElementById('service-duration').value = service.duration || '';
        document.getElementById('service-description').value = service.description || '';
        
        document.getElementById('service-modal').classList.remove('hidden');
        document.getElementById('service-name').focus();
    }

    closeModal() {
        document.getElementById('service-modal').classList.add('hidden');
        this.currentEditId = null;
    }

    openDeleteModal(id) {
        this.deleteId = id;
        document.getElementById('delete-modal').classList.remove('hidden');
    }

    closeDeleteModal() {
        document.getElementById('delete-modal').classList.add('hidden');
        this.deleteId = null;
    }

    confirmDelete() {
        if (this.deleteId) {
            this.deleteService(this.deleteId);
            this.closeDeleteModal();
        }
    }

    // Form Handling
    saveService(event) {
        event.preventDefault();
        
        const formData = {
            name: document.getElementById('service-name').value.trim(),
            category: document.getElementById('service-category').value,
            price: document.getElementById('service-price').value,
            duration: document.getElementById('service-duration').value,
            description: document.getElementById('service-description').value.trim()
        };
        
        // Validation
        if (!formData.name || !formData.category || !formData.price) {
            this.showToast('Por favor completa todos los campos requeridos', 'error');
            return;
        }
        
        if (parseFloat(formData.price) <= 0) {
            this.showToast('El precio debe ser mayor a 0', 'error');
            return;
        }
        
        // Save service
        if (this.currentEditId) {
            this.updateService(this.currentEditId, formData);
        } else {
            this.addService(formData);
        }
        
        this.closeModal();
    }

    // Filtering and Sorting
    filterServices() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const categoryFilter = document.getElementById('category-filter').value;
        
        const filteredServices = this.services.filter(service => {
            const matchesSearch = service.name.toLowerCase().includes(searchTerm) ||
                                service.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !categoryFilter || service.category === categoryFilter;
            
            return matchesSearch && matchesCategory;
        });
        
        this.renderFilteredServices(filteredServices);
    }

    sortServices() {
        const sortBy = document.getElementById('sort-select').value;
        let sortedServices = [...this.services];
        
        switch (sortBy) {
            case 'name-asc':
                sortedServices.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                sortedServices.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'price-asc':
                sortedServices.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sortedServices.sort((a, b) => b.price - a.price);
                break;
            case 'category':
                sortedServices.sort((a, b) => a.category.localeCompare(b.category));
                break;
        }
        
        this.services = sortedServices;
        this.renderServices();
        this.saveServices();
    }

    renderFilteredServices(services) {
        const container = document.getElementById('services-container');
        const noServicesDiv = document.getElementById('no-services');
        
        if (services.length === 0) {
            container.innerHTML = `
                <div class="no-services" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>No se encontraron servicios</h3>
                    <p>Intenta con otros términos de búsqueda</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = services.map(service => this.createServiceCard(service)).join('');
    }

    // Export functionality
    exportServices() {
        const data = {
            exportDate: new Date().toISOString(),
            business: 'VALKYRIA NAIL STUDIO',
            services: this.services,
            stats: {
                totalServices: this.services.length,
                totalCategories: [...new Set(this.services.map(s => s.category))].length,
                averagePrice: this.services.reduce((sum, s) => sum + s.price, 0) / this.services.length
            }
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `valkyria-servicios-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('Servicios exportados exitosamente', 'success');
    }

    // Theme Management
    loadTheme() {
        const savedTheme = localStorage.getItem('valkyria_theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('valkyria_theme', newTheme);
        this.updateThemeIcon(newTheme);
        
        this.showToast(`Tema ${newTheme === 'dark' ? 'oscuro' : 'claro'} activado`, 'success');
    }

    updateThemeIcon(theme) {
        const icon = document.querySelector('.theme-toggle i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // Toast Notifications
    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'check' : type === 'error' ? 'times' : 'exclamation';
        toast.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 4000);
    }
}

// Global functions for HTML event handlers
function openAddModal() {
    serviceManager.openAddModal();
}

function closeModal() {
    serviceManager.closeModal();
}

function closeDeleteModal() {
    serviceManager.closeDeleteModal();
}

function confirmDelete() {
    serviceManager.confirmDelete();
}

function saveService(event) {
    serviceManager.saveService(event);
}

function filterServices() {
    serviceManager.filterServices();
}

function sortServices() {
    serviceManager.sortServices();
}

function exportServices() {
    serviceManager.exportServices();
}

function toggleTheme() {
    serviceManager.toggleTheme();
}

// Initialize the service manager when the page loads
const serviceManager = new ServiceManager();

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}