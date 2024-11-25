export function initializeHamburgerMenu() {
    document.addEventListener('DOMContentLoaded', () => {
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const closeMenuButton = document.getElementById('closeMenu');

        if (menuToggle && mobileMenu && closeMenuButton) {
            menuToggle.addEventListener('click', () => {
                const checkbox = menuToggle.querySelector('input[type="checkbox"]');
                if (checkbox.checked) {
                    mobileMenu.classList.add('active');
                } else {
                    mobileMenu.classList.remove('active');
                }
            });

            closeMenuButton.addEventListener('click', () => {
                const checkbox = menuToggle.querySelector('input[type="checkbox"]');
                checkbox.checked = false;
                mobileMenu.classList.remove('active');
            });

            const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-links a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    const checkbox = menuToggle.querySelector('input[type="checkbox"]');
                    checkbox.checked = false;
                    mobileMenu.classList.remove('active');
                });
            });
        } else {
            console.warn('Menu toggle, mobile menu, or close button not found.');
        }
    });
}