import { registerUser } from './register.js';

const loginApiUrl = 'https://v2.api.noroff.dev/auth/login';

function redirectIfLoggedIn() {
    const token = localStorage.getItem('authToken');
    if (token) {
        window.location.href = './user.html';
    }
}
redirectIfLoggedIn();

async function loginUser(email, password) {
    try {
        const response = await fetch(loginApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            if (data.data && data.data.accessToken) {
                localStorage.setItem('authToken', data.data.accessToken);

                if (data.data.name) {
                    localStorage.setItem('userName', data.data.name);
                }

                window.location.href = '../admin/index.html';
            } else {
                alert('Login failed: No token returned.');
            }
        } else {
            const errorResponse = await response.json();
            alert(`Invalid credentials: ${errorResponse.errors.map(err => err.message).join(', ')}`);
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Something went wrong. Please try again later.');
    }
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        loginUser(email, password);
    });
}

const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        registerUser(name, email, password);
    });
}