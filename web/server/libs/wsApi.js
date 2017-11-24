const WebSocket = require('ws');
const config    = require('../config/env');

var singletonWS = null;

var getInstance = () => {
	if(singletonWS == null) {
		singletonWS = new WebSocket(config.ws.appEndpoint);
    }

	return singletonWS;
};

module.exports = getInstance();
