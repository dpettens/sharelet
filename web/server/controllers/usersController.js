'use strict';

/**
 * Module dependencies.
 * @private
 */

const jwt    = require('jsonwebtoken');
const crypto = require('crypto');

const config          = require('../config/env');
const Outlet          = require('../models/outlet');
const User            = require('../models/user');
const UserCredentials = require('../models/userCredentials');
const wsApi           = require('../libs/wsApi');

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

exports.authenticate = (req, res, next) => {
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

exports.addUser = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return next({
            status: 400,
            message: 'Missing fields email or password.',
        });
    }

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
 * Get an outlet to an account
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

exports.getOutlets = (req, res, next) => {
    User.findByUserID(req.key, ['outlets'], (err, user) => {
        if (err)
            return next({
                status: 500,
                message: 'Fetch failed. Error with the database.',
                log: err
            });

        let doneCnt = 0;
        let result = [];

        if(user.outlets == null){
            return res.json([]);
        }

        user.outlets.forEach((outlet) => {
            let model = new Outlet({outlet_id: outlet});

            model.getAlias((error, alias) => {
                if (error)
                    return next({
                        status: 500,
                        message: 'Fetch failed. Error with the database.',
                        log: error
                    });

                doneCnt++;
                result.push({id: outlet, alias: alias.alias});

                if(doneCnt == user.outlets.length)
                    return res.status(200).json(result);
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

exports.addOutlet = (req, res, next) => {
    const md5hash = crypto.createHash('md5').update(req.body.outlet_id).digest('base64');
    const hash = crypto.createHash('sha256').update(config.app.salt + md5hash + config.app.salt).digest('base64');
    const pwd = hash.substring(0, 5);
    console.log(req.body.outlet_id, config.app.salt, pwd);

    if(req.body.pwd == pwd)
    {
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
    }
    else
    {
        return next({
            status: 401,
            message: 'Bad outlet password'
        });
    }
}

/**
 * Update an outlet from an account
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

exports.updateOutlet = (req, res, next) => {
    User.findByUserID(req.key, ['outlets'], (err, user) => {
        if (err)
            return next({
                status: 500,
                message: 'Fetch failed. Error with the database.',
                log: err
            });

        if(user.outlets.indexOf(req.params.id) > -1)
        {
            let outlet = new Outlet({outlet_id: req.params.id});

            outlet.setAlias(req.body.alias, (error, result) => {
                if (error)
                    return next({
                        status: 500,
                        message: 'Save failed. Error with the database.',
                        log: error
                    });

                return res.status(201).end();
            });
        }
        else
        {
            return next({
                status: 500,
                message: 'Unauthorized. User doesn\'t own this outlet',
                log: err
            });
        }
    });
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

exports.deleteOutlet = (req, res, next) => {
    User.findByUserID(req.key, [], (err, user) => {
        if (err)
            return next({
                status: 500,
                message: 'Save failed. Error with the database.',
                log: err
            });

        user.deleteOutlet(req.params.id, (error, done) => {
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

/**
 * Delete the current user
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

exports.delete = (req, res, next) => {
    User.findByUserID(req.key, [], (err, user) => {
        if (err)
            return next({
                status: 500,
                message: 'Error with the database.',
                log: err
            });

        user.delete((error) => {
            if(error)
                return next({
                    status: 500,
                    message: 'Error with the database while deleting user.',
                    log: error
                });

            let synthetic_userCreds = new UserCredentials({email : user.email});
            synthetic_userCreds.delete((error) => {
                if(error)
                    return next({
                        status: 500,
                        message: 'Error with the database while deleting usercreds.',
                        log: error
                    });

                res.status(200).end();
            });
        });
    });
}

/**
 * Update the user first name and last name
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

exports.update = (req, res, next) => {
    User.findByUserID(req.key, [], (err, user) => {
        if (err)
            return next({
                status: 500,
                message: 'Error with the database.',
                log: err
            });

        user.lastname = req.body.lastname;
        user.firstname = req.body.firstname;

        user.update((err) => {
            if(err)
                return next({
                    status: 500,
                    message: 'Error with the database.',
                    log: err
                });

            res.status(200).end();
        });
    });
}

/**
 * Get user profile
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

exports.get = (req, res, next) => {
    User.findByUserID(req.key, [], (err, user) => {
        if (err)
            return next({
                status: 500,
                message: 'Fetch failed. Error with the database.',
                log: err
            });

        res.json(user);
    });
}

exports.sendCmd = (req, res, next) => {
    User.findByUserID(req.key, ['outlets'], (err, user) => {
        if (err)
            return next({
                status: 500,
                message: 'Send command failed. Error with the database.',
                log: err
            });

        if(user.outlets.indexOf(req.params.id) > -1)
        {
            wsApi.getInstance((err, connexion) => {
                if (err)
                    return next({
                        status: 500,
                        message: 'Send command failed. Error with the websocket.',
                        log: err
                    });

                req.body.target = req.params.id;
                connexion.send(JSON.stringify(req.body));
                return res.status(200).end();
            });
        }
        else
        {
            return next({
                status: 500,
                message: 'Unauthorized. User doesn\'t own this outlet',
                log: err
            });
        }
    });
}
