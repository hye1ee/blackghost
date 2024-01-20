#!/bin/bash

PROCESS="$(ps -ef | grep 'BlackGhost Helper (Renderer)')"
echo $PROCESS
while :
do
  USBLIST=$(ioreg -p IOUSB) #get usb list in tree structure
  WORD='+-o' #tree branch 

  S=${USBLIST//"$WORD"}
  COUNT="$(((${#USBLIST} - ${#S}) / ${#WORD}))"
  COUNTNUM=$(($COUNT+0))

  if [ $COUNTNUM -gt 6 ]
  then
    open -a BlackGhost
    sleep 20
    break
  fi
  sleep 0.5
done

while :
do
  CURRENT_PROCESS="$(ps -ef | grep 'BlackGhost Helper (Renderer)')"

  COUNT="$((${#CURRENT_PROCESS} - ${#PROCESS}))"

  echo $COUNT
  sleep 0.5

  if [ $COUNT -eq 0 ]
  then
    open 'Downloads/clue2.png'
    open 'Downloads/clue1.png'
    break
  fi
done
