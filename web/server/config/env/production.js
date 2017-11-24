'use strict';

exports.app = {
    secret : process.env.SECRET,
    salt : "auth-sharelet",
};

exports.database = {
    contactPoints : ['192.168.2.5', '192.168.2.6', '192.168.2.7'],
    keyspace: 'sharelet',
    username : 'cassandra',
    password : 'cassandra'
};

exports.ws = {
    appEndpoint : '192.168.2.8'
};

exports.server = {
    port: '80'
};
