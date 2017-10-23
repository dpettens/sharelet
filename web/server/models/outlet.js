"use strict";

/**
 * Module dependencies.
 * @private
 */

const cassandra = require('../libs/cassandra');

/**
 * Outlet Model
 * @public
 */

class Outlet {
    constructor(outlet) {
        this.outlet_id = outlet.outlet_id;
    }

    getData(day, next) {
    	cassandra.getConnection((error, client) => {
            if(error)
                return next(error);

            const GET_DATA = "SELECT sensor_type, event_time, sensor_value FROM sharelet.consumption_by_day WHERE outlet_id = '"+this.outlet_id+"' AND date = '"+day+"'";
            console.log(GET_DATA);
            client.execute(GET_DATA, (error, results) => {
                if(error)
                    return next(error);

                next(null, results.rows);
            });
        });
    }
}

/**
 * Module exports.
 * @public
 */

module.exports = Outlet;