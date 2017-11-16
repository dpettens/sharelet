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
        this.alias     = null;
    }

    getData(day, next) {
    	cassandra.getConnection((error, client) => {
            if(error)
                return next(error);

            const GET_DATA_CQL = "SELECT sensor_type, event_time, sensor_value FROM consumption_by_day WHERE outlet_id = '" + this.outlet_id + "' AND date = '" + day + "'";
            client.execute(GET_DATA_CQL, (error, results) => {
                if(error)
                    return next(error);

                next(null, results.rows);
            });
        });
    }

    getAlias(next){
    	cassandra.getConnection((error, client) => {
            if(error)
                return next(error);

            const GET_ALIAS_CQL = "SELECT alias FROM outlet_alias WHERE outlet_id = '" + this.outlet_id + "'";
            client.execute(GET_ALIAS_CQL, (error, results) => {
                if(error)
                    return next(error);

                if(results.rows.length == 0)
                	return next(null, null);

                next(null, results.rows[0]);
            });
        });
    }

    setAlias(alias, next){
    	cassandra.getConnection((error, client) => {
            if(error)
                return next(error);

            const UPDATE_ALIAS_CQL = "UPDATE outlet_alias SET alias = '" + alias + "' WHERE outlet_id = '" + this.outlet_id + "'";
            client.execute(UPDATE_ALIAS_CQL, (error, results) => {
                if(error)
                    return next(error);

            	return next(null, true);

            });
        });
    }
}

/**
 * Module exports.
 * @public
 */

module.exports = Outlet;