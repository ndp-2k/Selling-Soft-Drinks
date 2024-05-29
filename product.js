function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize an empty cart
    let cart = [];
    // Lấy tham chiếu đến nút "Đăng xuất"
    const logoutButton = document.querySelector('#logout');

    // Bắt sự kiện click vào nút "Đăng xuất"
    logoutButton.addEventListener('click', function () {
        // Xóa thông tin người dùng đã đăng nhập khỏi Local Storage
        localStorage.removeItem('logged');
        // Chuyển hướng về trang index
        window.location.href = 'index.html';
    });
    // Lấy tham chiếu đến nút "Đăng xuất"
    const manager = document.querySelector('#adminPanel');

    // Bắt sự kiện click vào nút "Đăng xuất"
    manager.addEventListener('click', function () {
        window.location.href = 'admin.html';
    });

    // Get elements
    const cartContainer = document.querySelector('.cart-container');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const clearCartBtn = document.querySelector('.clear-cart');
    const checkoutBtn = document.querySelector('.checkout');
    const sortOption = document.getElementById('sort-option');
    const paymentFormModal = document.getElementById('paymentFormModal');
    const paymentForm = document.getElementById('payment-form');

    // Function to add product to cart
    function addToCart(product) {
        const existingProduct = cart.find(item => item.name === product.name && item.size === product.size);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }
        updateCartDisplay();
    }

    // Function to update the cart display
    function updateCartDisplay() {
        // Clear the current cart items display
        cartItems.innerHTML = '';
        // Update cart items
        cart.forEach(product => {
            const item = document.createElement('div');
            item.classList.add('cart-item');
            item.innerHTML = `
                <span>${product.name} (${product.size})</span>
                <span>${product.quantity} x ${formatCurrency(product.price)}</span>
                <span>${formatCurrency(product.quantity * product.price.replace(/[^0-9]/g, ""))}</span>
                <button class="remove-item" data-product-name="${product.name}" data-product-size="${product.size}">X</button>
            `;
            cartItems.appendChild(item);
        });

        // Update total price
        const totalPrice = cart.reduce((total, product) => total + product.price.replace(/[^0-9]/g, "") * product.quantity, 0);
        cartTotal.textContent = formatCurrency(totalPrice);

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const productName = e.target.getAttribute('data-product-name');
                const productSize = e.target.getAttribute('data-product-size');
                removeFromCart(productName, productSize);
            });
        });
    }

    // Function to remove product from cart
    function removeFromCart(productName, productSize) {
        cart = cart.filter(product => product.name !== productName || product.size !== productSize);
        updateCartDisplay();
    }

    // Function to clear the cart
    clearCartBtn.addEventListener('click', () => {
        cart = [];
        updateCartDisplay();
    });

    // Function to handle checkout (display form)
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            // Lấy số điện thoại từ localStorage và điền vào form
            const customerPhone = localStorage.getItem('customerPhone');
            if (customerPhone) {
                document.getElementById('customer-phone').value = customerPhone;
            }
            $('#paymentFormModal').modal('show');
        } else {
            alert('Hãy thêm vào giỏ hàng');
        }
    });

    // Handle form submission
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const customerName = document.getElementById('customer-name').value;
        const customerPhone = document.getElementById('customer-phone').value;
        const customerAddress = document.getElementById('customer-address').value;
        const customerNote = document.getElementById('customer-note').value;

        // Lưu số điện thoại vào localStorage
        localStorage.setItem('customerPhone', customerPhone);

        // Handle the payment logic here (e.g., send data to server)
        console.log('Customer Name:', customerName);
        console.log('Customer Phone:', customerPhone);
        console.log('Customer Address:', customerAddress);
        console.log('Customer Note:', customerNote);
        console.log('Cart Items:', cart);

        // Clear the cart after successful checkout
        cart = [];
        updateCartDisplay();

        // Hide the modal
        $('#paymentFormModal').modal('hide');

        alert('Thank you for your purchase!');
    });

    // Load default products from Local Storage
    let defaultProducts = JSON.parse(localStorage.getItem('products'));

    // Check if there are default products in Local Storage
    if (defaultProducts && defaultProducts.length > 0) {
        // Display default products
        displayProducts(defaultProducts);
    } else {
        console.log("Không tìm thấy sản phẩm mặc định trong Local Storage.");
        defaultProducts = [
            {
                id: 0,
                name: "Trà sữa trân trâu đường đen",
                price: 6996,
                image: "https://cdn.24h.com.vn/upload/3-2021/images/2021-08-24/ky-duyen--1--1629811319-907-width650height812.jpg",
                category: "Trà sữa",
                details: "ngọt nước"
            },
            {
                id: 1,
                name: "Trà thái bí đỏ",
                price: 123,
                image: "https://cdn.24h.com.vn/upload/3-2021/images/2021-08-24/ky-duyen--1--1629811319-907-width650height812.jpg",
                category: "Trà thái",
                details: "ngọt nước"
            },
            {
                id: 3,
                name: "Kem dừa",
                price: 3214,
                image: "https://cdn.24h.com.vn/upload/3-2021/images/2021-08-24/ky-duyen--1--1629811319-907-width650height812.jpg",
                category: "Kem",
                details: "ngọt nước"
            },
            {
                id: 3,
                name: "Sinh tố bơ",
                price: 56456,
                image: "https://cdn.24h.com.vn/upload/3-2021/images/2021-08-24/ky-duyen--1--1629811319-907-width650height812.jpg",
                category: "Sinh tố",
                details: "ngọt nước"
            },
            {
                id: 4,
                name: "Xoài",
                price: 12321,
                image: "https://cdn.24h.com.vn/upload/3-2021/images/2021-08-24/ky-duyen--1--1629811319-907-width650height812.jpg",
                category: "Hoa quả",
                details: "ngọt nước"
            },
        ];
        // Set the default products in Local Storage
        localStorage.setItem('products', JSON.stringify(defaultProducts));
        // Display default products
        displayProducts(defaultProducts);
    }

    // Function to display products
    function displayProducts(products) {
        const productListContainer = document.getElementById('product-list');

        // Tạo phần tử div chứa sản phẩm
        const productsContainer = document.createElement('div');
        productsContainer.classList.add('row');

        // Xác định lớp cho container sản phẩm dựa trên số lượng sản phẩm
        if (products.length <= 1) {
            productsContainer.classList.add('col-md-12');
        } else {
            productsContainer.classList.add('col-md-12');
        }

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('col-md-6', 'mb-4');
            productCard.innerHTML = `
            <div class="card product-card">
            <img src="${product.image}" class="card-img-top" alt="Product Image">
            
            <div class="card-body text-center">
            <h5 class="card-title product-name">${product.name}</h5>
            <h5 style="display: none;" class=" product-id">${product.id}</h5>
                <p class="card-text product-price">${formatCurrency(product.price)}</p>
                <div class="row">
                    <div class="col-md-12">
                        <select class="form-select product-size">
                            <option value="M">Size M</option>
                            <option value="L">Size L</option>
                        </select>
                    </div>
                </div>
                <button class="btn btn-primary add-to-cart" style="width: 150px;">Thêm vào giỏ</button>
    
                <button class="btn btn-primary btn-details" style="width: 80px;">Chi tiết</button>
            </div>
        </div>
                    `;
            productsContainer.appendChild(productCard);
        });

        // Clear previous content and append new products
        productListContainer.innerHTML = '';
        productListContainer.appendChild(productsContainer);

        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const productPriceElement = productCard.querySelector('.product-price');
                const productName = productCard.querySelector('.product-name').textContent;
                const productSize = productCard.querySelector('.product-size').value;
                const productPrice = productPriceElement.textContent.replace(/₫|,/g, '').trim();
                const product = {
                    name: productName,
                    price: productPrice,
                    size: productSize,
                    quantity: 1
                };
                addToCart(product);
            });
        });

        // Add event listeners to "Details" buttons
        document.querySelectorAll('.btn-details').forEach(button => {
            button.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const productId= productCard.querySelector('.product-id').textContent;
                // Tại đây, bạn có thể lấy thông tin sản phẩm để chuyển hướng sang trang chi tiết sản phẩm
                window.location.href = `product_detail.html?product=${encodeURIComponent(productId)}`;
            });
        });
    }


    // Lắng nghe sự kiện khi chọn một mục trong danh mục
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const selectedCategory = e.target.textContent;
            const filteredProducts = defaultProducts.filter(product => product.category === selectedCategory);
            displayProducts(filteredProducts);
        });
    });


    sortOption.addEventListener('change', () => {
        const sortValue = sortOption.value;
        const sortedProducts = sortProducts(sortValue);
        displayProducts(sortedProducts);
    });

    function sortProducts(sortValue) {
        switch (sortValue) {
            case 'price-asc':
                return defaultProducts.slice().sort((a, b) => a.price - b.price);
            case 'price-desc':
                return defaultProducts.slice().sort((a, b) => b.price - a.price);
            case 'name-asc':
                return defaultProducts.slice().sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return defaultProducts.slice().sort((a, b) => b.name.localeCompare(a.name));
            default:
                return defaultProducts;
        }
    }

    // Lấy tham chiếu đến nút tìm kiếm
    const searchButton = document.getElementById('searchBtn');

    // Bắt sự kiện click vào nút tìm kiếm
    searchButton.addEventListener('click', function () {
        // Lấy giá trị từ ô nhập tìm kiếm
        const searchQuery = document.querySelector('.form-control').value.toLowerCase();

        // Lọc sản phẩm dựa trên từ khóa tìm kiếm
        const filteredProducts = defaultProducts.filter(product => {
            return product.name.toLowerCase().includes(searchQuery) || product.details.toLowerCase().includes(searchQuery);
        });

        // Hiển thị sản phẩm đã lọc
        displayProducts(filteredProducts);
    });
});
