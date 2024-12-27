const BASE_URL = 'http://localhost:5000';

// Handle User Registration
document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (response.status === 201) {
        alert(result.message);
        document.getElementById('registerForm').reset();
    } else {
        alert(result.message);
    }
});

// Handle User Login
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (response.status === 200) {
        alert(result.message);
        window.location.href = 'show.html';
    } else {
        // alert(result.message);
    }
});
