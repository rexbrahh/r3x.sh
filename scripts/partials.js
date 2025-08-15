// Load and inject header and footer partials
async function loadPartials() {
  try {
    // Load header
    const headerResponse = await fetch('/partials/header.html');
    if (headerResponse.ok) {
      const headerHTML = await headerResponse.text();
      const headerPlaceholder = document.getElementById('header-placeholder');
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
      }
    }
    
    // Load footer
    const footerResponse = await fetch('/partials/footer.html');
    if (footerResponse.ok) {
      const footerHTML = await footerResponse.text();
      const footerPlaceholder = document.getElementById('footer-placeholder');
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
      }
    }
    
    // Set active navigation state after loading header
    setActiveNavigation();
  } catch (error) {
    console.error('Error loading partials:', error);
  }
}

// Set active navigation state based on current path
function setActiveNavigation() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a[data-page]');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    const page = link.getAttribute('data-page');
    if (
      (page === 'home' && currentPath === '/') ||
      (page === 'blog' && currentPath.startsWith('/blog')) ||
      (page === 'about' && currentPath.startsWith('/about')) ||
      (page === 'now' && currentPath.startsWith('/now'))
    ) {
      link.classList.add('active');
    }
  });
}

// Load partials when DOM is ready
document.addEventListener('DOMContentLoaded', loadPartials);