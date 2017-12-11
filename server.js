var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};


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

app.use(allowCrossDomain);

//for DB calls
var controller = require('./controller.js');
var controllerGet = require('./controllerGet.js');
var controllerPost = require('./controllerPost.js');
var controllerPut = require('./controllerPut.js');
var controllerDelete = require('./controllerDelete.js');





//-----------------------------
// Déclaration des caméras
//-----------------------------					
var plateCam1 = 0;
var plateCam2 = 0;

//-----------------------------
//tell express what to do when the /form route is requested
//-----------------------------
app.post('/form',function(req, res){
	
	console.log('test');

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

app.get('/users',function(req, res){
	controllerGet.getAllUsers(res);
});

app.get('/groups',function(req, res){
	controllerGet.getAllGroups(res);
});

app.get('/privileges',function(req, res){
	controllerGet.getAllPrivileges(res);
});

app.get('/parkings',function(req, res){
	controllerGet.getAllParkings(res);
});

app.post('/user',function(req, res){
	controllerPost.addUser(res,req);
});

app.post('/group',function(req, res){
	controllerPost.addGroup(res,req);
});

app.post('/privilege',function(req, res){
	controllerPost.addPrivilege(res,req);
});

app.post('/parking',function(req, res){
	controllerPost.addParking(res,req);
});

app.delete('/user/:idUser',function(req, res){
	controllerDelete.removeUser(res,req);
});

app.delete('/group/:idGroup',function(req, res){
	controllerDelete.removeGroup(res,req);
});

app.delete('/group/:idPrivilege',function(req, res){
	controllerDelete.removePrivilege(res,req);
});

app.delete('/group/:idParking',function(req, res){
	controllerDelete.removeParking(res,req);
});

app.put('/user/',function(req, res){
	controllerPut.editUser(res,req);
});

app.put('/group/',function(req, res){
	controllerPut.editGroup(res,req);
});

app.put('/privilege/',function(req, res){
	controllerPut.editPrivilege(res,req);
});

app.put('/parking/',function(req, res){
	controllerPut.editParking(res,req);
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