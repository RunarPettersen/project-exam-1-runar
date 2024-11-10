export function sortFilms(films, criterion) {
    return films.slice().sort((a, b) => {
        switch (criterion) {
            case 'dateAdded':
                return new Date(b.date) - new Date(a.date); // Sort by date added (newest first)
            case 'year':
                return parseInt(b.year) - parseInt(a.year); // Sort by year (newest first)
            case 'yearOldest':
                return parseInt(a.year) - parseInt(b.year); // Sort by year (oldest first)
            case 'alphabetical':
                return a.title.localeCompare(b.title); // Sort alphabetically by title
            default:
                return 0;
        }
    });
}