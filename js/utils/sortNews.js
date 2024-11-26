export function sortNews(posts, criterion) {
    return posts.slice().sort((a, b) => {
        switch (criterion) {
            case 'dateAdded':
                return new Date(b.created) - new Date(a.created);
            case 'dateAddedOldest':
                return new Date(a.created) - new Date(b.created);
            case 'alphabetical':
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });
}