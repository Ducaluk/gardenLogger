$(document).ready(function() {
    var socket = io();
    socket.on('data received', function(data) {
    	populateDashBoard(data);
    });

    $('#navDash a').on('click', showDashBoard);
    $('#navTable a').on('click', showTable);

     $('#navDash a').trigger('click');

});

function populateDashBoard(data) {
    $("#humidity p").text(data.humidity);
    $("#temperature p").text(data.temperature);
    $("#lux p").text(data.lux);
}

function populateTable(data)
{
	console.log(data);
	strData = "";
	$.each(data,function(index,value)
	{
		strData += '<tr><td>' + new Date(value.date) +'</td><td>' + value.temperature +'</td><td>' + value.humidity +'</td><td>' + value.lux +'</td></tr>';
	});

	$('table tbody').append(strData);
}

function removeActive() {
    $.each($('.nav li.active'), function(index, value) {
        $(value).removeClass('active');
    });
  
}

function showDashBoard(e) {
    removeActive();
    $(this).parent().addClass('active');

    $("#cardInfo").removeClass('hide');
    $("#dataLog").addClass('hide');


    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://localhost:3000/api/dataLog/last",
        success: function(data) {
            //alert(data);
            populateDashBoard(data[0]);
        },
        error: function(data) {
            console.error(data);
        }
    });
}

function showTable(e) {
    removeActive();
    $(this).parent().addClass('active');
    $("#cardInfo").addClass('hide');
    $("#dataLog").removeClass('hide');

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://localhost:3000/api/dataLog",
        success: function(data) {
        	populateTable(data);
        },
        error: function(data) {
            console.error(data);
        }
    });
}
