import { fetchPostById, createPost, updatePost, fetchBlogPosts, deletePost } from '../api/posts.js';

// Toggle Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('nav ul.menu');

    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    } else {
        console.warn('Hamburger menu or navigation menu not found.');
    }

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
                    window.location.href = './post/index.html';  // Redirect after update
                }
            } else {
                // Create new post
                const result = await createPost(postData);
                if (result) {
                    alert('Post created successfully');
                    window.location.href = './post/index.html';  // Redirect after creation
                }
            }
        });
    } else {
        console.warn('Post form not found.');
    }

    // Check if the page has a container for displaying posts
    const postsContainer = document.getElementById('posts-container');
    if (postsContainer) {  // If the posts container exists, load posts
        loadPosts();
    }
});

// Function to load and display posts
async function loadPosts() {
    const postsContainer = document.getElementById('posts-container');

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
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                ${post.media.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'No image'}" />` : ''}
                <p>Tags: ${post.tags.join(', ')}</p>
                <a href="./edit.html?id=${post.id}" class="edit-button">Edit</a>
                <button class="delete-button" data-id="${post.id}">Delete</button>
            `;
            postsContainer.appendChild(postElement);  // Append the post to the container
        });
    } else {
        console.error('No posts found in the response.');
        postsContainer.innerHTML = '<p>No posts found.</p>';
    }
}

// Event delegation for delete buttons
document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-button')) {
        const postId = event.target.getAttribute('data-id');
        
        // Confirm deletion
        const confirmDelete = confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            const result = await deletePost(postId);  // Call delete function
            if (result) {
                alert('Post deleted successfully');
                loadPosts();  // Refresh the post list after deletion
            } else {
                alert('Failed to delete the post');
            }
        }
    }
});

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