export function sortFilms(films, criterion) {
    return films.slice().sort((a, b) => {
        switch (criterion) {
            case 'dateAddedNewest':
                return new Date(b.date) - new Date(a.date);
            case 'dateAddedOldest':
                return new Date(a.date) - new Date(b.date);
            case 'year':
                return parseInt(b.year) - parseInt(a.year);
            case 'yearOldest':
                return parseInt(a.year) - parseInt(b.year);
            case 'alphabetical':
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });
}