'use strict';
const model = require('../models');

module.exports.addBook = function (req, res) {
    //console.log(req.body);
    var postData = {
    	id: req.body.id,
        name: req.body.name,
        author: req.body.author,
        publication: req.body.publication,
        genre: req.body.genre,
        dateBought: req.body.dateBought,
        dateRead: req.body.dateRead,
        review: req.body.review
    }

    model.book.create(postData)
        .then(function (results) {
            var response = {
                "status": 2005,
                "code": 200,
                "description": "OK",
                "message": "Successfully created!",
                "uri": "/book"
            }
            response.result = results
            res.status(200)
                .send(response);
        })
        .catch(function (error) {
            console.log("error in create book: ", error);
            if(error.name && error.name === "SequelizeValidationError") {
                var response = { 
                    message: error.errors[0].message
                };
                res.status(403).send(response);
            }
            else if (error.name && error.name == "SequelizeUniqueConstraintError") {
                var response = {
                    "status": 1062,
                    "code": 403,
                    "description": "Duplicate",
                    "message": "This book is already registered.",
                    "uri": "/book",
                    "result": []
                }
                res.status(403).send(response);
            } else {
                var response = {
                    "status": 1002,
                    "code": 403,
                    "description": "Forbidden",
                    "message": "DBMS Unknown error!\nPlease report the problem.",
                    "uri": "/book/",
                    "result": []
                }
                res.status(403).send(response);
            }
        });
};
module.exports.getBookList = function (req, res, con) {

    model.book.findAll()
        .then(function (results) {
            var response = {
                "status": 2000,
                "code": 200,
                "description": "OK",
                "message": "Successfully Retrieved!",
                "uri": "/book/"
            }
            response.result = results;
            res.status(200)
                .send(response);
        })
        .catch(function (error) {
            var response = {
                "status": 1002,
                "code": 403,
                "description": "Forbidden",
                "message": "DBMS Unknown error!\nPlease report the problem.",
                "uri": "/book/",
                "result": []
            }
            res.status(403).send(response);
        });
};
module.exports.deleteBook = function (req, res) {
    model.book.destroy({
        where: {
            id: req.params.bookId
        }
    }).then(function (result) {
        if (result == 0) {
            var response = {
                "status": 3135,
                "code": 404,
                "description": "Not Found",
                "message": "There is no such Book!",
                "uri": "/book/:bookId",
                "result": []
            }
            res.status(404)
                .send(response);
        } else {
            var response = {
                "status": 2006,
                "code": 200,
                "description": "OK",
                "message": "Successfully deleted!",
                "uri": "book/:bookId",
                "result": []
            }
            res.status(200)
                .send(response);
        }
    }).catch(function (error) {
        var response = {
            "status": 1002,
            "code": 403,
            "description": "Forbidden",
            "message": "DBMS Unknown error!\nPlease report the problem.",
            "uri": "/book/:bookId",
            "result": []
        }
        res.status(403).send(response);
    });

};

module.exports.editUser = function (req, res) {

    var updateData = {};
    if (req.body.id){
    	updateData.id = req.body.id;
    }
    if (req.body.name) {
        updateData.name = req.body.name;
    }
    if (req.body.author) {
        updateData.author = req.body.author;
    }
    if (req.body.publication) {
        updateData.publication = req.body.publication;
    }
    if (req.body.genre) {
        updateData.genre = req.body.genre;
    }
    if (req.body.dateBought) {
        updateData.dateBought = req.body.dateBought;
    }
    if (req.body.dateRead) {
        updateData.dateRead = req.body.dateRead;
    }
    if (req.body.review) {
        updateData.review = req.body.review;
    }

    model.book.find({
        where: {
            id: req.params.bookId
        }
    }).then(function (results) {
            if (results) {
                results.updateAttributes(updateData).then(function (updatedBook) {
                    //console.log('centraluser updated');
                    var response = {
                        "status": 2000,
                        "code": 200,
                        "description": "OK",
                        "message": "Successfully Updated! ",
                        "uri": "api/v1/centralUser/userId"
                    }
                    response.result = [updatedBook.get({plain: true})];
                        res.status(200)
                            .send(response);
                }).catch(function (error) {
                    console.log(error);
                });
            } else {
                var response = {
                    "status": 3135,
                    "code": 404,
                    "description": "Not Found",
                    "message": "There is no such Book!",
                    "uri": "api/v1/centralUser/userId",
                    "result": []
                }
                res.status(404)
                    .send(response);
            }
        }).catch(function (error) {
            console.log(error);
            response = {
                "status": 1002,
                "code": 403,
                "description": "Forbidden",
                "message": "DBMS Unknown error!\nPlease report the problem.",
                "uri": "api/v1/centralUser/userId",
                "result": []
            }
            res.status(403).send(response);
        });
}