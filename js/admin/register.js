const registerApiUrl = 'https://v2.api.noroff.dev/auth/register';

export async function registerUser(name, email, password) {
    if (/[^a-zA-Z0-9_]/.test(name)) {
        alert("Name must not contain punctuation symbols apart from underscores.");
        return;
    }

    if (!email.endsWith("@stud.noroff.no")) {
        alert("Email must be a valid stud.noroff.no email address.");
        return;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }

    const userData = { name, email, password };

    try {
        const response = await fetch(registerApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            alert('Registration successful! Please log in.');
            window.location.href = 'login.html';
        } else {
            const data = await response.json();
            alert(`Registration failed: ${data.errors.map(err => err.message).join(', ')}`);
        }
    } catch (error) {
        console.error('Error registering:', error);
        alert('Something went wrong. Please try again later.');
    }
}