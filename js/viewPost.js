import { initializeHamburgerMenu } from './utils/hamburgerMenu.js';
import { fetchPostById } from '../api/posts.js';
import { addShareButton } from './helpers/shareArticle.js';
import { displayRelatedPosts } from './utils/relatedPosts.js';

initializeHamburgerMenu();

document.addEventListener('DOMContentLoaded', async () => {
    const postId = new URLSearchParams(window.location.search).get('id');

    if (!postId) {
        document.getElementById('post-details').innerHTML = '<p>Error: No post ID provided.</p>';
        return;
    }

    try {
        const post = await fetchPostById(postId);

        if (post) {
            updateMetaTags(post.title, post.body);

            document.getElementById('post-details').innerHTML = `
                <article>
                    <h2>${post.title}</h2>
                    <p class="author-date">
                        <strong>Author:</strong> ${post.author?.name || 'Unknown'}<br>
                        <strong>Published:</strong> ${new Date(post.created).toLocaleDateString() || 'N/A'}
                    </p>
                    <p>${post.body}</p>
                    ${post.media.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'Post image'}">` : ''}
                    <p><strong>Tags:</strong> ${post.tags.join(', ')}</p>
                </article>
                <section id="related-posts">
                    <h3>Read also:</h3>
                    <div class="related-posts-container"></div>
                </section>
            `;

            addShareButton(post.title);
            displayRelatedPosts(post.tags, postId);
        } else {
            document.getElementById('post-details').innerHTML = '<p>Post not found.</p>';
        }
    } catch (error) {
        console.error('Error loading post:', error);
        document.getElementById('post-details').innerHTML = '<p>Error loading post.</p>';
    }
});

function updateMetaTags(title, body) {
    document.title = `NorWave - ${title}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        const cleanDescription = stripHtmlTags(body);
        metaDescription.setAttribute('content', `${title} - ${truncateText(cleanDescription, 150)}`);
    }
}

function truncateText(text, maxLength) {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}

function stripHtmlTags(input) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = input;
    return tempDiv.textContent || tempDiv.innerText || '';
}