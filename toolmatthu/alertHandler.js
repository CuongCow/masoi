function closeAlert() {
    const overlay = document.querySelector('.alert-overlay');
    
    // Thêm class hidden
    overlay.classList.add('hidden');
    
    // Xóa phần tử sau khi animation hoàn tất
    setTimeout(() => {
        if (overlay) {
            overlay.remove(); // Sử dụng remove() để xóa hoàn toàn
        }
        // Đảm bảo xóa mọi style còn sót lại trên body
        document.body.style.overflow = '';
        document.body.style.pointerEvents = 'auto';
    }, 100); // Giảm thời gian chờ xuống 100ms
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('/alert.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('alertContainer').innerHTML = data;
            
            // Thêm event listener cho nút đóng cảnh báo sau khi nội dung được tải
            const closeButton = document.querySelector('.btn-understand');
            if (closeButton) {
                closeButton.addEventListener('click', closeAlert);
            }
        })
        .catch(error => console.error('Error loading alert:', error));
});
