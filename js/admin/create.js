import { createPost } from '../../api/posts.js';
import { showLoadingSpinner, hideLoadingSpinner } from '../utils/loadingSpinner.js';

document.addEventListener('DOMContentLoaded', () => {
    hideLoadingSpinner();

    const postForm = document.getElementById('post-form');
    if (postForm) {
        postForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            showLoadingSpinner();

            const postData = {
                title: document.getElementById('title').value,
                body: document.getElementById('body').value,
                tags: document.getElementById('tags').value.split(',').map(tag => tag.trim()),
                media: {
                    url: document.getElementById('media-url').value,
                    alt: document.getElementById('media-alt').value
                }
            };

            try {
                const result = await createPost(postData);
                if (result) {
                    alert('Post created successfully');
                    window.location.href = './index.html'; // Redirect after creation
                }
            } catch (error) {
                console.error('Error creating post:', error);
            } finally {
                hideLoadingSpinner(); // Ensure spinner hides after submission
            }
        });
    } else {
        console.warn('Post form not found.');
        hideLoadingSpinner(); // Hide spinner if form not found
    }
});