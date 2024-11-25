import { fetchBlogPosts } from '../../api/posts.js';
import { truncateText } from '../helpers/textWords.js';

export async function initializeCarousel() {
    const carouselContainer = document.querySelector('.carousel-inner');
    const posts = await fetchBlogPosts();

    if (posts && posts.length > 0) {
        const latestPosts = posts.slice(0, 3);
        latestPosts.forEach((post) => {
            const postItem = document.createElement('div');
            postItem.classList.add('carousel-item');
            postItem.innerHTML = `
                <h2>${post.title}</h2>
                <p>${truncateText(post.body, 20)} <a href="./view.html?id=${post.id}">Read more</a></p>
                ${post.media.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'Post image'}" />` : ''}
            `;
            carouselContainer.appendChild(postItem);
        });

        let currentIndex = 0;
        let slideTimer;
        const items = document.querySelectorAll('.carousel-item');
        const totalItems = items.length;

        function updateCarousel(index) {
            const offset = -index * 100;
            document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
        }

        function startAutoSlide() {
            clearInterval(slideTimer);
            slideTimer = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarousel(currentIndex);
            }, 5000);
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
    if (totalItems <= 1) return;

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