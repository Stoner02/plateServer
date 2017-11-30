
//-----------------------------
//require des modules
//-----------------------------
var express = require('express'),
//set an instance of express
app = express(),
//require the body-parser nodejs module
bodyParser = require('body-parser'),
//require the path nodejs module
path = require("path");
//support parsing of application/json type post data	
app.use(bodyParser.json());
//tell express that www is the root of our public web folder
app.use(express.static(path.join(__dirname, 'www')));

//for DB calls
var controller = require('./controller.js');

//-----------------------------
// Déclaration des caméras
//-----------------------------					
var plateCam1 = 0;
var plateCam2 = 0;

//-----------------------------
//tell express what to do when the /form route is requested
//-----------------------------
app.post('/form',function(req, res){

	res.setHeader('Content-Type', 'application/json');

	//-----------------------------
	// Get plate and idCam
	//-----------------------------
	var plate = req.body.results[0].plate;
	var idCam = req.body.camera_id;
	
	//-----------------------------
	// Display plate comming in console
	//-----------------------------
	console.log("detect: " + plate + " cam: " + idCam);
	
	//-----------------------------
	// Verify if plate is in DB
	//-----------------------------
	controller.manageAccess(plate, idCam);
	
	res.send('ok');	
});

//wait for a connection
app.listen(3000, function () {
  console.log('Server is running. Point your browser to: http://localhost:3000');
});


//---------------------------------
//  Action according to plateExist
//  plateExist: 		1 if plate exists in DB else 0
//  idCam: 				camera id
//---------------------------------
function doAccess(plateExist, idCam, plate){
	
	//-----------------------------
	// Caméra 1
	//-----------------------------
	if(idCam == 1 && plateExist == 1){
		console.log("CAM1: plaque ok : " + plate);

		if(plateCam2 == plate){ //La voiture est sortie !!!
			//todo La voiture est sortie (log) OUT
			console.log("CAM1: plaque OUT:" + plate);
			plateCam2 = 0;
		}
		else{ //La voiture VA rentrer
			console.log("CAM1: plaque " + plate + " va entrer");
			//old code**
			plateCam1 = plate;
		}
	}
	//-----------------------------
	// Caméra 2
	//-----------------------------
	else if(idCam == 2 && plateExist == 1){
		console.log("CAM2: plaque ok: " + plate);

		if(plateCam1 == plate){ //La voiture est entrée !!!
			//todo La voiture est entrée (log) IN
			console.log("CAM2: plaque IN:" + plate);
			plateCam1 = 0;
		}
		else{ //La voiture VA sortir
			console.log("CAM2: plaque " + plate + " va sortir");
			plateCam2 = plate;
		}
		
	}
	else{ //Plaque inconnue
		console.log("Plaque inconnue: " + plate);
	}
}

module.exports.doAccess = doAccess;