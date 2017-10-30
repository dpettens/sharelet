'use strict';

/**
 * Module dependencies.
 * @private
 */

const express = require('express');

const usersController   = require('../../controllers/usersController');
const outletsController = require('../../controllers/outletsController');

/**
 * Module variables.
 * @private
 */

let router = express.Router();

/*
 * Api routes
 */

router.route('/authenticate')
    .post(usersController.authenticate);

router.route('/users')
    .post(usersController.addUser);

// router.route('/users/:id')
//    .get(userController.get)
//    .put(userController.update)
//    .delete(userController.delete);

router.route('/users/outlets')
    .get(usersController.getOutlets)
    .post(usersController.addOutlet)

router.route('/users/outlets/:id')
    .put(usersController.updateOutlet)
    .delete(usersController.deleteOutlet);

router.route('/outlets/:id/data/:date')
    .get(outletsController.getData)

/*
 * Catch 404 and forward to error handler
 */

router.use(function(req, res, next) {
    next({
        status: 404,
        message: 'Api URL non trouvée :('
    });
});

/*
 * Error Handler Function
 */

router.use(function(err, req, res, next) {
    if(err.status <= 100 && err.stats > 600) 
        err.status = 500;
    
    if(req.app.get('env') === 'production')
        delete err.log;

    return res.status(err.status).json(err);
});

/**
 * Module exports.
 * @public
 */

module.exports = router;