// Check if search elements exist in the DOM
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

const searchInputMenu = document.getElementById('searchInputMenu');
const searchButtonMenu = document.getElementById('searchButtonMenu');

// Function to redirect to the search results page
function redirectToSearchResults(query) {
    if (query) {
        // Adjusted path to work dynamically
        const basePath = window.location.origin; // Get the base URL
        const searchResultsPath = `${basePath}/search-results.html`;
        window.location.href = `${searchResultsPath}?query=${encodeURIComponent(query)}`;
    }
}

// Main search bar event listeners
if (searchInput && searchButton) {
    searchButton.addEventListener('click', () => redirectToSearchResults(searchInput.value));
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') redirectToSearchResults(searchInput.value);
    });
} else {
    console.warn('Main search bar elements not found.');
}

// Mobile menu search bar event listeners
if (searchInputMenu && searchButtonMenu) {
    searchButtonMenu.addEventListener('click', () => redirectToSearchResults(searchInputMenu.value));
    searchInputMenu.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') redirectToSearchResults(searchInputMenu.value);
    });
} else {
    console.warn('Mobile menu search bar elements not found.');
}