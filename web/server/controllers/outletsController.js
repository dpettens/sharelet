'use strict';

/**
 * Module dependencies.
 * @private
 */

const Outlet = require('../models/outlet.js');

/**
 * Get data from an outlet
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

exports.getData = (req, res, next) => {
    let outlet = new Outlet({outlet_id: req.params.id});
    
    outlet.getData(req.params.date, (err, data) => {
        if (err)
            return next({
                status: 500,
                message: 'Fetch failed. Error with the database.',
                log: err
            });

        return res.status(200).json(data);
    })
}

exports.getAlertSettings = (req, res, next) => {
    let outlet = new Outlet({outlet_id: req.params.id});
    outlet.getSettings((err, data) => {
        if (err)
            return next({
                status: 500,
                message: 'Fetch failed. Error with the database.',
                log: err
            });

        return res.status(200).json(data);
    })
}