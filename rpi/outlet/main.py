import serial
import websocket
import _thread
import time
import json
import RPi.GPIO as GPIO

# Connexion à l'arduino via USB
devusb = serial.Serial("/dev/ttyUSB0")

# Le template des messages à envoyer
tplJson = {
  "type" : 1,
  "outlet_id" : "p4u5",
  "timestamp" : 0,
  "pwd" : "RvYVITLKkvYNYGHE2DMifZ77p12WDCls4Xb5yRRhxAQ=",
  "data" : [
  ]
}

# A la reception d'un message
def on_message(ws, message):
    print("Message is %s" % message)
    msgJson = json.loads(message)
    # Type "extinction"
    if msgJson["type"] == 1:
        if msgJson["closed"]:
            GPIO.output(7,True)
        else:
            GPIO.output(7,False)

# En cas d'erreur du socket
def on_error(ws, error):
    print(error)

# A la fermeture du socket
def on_close(ws):
    print("### closed ###")

# A l'ouverture du socket
def on_open(ws):
    print("We are connected")
    def run(*args):
        while 1:
            # On lit la valeur sur l'USB (on la recoit toutes les 30 secondes)
            value = str(devusb.readline(), 'utf-8').rstrip()
            # On met à jour le template
            tplJson["data"] = [{"sensor_type": 0, "value": value}]
            tplJson["timestamp"] = int(time.time())
            print("Sending data")
            # Et on envoie !
            ws.send(json.dumps(tplJson));
    # Demarrage de la boucle asynchrone "run" pour les data
    _thread.start_new_thread(run, ())


if __name__ == "__main__":
    # Mettre la PIN du relais en mode OUTPUT
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(7, GPIO.OUT)
    # Creation du socket
    ws = websocket.WebSocketApp("ws://sharelet.be:3000/",
                              on_message = on_message,
                              on_error = on_error,
                              on_close = on_close)
    ws.on_open = on_open
    # On dit au socket d'essayer de se reconnecter quand il perd la connexion
    ws.run_forever()
