'use strict';

/**
 * Module dependencies.
 * @private
 */

const express = require('express');
const usersController = require('../controllers/usersController');
const outletsController = require('../controllers/outletsController');

/**
 * Module variables.
 * @private
 */

let router = express.Router();

/**
 * Api routes
 */

router.route('/authenticate')
    .post(usersController.authenticate);

router.route('/users')
    .post(usersController.new);

router.route('/users/outlets')
	.get(usersController.getOutlets)
	.post(usersController.addOutlet)

router.route('/users/outlets/:id')
	.put(usersController.updateOutlet)
	.delete(usersController.deleteOutlet);

router.route('/outlets/:id/data/:date')
 	.get(outletsController.getData)

// router.route('/users/:id')
//    .get(userController.get)
//    .put(userController.update)
//    .delete(userController.delete);



/**
 * Module exports.
 * @public
 */

module.exports = router;
