var express = require('express');
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: './public/cv',
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, file.fieldname + '-' + Date.now() + ext);
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(docx|pptx|pdf|html|txt)$/)) {
        return cb(new Error('You can upload only document files!'), false);
    }
    cb(null, true);
};

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 1000000000000000000000 }
});

var uploadRouter = express.Router();

uploadRouter.route('/')
    .post(upload.single('imageFile'), (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    });
module.exports = uploadRouter;
