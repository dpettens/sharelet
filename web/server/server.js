'use strict';

/**
 * Module dependencies.
 * @private
 */

const bodyParser  = require('body-parser');
const compression = require('compression');
const express     = require('express');
const morgan      = require('morgan');
const path        = require('path');

const apiRoutes     = require('./config/routes/api');
const auth          = require('./libs/auth');
const serverOptions = require('./config/env').server;

/**
 * Module variables.
 * @private
 */

let app = express();

/*
 * Use bodyParser middelware to get the data from a POST/PUT.
 */

app.use(bodyParser.json());

/*
 * Use morgan logger to log on the console.
 */

app.use(morgan('dev'));

/*
 * Compress all responses bodies.
 */

app.use(compression());

/*
 * Disable caching
 */
app.disable('etag');

/*
 * Configuration of static files.
 */

app.use(express.static(path.resolve('../client/build/')));

/*
 * Auth Middelware to protect sensitive routes with jwt and/or id user.
 * Some routes are not protected via the unless middelware.
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

/*
 * Bind all api routes to the app.
 */

app.use('/api/v1', apiRoutes);

/*
 * Bind all other routes to the react client app.
 */

app.get('/*', (req, res, next) => {
    return res.sendFile(path.resolve('../client/build/index.html'));
});

/*
 * Set the port.
 */

app.set('port', serverOptions.port);

/*
 * Start the server.
 */

app.listen(app.get('port'), () => {
    console.log('App listening on port ' + app.get('port'));
});


module.exports = app; //for testing
