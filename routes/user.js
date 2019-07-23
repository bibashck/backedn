const express = require('express');
var JobPost = require('../models/Users');
var verify = require('../verify');

const router = express.Router();

//CRUD functions of models data here....
router.route('/')
.get((req, res, next) => {

    console.log(req.user.id);
    JobPost.find({})
        .then((posts) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(posts);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post((req, res, next) => {

    req.body.userid=req.user.id;
//    res.send(req.body);
JobPost.create(req.body)
        .then((post) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(post);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported!');
})
.delete((req, res, next) => {
    JobPost.deleteMany({})
        .then((reply) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(reply);
        }, (err) => next(err))
        .catch((err) => next(err));
});


    router.route('/findmyonlydata')
    .get((req, res, next) => {

        console.log(req.user.id);
        JobPost.findById(req.user.id)
            .then((post) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(post);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    router.route('/:id')
    .get((req, res, next) => {

        console.log(req.user.id);
        JobPost.findById(req.params.id)
            .then((post) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(post);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported!");
    })
    router.route('/updatemydata')
    .put((req, res, next) => {

        console.log(req.body);
        console.log("--------------------------------------");
        console.log(req.params.id);
        console.log("--------------------------------------");

        JobPost.findByIdAndUpdate(req.user.id, { $set: req.body }, { new: true, useFindAndModify: false })
            .then((post) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(post);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        JobPost.findById(req.params.id)
            .then((post) => {

                post.delete()
                    .then((reply) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(reply);
                    })
            }).catch((err) => next(err));

            JobPost.findByIdAndDelete(req.params.id)
            .then((reply) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(reply);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = router