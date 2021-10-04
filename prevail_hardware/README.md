This hardware setup is used to simulate an eva suit with built-in microphone that will be used to automatically log to our system whenever speech is detected


*Hardware*

- [ ] Raspberry Pi 4
- [ ] MicroSD Card
- [ ] USB Microphone
- [ ] Optional* Onboard Sensors



#### Setup steps

1. Load SD Card with Raspbian Image
2. Add ssh.txt file to boot directory
3. Connect over ethernet (initially) and power on RPi
4. Once it powers on, find the device on your network and connect via ssh (PuTTY)
5. login with username 'pi' and password 'raspberry'
6. use `sudo raspi-config`

​    and connect to your wifi network if you want to remove ethernet requirement

7. copy the *setup.sh* and *rec.py* files to the */home/pi* directory
8. run `sudo bash setup.sh`

9. Once finished allow the device to reboot and reconnect over ssh

#### Running from SSH

Edit the file with `sudo nano python rec.py`to input your token, user keys, and log id to simulate setup for your mission

Run the program with `sudo python rec.py`

This will detect microphone, perform setup steps, and begin listening for voice communications. When speech is detected, recording begins and when a break in speech is detected the device will begin processing the data in a thread while listening for the next speech segment.

Threads will generate mock sensor data, convert speech to text, collect timestamp, and build a payload that is automatically sent to the log database.

##### Running automatically in the background

If you'd like the program to run automatically on boot without having to ssh to start the program

`sudo nano /etc/rc.local`

Edit the file to replace the line `# By default this script does nothing.` with

 `nohup /usr/bin/python -u /home/pi/rec.py > /home/pi/rec.log &`

