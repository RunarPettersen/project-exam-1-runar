const apiKey = '3caf52e3-39b2-4bb2-9358-1c9a715d1322';
const loginApiUrl = 'https://v2.api.noroff.dev/auth/login';
const registerApiUrl = 'https://v2.api.noroff.dev/auth/register';

// Check if user is already logged in
function redirectIfLoggedIn() {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    if (token) {
        // Redirect to user account page if token exists
        window.location.href = './user.html';
    }
}

// Run the redirect check when the script loads
redirectIfLoggedIn();

async function loginUser(email, password) {
    try {
        const response = await fetch(loginApiUrl, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data); // Log the full response

            // Extract and store the accessToken and user's name from the response
            if (data.data && data.data.accessToken) {
                const token = data.data.accessToken;
                localStorage.setItem('authToken', token); // Store the token in localStorage

                // Store the user's name if available in the response
                if (data.data.name) {
                    localStorage.setItem('userName', data.data.name);
                    console.log('User name stored successfully:', data.data.name);
                }

                window.location.href = '../admin/index.html'; // Redirect to admin blog page
            } else {
                console.error('No accessToken found in the login response');
                alert('Login failed: No token returned.');
            }
        } else {
            const errorResponse = await response.json();
            console.error('Login failed:', response.status, errorResponse.errors);
            alert('Invalid credentials. Please try again.');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Something went wrong. Please try again later.');
    }
}

// Register Function
async function registerUser(name, email, password, bio, avatarUrl, avatarAlt, bannerUrl, bannerAlt, venueManager) {
    // Validation for name (must not contain punctuation symbols apart from underscore)
    if (/[^a-zA-Z0-9_]/.test(name)) {
        alert("Name must not contain punctuation symbols apart from underscores.");
        return;
    }

    // Validation for email (must be @stud.noroff.no)
    if (!email.endsWith("@stud.noroff.no")) {
        alert("Email must be a valid stud.noroff.no email address.");
        return;
    }

    // Validation for password (minimum 8 characters)
    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }

    // Validate bio length (if provided, must be less than 160 characters)
    if (bio && bio.length > 160) {
        alert("Bio must be less than 160 characters.");
        return;
    }

    // Validate avatar and banner (if provided, alt text must be less than 120 characters)
    if (avatarUrl && avatarAlt.length > 120) {
        alert("Avatar alt text must be less than 120 characters.");
        return;
    }
    if (bannerUrl && bannerAlt.length > 120) {
        alert("Banner alt text must be less than 120 characters.");
        return;
    }

    // Construct the user data
    const userData = {
        name,
        email,
        password,
        bio: bio || "", // Optional bio
        venueManager: venueManager || false // Optional venueManager
    };

    // Only include avatar if URL is provided
    if (avatarUrl) {
        userData.avatar = {
            url: avatarUrl,
            alt: avatarAlt || "" // Optional alt
        };
    }

    // Only include banner if URL is provided
    if (bannerUrl) {
        userData.banner = {
            url: bannerUrl,
            alt: bannerAlt || "" // Optional alt
        };
    }

    try {
        const response = await fetch(registerApiUrl, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json(); // Parse the response

        if (response.ok) {
            console.log('Registration successful:', data);
            alert('Registration successful! Please log in.');
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            // Log the detailed error messages from the server response
            console.error('Registration failed:', data.errors);
            alert(`Registration failed: ${data.errors.map(err => err.message).join(', ')}`);
        }
    } catch (error) {
        console.error('Error registering:', error);
        alert('Something went wrong. Please try again later.');
    }
}

// Handle login form submission
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        loginUser(email, password);
    });
}

// Handle registration form submission
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const bio = document.getElementById('bio').value;
        const avatarUrl = document.getElementById('avatar-url').value;
        const avatarAlt = document.getElementById('avatar-alt').value;
        const bannerUrl = document.getElementById('banner-url').value;
        const bannerAlt = document.getElementById('banner-alt').value;
        const venueManager = document.getElementById('venueManager').checked;

        registerUser(name, email, password, bio, avatarUrl, avatarAlt, bannerUrl, bannerAlt, venueManager);
    });
}