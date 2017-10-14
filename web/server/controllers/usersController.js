'use strict';

/**
 * Module dependencies.
 * @private
 */

const jwt = require('jsonwebtoken');
const config = require('../config/env');
const UserCredentials = require('../models/userCredentials');
const User = require('../models/user');

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

exports.authenticate = function(req, res, next) {
    UserCredentials.findByEmail(req.body.email, [
        'userid',
        'email',
        'password'
    ], (error, user) => {
        if (error)
            next({
                status: 500,
                message: 'Authentication failed. Error with the database.',
                log: error
            });

        if (!user)
            next({
                status: 404,
                message: 'Authentication failed. User not found.'
            });

        if (!user.validPassword(req.body.password))
            next({
                status: 400,
                message: 'Authentication failed. Wrong password.'
            });

        // Create the JWT token and send it
        jwt.sign(user.plain(), config.app.secret, {}, (error, token) => {
            if(error) 
                next({
                    status: 500,
                    message: 'Authentication failed. Error with the jwt creation.',
                    log: error
                });
            
            return res.status(200).json({
                token: token
            });
        });
    });
}

/**
 * Create a new user if there is no other user with this email
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

exports.new = function (req, res, next) {
    UserCredentials.findByEmail(req.body.email, ['email'], (error, result) => {
        if (error)
            return next({
                status: 500,
                message: 'Save failed. Error with the database.',
                log: error
            });

        if (result)
            return next({
                status: 409,
                message: 'Save failed. User already exists.'
            });

        let userCredentials = new UserCredentials({
            email: req.body.email,
            password: req.body.password
        });

        userCredentials.save((error, creds) => {
            if (error)
                return next({
                    status: 500,
                    message: 'Save failed. Error with the database.',
                    log: error
                });

            let user = new User({
                userid: creds.userid,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email
            });

            user.save((error) => {
                if (error)
                    return next({
                        status: 500,
                        message: 'Save failed. Error with the database.',
                        log: error
                    });

                return res.status(201).end();
            });
        });
    });
}