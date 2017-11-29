const WebSocket = require('ws');
const chalk = require('chalk');

let outlet_emu = {
  relais: false
}

let timer = null;
let ws = null;
let val = 0;

function getData(){
  if(outlet_emu.relais)
    return Math.random()*30;
  return 0;
}

function updateMsg(){
  process.stderr.clearLine();
  process.stderr.cursorTo(0);
  process.stderr.write("Etat circuit : "+(outlet_emu.relais?chalk.green("ON"):chalk.red("OFF"))+". Mesure Puissance Watt : "+val.toFixed(2));
}

function onMessage(message){
  try{
    var json = JSON.parse(message);
    if(json.type == 0){
      outlet_emu.relais = json.closed;
      if(json.closed){
        updateMsg();
//        console.log("Relais fermé, circuit ON", message);
      }else{
        updateMsg();
//        console.log("Relais ouvert, circuit OFF", message);
      }
    }else{
    }
  }catch(e){
  }
}

function setupDataInverval(){
  console.log("BOOT DONE");
  timer = setInterval(() => {
    let now = new Date();
    let timestamp = now.getTime()/1000;
    val = getData();
    updateMsg();
    let data = {
      "type" : 1,
      "outlet_id" : "simu",
      "pwd" : "ZohE0mKWqHY6wBubVbtW4YeXt4135YAjmfDzUExJTVI=",
      "timestamp" : timestamp,
      "data" : [
        {"sensor_type" : 0, "value" : val}
      ]
    }
    
    ws.send(JSON.stringify(data));    
  }, 10*1000);
}

function boot(){
  ws = new WebSocket("ws://sharelet.be:3000/");
  ws.on('open', setupDataInverval);
  ws.on('message', onMessage); 
}

console.log("BOOT...");
boot();
