import { fetchPostById, updatePost } from '../../api/posts.js';
import { showLoadingSpinner, hideLoadingSpinner } from '../utils/loadingSpinner.js';

document.addEventListener('DOMContentLoaded', async () => {
    const postForm = document.getElementById('post-form');
    const postId = new URLSearchParams(window.location.search).get('id');

    if (postForm && postId) {
        showLoadingSpinner(); // Show spinner while fetching post data

        try {
            const post = await fetchPostById(postId);
            if (post) {
                document.getElementById('title').value = post.title || '';
                document.getElementById('body').value = post.body || '';
                document.getElementById('tags').value = post.tags ? post.tags.join(', ') : '';
                document.getElementById('media-url').value = post.media?.url || '';
                document.getElementById('media-alt').value = post.media?.alt || '';
            } else {
                alert('Post not found');
            }
        } catch (error) {
            console.error('Error loading post data:', error);
        } finally {
            hideLoadingSpinner(); // Hide spinner after loading post data completes
        }

        postForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            showLoadingSpinner(); // Show spinner on form submission

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
                const result = await updatePost(postId, postData);
                if (result) {
                    alert('Post updated successfully');
                    window.location.href = './index.html'; // Redirect after update
                }
            } catch (error) {
                console.error('Error updating post:', error);
            } finally {
                hideLoadingSpinner(); // Hide spinner after form submission completes
            }
        });
    } else {
        console.warn('Post form not found or postId missing.');
        hideLoadingSpinner(); // Hide spinner if form or postId is not found
    }
});