document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul.menu a, .mobile-nav-links a'); // Select all nav links (desktop and mobile)
    const currentPath = window.location.pathname; // Get the current path of the page

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname; // Extract the path from the link's href

        if (linkPath === currentPath) {
            link.classList.add('active'); // Add the "active" class to the matching link
        } else {
            link.classList.remove('active'); // Remove the "active" class if it's not a match
        }
    });
});