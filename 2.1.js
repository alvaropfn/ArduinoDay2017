let fs = require('fs')
let five = require('johnny-five')
let board = new five.Board()


board.on('ready', function(){
	var sensor = new five.Sensor({
		pin: "A1",
		type: "analog",
		freq: 1000,
		thresholde: 10.2
	});
	sensor.on('change', function(){
		var val = this.scaleTo(0,10)
		downSave('down.txt', val)
	});
});

var downSave = (file, data, option = 'a') => {
	option = {flag: option}
	fs.writeFile(file, data + '\n', option, function(err){
		if(err) return console.log(err)
		console.log(data)
	});
}

