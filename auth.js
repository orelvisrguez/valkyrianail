// Authentication Module
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.defaultCredentials = {
            username: 'admin',
            password: 'valkyria2025'
        };
        this.init();
    }

    init() {
        // Check if user is already logged in
        const savedAuth = localStorage.getItem('valkyria_auth');
        if (savedAuth) {
            try {
                const authData = JSON.parse(savedAuth);
                if (this.isValidSession(authData)) {
                    this.currentUser = authData;
                    if (window.location.pathname.includes('login.html')) {
                        this.redirectToDashboard();
                    }
                    return;
                }
            } catch (e) {
                localStorage.removeItem('valkyria_auth');
            }
        }

        // If not logged in and on admin page, redirect to login
        if (window.location.pathname.includes('admin.html')) {
            this.redirectToLogin();
        }
    }

    isValidSession(authData) {
        if (!authData || !authData.loginTime) return false;
        
        // Session expires after 30 days or if remember me is not checked
        const sessionDuration = authData.rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
        const isExpired = (Date.now() - authData.loginTime) > sessionDuration;
        
        return !isExpired;
    }

    async login(username, password, rememberMe = false) {
        try {
            // Simulate API call delay
            await this.delay(800);

            // Check credentials
            if (username === this.defaultCredentials.username && 
                password === this.defaultCredentials.password) {
                
                const authData = {
                    username: username,
                    loginTime: Date.now(),
                    rememberMe: rememberMe,
                    role: 'admin'
                };

                // Save to localStorage
                localStorage.setItem('valkyria_auth', JSON.stringify(authData));
                this.currentUser = authData;

                return { success: true, user: authData };
            } else {
                return { 
                    success: false, 
                    error: 'Usuario o contraseña incorrectos' 
                };
            }
        } catch (error) {
            return { 
                success: false, 
                error: 'Error de conexión. Intenta nuevamente.' 
            };
        }
    }

    logout() {
        localStorage.removeItem('valkyria_auth');
        this.currentUser = null;
        this.redirectToLogin();
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    redirectToLogin() {
        window.location.href = 'login.html';
    }

    redirectToDashboard() {
        window.location.href = 'admin.html';
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize auth manager
const authManager = new AuthManager();

// Login form handler
function handleLogin(event) {
    event.preventDefault();
    
    const submitBtn = document.querySelector('.login-btn');
    const errorMessage = document.getElementById('error-message');
    const form = document.getElementById('login-form');
    
    // Get form data
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    
    // Validate input
    if (!username || !password) {
        showError('Por favor completa todos los campos');
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando sesión...';
    errorMessage.classList.add('hidden');
    
    // Attempt login
    authManager.login(username, password, rememberMe)
        .then(result => {
            if (result.success) {
                // Success - redirect to dashboard
                submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Bienvenida!';
                setTimeout(() => {
                    authManager.redirectToDashboard();
                }, 500);
            } else {
                // Show error
                showError(result.error);
                resetSubmitButton();
            }
        })
        .catch(error => {
            console.error('Login error:', error);
            showError('Error inesperado. Intenta nuevamente.');
            resetSubmitButton();
        });
    
    function showError(message) {
        errorMessage.querySelector('span').textContent = message;
        errorMessage.classList.remove('hidden');
    }
    
    function resetSubmitButton() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="btn-text">Iniciar Sesión</span><i class="fas fa-arrow-right"></i>';
    }
}

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }
}

// Global logout function
function logout() {
    if (confirm('¿Estás segura de que deseas cerrar sesión?')) {
        authManager.logout();
    }
}