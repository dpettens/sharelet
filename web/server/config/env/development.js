'use strict';

exports.app = {
    secret : 'DEV-SECRET',
    salt : 'auth-sharelet',
};

exports.database = {
    contactPoints : ['192.168.2.5', '192.168.2.6', '192.168.2.7'],
    keyspace: 'sharelet_dev',
    username : 'cassandra',
    password : 'cassandra'
};

exports.ws = {
    appEndpoint : 'ws://127.0.0.1:3001'
};

exports.server = {
    port: '8080'
};
