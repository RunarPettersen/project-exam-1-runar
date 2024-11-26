const loginPageUrl = 'login.html';

const redirectToLoginIfLoggedOut = () => {
    if (!localStorage.getItem('authToken')) {
        window.location.href = loginPageUrl;
    }
};

const displayUserName = () => {
    const userName = localStorage.getItem('userName') || 'User';
    document.getElementById('user-name').textContent = userName;
};

const logoutUser = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    window.location.href = loginPageUrl;
};

document.addEventListener('DOMContentLoaded', () => {
    redirectToLoginIfLoggedOut();
    displayUserName();
    document.getElementById('logout-btn').addEventListener('click', logoutUser);
});