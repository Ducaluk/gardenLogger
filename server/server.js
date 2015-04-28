
var express = require("express");
var app = express();
 
var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/cu.usbmodem1421", {
    baudRate: 115200
});


receivedData = '';
serialPort.on("open", function() {
    serialPort.on('data', function(data) {
        receivedData += data.toString();
        if (receivedData.indexOf('E') >= 0 && receivedData.indexOf('B') >= 0) {
            sendData = receivedData.substring(receivedData.indexOf('B') + 1, receivedData.indexOf('E'));
            sendData = JSON.parse(sendData);
            console.log(sendData);
            receivedData = '';
        }
    });
});

module.exports = app;