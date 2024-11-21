import { initializeHamburgerMenu } from './utils/hamburgerMenu.js';
import { fetchBlogPosts } from '../api/posts.js';
import { showLoadingSpinner, hideLoadingSpinner } from './utils/loadingSpinner.js';
import { truncateText } from './helpers/textHelpers.js';
import { sortNews } from './utils/sortNews.js';
import { initializePagination } from './utils/pagination.js';

initializeHamburgerMenu();
showLoadingSpinner();

const postsPerPage = 12; // Number of posts per page

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const postsContainer = document.getElementById('posts-front');
        const paginationControls = document.getElementById('pagination-controls');

        if (postsContainer && paginationControls) {
            const posts = await fetchBlogPosts();
            console.log('Full API response:', posts);

            // Initialize pagination
            initializePagination(posts, postsContainer, postsPerPage, displayPosts);

            // Initialize sorting functionality
            initializeSorting(posts);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        hideLoadingSpinner();
    }
});

function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-front');
    
    // Clear existing content before adding new posts
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <a href="../view.html?id=${post.id}"><h2>${post.title}</h2></a>
            <p>${truncateText(post.body, 250)}</p>
            <a href="../view.html?id=${post.id}">… Read more
                ${post.media.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'No image'}" />` : ''}
            </a>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Sorting functionality
function initializeSorting(posts) {
    const sortOptions = document.getElementById('sortOptions');
    if (sortOptions) {
        sortOptions.addEventListener('change', () => {
            const sortedPosts = sortNews(posts, sortOptions.value);
            
            // Reinitialize pagination with sorted posts
            initializePagination(sortedPosts, document.getElementById('posts-front'), postsPerPage, displayPosts);
        });
    }
}