'use strict';

/**
 * Module exports.
 * @public
 */

module.exports = (function (env) {
  let config = {};

  switch (env) {
    case 'production':
      config = require('./production');
      break;
    case 'development':
      config = require('./development');
      break;
    default:
      console.error('NODE_ENV environment variable not set');
      process.exit(1);
  }

  return config;
})(process.env.NODE_ENV);
