document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

 
    if (username === 'admin' && password === 'admin@12345') {

        window.location.href = 'detail.html'; 
    } else {
        alert("Incorrect details, please try again."); 
    }
});



