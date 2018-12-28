const User = require('../models/user');

module.exports = function(req, res, next) {
    if (req.user !== null) {
        return next();
    } else {
        res.redirect('/signin')
    }
}

