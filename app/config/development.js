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
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: "sharelet.noreply@gmail.com",
    pass: "p4vXakN3"
  }
};

exports.wsFromAPI = {
  port : '3001'
};

exports.wsFromClients = {
  port : '4242'
};
