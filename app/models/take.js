require('./comment.js');
var mongoose = require('mongoose'),
    CommentSchema = require('mongoose').model('Comment').schema;

var Schema = mongoose.Schema;

var TakeSchema = new Schema({
    url: String,
    uploaded: Date,
    takeName: String,
    comments: [CommentSchema]
});

module.exports = mongoose.model('Take', TakeSchema);
