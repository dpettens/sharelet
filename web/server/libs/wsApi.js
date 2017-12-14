const WebSocket = require('ws');
const config    = require('../config/env');


var singletonWS = null;

var getInstance = function(){
	if(singletonWS == null){
		singletonWS = new WebSocket(config.database.appEndpoint);
	}
	return singletonWS;
}

module.exports = getInstance();
