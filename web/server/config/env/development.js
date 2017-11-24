'use strict';

exports.app = {
    secret : 'DEV-SECRET',
    salt : 'auth-sharelet',
};

exports.database = {
    contactPoints : ['127.0.0.1'],
    keyspace: 'sharelet',
    username : 'cassandra',
    password : 'cassandra'
};

exports.ws = {
    appEndpoint : '192.168.2.8'
};

exports.server = {
    port: '8080'
};
