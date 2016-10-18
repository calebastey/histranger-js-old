var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Song = require('./app/models/song.js'),
    Take = require('./app/models/take.js');

var app = express();
var port = process.env.PORT || 3000;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

mongoose.connect('mongodb://localhost/histranger');
var db = mongoose.connection;

app.use('/api', router);
router.post('/song', function(req, res) {
    var song = new Song(req.body);
    song.save();
    res.send('Saved!');
});

router.get('/songs', function(req, res) {
    Song.find({}, function(err, docs) {
        res.send(docs);
    })
});

router.get('/song/:name', function(req, res) {
    Song.findOne({'name': req.params.name}, function(err, docs) {
        res.send(docs);
    })
});

router.post('/take/:songname', function(req, res) {
    Song.findOne({'songname': req.params.name}, function(err, song) {
        var take = new Take(req.body);
        take.uploaded = Date.now();
        song.takes.push(take);
        song.save();
        res.send('Take Saved!')
    })
});


/*
 *  Static File Serving
 */
app.use(express.static('client/public'));

app.get('/', function (req, res) {
    res.sendFile('client/public/views/index.html', {'root': __dirname});
});

app.get('/new_song', function(req, res) {
    res.sendFile('client/public/views/new_song.html', {'root': __dirname});
});

app.listen(port, function() {
    console.log('listening on 3000')
});