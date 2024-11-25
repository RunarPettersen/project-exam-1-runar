import { fetchBlogPosts } from '../../api/posts.js';
import { truncateText } from '../helpers/textHelpers.js';

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query').toLowerCase();

    if (!query) {
        document.getElementById('results-container').innerHTML = '<p>No search query provided.</p>';
        return;
    }

    const posts = await fetchBlogPosts();
    const resultsContainer = document.getElementById('results-container');

    const filteredPosts = posts.filter(post => {
        const title = post.title.toLowerCase();
        const content = post.body.toLowerCase();
        return title.includes(query) || content.includes(query);
    });

    if (filteredPosts.length > 0) {
        filteredPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <a href="./view.html?id=${post.id}"><h2>${post.title}</h2></a>
                <p>${truncateText(post.body, 250)}</p>
                <a href="./view.html?id=${post.id}">… Read more</a>
            `;
            resultsContainer.appendChild(postElement);
        });
    } else {
        document.getElementById('no-results').style.display = 'block';
    }
});