const crypto = require('crypto');
const WebSocket = require('ws');
const cassandra = require('cassandra-driver');
const nodemailer = require('nodemailer');

const cass_auth = new cassandra.auth.PlainTextAuthProvider('cassandra','cassandra');
const client = new cassandra.Client({ contactPoints: ['192.168.2.5', '192.168.2.6', '192.168.2.7'], keyspace: 'sharelet_dev', authProvider : cass_auth });

const SALT = "auth-sharelet";
const INSERT_DATA_CQL = "INSERT INTO consumption_by_day (outlet_id, date, event_time, sensor_type, sensor_value) VALUES (?, ?, ?, ?, ?)";
const GET_SETTINGS_START = "SELECT * FROM outlets_alert WHERE outlet_id = '";
const GET_SETTINGS_END = "'";
const UPDATE_STATE = "UPDATE outlet_state SET state = ";
const UPDATE_STATE2 = " WHERE outlet_id = '";
const UPDATE_STATE3 = "'";

const smtpSettings = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: "sharelet.noreply@gmail.com",
    pass: "p4vXakN3"
  }
}

let transporter = nodemailer.createTransport(smtpSettings, {from : 'sharelet.noreply@gmail.com', to : 'nsurleraux@gmail.com', subject: 'Alert'});
transporter.verify(function(err, ok){
  if(err) console.log(err);
  else console.log("SMTP OK");
});

const wss = new WebSocket.Server({ port: 3000 });
const wssFromAPI = new WebSocket.Server({ port: 3001 });

const wsClients = {};

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message){
    var data = JSON.parse(message);
    var md5hash = crypto.createHash('md5').update(data.outlet_id).digest('base64');
    var hash = crypto.createHash('sha256').update(SALT+md5hash+SALT).digest('base64');
    var date = new Date(data.timestamp*1000);
    var date_str = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear();
    if(hash == data.pwd){
      if(!wsClients.hasOwnProperty(data.outlet_id) || wsClients[data.outlet_id] != ws){
        wsClients[data.outlet_id] = ws;
        client.execute(GET_SETTINGS_START+data.outlet_id+GET_SETTINGS_END).then(function(res){
          console.log("Get alerts CB", res.rows);
          if(res.rows.length !== 0){
            wsClients[data.outlet_id].alerts = res.rows[0];
          }
        });
      }
      for(var i in data.data){
        client.execute(INSERT_DATA_CQL, [data.outlet_id, date_str, date, data.data[i].sensor_type, data.data[i].value], {prepare: true}).then(function(res){ws.send("{'res' : 'OK'}");});
        let val = data.data[i].value;
        let alerts = wsClients[data.outlet_id].alerts;
        console.log(alerts);
        if(alerts && (val < alerts.low || val > alerts.high)){
          console.log("We have an alert here");
          transporter.sendMail({text: "Alert on "+data.outlet_id+" value "+val}, function(err, res){});
        }
      }
    }else{
      ws.send("{'res' : 'NOK'}");
    }
  });
});

wssFromAPI.on('connection', function connection(ws) {
  ws.on('message', function incoming(message){
    var data = JSON.parse(message);
    if(data.type == 0){ //ON OFF
      var connection = wsClients[data.target];
      if(typeof connection !== 'undefined'){
        connection.send(JSON.stringify({type : 0, close : data.power}));
        client.execute(UPDATE_STATE + data.power + UPDATE_STATE2 + data.target + UPDATE_STATE3, (err, nothing) => {});
        ws.send({"type" : 4, "ok" : true, "target" : data.target});
      }else{
        ws.send({"type" : 4, "ok" : false, "target" : data.target});
      }
    }
  });
});
