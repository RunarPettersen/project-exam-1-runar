export function addShareButton(postTitle) {
    // Create and append the share button with an icon
    const shareButton = document.createElement('button');
    shareButton.id = 'share-button';
    shareButton.innerHTML = `<i class="fas fa-share"></i> Share this article`; // Add the icon using Font Awesome
    document.querySelector('#post-details article').appendChild(shareButton);

    // Add event listener for the share button
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
            // Fallback: Copy the link to the clipboard
            navigator.clipboard.writeText(window.location.href)
                .then(() => alert('Link copied to clipboard'))
                .catch(err => console.error('Error copying link to clipboard:', err));
        }
    });
}