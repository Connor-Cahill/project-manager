const Project = require('../models/project');


module.exports = function(app) {


    //GET: renders the home page with list of projects (all projects view)
    //NOTE this may change later depending on how I set up landing page and auth 
    app.get('/', (req, res) => {
        Project.find({}).then(posts => {
            res.render('index', { posts: posts })
        }).catch(err => {
            console.log(err)
        })
    })
    //POST: creates a new project and saves it to the database 
    //Note Will need to save this to user once auth is setup
    app.post('/projects', (req, res) => {
        const project = new Project(req.body);

        project.save().then(project => {
            res.redirect('/');

        }).catch(err => {
            console.log(err);
        })
    })

    //GET: renders the form page for creating NEW Project 
    app.get('/projects/new', (req, res) => {
        res.render('projects-new')
    })

    //GET: renders single project page 
    app.get('/projects/:id', (req, res) => {
        Project.findById(req.params.id).then(project => {
            res.render('project-show', { project: project });
        }).catch(err => {
            console.log(err);
        })
    })

    app.delete('/projects/:id', (req, res) => {
        Project.findOneAndRemove({ _id: req.params.id }).then(res => {
            res.redirect('/')
        }).catch(err => {
            console.log(err);
        })
    })

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