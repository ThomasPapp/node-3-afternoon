const swag = require('../models/swag');

function add(req, res) {
    if (!req.query.id) {
        res.status(400).json({ error: "invalid request, please include an id query param" })
        return;
    }

    const { id } = req.query;
    let index = req.session.user.cart.findIndex(item => +item.id === +id);

    // user already has the item in their cart
    if (index !== -1) {
        res.status(200).json(req.session.user);
        return;
    }

    index = swag.findIndex(swag => +swag.id === +id);
    
    // invalid swag item
    if (index === -1) {
        res.status(404).json({ error: `No swag item found with id of ${id}` })
        return;
    }

    req.session.user.cart.push(swag[index]);
    req.session.user.total += swag[index].price;
    res.status(200).json(req.session.user);
}

function remove(req, res) {
    if (!req.query.id) {
        res.status(400).json({ error: "invalid request, please include an id query param" })
        return;
    }

    const { id  } = req.query;
    const { cart } = req.session.user;
    const index = req.session.user.cart.findIndex(item => +item.id === +id);

    // no such item in the user's cart
    if (index === -1) {
        res.status(404).json({ error: `No cart item found with id ${id}` });
        return;
    }

    req.session.user.total -= cart[index].price;
    cart.splice(index, 1);
    
    res.status(200).json(req.session.user);
}

function checkout(req, res) {
    req.session.user.cart = [];
    req.session.user.total = 0;
    
    res.status(200).json(req.session.user);
}

module.exports = {
    add,
    remove,
    checkout
}