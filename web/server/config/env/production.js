'use strict';

exports.app = {
    secret : process.env.SECRET,
    salt : process.env.SALT,
};

exports.database = {
    contactPoints : ['192.168.2.5', '192.168.2.6', '192.168.2.7'],
    keyspace: 'sharelet',
    username : 'cassandra',
    password : 'cassandra'
};

exports.ws = {
    appEndpoint : 'ws://192.168.2.8:3001'
};

exports.server = {
    port: '80'
};
