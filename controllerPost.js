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
	
	addUser: function addUser(res, req){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
			var sNom = req.body.nom;
			var sPrenom = req.body.prenom;
			var sMail = req.body.mail;
			var sPassword = req.body.password;
			var iIdGroupe = Number(req.body.FK_groupe);

            connection.query("CALL ps_Insert_Utilisateur(" + iIdGroupe + ", '" + sNom + "', '" + sPrenom + "', '" + sMail + "', '" + sPassword + "')",
				function (err, result, fields) {
					if (err) throw err;
					console.log('Message: '+result[0][0].message);
					resolve(result[0][0].result);
				});
        })
            .then(data => {
                bResult=data;
				if(data == '0'){
					res.status(404).json(data);
				}else{
					res.status(200).json(data);
				}			
				return (bResult);
            })
            .catch((error) => {
            console.log("error", error);
			return null;
            });
			
    },
	
	addGroup: function addGroup(res, req){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
			var sNom = req.body.nom;

            connection.query("CALL ps_Insert_Groupe('" + sNom + "')",
				function (err, result, fields) {
					if (err) throw err;
					console.log('Message: '+result[0][0].message);
					resolve(result[0][0].result);
				});
        })
            .then(data => {
                bResult=data;
				if(data == '0'){
					res.status(404).json(data);
				}else{
					res.status(200).json(data);
				}			
				return (bResult);
            })
            .catch((error) => {
				console.log("error", error);
				return null;
            });
			
    },
	
	addPrivilege: function addPrivilege(res, req){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
			var sNom = req.body.nom;

            connection.query("CALL ps_Insert_Privilege('" + sNom + "')",
				function (err, result, fields) {
					if (err) throw err;
					console.log('Message: '+result[0][0].message);
					resolve(result[0][0].result);
				});
        })
            .then(data => {
                bResult=data;
				if(data == '0'){
					res.status(404).json(data);
				}else{
					res.status(200).json(data);
				}			
				return (bResult);
            })
            .catch((error) => {
				console.log("error", error);
				return null;
            });
			
    },

	addParking: function addParking(res, req){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
			var sNom = req.body.nom;

            connection.query("CALL ps_Insert_Parking('" + sNom + "')",
				function (err, result, fields) {
					if (err) throw err;
					console.log('Message: '+result[0][0].message);
					resolve(result[0][0].result);
				});
        })
            .then(data => {
                bResult=data;
				if(data == '0'){
					res.status(404).json(data);
				}else{
					res.status(200).json(data);
				}			
				return (bResult);
            })
            .catch((error) => {
				console.log("error", error);
				return null;
            });
			
    },

    

};