// Public Page JavaScript for VALKYRIA NAIL STUDIO
class PublicPageManager {
    constructor() {
        this.services = [];
        this.filteredServices = [];
        this.currentFilter = '';
        this.init();
    }

    init() {
        this.loadServices();
        this.renderPublicServices();
        this.setupSmoothScrolling();
        this.setupMobileMenu();
    }

    // Load services from localStorage (read-only)
    loadServices() {
        const savedServices = localStorage.getItem('valkyria_services');
        if (savedServices) {
            try {
                this.services = JSON.parse(savedServices);
                this.filteredServices = [...this.services];
            } catch (e) {
                console.error('Error loading services:', e);
                this.services = this.getDefaultServices();
                this.filteredServices = [...this.services];
            }
        } else {
            // Load default services
            this.services = this.getDefaultServices();
            this.filteredServices = [...this.services];
        }
    }

    getDefaultServices() {
        return [
            {
                id: 1,
                name: "Manicure Clásico",
                category: "Manicure",
                price: 25000,
                duration: 45,
                description: "Manicure tradicional con lima, cutícula y esmaltado. Incluye hidratación y masaje."
            },
            {
                id: 2,
                name: "Pedicure Spa",
                category: "Pedicure",
                price: 35000,
                duration: 60,
                description: "Pedicure completo con exfoliación, masaje relajante y tratamiento hidratante."
            },
            {
                id: 3,
                name: "Nail Art Básico",
                category: "Nail Art",
                price: 40000,
                duration: 75,
                description: "Diseños artísticos personalizados en tus uñas con técnicas profesionales."
            },
            {
                id: 4,
                name: "Extensiones de Gel",
                category: "Extensiones",
                price: 65000,
                duration: 120,
                description: "Extensiones duraderas con gel de alta calidad. Diseño y forma personalizada."
            },
            {
                id: 5,
                name: "Tratamiento Fortalecedor",
                category: "Tratamientos",
                price: 20000,
                duration: 30,
                description: "Tratamiento nutritivo especial para uñas débiles y quebradizas."
            },
            {
                id: 6,
                name: "Manicure Premium",
                category: "Manicure",
                price: 45000,
                duration: 60,
                description: "Manicure de lujo con tratamiento anti-edad y esmaltado de larga duración."
            },
            {
                id: 7,
                name: "Nail Art Premium",
                category: "Nail Art",
                price: 65000,
                duration: 90,
                description: "Diseños artísticos complejos con piedras, brillos y técnicas avanzadas."
            },
            {
                id: 8,
                name: "Pedicure Express",
                category: "Pedicure",
                price: 25000,
                duration: 30,
                description: "Pedicure rápido perfecto para mantenimiento regular de tus pies."
            }
        ];
    }

    formatPrice(price) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    }

    getCategoryIcon(category) {
        const icons = {
            'Manicure': 'fas fa-hand-paper',
            'Pedicure': 'fas fa-spa',
            'Nail Art': 'fas fa-palette',
            'Extensiones': 'fas fa-magic',
            'Tratamientos': 'fas fa-leaf',
            'Otros': 'fas fa-gem'
        };
        return icons[category] || 'fas fa-gem';
    }

    getCategoryColor(category) {
        const colors = {
            'Manicure': '#d946ef',
            'Pedicure': '#06b6d4', 
            'Nail Art': '#f97316',
            'Extensiones': '#8b5cf6',
            'Tratamientos': '#10b981',
            'Otros': '#6366f1'
        };
        return colors[category] || '#d946ef';
    }

    renderPublicServices() {
        const container = document.getElementById('public-services-container');
        const noServicesDiv = document.getElementById('no-public-services');
        
        if (this.filteredServices.length === 0) {
            container.style.display = 'none';
            noServicesDiv?.classList.remove('hidden');
            return;
        }
        
        container.style.display = 'grid';
        noServicesDiv?.classList.add('hidden');
        
        container.innerHTML = this.filteredServices.map(service => this.createPublicServiceCard(service)).join('');
    }

    createPublicServiceCard(service) {
        const categoryIcon = this.getCategoryIcon(service.category);
        const categoryColor = this.getCategoryColor(service.category);
        const durationText = service.duration ? `${service.duration} min` : '';
        
        return `
            <div class="public-service-card" data-category="${service.category}">
                <div class="service-card-header" style="background: linear-gradient(135deg, ${categoryColor}22, ${categoryColor}11);">
                    <div class="service-category-badge" style="background: ${categoryColor};">
                        <i class="${categoryIcon}"></i>
                        <span>${service.category}</span>
                    </div>
                    <div class="service-price">${this.formatPrice(service.price)}</div>
                </div>
                
                <div class="service-card-body">
                    <h3 class="service-name">${service.name}</h3>
                    ${service.description ? `<p class="service-description">${service.description}</p>` : ''}
                    
                    <div class="service-details">
                        ${durationText ? `
                            <div class="service-detail">
                                <i class="fas fa-clock"></i>
                                <span>${durationText}</span>
                            </div>
                        ` : ''}
                        <div class="service-detail">
                            <i class="fas fa-award"></i>
                            <span>Servicio Premium</span>
                        </div>
                    </div>
                </div>
                
                <div class="service-card-footer">
                    <button class="book-service-btn" onclick="bookService('${service.name}', '${service.category}')" style="background: ${categoryColor};">
                        <i class="fas fa-calendar-plus"></i>
                        Reservar Cita
                    </button>
                </div>
            </div>
        `;
    }

    setupSmoothScrolling() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerOffset = 80;
                    const elementPosition = targetSection.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupMobileMenu() {
        // Mobile menu functionality would go here if needed
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            });
        }
    }

    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'check' : type === 'error' ? 'times' : 'info';
        toast.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 4000);
    }
}

// Global functions for HTML event handlers
function filterPublicServices(category) {
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter services
    publicManager.currentFilter = category;
    publicManager.filteredServices = category ? 
        publicManager.services.filter(service => service.category === category) : 
        [...publicManager.services];
    
    publicManager.renderPublicServices();
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.mobile-menu-toggle i');
    
    navMenu.classList.toggle('mobile-active');
    toggle.classList.toggle('fa-bars');
    toggle.classList.toggle('fa-times');
}

function bookService(serviceName, category) {
    // Simulate booking action
    const message = `¡Perfecto! Te contactaremos pronto para agendar tu cita de ${serviceName}.`;
    publicManager.showToast(message, 'success');
    
    // Scroll to contact section
    document.querySelector('#contacto').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

function handleContactForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Simulate form submission
    publicManager.showToast('¡Mensaje enviado! Te contactaremos pronto.', 'success');
    
    // Reset form
    event.target.reset();
    
    // In a real application, you would send this data to a server
    console.log('Contact form data:', data);
}

// Initialize the public page manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.publicManager = new PublicPageManager();
});

// Update services when localStorage changes (for admin updates)
window.addEventListener('storage', function(e) {
    if (e.key === 'valkyria_services') {
        if (window.publicManager) {
            window.publicManager.loadServices();
            window.publicManager.renderPublicServices();
        }
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.public-header');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});