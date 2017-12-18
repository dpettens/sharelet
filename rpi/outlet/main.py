import json
import os
import time
import RPi.GPIO as GPIO
import serial
import websocket
try:
    import thread
except ImportError:
    import _thread as thread

# Connexion a l'arduino via USB
dev_usb = serial.Serial("/dev/ttyUSB0")

# Le template des messages a envoyer
tpl_json = {
    "type" : 1,
    "outlet_id" : os.environ['SHARELET_ID'],
    "timestamp" : 0,
    "pwd" : os.environ['SHARELET_PWD'],
    "data" : []
}

# A la reception d'un message
def on_message(ws, message):
    print("Message is %s" % message)
    msg_json = json.loads(message)

    # Type "extinction"
    if msg_json["type"] == 0:
        if msg_json["close"]:
            GPIO.output(7, False)
        else:
            GPIO.output(7, True)

# En cas d'erreur du socket
def on_error(ws, error):
    print(error)

# A la fermeture du socket
def on_close(ws):
    print("### closed ###")

# A l'ouverture du socket
def on_open(ws):
    print("### connected ###")
    def run(*args):
        while 1:
            # On lit la valeur sur l'USB (on la recoit toutes les 30 secondes)
            value = str(dev_usb.readline()).rstrip()

            # On met a jour le template
            tpl_json["data"] = [{"sensor_type": 0, "value": value}]
            tpl_json["timestamp"] = int(time.time())
            print("Sending data")

            # Et on envoie !
            ws.send(json.dumps(tpl_json))

    # Demarrage de la boucle asynchrone "run" pour les data
    thread.start_new_thread(run, ())


if __name__ == "__main__":
    # Mettre la PIN du relais en mode OUTPUT
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(7, GPIO.OUT)

    # Creation du socket
    ws = websocket.WebSocketApp("ws://sharelet.be:3000/",
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)

    ws.on_open = on_open

    # On dit au socket d'essayer de se reconnecter quand il perd la connexion
    ws.run_forever()
