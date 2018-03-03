#!node
const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const models = require('./models');

// initalize sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const route = require('./routes/routes');
const config = require('./config/config');

const secureRoutes = express.Router();

//All the js, css and images are available now
app.use(express.static(path.join(__dirname, 'public')));


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

/*app.use(session({
    secret: "i18n_support",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
*/
//init i18n after cookie-parser
app.use(i18n.init);

// initialize cookie-parser to allow us access the cookies stored in the browser. 
//app.use(cookieParser());
function extendDefaultFields(defaults, session) {
    return {
        data: defaults.data,
        expires: defaults.expires,
        token: session.user
    };
}

//refer: https://github.com/mweibel/connect-session-sequelize#session-expiry
//expired sessions are cleaned every 15 minutes by default
//age of session -24 hours if cookie.expires or maxAge is not set
var store = new SequelizeStore({
    db: models.sequelize,
    table: 'CentralUserSession',
    extendDefaultFields: extendDefaultFields
});
// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'JSESSIONID',
    secret: 'someSecret',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 86400000,
        httpOnly: true
    }
}));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.JSESSIONID && !req.session.user) {
        res.clearCookie('JSESSIONID');
        req.session.destroy();
    }
    next();
});
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