const User = require('../models/user');

module.exports = function(app) {
    //testing to see if we can return user
    app.get('/users/:username', (req, res) => {
        User.findOne({ username: req.params.username }).then(user => {
            res.send(user);
        })
    })
}