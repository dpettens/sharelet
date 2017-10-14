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
        this.userid = user.userid;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.created_date = user.created_date;
        this.outlets = user.outlets;
    }

    save(next) {
        this.created_date = Date.now();

        cassandra.getConnection((error, client) => {
            if (error)
                return next(error);

            const INSERT_DATA_CQL = "INSERT INTO users (userid, firstname, lastname, email, created_date, outlets) VALUES (?, ?, ?, ?, ?, {})";
            client.execute(INSERT_DATA_CQL, this, { prepare: true }, (error, results) => {
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

            const SELECT_DATA_CQL = "SELECT " + fields.toString() + " FROM users WHERE userid = " + id + "'";
            client.execute(SELECT_DATA_CQL, (error, results) => {
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
