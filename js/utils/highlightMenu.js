document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul.menu a, .mobile-nav-links a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;

        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});