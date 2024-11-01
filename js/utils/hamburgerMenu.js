export function initializeHamburgerMenu() {
    document.addEventListener('DOMContentLoaded', () => {
        const hamburger = document.getElementById('hamburger');
        const menu = document.querySelector('nav ul.menu');

        if (hamburger && menu) {
            hamburger.addEventListener('click', () => {
                menu.classList.toggle('active');
            });
        } else {
            console.warn('Hamburger menu or navigation menu not found.');
        }
    });
}