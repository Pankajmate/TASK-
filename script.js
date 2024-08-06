
function saveUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
}

function getUser(username) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    return users[username];
}

function setCurrentUser(username) {
    localStorage.setItem('currentUser', username);
}

function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

function clearCurrentUser() {
    localStorage.removeItem('currentUser');
}

// Register functionality
document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();

    if (getUser(username)) {
        alert('Username already exists!');
    } else {
        saveUser(username, password);
        alert('Registration successful!');
        window.location.href = 'login.html';
    }
});

// Login functionality
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    const savedPassword = getUser(username);
    if (savedPassword && savedPassword === password) {
        setCurrentUser(username);
        window.location.href = 'secured.html';
    } else {
        alert('Invalid credentials!');
    }
});

// Secured page functionality
document.addEventListener('DOMContentLoaded', () => {
    const username = getCurrentUser();
    if (username) {
        document.getElementById('username').textContent = username;
    } else if (document.location.pathname.endsWith('secured.html')) {
        alert('You need to login first!');
        window.location.href = 'login.html';
    }

    document.getElementById('logout-button')?.addEventListener('click', () => {
        clearCurrentUser();
        alert('Logged out successfully!');
        window.location.href = 'index.html';
    });
});
