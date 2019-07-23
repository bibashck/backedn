const express = require('express');
var Publisher = require('../models/Publisher');
// var verify = require('../verify');
var fs = require('fs');
const router = express.Router();

// CRUD functions of models data here....
router.route('/')
.get((req, res, next) => {
    Publisher.find({})
        .then((publishes) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(publishes);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post((req, res, next) => {
req.body.userid=req.user.id;
Publisher.create(req.body)
        .then((publish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(publish);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported!');
})
.delete((req, res, next) => {
    Publisher.deleteMany({})
        .then((reply) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(reply);
        }, (err) => next(err))
        .catch((err) => next(err));
});



    router.route('/:id')
    .get((req, res, next) => {

        console.log(req.user.id);
        Publisher.find({userid:req.user.id})
            .then((publish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(publish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported!");
    })
    .put((req, res, next) => {
        Publisher.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, useFindAndModify: false })
            .then((publish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(publish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Publisher.findById(req.params.id)
            .then((publish) => {
                let path = './public/images/' + publish.image;
                fs.unlink(path, (err) => {
                    if (err) console.log(err);
                })
                publish.delete()
                    .then((reply) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(reply);
                    })
            }).catch((err) => next(err));

            Publisher.findByIdAndDelete(req.params.id)
            .then((reply) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(reply);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

    // yaa dekhi comments ko suru hunx

    router.route('/:id/comments')
    .get((req, res, next) => {
        Publisher.findById(req.params.id)
            .then((publisher) => {
                if (publisher != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(publisher.comments);
                }
                else {
                    err = new Error('Hero ' + req.params.id + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    
    .post((req, res, next) => {
        Publisher.findById(req.params.id)
            .then((publisher) => {
                if (publisher != null) {
                    publisher.comments.push(req.body);
                    publisher.save()
                        .then((publisher) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(publisher);
                        }, (err) => next(err));
                } else {
                    err = new Error('Publisher ' + req.params.id + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = router