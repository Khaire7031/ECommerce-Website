
const express = require('express');
const mongoose = require('mongoose');
const app = express();
var expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const allProducts = require('./sample.js');
const bcrypt = require('bcrypt');
const axios = require('axios');


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
        // console.log(localStorage.getItem("data"));
        // console.log(localStorage.getItem("userIdForUse"));
    } catch (error) {
        console.error('Error in fetching products');
        res.send("Error in fetching products");
    }
    // res.render('Pages/Products.ejs', { allProducts: allProducts });
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



        // Password is valid, so user is authenticated
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








// Show My Cart
app.get('/mycart', async (req, res) => {
    try {
        let TotalPrice = 0;
        const allCartFromDataBase = await CartDataBase.find({});
        // console.log(allCartFromDataBase)

        allCartFromDataBase.forEach((product) => {
            // console.log(product.price, " : ", product.quantity);
            TotalPrice = TotalPrice + product.price * product.quantity;
        })
        // console.log(TotalPrice)
        res.render('Pages/Mycart.ejs', { allProducts: allCartFromDataBase, TotalPrice: TotalPrice });
    } catch (error) {
        console.error('Error in fetching products');
        res.send("Cart is Empty");
    }
});

// Add Products to Cart
app.post('/add_to_cart1', async (req, res) => {
    try {
        const { id, title, description, price, quantity, thumbnail } = req.body;
        const existingProduct = await CartDataBase.findOne({ id });

        if (existingProduct) {
            existingProduct.quantity += quantity;
            await existingProduct.save();
            res.status(200).json({ message: "Product quantity updated in the cart" });
        } else {
            const newCartItem = new CartDataBase({
                id,
                title,
                description,
                price,
                quantity,
                thumbnail
            });
            await newCartItem.save();
            res.status(201).json({ message: "Product added to cart successfully" });
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.json({ error: "Internal Server Error" });
    }
});

// Add Products to Cart
app.post('/add_to_cart', async (req, res) => {
    try {
        const { customerId, product } = req.body;
        const { id, title, description, price, quantity, thumbnail } = product;

        // Find the user's cart
        let userCart = await UserCartDataBase.findOne({ user: customerId });

        if (!userCart) {
            // If the user's cart doesn't exist, create a new one
            userCart = new UserCartDataBase({
                user: customerId,
                products: [product]
            });
        } else {
            // Check if the product already exists in the cart
            const existingProduct = userCart.products.find(prod => prod.id === id);

            if (existingProduct) {
                // If the product exists, update its quantity
                existingProduct.quantity += quantity;
            } else {
                // If the product doesn't exist, add it to the cart
                userCart.products.push(product);
            }
        }

        // Save the updated/created cart
        await userCart.save();
        res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//      Delete Product From Cart
app.post("/delete_from_cart", async (req, res) => {
    try {
        const { id } = req.body;
        const deletedProduct = await CartDataBase.findOneAndDelete({ id: id });

        if (!deletedProduct) {
            return res.json({ message: "Product not found in the cart" });
        }

        // Return a success message along with the deleted product
        return res.json({ message: "Product successfully deleted from the Cart." });
    } catch (error) {
        console.error("Error deleting product from cart:", error);
        return res.json({ message: "Error in deleting this product" });
    }
});






// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});




module.exports = app;