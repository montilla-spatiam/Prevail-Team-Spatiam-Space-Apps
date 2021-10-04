import speech_recognition
import pyttsx3
import os
from ctypes import *
import pyaudio
import requests
from datetime import datetime
import json
import threading
import random

#Change these for your mission
user = "<your_username>"
Authorization = "Token <your token>"
log = "<your log id>"

class style():
    BLACK = '\033[30m'
    RED = '\033[31m'
    GREEN = '\033[32m'
    YELLOW = '\033[33m'
    BLUE = '\033[34m'
    MAGENTA = '\033[35m'
    CYAN = '\033[36m'
    WHITE = '\033[37m'
    UNDERLINE = '\033[4m'
    RESET = '\033[0m'

ERROR_HANDLER_FUNC = CFUNCTYPE(None, c_char_p, c_int, c_char_p, c_int, c_char_p)
DEGREE =  u"\N{DEGREE SIGN}"

def py_error_handler(filename, line, function, err, fmt):
  os.system('clear')

c_error_handler = ERROR_HANDLER_FUNC(py_error_handler)

recognizer = speech_recognition.Recognizer()

def getExternalTemperature():
    return round(random.uniform(-156,121), 2)

def getSuitPressure():
    return round(random.uniform(9.1,20.7),2)

def getSelenographicCoordinates():
    lat = round(random.uniform(-4,-3),3)
    lon = round(random.uniform(-6,-5),3)
    return str(lat)+DEGREE+","+str(lon)+DEGREE

def getHeartRate():
    return round(random.uniform(56,70))

def pretty_print_POST(req):
    print('{}\n{}\r\n{}\r\n\r\n{}'.format(
        '-----------START-----------',
        req.method + ' ' + req.url,
        '\r\n'.join('{}: {}'.format(k, v) for k, v in req.headers.items()),
        req.body,
    ))

def sendreq(text,timestamp):
  url = "http://44.193.83.129:8000/api/entries/"
  hdrs = {"Authorization": Authorization,"Content-Type":"application/json"}
  text="STT:"+text
  raw_data = "{\"external_temperature\":\""+str(getExternalTemperature())+DEGREE+"C"+"\",\"suit_pressure\":\""+str(getSuitPressure())+" kPa"+"\",\"selenographic_coordinates\":\""+getSelenographicCoordinates()+"\",\"heart_rate\":\""+str(getHeartRate())+" bpm"+"\"}"
  body_with_data = {"user":user,"message":text,"tags":"test,eva,rpi","log":log,"date_published":timestamp,"raw_data":raw_data}
  print(style.WHITE+"*"*(len(text)+2))
  print("*"+style.CYAN+text+style.WHITE+"*")
  print(style.WHITE+"*"*(len(text)+2)+style.RESET)
  print(style.MAGENTA+str(body_with_data)+style.RESET)
  body_json = json.dumps(body_with_data)
  session = requests.Session()
  x = session.post(url, data=body_json, headers=hdrs)
  print(style.WHITE+str(x)+style.RESET)
  if(str(x) == "<Response [201]>"):
   print(style.GREEN+"LOG SENT SUCCESSFULLY"+style.RESET)
  else:
   print(style.RED+"LOG DELIVERY FAILED"+style.RESET)

ft=True

while True:
  try:
    with speech_recognition.Microphone() as mic:
      recognizer.adjust_for_ambient_noise(mic, duration=0.2)
      if(ft):
        ft=False
        os.system('clear')
      print(style.GREEN+"LISTENING..."+style.RESET)
      audio = recognizer.listen(mic)
      print(style.YELLOW+"PROCESSING..."+style.RESET)
      text = recognizer.recognize_google(audio)
      text = text.lower()
      now = datetime.now()
      timestamp = now.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
      th = threading.Thread(target=sendreq, args=(text,timestamp,))
      th.daemon = True
      th.start()
  except speech_recognition.UnknownValueError:
    recognizer = speech_recognition.Recognizer()
    continue