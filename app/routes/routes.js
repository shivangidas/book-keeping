'use strict';
const model = require('../models');
module.exports = function(app, secureRoutes) {
    const path = require('path');
    var sessionChecker = (req, res, next) => {
        if (req.session.user && req.cookies.user_sid) {
            res.redirect('/bookList');
        } else {
            next();
        }    
    };
    app.route('/signup')
    .get(sessionChecker, (req, res) => {
        res.render('signup');
    })
    .post((req, res) => {
        model.users.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            req.session.user = user.dataValues;
            res.redirect('/bookList');
        })
        .catch(error => {
            res.redirect('/signup');
        });
    });

    // route for user Login
    app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.render('login');
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;

        model.users.findOne({ where: { username: username } }).then(function (user) {
            if (!user) {
                res.redirect('/login');
            } else if(password != user.password) {
                res.redirect('/login');
            }
            else {
                req.session.user = user.dataValues;
                res.redirect('/bookList');
            }
        });
    });

    app.get('/', function(req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.render('books/bookList', {
                i18n: res
            })
        } else {
            res.redirect('/login');
        }
    });
    
    app.get('/zh', function(req, res) {
        res.cookie('i18n', 'zh');
        res.redirect('/')
    });

    app.get('/en', function(req, res) {
        res.cookie('i18n', 'en');
        res.redirect('/')
    });

    app.get('/spa', function(req, res) {
        res.cookie('i18n', 'spa');
        res.redirect('/')
    });
   
    app.get('/bookList', (req,res) => {
        if (req.session.user && req.cookies.user_sid) {
            res.render('books/bookList', {
                i18n: res
            });
        } else {
            res.redirect('/login');
        }
    });

    app.post('/addBook', (req, res) => {
        if (req.session.user && req.cookies.user_sid) {
        res.render('books/addbooks', {
            i18n: res
        }); 
    } else {
        res.redirect('/login');
    }
    });

    app.post('/editBook', (req, res) => {
        if (req.session.user && req.cookies.user_sid) {
        var rowData = JSON.parse(req.body.rowData);
        res.render('books/editabook', {
            i18n: res,
            rowData: rowData
        }); 
    } else {
        res.redirect('/login');
    }
    });
    app.get('/logout', (req, res) => {
        if (req.session.user && req.cookies.user_sid) {
            res.clearCookie('user_sid');
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    });
    //apis
    const bookController = require('../controllers/bookController');
    app.get('/book', bookController.getBookList);
    app.post('/book', bookController.addBook);
    app.put('/book/:bookId', bookController.editUser);
    app.delete('/book/:bookId', bookController.deleteBook);

    // Handle 404
    app.use(function(req, res) {
        res.status(400).render('PageNotFound', {
            i18n: res,
            errorCode: '404',
            errorMessage: 'Page Not Found'
        });
    });

    // Handle 500
    app.use(function(error, req, res, next) {
        console.log(error);
        res.status(500).render('500Error', {
            i18n: res,
            errorCode: '500',
            errorMessage: 'Internal Server Error',
            error: error
        });
    });
} /*module*/