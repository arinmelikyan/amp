const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Sample data for products
const products = [
    { id: 1, name: "Product 1", price: 10.99 },
    { id: 2, name: "Product 2", price: 15.99 },
    { id: 3, name: "Product 3", price: 20.99 }
];

// Initial shopping cart
let shoppingCart = [];

app.use(bodyParser.json());
const corsOptions = {
  origin: ['http://127.0.0.1:8080/']
};

// Enable CORS with the configured options
app.use(cors());

// Route to fetch products
app.get('/products', (req, res) => {
    res.json({ items: products });
});

app.get('/cart', (req, res) => {
    const cartItems = products.map(item => {
        return {
            id: item.id,
            name: item.name,
            price: item.price,
        };
    });
    res.json({items: cartItems});
});

// Route to add item to the shopping cart
app.post('/cart/add', (req, res) => {
    const productId = req.body.productId;
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd) {
        shoppingCart.push(productToAdd);
        res.status(200).json({ message: 'Product added to cart successfully' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Route to remove item from the shopping cart
app.delete('/cart/remove/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const index = shoppingCart.findIndex(product => product.id === productId);
    if (index !== -1) {
        shoppingCart.splice(index, 1);
        res.status(200).json({ message: 'Product removed from cart successfully' });
    } else {
        res.status(404).json({ message: 'Product not found in cart' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});