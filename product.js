
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize an empty cart
    let cart = [];


    // Get elements
    const cartContainer = document.querySelector('.cart-container');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const clearCartBtn = document.querySelector('.clear-cart');
    const checkoutBtn = document.querySelector('.checkout');
    const sortOption = document.getElementById('sort-option');

    // Function to add product to cart
    function addToCart(product) {
        const existingProduct = cart.find(item => item.name === product.name);
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
                <span>${product.name}</span>
                <span>${product.quantity} x ${formatCurrency(product.price)}</span>
                <span>${formatCurrency(product.quantity * product.price)}</span>
                <button class="remove-item" data-product-name="${product.name}">X</button>
            `;
            cartItems.appendChild(item);
        });

        // Update total price
        const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
        cartTotal.textContent = formatCurrency(totalPrice);

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const productName = e.target.getAttribute('data-product-name');
                removeFromCart(productName);
            });
        });
    }

    // Function to remove product from cart
    function removeFromCart(productName) {
        cart = cart.filter(product => product.name !== productName);
        updateCartDisplay();
    }

    // Function to clear the cart
    clearCartBtn.addEventListener('click', () => {
        cart = [];
        updateCartDisplay();
    });

    // Function to handle checkout (redirect to checkout page or process checkout)
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Proceeding to checkout...');
            // Redirect to checkout page or handle checkout logic
        } else {
            alert('Cart is empty!');
        }
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
                name: "Product 1",
                price: 10000,
                image: "product1.jpg",
                category: "Món Nổi Bật" // Thêm thông tin hạng mục cho mỗi sản phẩm
            },
            {
                name: "Product 2",
                price: 20000,
                image: "product2.jpg",
                category: "Instant Milk Tea"
            },
            // Thêm thông tin hạng mục cho các sản phẩm khác
        ];
        // Set the default products in Local Storage
        localStorage.setItem('products', JSON.stringify(defaultProducts));
        // Display default products
        displayProducts(defaultProducts);
    }

    // Function to display products
    function displayProducts(products) {
        const main = document.querySelector('main');
        const productListContainer = document.getElementById('product-list');

        // Tạo phần tử div chứa sản phẩm
        const productsContainer = document.createElement('div');
        productsContainer.classList.add('row');

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('col-md-6', 'mb-4');
            productCard.innerHTML = `
            <div class="card product-card">
                <img src="${product.image}" class="card-img-top" alt="Product Image">
                <div class="card-body text-center">
                    <h5 class="card-title product-name">${product.name}</h5>
                    <p class="card-text product-price">${formatCurrency(product.price)}</p>
                    <button class="btn btn-primary add-to-cart">Thêm vào giỏ</button>
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
                const productPrice = productPriceElement.textContent.replace(/₫|,/g, '').trim();
                const product = {
                    name: productName,
                    price: productPrice,
                    quantity: 1
                };
                addToCart(product);
            });
        });
    }


    // Lắng nghe sự kiện khi chọn một mục trong danh mục
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const selectedCategory = e.target.textContent; // Lấy tên của hạng mục được chọn
            const filteredProducts = defaultProducts.filter(product => product.category === selectedCategory); // Lọc danh sách sản phẩm theo hạng mục được chọn
            displayProducts(filteredProducts); // Hiển thị chỉ các sản phẩm thuộc về hạng mục được chọn
        });
    });


    // Hàm hiển thị danh sách sản phẩm đã được sắp xếp
    function displaySortedProducts(sortedProductList) {
        // Kiểm tra xem phần tử có id "product-list" đã tồn tại hay chưa
        const productListContainer = document.getElementById('product-list');
        if (!productListContainer) {
            console.error("Không tìm thấy phần tử có id 'product-list' trong DOM.");
            return; // Thoát khỏi hàm nếu phần tử không tồn tại
        }

        // Xóa tất cả các sản phẩm hiện có
        productListContainer.innerHTML = '';

        // Thêm lại các sản phẩm đã được sắp xếp
        sortedProductList.forEach(productCard => {
            productListContainer.appendChild(productCard);
        });

    }

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

});
