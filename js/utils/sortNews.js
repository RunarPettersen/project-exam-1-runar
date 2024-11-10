export function sortNews(posts, criterion) {
    return posts.slice().sort((a, b) => {
        switch (criterion) {
            case 'dateAdded':
                return new Date(b.created) - new Date(a.created); // Sort by date added (newest first)
            case 'dateAddedOldest':
                return new Date(a.created) - new Date(b.created); // Sort by date added (oldest first)
            case 'alphabetical':
                return a.title.localeCompare(b.title); // Alphabetical sort by title
            default:
                return 0;
        }
    });
}