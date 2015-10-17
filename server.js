(function () {
    'use strict';

    // set up ========================
    var express = require('express'),
        app = express(),
        mongoose = require('mongoose'),
        morgan = require('morgan'),
        bodyParser = require('body-parser'),
        methodOverride = require('method-override'),
        router = express.Router(),
        server = require('http').createServer(app),
        io = require('socket.io')(server),
		browserSync = require('browser-sync'),
        count = 0,
        // configuration =================
        port = process.env.PORT || 3000,
        // TODO : Vérifier si les variables d'environnements existent, sinon impossible de lancer le serveur
        mongoDb = process.env.MONGO_DB_MEAN_PROJECT,
        mongoServer = process.env.MONGO_HOST,
        uri = mongoServer.concat('translate'),
        mongoOptions = {
            user: 'adminDbTranslate',
            pass: process.env.MONGO_PWD_MEAN_PROJECT
        };


    io.on('connection', function (socket) {
        socket.emit('send:message', {
            firstName: 'Olivier',
            lastName: 'Andre',
            count: count += 1
        });
    });
    mongoose.connect(uri, mongoOptions);
    mongoose.connection.on('connected', function () {
        console.log('connected to ' + mongoDb);
    });

    mongoose.connection.on('error', function (error) {
        console.log(error);
    });

    app.use(express.static(__dirname + '/public'));
    app.use(morgan(process.env.NODE_ENV));
    app.use(bodyParser.urlencoded({
        'extended': 'true'
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.json({
        type: 'application/vnd.api+json'
    }));
    app.use(methodOverride('X-HTTP-Method-Override'));

    // all of our routes will be prefixed with /api
    app.use('/api', router);
    app.use('/api/secure', router);

    // routes ======================================================================
    require('./server/index.js')(app);
    require('./server/web/demo.js')(router);

    // REGISTER OUR ROUTES -------------------------------

    // listen (start app with node server.js) ======================================
    server.listen(port, listening);
    console.log("App listening on port " + port);

	function listening() {
		browserSync({
			proxy: 'localhost:' + port,
			files: ['public/**/*.{html,js,css}']
		});
	}

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

}());
