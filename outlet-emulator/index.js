const WebSocket = require('ws');
const chalk = require('chalk');

/*
 * Config of the emulator
 */

let timer = null;
let ws = null;

/*
 * Config of the outlet
 */

let outlet_emu = {
  id: '',
  isAlert: false,
  password: '',
  relais: true,
  value: 0
};

/*
 * Config of the alert system
 */

const low = 30;
const high = 70;
const probaAlert = 30;

const getData = () => {
  outlet_emu.isAlert = Math.random()*100 < probaAlert;

  if(outlet_emu.relais) {
    if(outlet_emu.isAlert)
      return Math.random()*(high - low) + low;
    else
      return Math.random()*low;
  }

  return 0;
};

const updateMsg = () => {
  process.stderr.clearLine();
  process.stderr.cursorTo(0);
  process.stderr.write(
    `État du circuit : ${(outlet_emu.relais) ? chalk.green("ON") : chalk.red("OFF")}. \
    Mesure Puissance Watt : ${outlet_emu.value.toFixed(2)}. \
    En alerte : ${(!outlet_emu.isAlert) ? chalk.green("NON") : chalk.red("OUI")}`
  );
};

const onMessage = message => {
  try {
    const json = JSON.parse(message);

    if(json.type && json.type === 0) {
      outlet_emu.relais = json.closed;

      if(json.closed)
        updateMsg();
      else
        updateMsg();
    }
  } catch(e) {
    console.log(e.message);
    process.exit(-1);
  }
};

const setupDataInverval = () => {
  console.log("BOOT DONE");

  timer = setInterval(() => {
    const now = new Date();
    const timestamp = now.getTime() / 1000;
    outlet_emu.value = getData();

    updateMsg();

    let data = {
      "type" : 1,
      "outlet_id" : outlet_emu.id,
      "pwd" : outlet_emu.password,
      "timestamp" : timestamp,
      "data" : [
        {
          "sensor_type" : 0,
          "value" : outlet_emu.value
        }
      ]
    }

    ws.send(JSON.stringify(data));
  }, 10*1000);
};

const boot = (appEndpoint, id, password) => {
  outlet_emu.id = id;
  outlet_emu.password = password;

  ws = new WebSocket(appEndpoint);
  ws.on('open', setupDataInverval);
  ws.on('message', onMessage);
};

if(process.argv.length !== 5) {
  console.log("You must enter the appEndpoint, the id and the password !");
  process.exit(-1);
} else {
  console.log("BOOT...");
  boot(process.argv[2], process.argv[3], process.argv[4]);
}

