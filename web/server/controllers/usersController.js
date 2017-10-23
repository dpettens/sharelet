'use strict';

/**
 * Module dependencies.
 * @private
 */

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
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
            return next({
                status: 500,
                message: 'Authentication failed. Error with the database.',
                log: error
            });

        if (!user)
            return next({
                status: 404,
                message: 'Authentication failed. User not found.'
            });

        if (!user.validPassword(req.body.password))
            return next({
                status: 400,
                message: 'Authentication failed. Wrong password.'
            });

        // Create the JWT token and send it
        jwt.sign(user.plain(), config.app.secret, {}, (error, token) => {
            if(error)
                return next({
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
/**
 * Add an outlet to an account
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
 *
 * Body :
 * {
 *   "outlet_id" : string,
 *   "pwd" : string
 * }
 *
 */

exports.addOutlet = function(req, res, next){
    console.log('req.body.outlet_id = '+req.body.outlet_id);
    let md5hash = crypto.createHash('md5').update(req.body.outlet_id).digest('base64');
    console.log(md5hash);
    let hash = crypto.createHash('sha256').update(config.salt+md5hash+config.salt).digest('base64');
    console.log(hash);
    let pwd = hash.substring(0, 5);
    console.log(pwd);
    if(req.body.pwd == pwd){
        User.findByUserID(req.key, [], (err, user) => {
            if (err)
                return next({
                    status: 500,
                    message: 'Save failed. Error with the database.',
                    log: err
                });
            user.addOutlet(req.body.outlet_id, (error, done) => {
                if(error)
                    return next({
                        status: 500,
                        message: 'Save failed. Error with the database.',
                        log: error
                    });

                return res.status(201).end();
            });
        });
    }else{
        return next({
            status: 401,
            message: 'Bad outlet password',
            log: null
        });
    }
}

/**
 * Remove an outlet from an account
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

exports.deleteOutlet = function(req, res, next){
    User.findByUserID(req.key, [], (err, user) => {
        if (err)
            return next({
                status: 500,
                message: 'Save failed. Error with the database.',
                log: err
            });
        user.deleteOutlet(req.params.id, function(error, done){
            if(error)
                return next({
                    status: 500,
                    message: 'Save failed. Error with the database.',
                    log: error
                });

            res.status(200).end();
        });
    });
}

exports.getOutlets = function(req, res, next){
    User.findByUserID(req.key, ['outlets'], (err, outlets) => {
        if (err)
            return next({
                status: 500,
                message: 'Save failed. Error with the database.',
                log: err
            });
        return res.status(200).json(outlets);
    });
}
