var express = require('express');
app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/cu.usbmodem1421", {
    baudRate: 115200
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
    console.log("user connected to gardenLogger")
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
            io.emit('data received', sendData);
        }
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

