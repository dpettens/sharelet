'use strict';

/**
 * Module dependencies.
 * @private
 */

const config = require('../config/env');
const Outlet = require('../models/outlet.js');

/**
 * Try to authenticate the user from the email and password passed in the body
 * If the password is valid, create and return a jwt
 *
 * Options:
 *
 *   - `req`  Express request object
 *   - `res`  Express response object
 *   - `next` next middelware to call
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @public
 */

exports.getData = function(req, res, next) {
    console.log(req.params.id);
    var outlet = new Outlet({outlet_id : req.params.id});
    outlet.getData(req.params.date, function(err, data){
        if (err)
            return next({
                status: 500,
                message: 'Fetch failed. Error with the database.',
                log: err
            });
        return res.status(200).json(data);
    })
}