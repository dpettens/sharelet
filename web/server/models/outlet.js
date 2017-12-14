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
        this.settings  = {};
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

    getSettings(next){
        cassandra.getConnection((error, client) => {
            if(error)
                return next(error);

            const GET_ALERTS_CQL = "SELECT * FROM outlets_alert WHERE outlet_id = '" + this.outlet_id + "'";
            client.execute(GET_ALERTS_CQL, (error, results) => {
                if(error)
                    return next(error);

                if(results.rows.length == 0)
                    return next(null, null);

                let settings = results.rows[0];

                let formatted = this.settings = {
                    "enabled" : settings.enabled,
                    "low": settings.low, //En watt
                    "high": settings.high, //En watt
                    "startTime": {"hour" : settings.start_time.hour, "minute": settings.start_time.minute},
                    "startTime": {"hour" : settings.end_time.hour, "minute": settings.end_time.minute},
                    "days": settings.day
                }

                next(null, formatted);
            });
        });
    }

    updateSettings(settings, next){
        cassandra.getConnection((error, client) => {
            if(error)
                return next(error);

            const UPDATE_ALERTS_CQL = "UPDATE outlets_alert SET enabled = "+settings.enabled+", low = "+settings.low+", high = "+settings.high+", start_time = '"+settings.start_time.hour+":"+settings.start_time.minute+":00.000', end_time = '"+settings.start_time.hour+":"+settings.start_time.minute+":00.000', days = "+settings.days+" WHERE outlet_id = '" + this.outlet_id + "'";
            client.execute(UPDATE_ALERTS_CQL, (error, results) => {
                if(error)
                    return next(error);

                return next(null, true);

                let settings = results.rows[0];
            });
        });
    }
}

/**
 * Module exports.
 * @public
 */

module.exports = Outlet;