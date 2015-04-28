jQuery( document ).ready( function () {
	

		var socket = io.connect( "/", {
			"reconnect"                :true,
			"reconnection delay"       :500,
			"max reconnection attempts":10
		} );

		socket.on( "message", function ( data ) {

			console.log(data);

		} );
	}
);