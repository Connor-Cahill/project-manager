const Project = require('../models/project');
const User = require('../models/user');
const isUserAuth = require('../middleware/isUserAuthed');

module.exports = function(app) {


    //GET: renders the dashboard where all of a users projects can be viewed
    //TODO---> Add check auth middleware 
    app.get('/', isUserAuth, (req, res) => {
        User.findById(req.user._id).populate('projects').then(user => {
            const ideas = [];
            const brainstorming = [];
            const development = [];
            const debugging = [];
            const production = [];
            const enchancements = [];


            user.projects.forEach(function(project) {
                if (project.stage === 'ideas') {
                    ideas.unshift(project);
                } else if (project.stage === 'brainstorming') {
                    brainstorming.unshift(project);
                } else if (project.stage === 'development') {
                    development.unshift(project);
                } else if ( project.stage === 'debugging') {
                    debugging.unshift(project);
                } else if (project.stage === 'production') {
                    production.unshift(project);
                } else if (project.stage === 'enhancements') {
                    enchancements.unshift(project);
                }
            })
            return res.render('index', { user: user, ideas: ideas, brainstorming: brainstorming, development: development, debugging: debugging, production: production, enchancements: enchancements } )

        }).catch(err => {
            console.log(err);
        })
    })

    //POST: creates a new project and saves it to the database 
    //NOTE TODO:  Will need to save this to user once users/auth is all setup 
    app.post('/projects', (req, res) => {
        const project = new Project(req.body);
        project.author = req.user._id;
        project.stage = 'ideas'
        project.save().then(project => {
            return User.findById(req.user._id)
        }).then(user => {
            user.projects.unshift(project);
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
            res.render('projects-show', { project, currentUser });
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


    //PATCH: this route changes the stage of a project with the given stage. 
    app.patch('/projects/:id/change-stage', (req, res) => {
        const stage = req.body.stage;
        Project.findById(req.params.id).then(project => {
            project.set({ stage: stage });
            return project.save();
        }).then(project => {
            res.redirect(`/projects/${project._id}`);

        }).catch(err => {
            console.log(err);
        })
    })
    
}