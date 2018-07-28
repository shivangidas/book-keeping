#!node
const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const models = require('./models');

const route = require('./routes/routes');
const config = require('./config/config');

const secureRoutes = express.Router();

//All the js, css and images are available now
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

//Allow cross origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

//Use EJS engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(favicon(path.join(__dirname, 'public', 'images', 'image3.ico')));


//Refer https://stackoverflow.com/questions/23726759/node-js-start-and-stop-windows-services
/*var child = require('child_process').exec('net start AllGoVisionService', function (error, stdout, stderr) {
    if (error !== null) {
        console.log('exec error: ' + error);
    }
    // Validate stdout / stderr to see if service is already running
});*/
//TODO: internationalization is currently using cookies 


var i18n = require('i18n');

i18n.configure({

    //define how many languages we would support in our application
    locales: ['en', 'zh', 'spa'],

    //define the path to language json files, default is /locales
    directory: __dirname + '/locales',

    //define the default language
    defaultLocale: 'en',

    // define a custom cookie name to parse locale settings from 
    cookie: 'i18n'
});

app.use(cookieParser());

app.use(session({
    secret: "i18n_support",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

//init i18n after cookie-parser
app.use(i18n.init);
route(app, secureRoutes);

models.sequelize.sync()
    .then(() => {
        //Start server
        var server = app.listen(config.server.port, config.server.host, function() {

            var host = server.address().address;
            var serverPort = server.address().port;

            console.log("Live at http://%s:%s", host, serverPort)

        });
    });