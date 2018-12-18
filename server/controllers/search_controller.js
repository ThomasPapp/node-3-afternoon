const swag = require('../models/swag');

function search(req, res) {
    if (!req.query.category) {
        res.stauts(200).json(swag);
        return;
    }

    const { category } = req.query;
    const filteredSwag = swag.filter(swag => swag.category === category);
    
    res.status(200).json(filteredSwag);
}

module.exports = {
    search
}