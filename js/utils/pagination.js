export function initializePagination(posts, postsContainer, postsPerPage, displayPostsCallback) {
    let currentPage = 1;

    function displayPaginatedPosts(page) {
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const paginatedPosts = posts.slice(startIndex, endIndex);

        // Clear and display posts for the current page
        postsContainer.innerHTML = '';
        displayPostsCallback(paginatedPosts);

        updatePaginationControls(posts.length, page);

        // Scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    function updatePaginationControls(totalPosts, activePage) {
        const paginationControls = document.getElementById('pagination-controls');
        paginationControls.innerHTML = ''; // Clear existing controls
    
        const totalPages = Math.ceil(totalPosts / postsPerPage);
    
        // Add "Previous" arrow
        if (activePage > 1) {
            const prevButton = document.createElement('button');
            prevButton.classList.add('pagination-arrow', 'prev');
            prevButton.innerHTML = '<i class="fas fa-angle-left"></i>'; // Font Awesome icon
            prevButton.addEventListener('click', () => {
                currentPage--;
                displayPaginatedPosts(currentPage);
            });
            paginationControls.appendChild(prevButton);
        }
    
        // Add page numbers
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.classList.add('pagination-button');
            button.textContent = i;
            button.dataset.page = i;
    
            if (i === activePage) {
                button.classList.add('active');
            }
    
            button.addEventListener('click', () => {
                currentPage = i;
                displayPaginatedPosts(currentPage);
            });
    
            paginationControls.appendChild(button);
        }
    
        // Add "Next" arrow
        if (activePage < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.classList.add('pagination-arrow', 'next');
            nextButton.innerHTML = '<i class="fas fa-angle-right"></i>'; // Font Awesome icon
            nextButton.addEventListener('click', () => {
                currentPage++;
                displayPaginatedPosts(currentPage);
            });
            paginationControls.appendChild(nextButton);
        }
    }    

    displayPaginatedPosts(currentPage);
}