// Configure your import map in config/importmap.rb
import "@hotwired/turbo-rails"
import "../stylesheets/application.css"


// Função para preview de imagem
document.addEventListener("turbo:load", function() {
  // Preview de imagem quando um arquivo é selecionado
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput) {
    fileInput.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          let preview = document.querySelector('.preview');
          if (!preview) {
            preview = document.createElement('img');
            preview.className = 'preview';
            fileInput.parentNode.appendChild(preview);
          }
          preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Animação suave para mensagens flash
  const flashMessages = document.querySelectorAll('.notice, .alert');
  flashMessages.forEach(message => {
    message.style.opacity = '1';
    setTimeout(() => {
      message.style.opacity = '0';
      setTimeout(() => {
        message.remove();
      }, 600);
    }, 5000);
  });

  // Zoom na imagem ao clicar (para a página de show)
  const galleryImage = document.querySelector('.image-container img');
  if (galleryImage) {
    galleryImage.addEventListener('click', function() {
      this.classList.toggle('zoomed');
    });
  }

  // Lazy loading para imagens
  const images = document.querySelectorAll('.image-wrapper img');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      imageObserver.observe(img);
    });
  }
});
