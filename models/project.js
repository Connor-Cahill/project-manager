const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    stage: { type: String, default: 'ideas'},
    repoLink: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User'}
})



module.exports = mongoose.model('Project', ProjectSchema);