import { initializeHamburgerMenu } from './utils/hamburgerMenu.js';
import { sortFilms } from './utils/sortFilms.js';
import { showLoadingSpinner, hideLoadingSpinner } from './utils/loadingSpinner.js';
import { initializePagination } from './utils/pagination.js';

initializeHamburgerMenu();

document.addEventListener('DOMContentLoaded', () => {
    const filmGrid = document.getElementById('film-grid');
    const sortOptions = document.getElementById('sortOptions');
    const paginationControls = document.getElementById('pagination-controls');
    const filmsPerPage = 12;

    showLoadingSpinner();

    fetch('../json/films.json')
        .then(response => response.json())
        .then(films => {
            // Sort films by "Newest" by default
            const sortedFilms = sortFilms(films, 'dateAddedNewest');
            
            // Update the dropdown to reflect default sorting
            if (sortOptions) {
                sortOptions.value = 'dateAddedNewest';
            }

            // Display the default sorted films
            initializePagination(sortedFilms, filmGrid, filmsPerPage, displayFilms);
            hideLoadingSpinner();

            // Add sorting functionality
            sortOptions.addEventListener('change', () => {
                const sortedFilms = sortFilms(films, sortOptions.value);
                initializePagination(sortedFilms, filmGrid, filmsPerPage, displayFilms);
            });
        })
        .catch(error => {
            console.error('Error loading films:', error);
            filmGrid.innerHTML = '<p>Error loading films.</p>';
            hideLoadingSpinner();
        });
});

function displayFilms(films) {
    const filmGrid = document.getElementById('film-grid');
    filmGrid.innerHTML = '';

    films.forEach(film => {
        const filmCard = document.createElement('div');
        filmCard.classList.add('film-card');
        filmCard.innerHTML = `
            <a href="./view.html?id=${film.id}">
                <img src="../${film.image}" alt="${film.title}">
                <h2>${film.title}${film.englishtitle ? ` (${film.englishtitle})` : ''}</h2>
                <p><strong>Year:</strong> ${film.year}</p>
                <p><strong>Director:</strong> ${film.director}</p>
                <p>${film.description}</p>
                <p><strong>Format:</strong> ${film.format}</p>
            </a>
            <a href="${film.IMDB}" target="_blank">View on IMDB</a>
        `;
        filmGrid.appendChild(filmCard);
    });
}