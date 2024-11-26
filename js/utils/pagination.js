export function initializePagination(posts, postsContainer, postsPerPage, displayPostsCallback) {
    let currentPage = 1;

    function displayPaginatedPosts(page) {
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const paginatedPosts = posts.slice(startIndex, endIndex);

        postsContainer.innerHTML = '';
        displayPostsCallback(paginatedPosts);

        updatePaginationControls(posts.length, page);

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    function updatePaginationControls(totalPosts, activePage) {
        const paginationControls = document.getElementById('pagination-controls');
        paginationControls.innerHTML = '';

        const totalPages = Math.ceil(totalPosts / postsPerPage);

        if (activePage > 1) {
            const prevButton = document.createElement('button');
            prevButton.classList.add('pagination-arrow', 'prev');
            prevButton.setAttribute('aria-label', 'Previous Page');
            prevButton.innerHTML = '<i class="fas fa-angle-left" aria-hidden="true"></i>';
            prevButton.addEventListener('click', () => {
                currentPage--;
                displayPaginatedPosts(currentPage);
            });
            paginationControls.appendChild(prevButton);
        }

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.classList.add('pagination-button');
            button.textContent = i;
            button.dataset.page = i;
            button.setAttribute('aria-label', `Page ${i}`);

            if (i === activePage) {
                button.classList.add('active');
            }

            button.addEventListener('click', () => {
                currentPage = i;
                displayPaginatedPosts(currentPage);
            });

            paginationControls.appendChild(button);
        }

        if (activePage < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.classList.add('pagination-arrow', 'next');
            nextButton.setAttribute('aria-label', 'Next Page');
            nextButton.innerHTML = '<i class="fas fa-angle-right" aria-hidden="true"></i>';
            nextButton.addEventListener('click', () => {
                currentPage++;
                displayPaginatedPosts(currentPage);
            });
            paginationControls.appendChild(nextButton);
        }
    }

    displayPaginatedPosts(currentPage);
}