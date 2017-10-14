'use strict';

/**
 * Module dependencies.
 * @private
 */

const express = require('express');
const usersController = require('../controllers/usersController');

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

// router.route('/users/:id')
//     .get(userController.get)
//     .put(userController.update)
//     .delete(userController.delete);

/**
 * Module exports.
 * @public
 */

module.exports = router;
