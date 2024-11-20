import { initializeHamburgerMenu } from '../utils/hamburgerMenu.js';
import { fetchBlogPosts, deletePost } from '../../api/posts.js';
import { showLoadingSpinner, hideLoadingSpinner } from '../utils/loadingSpinner.js';

initializeHamburgerMenu();

document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');

    if (postsContainer) {
        showLoadingSpinner();
        loadPosts().finally(hideLoadingSpinner);
    }

    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-button')) {
            const postId = event.target.getAttribute('data-id');
            const confirmDelete = confirm('Are you sure you want to delete this post?');
            if (confirmDelete) {
                showLoadingSpinner();
                try {
                    const result = await deletePost(postId);
                    if (result) {
                        alert('Post deleted successfully');
                        await loadPosts();
                    } else {
                        alert('Failed to delete the post');
                    }
                } catch (error) {
                    console.error('Error deleting post:', error);
                } finally {
                    hideLoadingSpinner();
                }
            }
        }
    });
});

async function loadPosts() {
    const postsContainer = document.getElementById('posts-container');

    try {
        const response = await fetchBlogPosts();

        postsContainer.innerHTML = '';
        if (response && response.length > 0) {
            response.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <a href="../view.html?id=${post.id}"><h2>${post.title}</h2></a>
                    ${post.media.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'No image'}" />` : ''}
                    <a href="./edit.html?id=${post.id}" class="edit-button">Edit</a>
                    <button class="delete-button" data-id="${post.id}">Delete</button>
                `;
                postsContainer.appendChild(postElement);
            });
        } else {
            postsContainer.innerHTML = '<p>No posts found.</p>';
        }
    } catch (error) {
        console.error('Error loading posts:', error);
        postsContainer.innerHTML = '<p>Error loading posts.</p>';
    }
}