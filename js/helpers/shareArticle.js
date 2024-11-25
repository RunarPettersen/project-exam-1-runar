export function addShareButton(postTitle) {
    const shareButton = document.createElement('button');
    shareButton.id = 'share-button';
    shareButton.innerHTML = `<i class="fas fa-share"></i> Share this article`;
    document.querySelector('#post-details article').appendChild(shareButton);

    shareButton.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: postTitle,
                text: `Check out this article: ${postTitle}`,
                url: window.location.href
            })
            .then(() => console.log('Article shared successfully'))
            .catch(err => console.error('Error sharing the article:', err));
        } else {
            navigator.clipboard.writeText(window.location.href)
                .then(() => alert('Link copied to clipboard'))
                .catch(err => console.error('Error copying link to clipboard:', err));
        }
    });
}