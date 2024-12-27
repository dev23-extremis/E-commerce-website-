let products = [];
let users = [];
let orders = [];

// Edit user functionality
let editingUserId = null;
let editingUserIndex = null;

let editingProductIndex = null; 
let editingProductId = null; 

// Function to render the product list in the table
function renderProductList() {
    const productTable = document.getElementById('productTable');
    productTable.innerHTML = ''; 

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product._id || product.id}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td><img src="${product.image}" alt="Product Image" width="50" height="50"></td>
            <td>₹ ${product.price}</td>
            <td>${product.status}</td>
            <td>
                <!-- View Button with Icon -->
                <button class="view-btn" onclick="viewProduct(${index})" title="View">
                    <i class="fas fa-eye"></i> <!-- View Icon -->
                </button>
                
                <!-- Edit Button with Icon -->
                <button class="edit-btn" onclick="editProduct(${index})" title="Edit">
                    <i class="fas fa-edit"></i> <!-- Edit Icon -->
                </button>
                
                <!-- Delete Button with Icon -->
                <button class="delete-btn" onclick="deleteProduct(${index})" title="Delete">
                    <i class="fas fa-trash-alt"></i> <!-- Delete Icon -->
                </button>
            </td>
        `;
        productTable.appendChild(row);
    });
}

// Fetch products from the server
async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:5000/products');
        products = await response.json();
        renderProductList();
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Fetch users from the server
async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:5000/users');
        users = await response.json();
        renderUserList();
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

// Function to render the user list
function renderUserList() {
    const userTable = document.getElementById('userTable');
    userTable.innerHTML = ''; 

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.password}</td>
        `;
        userTable.appendChild(row);
    });
}

// Fetch orders from the server
async function fetchOrders() {
    try {
        // Fetch orders from the server
        const response = await fetch('http://localhost:5000/orders');
        const rawOrders = await response.json();

        if (products.length === 0) {
            await fetchProducts();
        }

        orders = rawOrders.map(order => {
            const product = products.find(p => p._id === order.productId) || {}; 

            return {
                ...order,
                product, 
            };
        });

        renderOrderList(); 
    } catch (error) {
        console.error("Error fetching orders:", error);
    }
}

function renderOrderList() {
    console.log("Orders:", orders); 
    const orderTable = document.getElementById('orderTable');
    orderTable.innerHTML = ''; 

    orders.forEach((order, index) => {
        const { product } = order;

        const row = document.createElement('tr');
        row.innerHTML = `
            
            <td>${order.user || "Unknown User"}</td>
            <td>${order.address || "No Address Provided"}</td>
            <td>${order.email || "No Email"}</td>
            <td>${order.phone || "No Phone"}</td>
            <td>₹ ${product.price || "N/A"}</td>
            <td>${product.description || "No Description"}</td>
            <td><img src="${product.image || 'placeholder.jpg'}" alt="Product Image" width="50" height="50"></td>
            <td>
                <button class="delete-btn" title="Delete" onclick="deleteOrder(${index})">
                    <i class="fas fa-trash-alt"></i> <!-- Delete Icon -->
                </button>
            </td>
        `;
        orderTable.appendChild(row);
    });
}

async function deleteOrder(index) {
    const orderId = orders[index]._id; // Ensure the order has a unique ID (_id)

    if (confirm('Are you sure you want to delete this order?')) {
        try {
            const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove the order from the local `orders` array
                orders.splice(index, 1);
                renderOrderList(); // Re-render the order list
                alert("Order deleted successfully!");
            } else {
                const errorData = await response.json();
                alert(`Error deleting order: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error deleting order:", error);
            alert("Failed to delete order. Please try again.");
        }
    }


}


// Show the selected section
function showSection(section) {

    document.getElementById('productSection').style.display = 'none';
    document.getElementById('usersSection').style.display = 'none';
    document.getElementById('ordersSection').style.display = 'none';

    
    document.getElementById(section).style.display = 'block';
}


document.getElementById('productsNav').addEventListener('click', () => {
    showSection('productSection');
    fetchProducts();
});

document.getElementById('usersNav').addEventListener('click', () => {
    showSection('usersSection');
    fetchUsers();
});

document.getElementById('ordersNav').addEventListener('click', () => {
    showSection('ordersSection');
    fetchUsers(); 
    fetchProducts(); 
    fetchOrders(); 
});

// Add product to the server
document.getElementById('addProductForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').files[0];

    if (!productImage) {
        alert("Please upload an image.");
        return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('price', productPrice);
    formData.append('image', productImage);
    formData.append('status', 'Available');

    try {
        const response = await fetch('http://localhost:5000/products', {
            method: 'POST',
            body: formData, // Use form data to send the image along with the other fields
        });

        const savedProduct = await response.json();
        products.push(savedProduct);
        renderProductList();
        document.getElementById('addProductForm').reset();
    } catch (error) {
        console.error("Error adding product:", error);
    }
});

// Edit product details
function editProduct(index) {
    const product = products[index];

    
    editingProductId = product._id;
    editingProductIndex = index;

    document.getElementById('productName').value = product.name;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productPrice').value = product.price;

    toggleProductFormButtons(true);
}

// Update product details
document.getElementById('updateProductButton').addEventListener('click', async function (e) {
    e.preventDefault();

    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').files[0]; 

    if (!productName || !productDescription || !productPrice) {
        alert("All fields except image are required.");
        return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('price', productPrice);

    if (productImage) {
        formData.append('image', productImage); 
    }

    try {
        // Send PUT request to update the product
        const response = await fetch(`http://localhost:5000/products/${editingProductId}`, {
            method: 'PUT',
            body: formData,
        });

        if (response.ok) {
            const updatedProduct = await response.json();

            products[editingProductIndex] = updatedProduct;

            renderProductList();

            document.getElementById('addProductForm').reset();
            toggleProductFormButtons(false);

            alert("Product updated successfully!");
        } else {
            const errorData = await response.json();
            alert(`Error updating product: ${errorData.message}`);
        }
    } catch (error) {
        console.error("Error updating product:", error);
    }
});

// Toggle button visibility between "Add Product" and "Update Product"
function toggleProductFormButtons(isEditMode) {
    const addProductButton = document.getElementById('addProductButton');
    const updateProductButton = document.getElementById('updateProductButton');

    if (isEditMode) {
        addProductButton.style.display = 'none';
        updateProductButton.style.display = 'inline-block';
    } else {
        addProductButton.style.display = 'inline-block';
        updateProductButton.style.display = 'none';
        editingProductIndex = null; // Reset editing state
        editingProductId = null; // Reset editing ID
    }
}

// Delete product from the server
async function deleteProduct(index) {
    const productId = products[index]._id;

    if (confirm('Are you sure you want to delete this product?')) {
        try {
            await fetch(`http://localhost:5000/products/${productId}`, { method: 'DELETE' });
            products.splice(index, 1);
            renderProductList();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }
}

// View product details using a modal
function viewProduct(index) {
    const product = products[index];

    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductImage').alt = product.name;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalProductPrice').textContent = product.price;
    document.getElementById('modalProductStatus').textContent = product.status;

    const modal = document.getElementById('viewProductModal');
    modal.style.display = 'block';

    document.getElementById('closeModal').onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

function closeModal() {
    const modal = document.getElementById('viewProductModal');
    modal.style.display = 'none';
}

fetchProducts();

// Function to render the user list
function renderUserList() {
    const userTable = document.getElementById('userTable');
    userTable.innerHTML = ''; 

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.password}</td>
            <td>
                <button class="edit-btn" title="Edit" onclick="editUser(${index})">
                    <i class="fas fa-edit"></i> <!-- Edit Icon -->
                </button>
                <button class="delete-btn" title="Delete" onclick="deleteUser(${index})">
                    <i class="fas fa-trash-alt"></i> <!-- Delete Icon -->
                </button>
            </td>
        `;
        userTable.appendChild(row);
    });
}

// Add user to the server
document.getElementById('addUserForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert("Username and Password are required.");
        return;
    }

    const newUser = { username, password };

    try {
        const response = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        if (response.ok) {
            const savedUser = await response.json();
            users.push(savedUser); 
            renderUserList();
            document.getElementById('addUserForm').reset();
        } else {
            const errorData = await response.json();
            alert(errorData.message);
        }
    } catch (error) {
        console.error("Error adding user:", error);
    }
});


// Edit user details
function editUser(index) {
    const user = users[index];

    editingUserId = user._id;
    editingUserIndex = index;

    document.getElementById('username').value = user.username;
    document.getElementById('password').value = user.password;

    toggleUserFormButtons(true);
}

function toggleUserFormButtons(isEditMode) {
    const addUserButton = document.getElementById('addUserButton');
    const updateUserButton = document.getElementById('updateUserButton');

    if (isEditMode) {
        addUserButton.style.display = 'none';
        updateUserButton.style.display = 'inline-block';
    } else {
        addUserButton.style.display = 'inline-block';
        updateUserButton.style.display = 'none';
        editingUserId = null; 
        editingUserIndex = null; 
    }
}

// Update user functionality
document.getElementById('updateUserButton').addEventListener('click', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert("Username and Password are required.");
        return;
    }

    const updatedUser = { username, password };

    try {
        const response = await fetch(`http://localhost:5000/users/${editingUserId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });

        if (response.ok) {
            const savedUser = await response.json();

            users[editingUserIndex] = savedUser;

            renderUserList();

            document.getElementById('addUserForm').reset();
            toggleUserFormButtons(false);

            alert("User updated successfully!");
        } else {
            const errorData = await response.json();
            alert(`Error updating user: ${errorData.message}`);
        }
    } catch (error) {
        console.error("Error updating user:", error);
    }
});

document.getElementById('cancelEditUserButton').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('addUserForm').reset(); 
    toggleUserFormButtons(false); 
});

document.getElementById('showPasswordToggle').addEventListener('change', function () {
    const passwordField = document.getElementById('password');
    passwordField.type = this.checked ? 'text' : 'password';
});


// Delete user from the server
async function deleteUser(index) {
    const userId = users[index]._id;

    if (confirm('Are you sure you want to delete this user?')) {
        try {
            await fetch(`http://localhost:5000/users/${userId}`, { method: 'DELETE' });
            users.splice(index, 1);
            renderUserList();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }
}

// Fetch users from the server
async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:5000/users');
        users = await response.json();
        renderUserList();
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

// Event listener for user navigation
document.getElementById('usersNav').addEventListener('click', () => {
    showSection('usersSection');
    fetchUsers();
});

// Initial fetch of users when the page loads
fetchUsers();

document.getElementById('logoutButton').addEventListener('click', function () {
    window.location.href = 'index.html';
});








