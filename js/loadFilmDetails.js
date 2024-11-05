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
                document.getElementById('film-details').innerHTML = `
                    <img src="../${film.image}" alt="${film.title}">
                    <h2>${film.title}${film.englishtitle ? ` (${film.englishtitle})` : ''}</h2>
                    <p><strong>Year:</strong> ${film.year}</p>
                    <p><strong>Director:</strong> ${film.director}</p>
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