var five =  require('johnny-five')
var board = new five.Board()

board.on('ready', function(){
	var knob = new five.Sensor({
		pin:'A1',
		type:'analog',
		freq: 100,
		thresholde: 5.7
	})

	var button = new five.Button(2)
	var led = new five.Led(3)
	var lamp = { state: false, bright: 0 }

	var lampHandler = () =>{
		if(lamp.state)
			led.intensity(lamp.bright)
		else 
			led.off()
	}

	var lampSwitch = () =>{
		lamp.state = !lamp.state
		lampHandler()
	}

	knob.on('change', function() {
		lamp.bright = five.Fn.map(this.value, 0, 1024, 10, 100)
		lampHandler()
	})

	button.on('press', lampSwitch)
})