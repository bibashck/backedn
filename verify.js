module.exports = function (req, res, next) {
    console.log(req.user);
    if (!req.user) {
        let err = new Error('You are not authenticated!');
        err.status = 403;
        return next(err);
    } else {
        next();
    }
}

module.exports.admin = function (req, res, next) {
    console.log(req.user);

    if (req.user.admin==true) {
        next();
        
    } else {
        let err = new Error('You are not admin');
        err.status = 403;
        return next(err);

    }
}

module.exports.publisher = function (req, res, next) {
    console.log(req.user);

    if (req.user.publisher==true) {
        next();

    } else {
        let err = new Error('You are not publisher');
        err.status = 403;
        return next(err);
    }
}