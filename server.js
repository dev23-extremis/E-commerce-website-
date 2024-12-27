// const path = require('path');
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/your-database-name', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// // Serve static files
// app.use(express.static(path.join(__dirname, 'public')));

// // Default route to serve index.html
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // API Routes
// const Product = require('./models/Product');

// app.get('/products', async (req, res) => {
//     const products = await Product.find();
//     res.json(products);
// });

// app.post('/products', async (req, res) => {
//     const newProduct = new Product(req.body);
//     const savedProduct = await newProduct.save();
//     res.json(savedProduct);
// });

// app.delete('/products/:id', async (req, res) => {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Product deleted' });
// });

// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const path = require('path');
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const User = require('./models/user'); // Import the User model
// const Product = require('./models/Product'); // Import the Product model

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json()); // Parse JSON requests
// app.use(express.json()); // Parse JSON bodies
// app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/your-database-name', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// // Default route to serve index.html
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // -----------------------------
// // User Authentication Endpoints
// // -----------------------------

// // User Registration
// app.post('/register', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const newUser = new User({ username, password });
//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         if (error.code === 11000) {
//             res.status(400).json({ message: 'Username already exists' });
//         } else {
//             res.status(500).json({ message: 'Server error' });
//         }
//     }
// });

// // User Login
// app.post('/login', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.findOne({ username, password });

//         if (user) {
//             res.status(200).json({ message: 'Login successful' });
//         } else {
//             res.status(400).json({ message: 'Invalid username or password' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // -----------------------------
// // Product Management Endpoints
// // -----------------------------

// // Get all products
// app.get('/products', async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.json(products);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to fetch products' });
//     }
// });

// // Add a new product
// app.post('/products', async (req, res) => {
//     try {
//         const newProduct = new Product(req.body);
//         const savedProduct = await newProduct.save();
//         res.json(savedProduct);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to add product' });
//     }
// });

// // Delete a product
// app.delete('/products/:id', async (req, res) => {
//     try {
//         await Product.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Product deleted' });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to delete product' });
//     }
// });

// // -----------------------------
// // Start the server
// // -----------------------------

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const path = require('path');
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const User = require('./models/user');  // Import the User model
// const Product = require('./models/Product');  // Import the Product model
// const Order = require('./models/Order');  // Import the Order model

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json()); // Parse JSON requests
// app.use(express.json()); // Parse JSON bodies
// app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/your-database-name', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// // Default route to serve index.html
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // -----------------------------
// // User Authentication Endpoints
// // -----------------------------

// // User Registration
// app.post('/register', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const newUser = new User({ username, password });
//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         if (error.code === 11000) {
//             res.status(400).json({ message: 'Username already exists' });
//         } else {
//             res.status(500).json({ message: 'Server error' });
//         }
//     }
// });

// // User Login
// app.post('/login', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.findOne({ username, password });

//         if (user) {
//             res.status(200).json({ message: 'Login successful' });
//         } else {
//             res.status(400).json({ message: 'Invalid username or password' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // -----------------------------
// // Product Management Endpoints
// // -----------------------------

// // Get all products
// app.get('/products', async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.json(products);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to fetch products' });
//     }
// });

// // Add a new product
// app.post('/products', async (req, res) => {
//     try {
//         const newProduct = new Product(req.body);
//         const savedProduct = await newProduct.save();
//         res.json(savedProduct);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to add product' });
//     }
// });

// // Delete a product
// app.delete('/products/:id', async (req, res) => {
//     try {
//         await Product.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Product deleted' });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to delete product' });
//     }
// });

// // -----------------------------
// // Order Management Endpoints (Code A added here)
// // -----------------------------

// // Fetch Products
// app.get('/products', async (req, res) => {
//     const products = await Product.find();
//     res.json(products);
// });

// // Place an Order
// app.post('/order', async (req, res) => {
//     const { user, productId, address, email, phone } = req.body;
    
//     // Create an order and save it to the database
//     const newOrder = new Order({
//         user,
//         productId,
//         address,
//         email,
//         phone,
//         status: 'Pending'
//     });

//     await newOrder.save();
//     res.status(200).json({ message: 'Order placed successfully!' });
// });

// // -----------------------------
// // Start the server
// // -----------------------------

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const path = require('path');
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const multer = require('multer'); // For handling file uploads
// const User = require('./models/user');  // Import the User model
// const Product = require('./models/Product');  // Import the Product model
// const Order = require('./models/Order');  // Import the Order model

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json()); // Parse JSON requests
// app.use(express.json()); // Parse JSON bodies
// app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
// app.use('/uploads', express.static('uploads')); // Serve uploaded product images

// // Configure multer storage for image uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
// const upload = multer({ storage: storage });

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/your-database-name', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// // Default route to serve index.html
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // -----------------------------
// // User Authentication Endpoints
// // -----------------------------

// // User Registration
// app.post('/register', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const newUser = new User({ username, password });
//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         if (error.code === 11000) {
//             res.status(400).json({ message: 'Username already exists' });
//         } else {
//             res.status(500).json({ message: 'Server error' });
//         }
//     }
// });

// // User Login
// app.post('/login', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.findOne({ username, password });

//         if (user) {
//             res.status(200).json({ message: 'Login successful' });
//         } else {
//             res.status(400).json({ message: 'Invalid username or password' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // -----------------------------
// // Product Management Endpoints
// // -----------------------------

// // Get all products
// app.get('/products', async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.json(products);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to fetch products' });
//     }
// });

// // Add a new product with image upload
// app.post('/products', upload.single('image'), async (req, res) => {
//     try {
//         const { name, description, price, status } = req.body;
//         const image = req.file ? `/uploads/${req.file.filename}` : null;

//         const newProduct = new Product({
//             name,
//             description,
//             price,
//             status,
//             image
//         });

//         const savedProduct = await newProduct.save();
//         res.json(savedProduct);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to add product' });
//     }
// });

// // Delete a product
// app.delete('/products/:id', async (req, res) => {
//     try {
//         await Product.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Product deleted' });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to delete product' });
//     }
// });

// // -----------------------------
// // Order Management Endpoints
// // -----------------------------

// // Fetch Products
// app.get('/products', async (req, res) => {
//     const products = await Product.find();
//     res.json(products);
// });

// // Fetch all users
// app.get('/users', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to fetch users' });
//     }
// });

// // Update user details
// app.put('/users/:id', async (req, res) => {
//     try {
//         const { username, password } = req.body;
        
//         // Find the user by ID and update their details
//         const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, password }, { new: true });

//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.json(updatedUser); // Send the updated user details as a response
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to update user' });
//     }
// });

// // Add a new user
// app.post('/users', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const existingUser = await User.findOne({ username });

//         if (existingUser) {
//             return res.status(400).json({ message: 'Username already exists' });
//         }

//         const newUser = new User({ username, password });
//         await newUser.save();
//         res.status(201).json(newUser);
//     } catch (error) {
//         console.error("Error adding user:", error);
//         res.status(500).json({ message: 'Failed to add user' });
//     }
// });


// // Delete a user
// app.delete('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.json({ message: 'User deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to delete user' });
//     }
// });

// // Fetch all orders
// app.get('/orders', async (req, res) => {
//     try {
//         const orders = await Order.find();
//         res.json(orders);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to fetch orders' });
//     }
// });


// // Place an Order
// app.post('/order', async (req, res) => {
//     const { user, productId, address, email, phone } = req.body;
    
//     // Create an order and save it to the database
//     const newOrder = new Order({
//         user,
//         productId,
//         address,
//         email,
//         phone,
//         status: 'Pending'
//     });

//     await newOrder.save();
//     res.status(200).json({ message: 'Order placed successfully!' });
// });

// // -----------------------------
// // Start the server
// // -----------------------------
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer'); // For handling file uploads
const User = require('./models/user');  // Import the User model
const Product = require('./models/Product');  // Import the Product model
const Order = require('./models/Order');  // Import the Order model

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use('/uploads', express.static('uploads')); // Serve uploaded product images

// Configure multer storage for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Default route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// -----------------------------
// User Authentication Endpoints
// -----------------------------

// User Registration
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Username already exists' });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
});

// User Login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });

        if (user) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(400).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// -----------------------------
// Product Management Endpoints
// -----------------------------

// Get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products' });
    }
});

// Add a new product with image upload
app.post('/products', upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, status } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const newProduct = new Product({
            name,
            description,
            price,
            status,
            image
        });

        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add product' });
    }
});

// Update an existing product
app.put('/products/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;

        const updatedData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        };

        if (req.file) {
            updatedData.image = `/uploads/${req.file.filename}`; // Handle optional image update
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product.', error });
    }
});



// Delete a product
app.delete('/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product' });
    }
});

// -----------------------------
// Order Management Endpoints
// -----------------------------

// Fetch Products
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Fetch all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

// Update user details
app.put('/users/:id', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find the user by ID and update their details
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, password }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser); // Send the updated user details as a response
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user' });
    }
});

// Add a new user
app.post('/users', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ message: 'Failed to add user' });
    }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

// Fetch all orders
app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
});

// Delete a order
app.delete('/orders/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const deletedOrder = await Order.findByIdAndDelete(orderId); // Replace with your database logic

        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting order", error });
    }
});


// Fetch order history for a user
app.get('/orders/:username', (req, res) => {
    const username = req.params.username;  // Extract the username from the URL
    console.log('Received Username:', username);  // Log to verify the received username

    // Fetch the orders for the specific user from the database
    Order.find({ user: username })  // Query for orders where the 'user' field matches the username
        .then(orders => {
            if (orders.length === 0) {
                return res.status(404).json({ message: 'No orders found for this user.' });
            }
            res.json({ orders });
        })
        .catch(err => {
            console.error('Error fetching orders:', err);
            res.status(500).json({ message: 'Error fetching order history. Please try again.' });
        });
});

// Place an Order
app.post('/order', async (req, res) => {
    const { user, productId, address, email, phone } = req.body;
    
    // Create an order and save it to the database
    const newOrder = new Order({
        user,
        productId,
        address,
        email,
        phone,
        status: 'Pending'
    });

    await newOrder.save();
    res.status(200).json({ message: 'Order placed successfully!' });
});


// -----------------------------
// Start the server
// -----------------------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


