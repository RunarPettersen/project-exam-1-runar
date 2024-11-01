import { fetchBlogPosts } from '../../api/posts.js';

export async function initializeCarousel() {
    const carouselContainer = document.querySelector('.carousel-inner');
    const posts = await fetchBlogPosts();

    if (posts && posts.length > 0) {
        // Limit to the 3 latest posts
        const latestPosts = posts.slice(0, 3);
        latestPosts.forEach((post) => {
            const postItem = document.createElement('div');
            postItem.classList.add('carousel-item');
            postItem.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body.substring(0, 100)}...</p>
                ${post.media.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'Post image'}" />` : ''}
                <br><a href="./view.html?id=${post.id}">Read more</a>
            `;
            carouselContainer.appendChild(postItem);
        });

        // Variables needed for carousel logic
        let currentIndex = 0;
        let slideTimer;
        const items = document.querySelectorAll('.carousel-item');
        const totalItems = items.length;

        function updateCarousel(index) {
            const offset = -index * 100;
            document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
        }

        function startAutoSlide() {
            clearInterval(slideTimer); // Clear any existing timer
            slideTimer = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarousel(currentIndex);
            }, 5000); // Change every 5 seconds
        }

        function restartAutoSlide() {
            clearInterval(slideTimer);
            startAutoSlide();
        }

        setupCarouselNavigation(currentIndex, totalItems, updateCarousel, restartAutoSlide);
        startAutoSlide();
    } else {
        console.error('No posts available for the carousel.');
        carouselContainer.innerHTML = '<p>No posts available.</p>';
    }
}

function setupCarouselNavigation(currentIndex, totalItems, updateCarousel, restartAutoSlide) {
    if (totalItems <= 1) return; // No need for a carousel if there is only one item

    document.getElementById('carousel-next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel(currentIndex);
        restartAutoSlide();
    });

    document.getElementById('carousel-prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel(currentIndex);
        restartAutoSlide();
    });
}