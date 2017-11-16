const WebSocket = require('ws');

let outlet_emu = {
  relais: false
}

let timer = null;
let ws = null;

function getData(){
  if(outlet_emu.relais)
    return Math.random()*30;
  return 0;
}

function onMessage(message){
  try{
    var json = JSON.parse(message);
    if(json.type == 0){
      outlet_emu.relais = json.closed;
      if(json.closed){
        console.log("Relais fermé, circuit ON", message);
      }else{
        console.log("Relais ouvert, circuit OFF", message);
      }
    }else{
      console.log("unknown message", json);
    }
  }catch(e){
    console.log("ERR JSON", message);
  }
}

function setupDataInverval(){
  console.log("BOOT DONE");
  timer = setInterval(() => {
    let now = new Date();
    let timestamp = now.getTime()/1000;

    let data = {
      "type" : 1,
      "outlet_id" : "simu",
      "pwd" : "ZohE0mKWqHY6wBubVbtW4YeXt4135YAjmfDzUExJTVI=",
      "timestamp" : timestamp,
      "data" : [
        {"sensor_type" : 0, "value" : getData()}
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
