document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    // Here you need to check if the phone and password match the stored data
    const userData = JSON.parse(localStorage.getItem(phone));
    if (userData && userData.password === password) {
        window.location.href = 'product.html';
    } else {
        alert('Số điện thoại hoặc mật khẩu không đúng!');
    }
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const phone = document.getElementById('reg-phone').value;
    const password = document.getElementById('reg-password').value;

    if (localStorage.getItem(phone)) {
        alert('Số điện thoại đã tồn tại!');
    } else {
        localStorage.setItem(phone, JSON.stringify({ password: password }));
        alert('Đăng ký thành công!');
        toggleForm();
    }
});

document.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'toggleFormLink') {
        event.preventDefault();
        toggleForm();
    }
});

function toggleForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const formTitle = document.getElementById('form-title');
    const submitButton = document.getElementById('submitButton');
    const registerButton = document.getElementById('registerButton');
    const toggleFormText = document.getElementById('toggleFormText');
    const rememberMeSection = document.getElementById('rememberMeSection');

    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        formTitle.textContent = 'Đăng nhập';
        submitButton.style.display = 'block';
        registerButton.style.display = 'none';
        toggleFormText.innerHTML = 'Chưa có tài khoản? <a href="#" class="text-primary" id="toggleFormLink">Đăng ký</a>';
        rememberMeSection.style.display = 'block';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        formTitle.textContent = 'Đăng ký';
        submitButton.style.display = 'none';
        registerButton.style.display = 'block';
        toggleFormText.innerHTML = 'Đã có tài khoản? <a href="#" class="text-primary" id="toggleFormLink">Đăng nhập</a>';
        rememberMeSection.style.display = 'none';
    }
}
