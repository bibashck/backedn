var express = require('express');
var Comments = require('../models/Comment');

var router = express.Router();

router.route('/')
    .get((req, res, next) => {
        Comments.find({})
            .populate('Publisher', 'name')
            .populate('Seeker', 'name')
            .populate('msg')
            .then((comments) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comments);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        console.log(req.body);
        Comments.create(req.body)
            .then((comment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported!');
    });

router.route('/:id')
    .get((req, res, next) => {
        Comments.findById(req.params.id)
            .populate('Publisher')
            .populate('Seeker')
            .then((comment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported!");
    });

module.exports = router;