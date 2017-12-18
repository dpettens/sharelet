'use strict';

/**
 * Module dependencies.
 * @private
 */

const jwt    = require('jsonwebtoken');
const unless = require('express-unless');

const config          = require('../config/env');
const UserCredentials = require('../models/userCredentials');

/**
 * Auth Middelware to protect sensitive routes with jwt and/or id user
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

const auth = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token)
        return res.status(401).json({
            message: 'Authorization failed. Invalid token.'
        });

    jwt.verify(token, config.app.secret, (error, decoded) => {
        if (error)
            return res.status(400).json({
                message: 'Authorization failed. Error with the token.'
            });

        UserCredentials.findByEmail(decoded.email, ['email'], (error, user) => {
            if (error)
                return res.status(500).json({
                    message: 'Authorization failed. Error with the database.'
                });

            if (!user)
                return res.status(404).json({
                    message: 'Authorization failed. User with the key not found.'
                });

            // save key for use in other routes
            req.key = decoded.userid;
            next();
        });
    });
};

/*
 * Add unless function to the Middelware for bypass the auth for some routes
 */

auth.unless = unless;

/**
 * Module exports.
 * @public
 */

module.exports = auth;
