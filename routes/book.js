var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/Book.js');
var Author = require('../models/Author.js');

/* GET ALL BOOKS */
router.get('/', function(req, res, next) {
    Book.find(function(err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function(req, res, next) {
    Book.findById(req.params.id, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

//Create BOOK
router.post('/', function(req, res, next) {

    var book = new Book();

    book.isbn = req.body.isbn;
    book.title = req.body.title
    book.description = req.body.description
    book.published_year = req.body.published_year
    book.publisher = req.body.publisher

    book.save(function(err) {
        if (err) return next(err);
        Book.find().populate('Author')
            .exec(function(err, book) {
                if (err) return next(err);
                res.json(book)
            })

    });
});

/* DELETE BOOK */
router.delete('/:id', function(req, res, next) {
    Book.findByIdAndRemove(req.params.id, req.body, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE BOOK */
router.put('/:id', function(req, res, next) {
    Book.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET ALL AUTHORs */
router.get('/author', function(req, res, next) {
    Author.find(function(err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

/* ADD AUTHOR TO BOOK */
router.post('/:bookId/author', function(req, res, next) {

    console.log("Adding author to Book");

    var author = new Author();

    Book.findById(req.params.bookId).exec(function(err, Book) {

        if (err) return next(err);

        if (!Book) { return next(new Error("Can\'t find Book")) }

        author.firstname = req.body.firstname;
        author.lastname = req.body.lastname;

        author.save(function(err, author) {
            console.log("was here in author save")
            if (err) return next(err);
            Book.authors.push(author)
            Book.save(function(err, book) {
                if (err) return next(err);
                res.json(book)
            })
        })
    });
});


/* DELETE AUTHOR TO BOOK*/
router.delete('/author/:authorid', function(req, res, next) {
    console.log("Deleting author to Book");

    var author = new Author();

    Author.findByIdAndRemove((req.params.authorid), function(err, Author) {

        if (err) return next(err);

        if (!Author) { return next(new Error("Can\'t find Book Author")) }

        Book.update({ authors: Author._id }, { $pull: { authors: Author._id } },
            function(err, numberAffected) {
                res.json(numberAffected);

            });



    });
});


module.exports = router