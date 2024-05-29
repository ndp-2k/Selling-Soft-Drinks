document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('product'));

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);

    if (product) {
        document.getElementById('productImage').src = product.image;
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productPrice').innerHTML = `<span class="label">Giá:</span> ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}`;
        document.getElementById('productDetails').innerHTML = `<span class="label">Mô tả:</span> ${product.details}`;
        document.getElementById('productCategory').innerHTML = `<span class="label">Loại:</span> ${product.category}`;
    }
});
