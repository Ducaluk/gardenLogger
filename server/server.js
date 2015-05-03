var express = require('express');
app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var router = express.Router();

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var dataLogSchema = new Schema({
    temperature: {
        type: String,
        required: true
    },
    humidity: {
        type: String,
        required: true
    },
    lux: {
        type: String,
        required: true
    },
    date: Date
});

dataLogSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.date = currentDate;
    if (!this.date) {
        this.date = currentDate;
    }

    next();
});

var dataLog = mongoose.model('dataLog', dataLogSchema);

mongoose.connect('mongodb://localhost/database');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


router.route('/dataLog')
    .get(function(req, res) {
        dataLog.find(function(err, dataLog) {
            if (err)
                res.send(err);

            res.json(dataLog);
        });
    });

router.route('/dataLog/last')
    .get(function(req, res) {
        dataLog.find().sort({
            _id: -1
        }).limit(1).exec(function(err, dataLog) {
            if (err)
                res.send(err);

            res.json(dataLog);
        });
    });

app.use('/api', router);


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


            var data = new dataLog({
                temperature: sendData.temperature,
                humidity: sendData.humidity,
                lux: sendData.lux
            });

            data.save(function(err) {
                if (err) throw err;
                console.log('data saved successfully!');
            });
        }
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
