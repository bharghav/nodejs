const express = require('express')
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/artists');
let db = mongoose.connection;


//check the connection
db.once('open', function(){
    console.log('connected to mongoDb');
});

//check the db errors
db.on('error', function(err){
    console.log(err);
});

// initialize app
const app = express();

//bring the models from the mongodb
let artist = require('./models/artists');

// template engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

// Body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// set the public folder
app.use(express.static(path.join(__dirname,'public')));


//route
//app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', function(req, res){
    artist.find({},function(err, artists){
        if(err){
            console.log(err);
        }else{
            res.render('index', {
                title: 'artists',
                artistsview: artists
            
                });
        }
    });
    //res.send('Hello World!');
    /*let artists = [
        {
            id:1,
            title: 'article 1',
            author:'john',
            description:'this is article body'
        },
        {
            id:2,
            title:'article 2',
            author:'john2',
            description:'this is article body2'
        }
    ]*/
    
});

//get Single article
app.get('/artist/:id', function(req, res){
    artist.findById(req.params.id, function(err, artists){
        //console.log(artists);
        res.render('artist', {
            artist: artists
        });
    });
});

app.get('/addartist/add', function(req, res){
    //res.send('Hello World!'); 
    res.render('add_artist', {
    title: 'add artist'
    });
});

app.post('/addartist/add', function(req, res){
    //res.send('Hello World!'); 
    //console.log('submitted artists');
    //return;

    let artists = new artist();
    artists.id = req.body.id;
    artists.title = req.body.title;
    artists.author = req.body.author;
    artists.body = req.body.body;

    artists.save(function(err){
        if(err)
        {
            console.log(err);
            return;
        }else{
            res.redirect('/');
        }
    });
    //console.log(req.body.title);
   // return;
});

//start server
//app.listen(4000, () => console.log('Example app listening on port 4000!'))
app.listen(4000,function(){
    console.log('Example app listening on port 4000!');
});