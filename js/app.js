import { initializeHamburgerMenu } from './utils/hamburgerMenu.js';
import { fetchPostById, fetchBlogPosts } from '../api/posts.js';
import { initializeCarousel } from './utils/carousel.js';

initializeHamburgerMenu();

document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
});

// Check if the page has a post form (for creating/updating posts)
const postForm = document.getElementById('post-form');
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
if (postForm) {
    if (postId) {
        loadPostData(postId);  // Load existing post data for editing
    }
    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const body = document.getElementById('body').value;
        const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
        const mediaUrl = document.getElementById('media-url').value;
        const mediaAlt = document.getElementById('media-alt').value;
        const postData = {
            title,
            body,
            tags,
            media: {
                url: mediaUrl,
                alt: mediaAlt
            }
        };
        if (postId) {
            // Update existing post
            const result = await updatePost(postId, postData);
            if (result) {
                alert('Post updated successfully');
                window.location.href = '/post/index.html';  // Redirect after update
            }
        } else {
            // Create new post
            const result = await createPost(postData);
            if (result) {
                alert('Post created successfully');
                window.location.href = '/post/index.html';  // Redirect after creation
            }
        }
    });
} else {
    console.warn('Post form not found.');
}

    // Check if the page has a container for displaying posts
    const postsContainer = document.getElementById('posts-front');
    if (postsContainer) {  // If the posts container exists, load posts
        loadPosts();
    }

async function loadPosts() {
    const postsContainer = document.getElementById('posts-front');

    // Fetch posts from the API
    const response = await fetchBlogPosts();

    // Log the full response for debugging
    console.log('Full API response:', response);

    // Check if posts exist
    if (response && response.length > 0) {
        postsContainer.innerHTML = '';  // Clear any existing content
        response.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <a href=data-id="${post.id}"><h2>${post.title}</h2></a>
                <p>${post.body}</p>
                ${post.media.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'No image'}" />` : ''}
                <p>Tags: ${post.tags.join(', ')}</p>
            `;
            postsContainer.appendChild(postElement);  // Append the post to the container
        });
    } else {
        console.error('No posts found in the response.');
        postsContainer.innerHTML = '<p>No posts found.</p>';
    }
}

async function loadPostData(id) {
    console.log(`Loading post data for ID: ${id}`);  // Add this for debugging
    const post = await fetchPostById(id);
    if (post) {
        document.getElementById('title').value = post.title || '';
        document.getElementById('body').value = post.body || '';
        document.getElementById('tags').value = post.tags ? post.tags.join(', ') : '';
        document.getElementById('media-url').value = post.media?.url || '';
        document.getElementById('media-alt').value = post.media?.alt || '';
    } else {
        alert('Post not found');
    }
}