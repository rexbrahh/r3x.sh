// Main JavaScript for site enhancements
document.addEventListener('DOMContentLoaded', function() {
  // Add external link indicators and security attributes
  enhanceExternalLinks();
  
  // Add anchor links to headings
  addAnchorLinks();
});

function enhanceExternalLinks() {
  const links = document.querySelectorAll('a[href^="http"]');
  
  links.forEach(link => {
    // Add security attributes if not already present
    if (!link.getAttribute('rel')) {
      link.setAttribute('rel', 'noopener noreferrer');
    }
    
    // Add target="_blank" if not already present
    if (!link.getAttribute('target')) {
      link.setAttribute('target', '_blank');
    }
  });
}

function addAnchorLinks() {
  const headings = document.querySelectorAll('.prose h2, .prose h3');
  
  headings.forEach(heading => {
    // Create an ID from the heading text if it doesn't have one
    if (!heading.id) {
      heading.id = heading.textContent
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
    }
    
    // Create anchor link
    const anchor = document.createElement('a');
    anchor.href = `#${heading.id}`;
    anchor.className = 'anchor-link';
    anchor.textContent = '#';
    anchor.setAttribute('aria-label', `Link to ${heading.textContent}`);
    
    // Add click handler to update URL
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.hash = heading.id;
      
      // Copy link to clipboard
      if (navigator.clipboard) {
        const fullUrl = window.location.origin + window.location.pathname + '#' + heading.id;
        navigator.clipboard.writeText(fullUrl).catch(() => {
          // Silently fail if clipboard access is denied
        });
      }
    });
    
    heading.appendChild(anchor);
  });
}