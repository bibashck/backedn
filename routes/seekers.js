const express = require('express');
var Seeker = require('../models/Seekers');
// var verify = require('../verify');
var fs = require('fs');
const router = express.Router();

//Course CRUD functions of models data here....
router.route('/')
.get((req, res, next) => {
    Seeker.find({})
        .then((seekers) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(seekers);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post((req, res, next) => {
//    res.send(req.body);
Seeker.create(req.body)
        .then((seeker) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(seeker);
        }, (err) => next(err))
        .catch((err) => next(err));
});

// yo update and delete grna na dine 

// .put((req, res, next) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported!');
// })
// .delete((req, res, next) => {
//     Publisher.deleteMany({})
//         .then((reply) => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(reply);
//         }, (err) => next(err))
//         .catch((err) => next(err));
// });

router.route('/:id')
    .get((req, res, next) => {
        Seeker.findById(req.params.id)
            .then((seeker) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(seeker);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported!");
    })
    .put((req, res, next) => {
        Seeker.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, useFindAndModify: false })
            .then((seeker) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(seeker);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Seeker.findById(req.params.id)
            .then((seeker) => {
                let path = './public/images/' + seeker.image;
                fs.unlink(path, (err) => {
                    if (err) console.log(err);
                })
                seeker.delete()
                    .then((reply) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(reply);
                    })
            }).catch((err) => next(err));

            Seeker.findByIdAndDelete(req.params.id)
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
    Seeker.findById(req.params.id)
        .then((seeker) => {
            if (seeker != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(seeker.comments);
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
    Seeker.findById(req.params.id)
        .then((seeker) => {
            if (seeker != null) {
                seeker.comments.push(req.body);
                seeker.save()
                    .then((seeker) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(seeker);
                    }, (err) => next(err));
            } else {
                err = new Error('Seeker ' + req.params.id + ' not found');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
});

module.exports = router