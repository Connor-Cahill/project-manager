const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Database Connections
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/project-manager', { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'))
mongoose.Promise = global.Promise;

///Setup handlebars view engine
app.use(express.static('public'))
app.engine('hbs', exphbs({defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

///Setup controllers:
require('./controllers/projects')(app);

app.listen(3000, () => console.log('App listening on port 3000'));