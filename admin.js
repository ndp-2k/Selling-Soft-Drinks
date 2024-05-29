document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('product-list');

    // Function to format currency
    function formatCurrency(price) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }

    // Load products from local storage or use an empty array if not present
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Function to render products
    function renderProducts() {
        productList.innerHTML = ''; // Clear existing products

        products.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.classList.add('card', 'product-card');
            productCard.setAttribute('id', product.id); // Assign index as the id
            productCard.innerHTML = `
                <img src="${product.image}" class="card-img-top" alt="Product Image">
                <div class="card-body text-center">
                    <h5 class="card-title product-name">${product.name}</h5>
                    <p class="card-text product-price">${formatCurrency(product.price)}</p>
                    <p class="card-text product-category">Loại: ${product.category}</p>
                    <p class="card-text product-details">${product.details}</p>
                    <button class="btn btn-primary edit-product" data-id="${product.id}">Sửa</button>
                    <button class="btn btn-danger delete-product" data-id="${product.id}">Xóa</button>
                </div>
            `;
            productList.appendChild(productCard);
        });
    }
    // Initial rendering of products
    renderProducts();

    // Function to add a product
    function addProduct(name, price, image, category, details) {
        const newProduct = {
            id: products.length, // Assign unique id
            name: name,
            price: price,
            image: image,
            category: category,
            details: details
        };
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
    }

    // Function to delete a product
    function deleteProduct(id) {
        products = products.filter(product => product.id !== id);
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
    }

    // Event listener for form submission to add a new product
    const addProductForm = document.getElementById('addProductForm');
    addProductForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const productName = document.getElementById('productName').value;
        const productPrice = parseFloat(document.getElementById('productPrice').value);
        const productImage = document.getElementById('productImage').value;
        const productCategory = document.getElementById('productCategory').value;
        const productDetails = document.getElementById('productDetails').value;
        addProduct(productName, productPrice, productImage, productCategory, productDetails);
        $('#addProductModal').modal('hide'); // Hide the modal after adding the product
    });

    // Event listener for product edit and delete buttons
    productList.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('edit-product')) {
            const productId = parseInt(target.getAttribute('data-id'));
            showEditProductModal(productId);
        } else if (target.classList.contains('delete-product')) {
            const productId = parseInt(target.getAttribute('data-id'));
            deleteProduct(productId);
        }
    });

    // Function to show edit product modal with product details filled in
    function showEditProductModal(productId) {
        const productToEdit = products.find(product => product.id === productId);
        if (productToEdit) {
            const editProductForm = document.getElementById('editProductForm');
            editProductForm.reset(); // Reset form fields

            // Fill in product details in the form fields
            editProductForm.setAttribute('data-id', productId);
            document.getElementById('editProductName').value = productToEdit.name;
            document.getElementById('editProductPrice').value = productToEdit.price;
            document.getElementById('editProductImage').value = productToEdit.image;
            document.getElementById('editProductCategory').value = productToEdit.category;
            document.getElementById('editProductDetails').value = productToEdit.details;

            $('#editProductModal').modal('show'); // Show the modal
        } else {
            console.error('Product not found');
        }
    }

    // Event listener for form submission to edit a product
    const editProductForm = document.getElementById('editProductForm');
    editProductForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Get the id of the product being edited from the modal's data-id attribute
        const productId = parseInt(editProductForm.getAttribute('data-id'));
        // Update the product details with the values from the form fields
        const editedProduct = products.find(product => product.id === productId);
        if (editedProduct) {
            editedProduct.name = document.getElementById('editProductName').value;
            editedProduct.price = parseFloat(document.getElementById('editProductPrice').value);
            editedProduct.image = document.getElementById('editProductImage').value;
            editedProduct.category = document.getElementById('editProductCategory').value;
            editedProduct.details = document.getElementById('editProductDetails').value;
            // Update localStorage and re-render the product list
            localStorage.setItem('products', JSON.stringify(products));
            renderProducts();
            // Hide the modal after editing the product

            $('#editProductModal').modal('hide');
        } else {
            console.error('Product not found');
        }
    });
});
