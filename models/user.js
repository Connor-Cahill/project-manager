const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;



const UserSchema = new Schema({
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
    username: { type: String, required: true },
    password: { type: String, required: true },
    ideas: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    brainstorming: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    development: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    debugging: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    production: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    enhancements: [{ type: Schema.Types.ObjectId, ref: 'Project' }]

})

UserSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    if (!this.type) {
        this.type = 'user';

        if (!this.isModified('password')) {
            return next();
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(this.password, salt, (error, hash) => {
                this.password = hash;
                next();
            });
        });
    }
});

UserSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, done);
}


module.exports = mongoose.model('User', UserSchema)