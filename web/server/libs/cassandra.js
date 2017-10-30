"use strict";

/**
 * Module dependencies.
 * @private
 */

const cassandra = require('cassandra-driver');
const config    = require('../config/env');

/**
 * Module variables.
 * @private
 */

const cassAuth = new cassandra.auth.PlainTextAuthProvider(
    config.database.username,
    config.database.password
);

const client   = new cassandra.Client({ 
    contactPoints: config.database.contactPoints, 
    keyspace:      config.database.keyspace, 
    authProvider : cassAuth 
});

/**
 * Get a connection to the database
 * @public
 */

exports.getConnection = (next) => {
    client.connect((error) => {
        if (error)
            next(error);

        next(null, client);
    });
};
