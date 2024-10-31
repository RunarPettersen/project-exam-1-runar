// API endpoint for user info
const userApiUrl = 'https://v2.api.noroff.dev/auth/me';  // Update this URL to the actual user info endpoint

// Fetch the token from localStorage
const getAccessToken = () => localStorage.getItem('authToken');

// Check if the user is logged in
const checkLoginStatus = () => {
    const token = getAccessToken();
    if (!token) {
        window.location.href = 'login.html'; // Redirect to login if not logged in
        return false;
    }
    return true;
};

// Fetch user account details
const fetchUserDetails = async () => {
    const token = getAccessToken();
    if (!token) return;

    try {
        const response = await fetch(userApiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            displayUserDetails(data);
        } else {
            console.error('Failed to fetch user details:', response.status);
            alert('Failed to load user details.');
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
};

// Display user details on the page
const displayUserDetails = (user) => {
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-email').textContent = user.email;
    document.getElementById('user-bio').textContent = user.bio || 'No bio available.';
    if (user.avatar && user.avatar.url) {
        document.getElementById('user-avatar').src = user.avatar.url;
        document.getElementById('user-avatar').alt = user.avatar.alt || 'User avatar';
    }
};

// Logout function
const logoutUser = () => {
    localStorage.removeItem('authToken');  // Remove the token from localStorage
    window.location.href = 'login.html';   // Redirect to login page
};

// Add event listener to the logout button
document.getElementById('logout-btn').addEventListener('click', logoutUser);

// Check login status and fetch user details when page loads
if (checkLoginStatus()) {
    fetchUserDetails();
}