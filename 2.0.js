var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function(){
	var sensor = new five.Sensor({
		pin: "A1",
		type: "analog",
		freq: 1000,
		thresholde: 10.2
	});
	sensor.on('change', function(){
		var val = this.scaleTo(0,10)
		console.log(val)
	});
});

