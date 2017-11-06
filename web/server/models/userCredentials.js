"use strict";

/**
 * Module dependencies.
 * @private
 */

const bcrypt = require('bcrypt-nodejs');
const Uuid   = require('cassandra-driver').types.Uuid;

const cassandra = require('../libs/cassandra');

/**
 * UserCredentials Model
 * @public
 */

class UserCredentials {
    constructor(userCredentials) {
        this.userid   = userCredentials.userid;
        this.email    = userCredentials.email;
        this.password = userCredentials.password;
    }

    save(next) {
        this.userid = Uuid.random();
        this.password = this.hashPassword(this.password);

        cassandra.getConnection((error, client) => {
            if (error)
                return next(error);
            
            const SAVE_USERCREDENTIALS_CQL = "INSERT INTO usercredentials (userid, email, password) VALUES (?, ?, ?)";
            client.execute(SAVE_USERCREDENTIALS_CQL, this, { prepare: true }, (error) => {
                if (error)
                    return next(error);

                next(null, this);
            });
        });   
    }

    delete(next) {
        cassandra.getConnection((error, client) => {
            if (error)
                return next(error);
            
            const SAVE_USERCREDENTIALS_CQL = "DELETE FROM usercredentials WHERE email = '"+this.email+"'";
            client.execute(SAVE_USERCREDENTIALS_CQL, this, { prepare: true }, (error) => {
                if (error)
                    return next(error);

                next(null);
            });
        });
    }

    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    }

    validPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }

    // Fix bad return object of Cassandra
    plain(){
        return {
            userid : this.userid.toString(), 
            email : this.email
        };
    }

    static findByEmail(email, fields, next) {
        if (fields.length === 0)
            fields = [
                'userid',
                'email',
                'password'
            ];
        
        cassandra.getConnection((error, client) => {
            if (error)
                return next(error);
            
            const FIND_USERCREDENTIALS_CQL = "SELECT " + fields.toString() + " FROM usercredentials WHERE email = '" + email + "'";
            client.execute(FIND_USERCREDENTIALS_CQL, (error, results) => {
                if (error)
                    return next(error);
    
                if (results.rowLength === 0)
                    return next(null, false);

                // Fix bad cassandra return for uuid
                if(results.rows[0].userid)
                    results.rows[0].userid = results.rows[0].userid.toString();

                next(null, new UserCredentials(results.rows[0]));
            });
        });
    }
}

/**
 * Module exports.
 * @public
 */

module.exports = UserCredentials;
