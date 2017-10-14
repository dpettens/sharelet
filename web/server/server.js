'use strict';

/**
 * Module dependencies.
 * @private
 */

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./config/routes');
const auth = require('./libs/auth');
const serverOptions = require('./config/env').server;

/**
 * Module variables.
 * @private
 */

let app = express();

/**
 * Module exports.
 * @public
 */

module.exports = app;

/**
 * Use bodyParser middelware to get the data from a POST/PUT
 */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Use morgan logger to log on the console
 */

app.use(morgan('dev'));

/** 
 * Set the port
 */

app.set('port', serverOptions.port);

/**
 * Auth Middelware to protect sensitive routes with jwt and/or id user
 * Some routes are not protected via the unless middelware
 */

app.use('/api/v1', auth.unless({
    path: [{
        url: '/api/v1/authenticate',
        methods: ['POST']
    }, {
        url: '/api/v1/users',
        methods: ['POST']
    }]
}));

/**
 * Bind all routes to the app
 */

app.use('/api/v1', routes);

/**
 * Catch 404 and forward to error handler
 */

app.use(function(req, res, next) {
    next({
        status: 404,
        message: 'Api URL non trouvée :('
    });
});

/**
 * Error Handler Function
 */

app.use(function(err, req, res, next) {
    if(app.get('env') === 'production')
        delete err.log;

    return res.status(err.status).json(err);
});

/**
 * Start the server
 */

app.listen(app.get('port'), () => {
    console.log('App listening on port ' + app.get('port'));
});
