import { initializeHamburgerMenu } from './utils/hamburgerMenu.js';
import { fetchBlogPosts } from '../api/posts.js';
import { initializeCarousel } from './utils/carousel.js';
import { showLoadingSpinner, hideLoadingSpinner } from './utils/loadingSpinner.js';
import { truncateText } from './helpers/textHelpers.js';
import { initializePagination } from './utils/pagination.js';

initializeHamburgerMenu();
showLoadingSpinner();

const postsPerPage = 6;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        initializeCarousel();

        const postsContainer = document.getElementById('posts-front');
        const paginationControls = document.getElementById('pagination-controls');

        if (postsContainer && paginationControls) {
            const posts = await fetchBlogPosts();
            console.log('Full API response:', posts);

            initializePagination(posts, postsContainer, postsPerPage, displayPosts);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        hideLoadingSpinner();
    }
});

function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-front');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <a href="./view.html?id=${post.id}"><h2>${post.title}</h2></a>
            <p>${truncateText(post.body, 250)}</p>
            <a href="./view.html?id=${post.id}">… Read more
                ${post.media.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'No image'}" />` : ''}
            </a>
        `;
        postsContainer.appendChild(postElement);
    });
}