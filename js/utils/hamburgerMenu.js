export function initializeHamburgerMenu() {
    document.addEventListener('DOMContentLoaded', () => {
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const closeMenuButton = document.getElementById('closeMenu');

        if (menuToggle && mobileMenu && closeMenuButton) {
            // Toggle mobile menu on hamburger click
            menuToggle.addEventListener('click', () => {
                const checkbox = menuToggle.querySelector('input[type="checkbox"]');
                if (checkbox.checked) {
                    mobileMenu.classList.add('active');
                } else {
                    mobileMenu.classList.remove('active');
                }
            });

            // Close mobile menu on close button click
            closeMenuButton.addEventListener('click', () => {
                const checkbox = menuToggle.querySelector('input[type="checkbox"]');
                checkbox.checked = false; // Uncheck the checkbox
                mobileMenu.classList.remove('active');
            });

            // Close mobile menu on link click (for accessibility)
            const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-links a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    const checkbox = menuToggle.querySelector('input[type="checkbox"]');
                    checkbox.checked = false; // Uncheck the checkbox
                    mobileMenu.classList.remove('active');
                });
            });
        } else {
            console.warn('Menu toggle, mobile menu, or close button not found.');
        }
    });
}