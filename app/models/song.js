require('./take.js');
var mongoose = require('mongoose'),
    TakeSchema = require('mongoose').model('Take').schema;

var Schema = mongoose.Schema;

var SongSchema = new Schema({
    name: String,
    takes: [TakeSchema],
    bestTake: {
        type: Schema.ObjectId,
        ref: 'Take'
    }
});

module.exports = mongoose.model('Song', SongSchema);