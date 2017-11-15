import serial
import websocket
import _thread
import time
import json
import RPi.GPIO as GPIO

devusb = serial.Serial("/dev/ttyUSB0")

tplJson = {
  "type" : 1,
  "outlet_id" : "p4u5",
  "timestamp" : 0,
  "pwd" : "RvYVITLKkvYNYGHE2DMifZ77p12WDCls4Xb5yRRhxAQ=",
  "data" : [
  ]
}

def on_message(ws, message):
    print("Message is %s" % message)
    msgJson = json.loads(message)
    if msgJson["type"] == 1:
        if msgJson["closed"]:
            GPIO.output(7,True)
        else:
            GPIO.output(7,False)

def on_error(ws, error):
    print(error)

def on_close(ws):
    print("### closed ###")

def on_open(ws):
    print("We are connected")
    def run(*args):
        while 1:
            value = str(devusb.readline(), 'utf-8').rstrip()
            tplJson["data"] = [{"sensor_type": 0, "value": value}]
            tplJson["timestamp"] = int(time.time())
            print("Sending data")
            ws.send(json.dumps(tplJson));
    _thread.start_new_thread(run, ())


if __name__ == "__main__":
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(7, GPIO.OUT)
    ws = websocket.WebSocketApp("ws://sharelet.be:3000/",
                              on_message = on_message,
                              on_error = on_error,
                              on_close = on_close)
    ws.on_open = on_open
    ws.run_forever()
