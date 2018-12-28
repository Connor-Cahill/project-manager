const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = function(app) {

    //GET: renders signup page
    app.get('/signup', (req, res) => {
        res.render('sign-up');
    })

    //GET: renders signin page
    app.get('/signin', (req, res) => {
        res.render('sign-in');
    })

    //GET (SIGN OUT): signs out the user and clears the cookies 
    app.get('/signout', (req, res) => {
        res.clearCookie(process.env.COOKIE);
        res.redirect('/');
        
    })

    //POST: Creates a new user when they sign up 
    app.post('/signup', (req, res) => {
        const user = new User(req.body);
        user.password = user.generateHash(req.body.password)
        user.save().then(user => {
            const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
            res.cookie(process.env.COOKIE, token, { maxAge: 60 * 60 * 24, httpOnly: true });
            res.redirect('/');
        }).catch(err => {
            console.log(err);
            //Do error handling later if wrong 
        })
    });


    //POST: Signs user in if credentials are correct
    app.post('/signin', (req, res) => {
        User.findOne({$or: [{ username: req.body.username }, { email: req.body.username }]  }, 'username email password').then(user => {
            console.log('this is the user ==>', user);
            if (!user) {
                console.log('This is an incorrect username')
                res.sendStatus(401);
            } else if (!user.comparePassword(req.body.password)) {
                console.log('Password was incorrect')
                res.sendStatus(401);
            } else {
                const token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: '60 days'});
                res.cookie(process.env.COOKIE, token, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true}); //maxAge = 24 hours
                res.redirect('/');
            }
        }).catch(err => {
            console.log(err);
        })
    });
}