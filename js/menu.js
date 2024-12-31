// Class quản lý Menu
class MenuManager {
    constructor() {
        this.menuIcon = document.getElementById('menuIcon');
        this.sidebar = document.getElementById('sidebar');
        this.dropdownButtons = document.querySelectorAll('.dropdown-btn');
        this.submenuTriggers = document.querySelectorAll('.has-submenu');
        this.protectedMenuItems = document.querySelectorAll('.dropdown-content a[href*="thaythe"], .dropdown-content a[href*="doicho"], .dropdown-content a[href*="toado"]');
        
        this.init();
    }

    init() {
        this.initializeSidebar();
        this.initializeDropdowns();
        this.initializeSubmenu();
        this.initializeProtectedItems();
        this.initializeClickOutside();
    }

    initializeSidebar() {
        this.menuIcon.addEventListener('click', () => {
            this.toggleSidebar();
        });
    }

    toggleSidebar() {
        this.sidebar.classList.toggle('active');
        this.menuIcon.classList.toggle('active');
    }

    initializeDropdowns() {
        this.dropdownButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const parent = btn.parentElement;
                parent.classList.toggle('active');
            });
        });
    }

    initializeSubmenu() {
        this.submenuTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Lấy parent element
                const parent = trigger.parentElement;
                
                // Toggle trực tiếp, không cần kiểm tra click thứ hai
                this.toggleSubmenu(parent);

                // Đóng các submenu khác
                this.submenuTriggers.forEach(item => {
                    const otherParent = item.parentElement;
                    if (otherParent !== parent && otherParent.classList.contains('active')) {
                        this.toggleSubmenu(otherParent);
                    }
                });
            });
        });
    }

    toggleSubmenu(element) {
        // Toggle class active
        element.classList.toggle('active');
        
        // Lấy submenu element
        const submenu = element.querySelector('.submenu');
        
        // Nếu submenu đang đóng, mở ra
        if (element.classList.contains('active')) {
            submenu.style.display = 'flex';
        } else {
            // Nếu submenu đang mở, đóng lại
            submenu.style.display = 'none';
        }
    }

    initializeProtectedItems() {
        const currentUser = localStorage.getItem('currentUser');
        
        if (!currentUser) {
            this.protectedMenuItems.forEach(item => {
                item.classList.add('locked-item');
                item.innerHTML += ' <span class="lock-icon">🔒</span>';
                item.setAttribute('href', 'javascript:void(0)');
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showLoginModal();
                });
            });
        }
    }

    initializeClickOutside() {
        document.addEventListener('click', (event) => {
            if (!this.sidebar.contains(event.target) && !this.menuIcon.contains(event.target)) {
                this.sidebar.classList.remove('active');
                this.menuIcon.classList.remove('active');
            }
        });
    }

    showLoginModal() {
        document.getElementById('modalOverlay').style.display = 'block';
        document.getElementById('loginModal').style.display = 'block';
    }
}

// Auth Manager để xử lý đăng nhập/đăng xuất
class AuthManager {
    constructor() {
        this.loginBtn = document.getElementById('loginBtn');
        this.logoutBtn = document.getElementById('logoutBtn');
        this.userDisplay = document.getElementById('userDisplay');
        this.modalOverlay = document.getElementById('modalOverlay');
        
        this.init();
    }

    init() {
        this.updateUIState();
        this.initializeEventListeners();
    }

    updateUIState() {
        const currentUser = localStorage.getItem('currentUser');
        
        if (currentUser) {
            this.loginBtn.style.display = 'none';
            this.logoutBtn.style.display = 'inline-block';
            this.userDisplay.textContent = currentUser;
        } else {
            this.loginBtn.style.display = 'inline-block';
            this.logoutBtn.style.display = 'none';
            this.userDisplay.textContent = '';
        }
    }

    initializeEventListeners() {
        this.modalOverlay.addEventListener('click', () => {
            this.hideLoginModal();
        });

        this.logoutBtn?.addEventListener('click', () => {
            this.logout();
        });
    }

    hideLoginModal() {
        this.modalOverlay.style.display = 'none';
        document.getElementById('loginModal').style.display = 'none';
    }

    logout() {
        if (confirm('Bạn có chắc muốn đăng xuất?')) {
            localStorage.removeItem('currentUser');
            window.location.reload();
        }
    }
}

// Khởi tạo khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', function() {
    fetch('/components/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-container').innerHTML = data;
            new MenuManager();
            new AuthManager();
        });
});
