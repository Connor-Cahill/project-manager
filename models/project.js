const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    completion: { type: Number, min: 0, max: 100},
    repoLink: { type: String }
})



module.exports = mongoose.model('Project', ProjectSchema);