const Project = require('../models/project');
const User = require('../models/user');

module.exports = function(app) {


    //GET: renders the dashboard where all of a users projects can be viewed
    app.get('/', (req, res) => {
        if (req.user) {
            User.findById(req.user._id).populate('ideas')
        .populate('brainstorming')
        .populate('development')
        .populate('debugging')
        .populate('production')
        .populate('enhancements')
        .then(user => {
            res.render('index', { user })
        }).catch(err => {
            console.log(err);
        })
        } else {
            res.redirect('signup')
            console.log('User must be logged in.')
        }
        
    })

    //POST: creates a new project and saves it to the database 
    //NOTE TODO:  Will need to save this to user once users/auth is all setup 
    app.post('/projects', (req, res) => {
        const project = new Project(req.body);

        project.save().then(project => {
            return User.findById(req.user._id)
        }).then(user => {
            user.ideas.unshift(project);
            user.save();
            return res.redirect(`/projects/${project._id}`);
        }).catch(err => {
            console.log(err);
        })
    });

    //GET: renders the form page for creating NEW Project 
    app.get('/projects/new', (req, res) => {
        res.render('projects-new')
    })

    //GET: renders single project page 
    app.get('/projects/:id', (req, res) => {
        const currentUser = req.user;
        Project.findById(req.params.id).then(project => {
            res.render('project-show', { project, currentUser });
        }).catch(err => {
            console.log(err);
        })
    })
    //DELETE: route deletes a given project
    //NOTE TO-DO: make sure person is authorized to delete a certain project
    app.delete('/projects/:id', (req, res) => {
        Project.findOneAndRemove({ _id: req.params.id }).then(res => {
            res.redirect('/')
        }).catch(err => {
            console.log(err);
        })
    })
    //PUT: allows user to edit projects
    //NOTE TO-DO: make sure user is authorized to update a certain project
    app.put('/projects/:id', (req, res) => {
        Project.findById(req.params.id).then(project => {
            project.set(req.body);
            return project.save();
        }).then(updatedProject => {
            console.log(updatedProject);
            res.redirect(`/projects/${req.params.id}`);
        }).catch(err => {
            console.log(err);
        })
    })
    
}