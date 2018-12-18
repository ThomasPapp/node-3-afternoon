const users = require('../models/users');

let id = 1;

function login(req, res, next) {
    const { username, password } = req.body;
    const index = users.findIndex(user => user.username === username && user.password === password);

    if (index === -1) {
        res.status(500).json({ error: "Incorrect login details" });
        return;
    }

    req.session.user.username = username;
    res.status(200).json(req.session.user);
}

function register(req, res, next) {
    const { username, password } = req.body;

    const user = {
        id: id++,
        username,
        password
    }

    users.push(user);

    req.session.user.username = username;
    res.status(200).json(req.session.user);
}

function logout(req, res, next) {
    req.session.destroy();
    res.status(200).json(req.session);
}

function getUser(req, res, next) {
    res.status(200).json(req.session.user);
}

module.exports = {
    login,
    register,
    logout,
    getUser
}