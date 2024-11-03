import { initializeHamburgerMenu } from './utils/hamburgerMenu.js';

initializeHamburgerMenu();

document.addEventListener('DOMContentLoaded', () => {
    fetch('../json/films.json')
        .then(response => response.json())
        .then(films => {
            const filmGrid = document.getElementById('film-grid');

            films.forEach(film => {
                const filmCard = document.createElement('div');
                filmCard.classList.add('film-card');
                filmCard.innerHTML = `
                    <a href="./view.html?id=${film.id}">
                        <img src="${film.image}" alt="${film.title}">
                        <h2>${film.title}${film.englishtitle ? ` (${film.englishtitle})` : ''}</h2>
                        <p><strong>Year:</strong> ${film.year}</p>
                        <p><strong>Director:</strong> ${film.Director}</p>
                        <p>${film.description}</p>
                        <p><strong>Format:</strong> ${film.format}</p>
                    </a>
                    <a href="${film.IMDB}" target="_blank">View on IMDB</a>
                `;
                filmGrid.appendChild(filmCard);
            });
        })
        .catch(error => {
            console.error('Error loading films:', error);
            document.getElementById('film-grid').innerHTML = '<p>Error loading films.</p>';
        });
});