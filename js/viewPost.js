import { fetchPostById } from '../api/posts.js';

document.addEventListener('DOMContentLoaded', async () => {
    const postId = new URLSearchParams(window.location.search).get('id');

    if (!postId) {
        document.getElementById('post-details').innerHTML = '<p>Error: No post ID provided.</p>';
        return;
    }

    try {
        const post = await fetchPostById(postId);

        if (post) {
            document.getElementById('post-details').innerHTML = `
                <article>
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                    ${post.media.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'Post image'}">` : ''}
                    <p><strong>Tags:</strong> ${post.tags.join(', ')}</p>
                </article>
            `;
        } else {
            document.getElementById('post-details').innerHTML = '<p>Post not found.</p>';
        }
    } catch (error) {
        console.error('Error loading post:', error);
        document.getElementById('post-details').innerHTML = '<p>Error loading post.</p>';
    }
});