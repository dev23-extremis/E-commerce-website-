let products = JSON.parse(localStorage.getItem('products')) || [];

function renderProductList() {
    const productTable = document.getElementById('productTable');
    productTable.innerHTML = '';  // Clear the table

    products.forEach((product, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td><img src="${product.image}" alt="Product Image" width="50" height="50"></td>
            <td>₹ ${product.price}</td>
            <td>${product.status}</td>
            <td>
                <button class="btn btn-info" onclick="viewProduct(${index})">View</button>
                <button class="btn btn-primary" onclick="editProduct(${index})">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;
        productTable.appendChild(row);
    });
}

// Add product to the list
document.getElementById('addProductForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').files[0];

    if (!productImage) {
        alert("Please upload an image.");
        return;
    }

    const imageURL = URL.createObjectURL(productImage); // Generate a temporary URL for the image

    const newProduct = {
        id: products.length + 1,
        name: productName,
        description: productDescription,
        price: productPrice,
        image: imageURL,
        status: 'Available'
    };

    // Add new product to the products array
    products.push(newProduct);

    // Save the updated products list in localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Re-render the product list
    renderProductList();

    // Clear the form
    document.getElementById('addProductForm').reset();
});

// Edit product details
function editProduct(index) {
    const product = products[index];

    // Populate the form with the existing product data
    document.getElementById('productName').value = product.name;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productPrice').value = product.price;

    // You could add functionality here to allow editing the image
}

// Delete product from the list
function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this product?')) {
        products.splice(index, 1); // Remove the product from the array
        localStorage.setItem('products', JSON.stringify(products)); // Update localStorage
        renderProductList(); // Re-render the product list
    }
}

// View product details (optional functionality)
function viewProduct(index) {
    const product = products[index];
    alert(`Viewing product: ${product.name}\nDescription: ${product.description}\nPrice: ₹ ${product.price}`);
}

// Render the product list when the page loads
renderProductList();

