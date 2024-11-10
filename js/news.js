import { initializeHamburgerMenu } from './utils/hamburgerMenu.js';
import { fetchBlogPosts } from '../api/posts.js';
import { showLoadingSpinner, hideLoadingSpinner } from './utils/loadingSpinner.js';
import { truncateText } from './helpers/textHelpers.js';
import { sortNews } from './utils/sortNews.js'; 

initializeHamburgerMenu();
showLoadingSpinner();

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const postsContainer = document.getElementById('posts-front');
        
        if (postsContainer) {
            const posts = await loadPosts(); // Load and display initial posts
            initializeSorting(posts); // Initialize sorting functionality
        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        hideLoadingSpinner(); // Ensure the spinner is hidden once loading completes
    }
});

async function loadPosts() {
    const response = await fetchBlogPosts();
    console.log('Full API response:', response); // Log for debugging

    if (response && response.length > 0) {
        displayPosts(response); // Display the posts using displayPosts
        return response; // Return posts for sorting
    } else {
        console.error('No posts found in the response.');
        document.getElementById('posts-front').innerHTML = '<p>No posts found.</p>';
    }
}

// Consolidated function for displaying posts
function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-front');
    postsContainer.innerHTML = ''; // Clear any existing content

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

// Sorting functionality
function initializeSorting(posts) {
    const sortOptions = document.getElementById('sortOptions');
    if (sortOptions) {
        sortOptions.addEventListener('change', () => {
            const sortedPosts = sortNews(posts, sortOptions.value);
            displayPosts(sortedPosts); // Use displayPosts to show sorted posts
        });
    }
}