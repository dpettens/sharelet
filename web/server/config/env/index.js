'use strict';

/**
 * Module exports.
 * @public
 */

module.exports = (function (env) {
    var config = {};

    switch (env) {
        case 'production':
            config = require('./production');
            break;
        case 'development':
            config = require('./development');
            break;
        case 'testing':
            config = require('./testing');
            break;
        case 'staging':
            config = require('./staging');
            break;
        default:
            console.error('NODE_ENV environment variable not set');
            process.exit(1);
    }

    return config;
})(process.env.NODE_ENV);