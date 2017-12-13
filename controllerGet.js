var server = require('./server.js');

var bd = require('./connexion BD');

module.exports = {

    getAllUsers: function getAllUsers(res){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
            var querryRes = 100;
            bd.connection.query("CALL ps_SelectAll_Utilisateur()", function (err, result, fields) {
                if (err) throw err;
                resolve(result[0]);
            });
        })
            .then(data => {
                bResult=data;
				res.status(200).json(data);
				return (bResult);
            })
            .catch((error) => {
            console.log("error", error);
			return null;
            });
			
    },
	
	getAllGroups: function getAllGroups(res){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
            var querryRes = 100;
            bd.connection.query("CALL ps_SelectAll_Groupe()", function (err, result, fields) {
                if (err) throw err;
                resolve(result[0]);
            });
        })
            .then(data => {
                bResult=data;
				res.status(200).json(data);
				return (bResult);
            })
            .catch((error) => {
            console.log("error", error);
			return null;
            });
			
    },
	
	getAllPrivileges: function getAllPrivileges(res){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
            var querryRes = 100;
            bd.connection.query("CALL ps_SelectAll_Privilege()", function (err, result, fields) {
                if (err) throw err;
                resolve(result[0]);
            });
        })
            .then(data => {
                bResult=data;
				res.status(200).json(data);
				return (bResult);
            })
            .catch((error) => {
            console.log("error", error);
			return null;
            });
			
    },
	
	getAccessBy: function getAccessBy(res, req){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
            var querryRes = 100;
			console.log(req.params.filter);
			console.log(req.params.idParking);
			if(req.params.filter == 'on'){
				bd.connection.query("CALL ps_Get_AccesByIdParking(" + req.params.idParking +")", function (err, result, fields) {
					if (err) throw err;
					resolve(result[0]);
				});
            }else if(req.params.filter == 'off'){
				bd.connection.query("CALL ps_Get_AccesByIdParkingBarre(" + req.params.idParking +")", function (err, result, fields) {
					if (err) throw err;
					resolve(result[0]);
				});
			}
        })
            .then(data => {
                bResult=data;
				res.status(200).json(data);
				return (bResult);
            })
            .catch((error) => {
            console.log("error", error);
			return null;
            });
			
    },
	
	getAllParkings: function getAllParkings(res){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
            var querryRes = 100;
            bd.connection.query("CALL ps_SelectAll_Parking()", function (err, result, fields) {
                if (err) throw err;
                resolve(result[0]);
            });
        })
            .then(data => {
                bResult=data;
				res.status(200).json(data);
				return (bResult);
            })
            .catch((error) => {
            console.log("error", error);
			return null;
            });
			
    },
};