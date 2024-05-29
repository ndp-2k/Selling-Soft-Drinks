document.addEventListener('DOMContentLoaded', () => {

    const home = document.querySelector('#home');
    // Bắt sự kiện click vào nút "Đăng xuất"
    home.addEventListener('click', function () {
        window.location.href = 'product.html';
    });

});