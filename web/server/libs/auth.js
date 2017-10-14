'use strict';

/**
 * Module dependencies.
 * @private
 */

const jwt = require('jsonwebtoken');
const unless = require('express-unless');
const config = require('../config/env');
const UserCredentials = require('../models/userCredentials');

/**
 * Auth Middelware to protect sensitive routes with jwt and/or id user
 */

function auth(req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

    if (!token)
        return res.status(401).json({
            error: 'Authorization failed. Invalid token.'
        });

    jwt.verify(token, config.app.secret, (error, decoded) => {
        if (error)
            return res.status(400).json({
                error: 'Authorization failed. Error with the token.'
            });

        UserCredentials.findByEmail(decoded.email, ['email'], (error, user) => {
            if (error)
                return res.status(500).json({
                    error: 'Authorization failed. Error with the database.'
                });

            if (!user)
                return res.status(404).json({
                    error: 'Authorization failed. User with the key not found.'
                });

            // save key for use in other routes
            req.key = decoded.userid;
            next();
        });
    });
}

/**
 * Add unless function to the Middelware for bypass the auth for some routes
 */

auth.unless = unless;

/**
 * Module exports.
 * @public
 */

module.exports = auth;
