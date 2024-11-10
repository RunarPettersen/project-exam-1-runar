import { fetchBlogPosts } from '../../api/posts.js';

export async function displayRelatedPosts(tags, currentPostId) {
    try {
        const allPosts = await fetchBlogPosts();
        const relatedPosts = allPosts
            .filter(post => post.id !== currentPostId && post.tags.some(tag => tags.includes(tag)))
            .slice(0, 3); // Limit to 3 related posts

        const relatedPostsContainer = document.querySelector('.related-posts-container');
        
        if (relatedPosts.length > 0) {
            relatedPosts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('related-post');
                postElement.innerHTML = `
                    <a href="./view.html?id=${post.id}">
                        <h4>${post.title}</h4>
                    </a>
                    ${post.media.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'Related post image'}">` : ''}
                `;
                relatedPostsContainer.appendChild(postElement);
            });
        } else {
            relatedPostsContainer.innerHTML = '<p>No related posts found.</p>';
        }
    } catch (error) {
        console.error('Error fetching related posts:', error);
    }
}