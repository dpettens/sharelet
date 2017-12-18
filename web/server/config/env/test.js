'use strict';

exports.app = {
    secret : 'TEST-SECRET',
    salt : 'auth-sharelet',
};

exports.database = {
    contactPoints : ['192.168.2.5', '192.168.2.6', '192.168.2.7'],
    keyspace: 'sharelet_test',
    username : 'cassandra',
    password : 'cassandra'
};

exports.ws = {
    appEndpoint : '127.0.0.1'
};

exports.server = {
    port: '8080'
};
