'use strict';

exports.app = {
    secret : process.env.SECRET,
    salt : "auth-sharelet",
};

exports.database = {
    contactPoints : ['127.0.0.1'],
    keyspace: 'sharelet',
    username : 'cassandra',
    password : 'cassandra'
};

exports.server = {
    port: '8080'
};
