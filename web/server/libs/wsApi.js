const WebSocket = require('ws');
const config    = require('../config/env');

let singletonWS = null;

exports.getInstance = next => {
    if(singletonWS == null) {
        try {
            singletonWS = new WebSocket(config.ws.appEndpoint);
        }
        catch(error) {
            next(error);
        }
  }

    next(null, singletonWS);
};
