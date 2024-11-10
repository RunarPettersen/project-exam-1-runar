const loginPageUrl = 'login.html'; // Redirect URL for login

// Check if user is logged in and redirect if not
const redirectToLoginIfLoggedOut = () => {
    if (!localStorage.getItem('authToken')) {
        window.location.href = loginPageUrl;
    }
};

// Display user’s name from `localStorage`
const displayUserName = () => {
    const userName = localStorage.getItem('userName') || 'User';
    document.getElementById('user-name').textContent = userName;
};

// Logout function
const logoutUser = () => {
    localStorage.removeItem('authToken');  // Clear the auth token
    localStorage.removeItem('userName');   // Clear the stored user name
    window.location.href = loginPageUrl;   // Redirect to login
};

document.addEventListener('DOMContentLoaded', () => {
    redirectToLoginIfLoggedOut();  // Ensure the user is logged in
    displayUserName();             // Display the stored user name
    document.getElementById('logout-btn').addEventListener('click', logoutUser); // Handle logout
});