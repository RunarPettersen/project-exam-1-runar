const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchInputMenu = document.getElementById('searchInputMenu');
const searchButtonMenu = document.getElementById('searchButtonMenu');

function redirectToSearchResults(query) {
    if (query) {
        const basePath = `${window.location.origin}${window.location.pathname.split('/').slice(0, -1).join('/')}`;
        const searchResultsPath = `${basePath}/search-results.html`;
        window.location.href = `${searchResultsPath}?query=${encodeURIComponent(query)}`;
    }
}

if (searchInput && searchButton) {
    searchButton.addEventListener('click', () => redirectToSearchResults(searchInput.value));
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') redirectToSearchResults(searchInput.value);
    });
} else {
    console.warn('Main search bar elements not found.');
}

if (searchInputMenu && searchButtonMenu) {
    searchButtonMenu.addEventListener('click', () => redirectToSearchResults(searchInputMenu.value));
    searchInputMenu.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') redirectToSearchResults(searchInputMenu.value);
    });
} else {
    console.warn('Mobile menu search bar elements not found.');
}