CREATE TABLE consumption_by_day (
	outlet_id text,
	date text,
	event_time timestamp,
	sensor_type int,
	sensor_value int,
	PRIMARY KEY ((outlet_id, date), sensor_type, event_time)
);

CREATE TABLE outlet_alias (
    outlet_id text,
    alias text,
    PRIMARY KEY (outlet_id)
);

CREATE TABLE users (
    userid uuid,
    firstname text,
    lastname text,
    email text,
    created_date timestamp,
    outlets set<text>,
    PRIMARY KEY (userid)
);

CREATE TABLE usercredentials (
    email text,
    password text,
    userid uuid,
    PRIMARY KEY (email)
);
