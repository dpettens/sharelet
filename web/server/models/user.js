"use strict";

/**
 * Module dependencies.
 * @private
 */

const cassandra = require('../libs/cassandra');

/**
 * User Model
 * @public
 */

class User {
    constructor(user) {
        this.userid       = user.userid;
        this.firstname    = user.firstname;
        this.lastname     = user.lastname;
        this.email        = user.email;
        this.created_date = user.created_date;
        this.outlets      = user.outlets;
    }

    delete(next) {
        cassandra.getConnection((error, client) => {
            if (error)
                return next(error);

            const DELETE_OUTLET_CQL = "DELETE FROM users WHERE userid = "+this.userid;
            client.execute(DELETE_OUTLET_CQL, (error, results) => {
                if (error)
                    return next(error);

                next(null);
            });
        });
    }

    save(next) {
        this.created_date = Date.now();

        cassandra.getConnection((error, client) => {
            if (error)
                return next(error);

            const ADD_USER_CQL = "INSERT INTO users (userid, firstname, lastname, email, created_date, outlets) VALUES (?, ?, ?, ?, ?, {})";
            client.execute(ADD_USER_CQL, this, { prepare: true }, (error, results) => {
                if (error)
                    return next(error);

                next(null);
            });
        });
    }

    update(next){
        cassandra.getConnection((error, client) => {

            if (error)
                return next(error);

            const ADD_USER_CQL = "UPDATE users SET firstname = ?, lastname = ? WHERE userid = "+this.userid;
            client.execute(ADD_USER_CQL, [this.firstname, this.lastname], { prepare: true }, (error, results) => {
                if (error){
                    console.log(error, results);
                    return next(error);
                }

                next(null);
            });
        });
    }

    addOutlet(outlet_id, next){
        cassandra.getConnection((error, client) => {
            if(error)
                return next(error);

            const ADD_OUTLET_CQL = "UPDATE users SET outlets = outlets + {'" + outlet_id + "'} WHERE userid = " + this.userid;
            client.execute(ADD_OUTLET_CQL, (error, results) => {
                if(error)
                    return next(error);

                next(null, true);
            });
        });
    }

    deleteOutlet(outlet_id, next){
        cassandra.getConnection((error, client) => {
            if (error)
                return next(error);

            const DELETE_OUTLET_CQL = "UPDATE users SET outlets = outlets - '" + outlet_id + "' WHERE userid = '" + this.userid + "'";
            client.execute(DELETE_OUTLET_CQL, (error, results) => {
                if (error)
                    return next(error);

                next(null);
            });
        });
    }

    static findByUserID(id, fields, next) {
        if (fields.length === 0)
            fields = [
                'userid',
                'firstname',
                'lastname',
                'email',
                'created_date',
                'outlets'
            ];

        cassandra.getConnection((error, client) => {
            if (error)
                return next(error);

            const FIND_USER_CQL = "SELECT " + fields.toString() + " FROM users WHERE userid = " + id;
            client.execute(FIND_USER_CQL, (error, results) => {
                if (error)
                    return next(error);

                if (results.rowLength === 0)
                    return next(null, false);

                // Fix bad cassandra return for uuid
                if(results.rows[0].userid)
                    results.rows[0].userid = results.rows[0].userid.toString();

                next(null, new User(results.rows[0]));
            });
        });
    }
}

/**
 * Module exports.
 * @public
 */

module.exports = User;
