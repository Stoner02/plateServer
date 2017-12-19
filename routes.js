var server = require('./server.js');
var controller = require('./controller.js');
var controllerGet = require('./controllerGet.js');
var controllerPost = require('./controllerPost.js');
var controllerPut = require('./controllerPut.js');
var controllerDelete = require('./controllerDelete.js');


module.exports = function(app) {

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

	app.get('/access/:idParking/:filter',function(req, res){
		controllerGet.getAccessBy(res, req);
	});
	
	app.get('/privileges/:idGroup/:filter',function(req, res){
		controllerGet.getPrivilegeBy(res, req);
	});
	
	app.get('/access/all',function(req, res){
		controllerGet.getAllAccess(res, req);
	});
	
	app.get('/passages/:idUser/',function(req, res){
		controllerGet.getAllPassagesByUsers(res, req);
	});
	
	app.get('/passages',function(req, res){
		controllerGet.getAllPassages(res, req);
	});
	
	app.post('/login',function(req, res){
		controllerPost.getLogin(res, req);
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
	
	app.post('/vehicule',function(req, res){
		controllerPost.addVehicule(res,req);
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
	
}