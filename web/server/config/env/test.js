'use strict';

exports.app = {
    secret : 'TEST-SECRET',
    salt : "auth-sharelet",
};

exports.database = {
    contactPoints : ['192.168.2.5', '192.168.2.6', '192.168.2.7'],
    keyspace: 'sharelet_test',
    appEndpoint : '192.168.2.8',
    username : 'cassandra',
    password : 'cassandra'
};

exports.server = {
    port: '8081'
};
