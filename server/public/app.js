$(document).ready(function() {
    var socket = io();
    socket.on('data received', function(data) {
        $("#humidity p").text(data.humidity);
        $("#temperature p").text(data.temperature);
        $("#lux p").text(data.lux);

        $('#latestUpdate span').text(getCurrentDateString());
    });
});

function getCurrentDateString()
{
	var d = new Date();
	return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}
