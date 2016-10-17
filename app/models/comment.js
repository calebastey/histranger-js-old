var mongoose = require('mongoose'),
    User = require('./user.js');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    content: String
});

module.exports = mongoose.model('Comment', CommentSchema);
