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

    getAllUsers: function getAllUsers(res){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
            var querryRes = 100;
            connection.query("CALL ps_SelectAll_Utilisateur()", function (err, result, fields) {
                if (err) throw err;
				//console.log(result);
                resolve(result[0]);
            });
        })
            .then(data => {
                bResult=data;
				console.log('data:'+data);
				res.status(200).json(data);
				return (bResult);
            })
            .catch((error) => {
            console.log("error", error);
            bResult=200000;
			return null;
            });
			
    },
	
	addUser: function addUser(res, req){
        
        var bResult = '';
		console.log("ADD USER METHOD");
		
        var p = new Promise((resolve, reject) => {
			console.log("ADD USER PROMISE");
            var querryRes = 100;
			console.log(req.body);
			var sNom = req.body.nom;
			var sPrenom = req.body.prenom;
			var sMail = req.body.mail;
			var sPassword = req.body.password;
			var iIdGroupe = Number(req.body.FK_groupe);
			console.log(sNom);
			console.log(sPrenom);
			console.log(sMail);
			console.log(sPassword);
			console.log(iIdGroupe);

            connection.query("CALL ps_Insert_Utilisateur(" + iIdGroupe + ", '" + sNom + "', '" + sPrenom + "', '" + sMail + "', '" + sPassword + "')",
				function (err, result, fields) {
					if (err) throw err;
					console.log('Message: '+result[0][0].message);
					resolve(result[0][0].result);
				});
        })
            .then(data => {
                bResult=data;
				console.log('data2:'+data);
				res.status(200).json(data);
				return (bResult);
            })
            .catch((error) => {
            console.log("error", error);
            bResult=200000;
			return null;
            });
			
    },


    

};