document.addEventListener('DOMContentLoaded', () => {
    fetch('json/films.json')
        .then(response => response.json())
        .then(films => {
            const filmscrollerInner = document.getElementById('filmscroller-inner');
            const latestFilms = films.slice(-12).reverse();

            latestFilms.forEach(film => {
                const filmItem = document.createElement('div');
                filmItem.classList.add('filmscroller-item');
                filmItem.innerHTML = `
                    <a href="./films/view.html?id=${film.id}">
                    <img src="${film.image}" alt="${film.title}">
                    <h3>${film.title}${film.englishtitle ? ` (${film.englishtitle})` : ''}</h3></a>
                    <p><strong>Year:</strong> ${film.year}</p>
                `;
                filmscrollerInner.appendChild(filmItem);
            });

            initializeFilmScroller();
        })
        .catch(error => {
            console.error('Error loading films:', error);
        });
});

function initializeFilmScroller() {
    let currentPosition = 0;
    const filmscrollerInner = document.getElementById('filmscroller-inner');
    const filmItems = document.querySelectorAll('.filmscroller-item');
    const itemWidth = filmItems[0].offsetWidth;
    const maxPosition = (filmItems.length - 5) * itemWidth;

    document.getElementById('filmscroller-next').addEventListener('click', () => {
        if (currentPosition < maxPosition) {
            currentPosition += itemWidth;
            filmscrollerInner.style.transform = `translateX(-${currentPosition}px)`;
        }
    });

    document.getElementById('filmscroller-prev').addEventListener('click', () => {
        if (currentPosition > 0) {
            currentPosition -= itemWidth;
            filmscrollerInner.style.transform = `translateX(-${currentPosition}px)`;
        }
    });
}