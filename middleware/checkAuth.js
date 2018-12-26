const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    if (req.cookies.Token) {
        const uid = jwt.decode(req.cookies.Token, process.env.SECRET)._id;
        User.findById(uid).then(user => {
            req.user = user;
            return next();
        }).catch(console.error)
    } else {
        req.user = null;
        return next();
    }
}