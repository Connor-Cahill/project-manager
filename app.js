const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

//Middleware Setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));



// Database Connections
mongoose.connect(process.env.MONGOD_URI || 'mongodb://localhost/project-manager', { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'))
mongoose.Promise = global.Promise;


///Setup handlebars view engine
app.use(express.static('public'))
app.engine('hbs', exphbs({defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

///Setup controllers: 
require('./controllers/projects')(app);
require('./controllers/auth')(app);
require('./controllers/users')(app);

app.listen(3000, () => console.log('App listening on port 3000'));