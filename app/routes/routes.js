'use strict';
module.exports = function(app, secureRoutes) {
    const path = require('path');

    app.get('/', function(req, res) {
        res.render('books/bookList', {
            i18n: res
        })
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
        res.render('books/bookList', {
            i18n: res
        });
    });

    app.post('/addBook', (req, res) => {
        res.render('books/addbooks', {
            i18n: res
        }); 
    });

    app.post('/editBook', (req, res) => {
        var rowData = JSON.parse(req.body.rowData);
        res.render('books/editabook', {
            i18n: res,
            rowData: rowData
        }); 
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