var five =  require('johnny-five')
var board = new five.Board()

var firebase = require("firebase")
var config = {
	apiKey: "AIzaSyAzhbEPE3w6dWCyBzMzWVn20xy0VCXifNs",
	authDomain: "arduino-day-2017.firebaseapp.com",
	databaseURL: "https://arduino-day-2017.firebaseio.com",
	storageBucket: "arduino-day-2017.appspot.com",
	messagingSenderId: "314251571477",
	"provider": "anonymous",
	"uid": "d6d5fda1-1659-4c0d-b04d-229cb7429535"
}
firebase.initializeApp(config)

var dataHandler = firebase.database().ref('/alvaro')
board.on('ready', function(){

	var knob = new five.Sensor({
		pin:'A1', type:'analog',
		freq: 100, thresholde: 10.2
	})

	var button = new five.Button(2)
	var led = new five.Led(3)
	var lamp = { /*state: false, bright: 0 */}
	
	dataHandler.once('value').then((data)=>{
		try {
			lamp = {
			state: data.val().state,
			bright: data.val().bright
		}
		} catch (error) {
			lamp = {state: false, bright: 10 }
			console.log("um erro ocorreu ao inicializar o banco\numa nova instancia foi criada")
			writeData()
		}
	});

	var lampHandler = () =>{
		if(lamp.state)
			led.intensity(lamp.bright)
		else 
		led.off();
	}

	var writeData = () =>{
		dataHandler.set({"lamp": lamp})
	}

	var lampSwitch = () =>{
		lamp.state = !lamp.state
		writeData()
		lampHandler()
	}

	knob.on('change', function() {
		lamp.bright = five.Fn.map(this.value, 0, 1024, 10, 100)
		if(lamp.state) writeData()
	})

	dataHandler.on('child_changed', (data) =>{
			lamp.state = data.val().state
			lamp.bright = data.val().bright
			lampHandler()
		})

	button.on('press', lampSwitch)
})