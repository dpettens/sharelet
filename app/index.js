const crypto = require('crypto');
const WebSocket = require('ws');
const cassandra = require('cassandra-driver');

const cass_auth = new cassandra.auth.PlainTextAuthProvider('cassandra','cassandra');

const client = new cassandra.Client({ contactPoints: ['192.168.2.5', '192.168.2.6', '192.168.2.7'], keyspace: 'sharelet', authProvider : cass_auth });

const SALT = "auth-sharelet";

const INSERT_DATA_CQL = "INSERT INTO consumption_by_day (outlet_id, date, event_time, sensor_type, sensor_value) VALUES (?, ?, ?, ?, ?)";

const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message){
    var data = JSON.parse(message);
    var md5hash = crypto.createHash('md5').update(data.outlet_id).digest('base64');
    var hash = crypto.createHash('sha256').update(SALT+md5hash+SALT).digest('base64');
    var date = new Date(data.timestamp*1000);
    var date_str = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear();
    if(hash == data.pwd){
      for(var i in data.data){
        client.execute(INSERT_DATA_CQL, [data.outlet_id, date_str, date, data.data[i].sensor_type, data.data[i].value], {prepare: true}).then(function(res){ws.send("OK");});
      }
    }else{
      ws.send("NOK");
    }
  });
});
