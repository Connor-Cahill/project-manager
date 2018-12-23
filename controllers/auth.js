const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = function(app) {

    //GET: renders signup page
    app.get('/signup', (req, res) => {
        res.render('signup-page');
    })

    //GET: renders signin page
    app.get('/signin', (req, res) => {
        res.render('signin-page');
    })

    //POST: Creates a new user when they sign up 
    app.post('/signup', (req, res) => {
        const user = new User(req.body);
        user.save().then(user => {
            const token = jwt.sign({ _id: user._id }, process.env.CLIENT_SECRET, { expiresIn: '60 days' });
            res.cookie(process.env.COOKIE, token, { maxAge: 60 * 60 * 24, httpOnly: true });
            res.redirect('/');
        }).catch(err => {
            console.log(err);
            //Do error handling later if wrong 
        })
    });


    //POST: Signs user in if credentials are correct
    app.post('/signin', (req, res) => {
        User.findOne({ username: req.body.username }, 'username password').then(user => {
            user.comparePassword(req.body.password, (error, isMatch) => {
                if (isMatch) {
                    const token = jwt.sign({ _id: user._id }, process.env.CLIENT_SECRET, { expiresIn: '60 days' });
                    res.cookie(process.env.COOKIE, token, { maxAge: 60 * 60 * 24, httpOnly: true });
                    res.redirect('/')
                } else {
                    console.log('Password is incorrect')
                }
                if (error) {
                    console.log(error)
                }
            });
        }).catch(err => {
            console.log(err);
        })
    });
}