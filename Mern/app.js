
const express = require('express');
const mongoose = require('mongoose');
const app = express();
var expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const allProducts = require('./sample.js');
const bcrypt = require('bcrypt');
const axios = require('axios');
const stripe = require('stripe');


// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/*
    DataBases
    MongoDB 
*/
const uri = "mongodb+srv://user:D9uhEzozeEuF5pLt@ecommerce.ezapv3e.mongodb.net/";
const ProductDataBase = require("./models/Product.js");
const CartDataBase = require("./models/Cart.js");
const RegisterDataBase = require("./models/Register.js");
const UserCartDataBase = require("./models/CartUser.js");

// Connect to MongoDB with Mongoose
mongoose.connect("mongodb+srv://user:D9uhEzozeEuF5pLt@ecommerce.ezapv3e.mongodb.net/", { dbName: 'EcommerceGreen' })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));



// 103.195.83.126/32


app.set('layout', 'layouts/boilerplate');

// Specify the layout option only when rendering views that need a different layout
app.get('/', async (req, res) => {
    try {
        const allProductsFromDataBase = await ProductDataBase.find({}).maxTimeMS(1000);
        res.render('Pages/Products.ejs', { allProducts: allProductsFromDataBase });
    } catch (error) {
        console.error('Error in fetching products');
        res.send("Error in fetching products");
    }
});

// Define the route to handle POST requests to '/search'
app.post('/search', async (req, res) => {
    try {
        const { ProductName } = req.body;
        const products = await ProductDataBase.find({ title: { $regex: ProductName, $options: 'i' } });
        if (!products.length) {
            return res.status(404).send('Products not found');
        }
        res.json({ products: products, find: true });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send({ "message": 'Internal Server Error', find: false });
    }
});



// Login Api
app.get('/login', (req, res) => {
    // const { data } = req.body;
    // console.log(data)
    res.render('Pages/Login.ejs');
});


app.get('/register', (req, res) => {
    res.render('Pages/Register.ejs');
});


app.get('/payment', (req, res) => {
    res.render('Pages/Payment.ejs');
});


app.post('/registration', async (req, res) => {
    try {
        const { fullName, email, password, isAdmin } = req.body;

        // Convert isAdmin to boolean
        const isAdminBool = Boolean(isAdmin);

        // Check if the email is already registered
        const existingUser = await RegisterDataBase.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create a new user instance
        const newUser = new RegisterDataBase({
            fullName,
            email,
            password,
            isAdmin: isAdminBool // Use the converted boolean value
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post("/login/success", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists in the database
        const user = await RegisterDataBase.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(user.password === password)
        if (password != user.password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // res.redirect('/');
        console.log(user)
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});





//  Add Product to Cart
app.get("/addProducts", async (req, res) => {
    res.render('Pages/AddProducts.ejs');
});

app.post("/addProducts", async (req, res) => {
    const { id, title, description, price, brand, category, thumbnail } = req.body;
    try {
        const existingProduct = await ProductDataBase.findOne({ id });
        if (existingProduct) {
            return res.status(400).send(`Product with the same ${id} already exists`);
        }
        const newProduct = new ProductDataBase({
            id,
            title,
            description,
            price,
            brand,
            category,
            thumbnail
        });

        // Save the new product to the database
        await newProduct.save();
        res.send("Product added successfully");
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send("Internal Server Error");
    }
});



app.get('/about', async (req, res) => {
    res.render('Pages/About.ejs');
})

app.get('/contact', async (req, res) => {
    res.render('Pages/Contact.ejs');
})




// Show My Cart
app.get('/mycart', async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        // If userId is not provided, redirect the user to the login page or show a message
        res.render('Log in into Your Account');
        return;
    }

    try {
        let TotalPrice = 0;
        let userCart = await UserCartDataBase.findOne({ user: userId });

        if (!userCart) {
            // If userCart is not found, handle the scenario (e.g., show an empty cart page)
            // res.send("Cart is Empty");
            res.render('Pages/Mycart.ejs', { allProducts: {}, TotalPrice: 0 });
            return;
        }

        const allCartFromDataBase = userCart.products;

        allCartFromDataBase.forEach((product) => {
            console.log(product.id, " : ", TotalPrice, " : ", product.price, " : ", product.quantity)
            TotalPrice = TotalPrice + product.price * product.quantity;
        });

        res.render('Pages/Mycart.ejs', { allProducts: allCartFromDataBase, TotalPrice: TotalPrice });
    } catch (error) {
        console.error('Error in fetching products:', error);
        res.send("Error occurred while fetching cart");
    }
});







// Add Products to Cart
app.post('/add_to_cart', async (req, res) => {
    try {
        const { customerId, product } = req.body;
        const { id, title, description, price, quantity, thumbnail } = product;

        let userCart = await UserCartDataBase.findOne({ user: customerId });
        console.log(userCart)
        if (!userCart) {
            userCart = new UserCartDataBase({
                user: customerId,
                products: [product]
            });
        } else {
            // const existingProduct = userCart.products.find(prod => prod.id === id);

            const productId = Number(id);
            const existingProduct = userCart.products.find(prod => prod.id === productId);
            // console.log("Existing Product:", existingProduct);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                userCart.products.push(product);
            }
            await userCart.save(); // Save the updated cart to the database

        }

        await userCart.save();
        res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



//      Delete Product From Cart
// API endpoint to delete a product from the user's cart
app.post("/delete_from_cart", async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // console.log("User  ---------->  ", userId, " : ", productId)

        // Find the user's cart
        let userCart = await UserCartDataBase.findOne({ user: userId });
        if (!userCart) {
            return res.status(404).json({ message: "User's cart is Empty" });
        }

        // Find the product in the cart
        const productIndex = userCart.products.findIndex(product => product.id === productId);
        console.log(productIndex)
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in the cart." });
        }

        // If quantity is greater than 1, decrement quantity; otherwise, remove the product
        if (userCart.products[productIndex].quantity > 1) {
            userCart.products[productIndex].quantity -= 1;
        } else {
            userCart.products.splice(productIndex, 1);
        }

        await userCart.save();
        return res.status(201).json({ message: "Product quantity decremented or deleted from the cart." });
    } catch (error) {
        console.error("Error deleting product from cart:", error);
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
});



// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

//  Stripe Api integreation 

app.post('/payment/sucsess', (req, res) => {
    console.log("Body");
})

module.exports = app;