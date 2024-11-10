import { initializeHamburgerMenu } from './utils/hamburgerMenu.js';
import { sortFilms } from './utils/sortFilms.js';
import { showLoadingSpinner, hideLoadingSpinner } from './utils/loadingSpinner.js';

initializeHamburgerMenu();

document.addEventListener('DOMContentLoaded', () => {
    const filmGrid = document.getElementById('film-grid');
    const sortOptions = document.getElementById('sortOptions');

    // Show the loading spinner before fetching data
    showLoadingSpinner();

    fetch('../json/films.json')
        .then(response => response.json())
        .then(films => {
            displayFilms(films);
            hideLoadingSpinner(); // Hide the spinner once films are displayed

            // Listen for sorting option changes
            sortOptions.addEventListener('change', () => {
                const sortedFilms = sortFilms(films, sortOptions.value);
                displayFilms(sortedFilms);
            });
        })
        .catch(error => {
            console.error('Error loading films:', error);
            filmGrid.innerHTML = '<p>Error loading films.</p>';
            hideLoadingSpinner(); // Hide the spinner if there's an error
        });
});

// Function to display films in the grid
function displayFilms(films) {
    const filmGrid = document.getElementById('film-grid');
    filmGrid.innerHTML = ''; // Clear current content

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