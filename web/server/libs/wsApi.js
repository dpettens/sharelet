const WebSocket = require('ws');
const config    = require('../config/env');

let singletonWS = null;

exports.getInstance = next => {
    if(singletonWS == null) {
        try {
            singletonWS = new WebSocket(config.ws.appEndpoint);
            singletonWS.on('open', () => {
                return next(null, singletonWS);
            });
        }
        catch(error) {
            next(error);
        }
   } else {
        return next(null, singletonWS);
    }
};
