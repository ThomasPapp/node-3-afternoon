require('dotenv').config();
const { json } = require('body-parser');
const session = require('express-session');
const express = require('express');

// middlewares
const checkForSession = require('./middlewares/checkForSession');

// controllers
const swagController = require('./controllers/swag_controller');
const authController = require('./controllers/auth_controller');
const cartController = require('./controllers/cart_controller');
const searchController = require('./controllers/search_controller');

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(json());

app.use(checkForSession.check);

app.use(express.static('../build'));

// swag end points
app.get('/api/swag', swagController.read);

// auth end points
app.get('/api/user', authController.getUser);
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.logout);

// cart end points
app.post('/api/cart', cartController.add);
app.post('/api/cart/checkout', cartController.checkout);
app.delete('/api/cart', cartController.remove);

// search end point
app.get('/api/search', searchController.search);

app.listen(process.env.SERVER_PORT, () => console.log(`Listening on port ${process.env.SERVER_PORT}...`));