#!/bin/bash

if [ "$EUID" -ne 0 ]
        then echo -e "\e[39m\e[31mMust be root, run sudo -i before running this script.\e[39m"
        exit
fi

echo -e "\e[33m┌─────────────────────────────────────────"
echo -e "|\e[39mTesting Non-sudo command status\e[39m\e[33m"
echo -e "└─────────────────────────────────────────\e[39m"
sudo -u $SUDO_USER whoami
var="$(sudo -u $SUDO_USER whoami)"
if [ $var != "pi" ]
        then echo -e "\e[39m\e[31mNon-sudo test failed\e[39m"
        exit
fi

echo -e "\e[33m┌─────────────────────────────────────────"
echo -e "|\e[39mUpdating repositories\e[39m\e[33m"
echo -e "└─────────────────────────────────────────\e[39m"
apt-get update -yqq
echo -e "\e[32mDONE"

echo -e "\e[33m┌─────────────────────────────────────────"
echo -e "|\e[39mConfiguring Python\e[39m\e[33m"
echo -e "└─────────────────────────────────────────\e[39m"
update-alternatives --install /usr/bin/python python /usr/bin/python2.7 1
update-alternatives --install /usr/bin/python python /usr/bin/python3.7 2
echo -e "\e[32mDONE"

echo -e "\e[33m┌─────────────────────────────────────────"
echo -e "|\e[39mSetting country code\e[39m\e[33m"
echo -e "└─────────────────────────────────────────\e[39m"
iw reg set US
echo -e "\e[32mDONE"

echo -e "\e[33m┌─────────────────────────────────────────"
echo -e "|\e[39mInstalling Requirements\e[39m\e[33m"
echo -e "└─────────────────────────────────────────\e[39m"
pip3 install speechrecognition
pip3 install pyttsx3
pip3 install pyaudio
apt-get install flac
echo -e "\e[32mDONE"

echo -e "\e[33m┌─────────────────────────────────────────"
echo -e "|\e[39mReoot required\e[39m\e[33m"
echo -e "└─────────────────────────────────────────\e[39m"
read -n 1 -s -r -p "Press any key to reboot"
reboot