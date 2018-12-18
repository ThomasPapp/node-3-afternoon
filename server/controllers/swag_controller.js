const swag = require('../models/swag');

function read(req, res, next) {
    res.status(200).json(swag);
}

module.exports = {
    read
}