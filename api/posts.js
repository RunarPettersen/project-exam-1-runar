import { authFetch } from './authFetch.js';

const BASE_URL = 'https://v2.api.noroff.dev';
const username = 'Runar';

export async function createPost(postData) {
    const createPostUrl = `${BASE_URL}/blog/posts/${username}`;

    console.log('Creating post with URL:', createPostUrl);
    console.log('Post data being sent:', postData);

    try {
        const response = await authFetch(createPostUrl, {
            method: 'POST',
            body: JSON.stringify(postData),
        });

        if (response.ok) {
            const data = await response.json();
            alert('Post created successfully');
            console.log('Post created successfully:', data);
            return true;
        } else {
            const errorResponse = await response.json();
            console.error('Failed to create post:', response.status, errorResponse);
            alert(`Failed to create post: ${errorResponse.errors.map(err => err.message).join(', ')}`);
            return false;
        }
    } catch (error) {
        console.error('Error creating post:', error);
        return false;
    }
}

export async function fetchBlogPosts() {
    const apiUrl = `${BASE_URL}/blog/posts/${username}`;

    try {
        const response = await authFetch(apiUrl);

        if (response.ok) {
            const data = await response.json();
            console.log('Fetched blog posts:', data);
            return data.data;
        } else {
            console.error('Failed to fetch blog posts:', response.status);
            return [];
        }
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

export async function updatePost(id, postData) {
    const updatePostUrl = `${BASE_URL}/blog/posts/${username}/${id}`;

    try {
        const response = await authFetch(updatePostUrl, {
            method: 'PUT',
            body: JSON.stringify(postData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Post updated successfully:', data);
            return true;
        } else {
            console.error(`Failed to update post with ID: ${id}`, response.status);
            return false;
        }
    } catch (error) {
        console.error(`Error updating post with ID: ${id}`, error);
        return false;
    }
}

export async function fetchPostById(id) {
    const fetchPostUrl = `${BASE_URL}/blog/posts/${username}/${id}`;
    console.log(`Fetching post from URL: ${fetchPostUrl}`);

    try {
        const response = await authFetch(fetchPostUrl);

        if (response.ok) {
            const data = await response.json();
            console.log('Fetched post data:', data);
            return data.data;
        } else {
            console.error(`Failed to fetch post with ID: ${id}`, response.status);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching post with ID: ${id}`, error);
        return null;
    }
}

export async function deletePost(id) {
    const deletePostUrl = `${BASE_URL}/blog/posts/${username}/${id}`;
    console.log(`Deleting post from URL: ${deletePostUrl}`);

    try {
        const response = await authFetch(deletePostUrl, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log(`Post with ID ${id} deleted successfully`);
            return true;
        } else {
            console.error(`Failed to delete post with ID: ${id}`, response.status);
            return false;
        }
    } catch (error) {
        console.error(`Error deleting post with ID: ${id}`, error);
        return false;
    }
}