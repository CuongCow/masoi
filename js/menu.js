        // Thêm hàm kiểm tra đăng nhập và hiển thị modal
        function showLoginModal() {
            document.getElementById('modalOverlay').style.display = 'block';
            document.getElementById('loginModal').style.display = 'block';
        }

document.addEventListener('DOMContentLoaded', function() {
    // Tải sidebar
    fetch('/components/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-container').innerHTML = data;
            initializeMenuFunctionality();
        });

    function initializeMenuFunctionality() {
        // Toggle Sidebar and Menu Icon Animation
        const menuIcon = document.getElementById('menuIcon');
        const sidebar = document.getElementById('sidebar');
        
        menuIcon.addEventListener('click', toggleSidebar);

        // Toggle Sidebar and Menu Icon Animation
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const menuIcon = document.getElementById('menuIcon');
            sidebar.classList.toggle('active');
            menuIcon.classList.toggle('active');
        }

        // Dropdown functionality
        const dropdownButtons = document.querySelectorAll('.dropdown-btn');
        dropdownButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const parent = btn.parentElement;
                parent.classList.toggle('active');
            });
        });
        document.addEventListener('click', (event) => {
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.getElementById('menuIcon');

    // Check if the click is outside the sidebar and the menu button
    if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
        sidebar.classList.remove('active');
        menuIcon.classList.remove('active');
    }
    // Lấy tất cả các phần tử có class 'has-submenu'
const submenuTriggers = document.querySelectorAll('.has-submenu');

submenuTriggers.forEach(trigger => {
    trigger.addEventListener('click', function (e) {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>

        // Lấy phần tử cha (dropdown-sub) và toggle class 'active'
        const parent = this.parentElement;
        parent.classList.toggle('active');

        // Đóng các submenu khác nếu cần
        submenuTriggers.forEach(item => {
            if (item !== this) {
                item.parentElement.classList.remove('active');
            }
        });
    });
});

});

        // Close sidebar when clicking outside
        document.addEventListener('click', (event) => {
            if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
                sidebar.classList.remove('active');
                menuIcon.classList.remove('active');
            }
        });

        // Login modal and protected items logic (from previous script)
        const currentUser = localStorage.getItem('currentUser');
        const protectedMenuItems = document.querySelectorAll('.dropdown-content a[href*="thaythe"], .dropdown-content a[href*="doicho"], .dropdown-content a[href*="toado"]');
        
        protectedMenuItems.forEach(item => {
            if (!currentUser) {
                // Thêm icon khóa và class locked
                item.classList.add('locked-item');
                item.innerHTML += ' <span class="lock-icon">🔒</span>';
                
                // Thay thế href bằng javascript:void(0)
                item.setAttribute('href', 'javascript:void(0)');
                
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    showLoginModal();
                });
            }
        });
    }
                // Đóng modal khi click bên ngoài
                document.getElementById('modalOverlay').addEventListener('click', function() {
                    this.style.display = 'none';
                    document.getElementById('loginModal').style.display = 'none';
                });
                
                if (currentUser) {
                    loginBtn.style.display = 'none';
                    logoutBtn.style.display = 'inline-block';
                    userDisplay.textContent = `${currentUser}`;
                } else {
                    loginBtn.style.display = 'inline-block';
                    logoutBtn.style.display = 'none';
                    userDisplay.textContent = '';
                }
});

function showLoginModal() {
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('loginModal').style.display = 'block';
}
        // Kiểm tra trạng thái đăng nhập khi trang được tải
        document.addEventListener('DOMContentLoaded', function() {
            const currentUser = localStorage.getItem('currentUser');
            const loginBtn = document.getElementById('loginBtn');
            const logoutBtn = document.getElementById('logoutBtn');
            const userDisplay = document.getElementById('userDisplay');
            
            if (currentUser) {
                // Người dùng đã đăng nhập
                loginBtn.style.display = 'none';
                logoutBtn.style.display = 'inline-block';
                userDisplay.textContent = `${currentUser}`; // Chỉ hiển thị tên người dùng
            } else {
                // Chưa đăng nhập
                loginBtn.style.display = 'inline-block';
                logoutBtn.style.display = 'none';
                userDisplay.textContent = '';
            }
        });

        function logout() {
            if (confirm('Bạn có chắc muốn đăng xuất?')) {
                localStorage.removeItem('currentUser');
                window.location.reload();
            }
        }
                // Thêm hàm kiểm tra đăng nhập và hiển thị modal
                function showLoginModal() {
                    document.getElementById('modalOverlay').style.display = 'block';
                    document.getElementById('loginModal').style.display = 'block';
                }