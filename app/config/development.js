'use strict';

exports.app = {
  salt : 'auth-sharelet',
};

exports.database = {
  contactPoints : ['192.168.2.5', '192.168.2.6', '192.168.2.7'],
  keyspace: 'sharelet_dev',
  username : 'cassandra',
  password : 'cassandra'
};

exports.smtp = {
  host: '127.0.0.1',
  port: 1025,
  ignoreTLS: true
};

exports.wsFromAPI = {
  host: '127.0.0.1',
  port: '3001'
};

exports.wsFromClients = {
  port : '4242'
};
