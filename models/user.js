const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;



const UserSchema = new Schema({
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project'}]
})



///Generate Hash for password
UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
//compares the password against the hash
UserSchema.methods.comparePassword = function(password, done) {
    return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('User', UserSchema)