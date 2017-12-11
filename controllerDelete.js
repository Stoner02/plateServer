var server = require('./server.js');
//-----------------------------
//  Récupération de la connexion à la base.
//-----------------------------
var mysql = require('mysql');


//-----------------------------
//  Création de la connexion à la base de donnée.
//-----------------------------
var connection = mysql.createConnection({
    host: '10.113.101.59', 	//'192.168.0.1'
    user: 'admin', 			//'admin'
    password: 'admin', 		//'admin'
    database: 'parking'
});

module.exports = {
	
	removeUser: function removeUser(res, req){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
			var iIdUtilisateur = Number(req.params.idUser);

            connection.query("CALL ps_DesactiverUtilisateur(" + iIdUtilisateur +")",
				function (err, result, fields) {
					if (err) throw err;
					console.log('Message: '+result[0][0].message);
					resolve(result[0][0].result);
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
	
	removeGroup: function removeGroup(res, req){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
			var iIdGroupe = Number(req.params.idGroup);

            connection.query("CALL ps_DesactiverGroupe(" + iIdGroupe +")",
				function (err, result, fields) {
					if (err) throw err;
					console.log('Message: '+result[0][0].message);
					resolve(result[0][0].result);
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
	
	removePrivilege: function removePrivilege(res, req){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
			var iIdPrivilege = Number(req.params.idPrivilege);

            connection.query("CALL ps_DesactiverPrivilege(" + iIdPrivilege +")",
				function (err, result, fields) {
					if (err) throw err;
					console.log('Message: '+result[0][0].message);
					resolve(result[0][0].result);
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
	
	removeParking: function removeParking(res, req){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
			var iIdParking = Number(req.params.idParking);

            connection.query("CALL ps_Desactiver_Parking(" + iIdParking +")",
				function (err, result, fields) {
					if (err) throw err;
					console.log('Message: '+result[0][0].message);
					resolve(result[0][0].result);
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