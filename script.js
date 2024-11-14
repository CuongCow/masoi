document.addEventListener("DOMContentLoaded", function () {
    const messageDotsContainer = document.getElementById('message-dots');
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
  
    messages.forEach(message => {
      const dot = document.createElement('div');
      dot.className = 'dot';
  
      // Vị trí ngẫu nhiên cho dấu chấm
      dot.style.top = `${Math.random() * window.innerHeight}px`;
      dot.style.left = `${Math.random() * window.innerWidth}px`;
  
      // Hiển thị thông điệp khi hover
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = message.text;
      dot.appendChild(tooltip);
  
      dot.addEventListener('mouseover', () => {
        tooltip.style.display = 'block';
        tooltip.style.top = `${dot.offsetTop - 30}px`;
        tooltip.style.left = `${dot.offsetLeft + 10}px`;
      });
  
      dot.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
      });
  
      messageDotsContainer.appendChild(dot);
    });
  });
  