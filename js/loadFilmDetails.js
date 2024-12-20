import { initializeHamburgerMenu } from './utils/hamburgerMenu.js';

initializeHamburgerMenu();

document.addEventListener('DOMContentLoaded', () => {
    const filmId = new URLSearchParams(window.location.search).get('id');

    if (!filmId) {
        document.getElementById('film-details').innerHTML = '<p>Error: No film ID provided.</p>';
        return;
    }

    fetch('../json/films.json')
        .then(response => response.json())
        .then(films => {
            const film = films.find(f => f.id == filmId);

            if (film) {

                updateMetaTagsForFilms(film.title, film.description);

                document.getElementById('film-details').innerHTML = `
                    <img src="../${film.image}" alt="${film.title}">
                    <h2>${film.title}</h2>
                    <p><strong>English title:</strong> ${film.englishtitle ? ` ${film.englishtitle}` : ''}</p>
                    <p><strong>Year:</strong> ${film.year}</p>
                    <p><strong>Director:</strong> ${film.director.join(', ')}</p>
                    ${film.stars && film.stars.length > 2 ? `<p><strong>Stars:</strong> ${film.stars.join(', ')}</p>` : ''}
                    <p>${film.description}</p>
                    <p><strong>Genre:</strong> ${film.genre}</p>
                    <p><strong>Format:</strong> ${film.format}</p>
                    <a href="${film.IMDB}" target="_blank">View on IMDB</a>
                `;
            } else {
                document.getElementById('film-details').innerHTML = '<p>Film not found.</p>';
            }
        })
        .catch(error => {
            console.error('Error loading film details:', error);
            document.getElementById('film-details').innerHTML = '<p>Error loading film details.</p>';
        });
});

function updateMetaTagsForFilms(title, description) {
    document.title = `NorWave - ${title}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        const cleanDescription = stripHtmlTags(description);
        metaDescription.setAttribute('content', `${title} - ${truncateText(cleanDescription, 150)}`);
    }
}

function truncateText(text, maxLength) {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}

function stripHtmlTags(input) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = input;
    return tempDiv.textContent || tempDiv.innerText || '';
}