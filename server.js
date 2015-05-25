// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

    mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // listen (start app with node server.js) ======================================
    app.listen(process.env.PORT || 5000);
    console.log("App listening on port 8080");


//model
 var Team = mongoose.model('Team', {
        name : String,
        players: [String]
    });

 var News = mongoose.model('News', {
        title : String,
        article : String,
     });

 var Groups = mongoose.model('Groups', {
        groups: [String]
     });
//routes

    app.get('/api/teams', function(req, res) {

        // use mongoose to get all todos in the database
        Team.find(function(err, teams) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(teams); // return all todos in JSON format
        });
    });


    app.post('/api/teams', function(req, res) {
        Team.create({
            name : req.body.name,
            players: req.body.players
        }, function(err, team) {
            if (err)
                res.send(err);

            Team.find(function(err, teams) {
                if (err)
                    res.send(err)
                res.json(teams);
            });
        });

    });

    app.delete('/api/teams/:team_id', function(req, res) {
        Team.remove({
            _id : req.params.team_id
        }, function(err, team) {
            if (err)
                res.send(err);
            Team.find(function(err, teams) {
                if (err)
                    res.send(err)
                res.json(teams);
            });
        });
    });


    app.get('/api/news', function(req, res) {

        // use mongoose to get all todos in the database
        News.find(function(err, news) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(news); // return all todos in JSON format
        });
    });
    
    app.post('/api/news', function(req, res) {
        News.create({
            title : req.body.title,
            article : req.body.article,
           
        }, function(err, news) {
            if (err)
                res.send(err);

            News.find(function(err, news) {
                if (err)
                    res.send(err)
                res.json(news);
            });
        });

    });

     app.delete('/api/news/:news_id', function(req, res) {
        News.remove({
            _id : req.params.news_id
        }, function(err, news) {
            if (err)
                res.send(err);
            News.find(function(err, news) {
                if (err)
                    res.send(err)
                res.json(news);
            });
        });
    });

     app.get('/api/groups', function(req, res) {

        // use mongoose to get all todos in the database
        Groups.find(function(err, groups) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(groups);
        });
    });

     app.post('/api/groups', function(req, res) {
        Groups.create({
            groups : req.body.groups,
           
        }, function(err, groups) {
            if (err)
                res.send(err);

            Groups.find(function(err, groups) {
                if (err)
                    res.send(err)
                res.json(groups);
            });
        });

    });


    app.delete('/api/groups/:groups_id', function(req, res) {
        Groups.remove({
            _id : req.params.groups_id
        }, function(err, groups) {
            if (err)
                res.send(err);
            Groups.find(function(err, groups) {
                if (err)
                    res.send(err)
                res.json(groups);
            });
        });
    });

 app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
//application
