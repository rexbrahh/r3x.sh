// Blog index functionality
document.addEventListener('DOMContentLoaded', async function() {
  await loadBlogPosts();
});

async function loadBlogPosts() {
  try {
    const response = await fetch('/content/posts.json');
    if (!response.ok) {
      throw new Error('Failed to load posts');
    }
    
    const posts = await response.json();
    renderPosts(posts);
  } catch (error) {
    console.error('Error loading blog posts:', error);
    const container = document.getElementById('posts-container');
    if (container) {
      container.innerHTML = '<p>Unable to load posts at this time.</p>';
    }
  }
}

function renderPosts(posts) {
  const container = document.getElementById('posts-container');
  if (!container) return;
  
  if (posts.length === 0) {
    container.innerHTML = '<p>No posts yet. Check back soon!</p>';
    return;
  }
  
  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const postsHTML = sortedPosts.map(post => `
    <article class="post-item">
      <div class="post-meta">${formatDate(post.date)}</div>
      <h2 class="post-title">
        <a href="/posts/${post.slug}/">${post.title}</a>
      </h2>
      <p class="post-summary">${post.summary}</p>
      ${post.tags && post.tags.length > 0 ? `
        <div class="tags">
          ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      ` : ''}
    </article>
  `).join('');
  
  container.innerHTML = `<div class="post-list">${postsHTML}</div>`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}