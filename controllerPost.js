var server = require('./server.js');

var bd = require('./connexion BD');


module.exports = {
	
	addUser: function addUser(res, req){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
			var sNom = req.body.nom;
			var sPrenom = req.body.prenom;
			var sMail = req.body.mail;
			var sPassword = req.body.password;
			var iIdGroupe = Number(req.body.FK_groupe);

            bd.connection.query("CALL ps_Insert_Utilisateur(" + iIdGroupe + ", '" + sNom + "', '" + sPrenom + "', '" + sMail + "', '" + sPassword + "')",
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

            bd.connection.query("CALL ps_Insert_Groupe('" + sNom + "')",
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

            bd.connection.query("CALL ps_Insert_Privilege('" + sNom + "')",
				function (err, result, fields) {
					if (err) throw err;
					console.log('Message: '+result[0][0].message);
					var idPrivilege = result[0][0].result;
					console.log("IdPrivilege:"+idPrivilege);
					//LIER PRIVILEGE AU PARKING (ACCES 1 PAR DEFAUT)
					bd.connection.query("CALL ps_insert_PrivilegeAcces(" + idPrivilege + ", + " + 1 +")",function (err, result, fields) {
						if (err) throw err;
						console.log('Message: '+result[0][0].message);
						resolve(result[0][0].result);
					});
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

            bd.connection.query("CALL ps_Insert_Parking('" + sNom + "')",
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
	
	addParking_Access: function addParking(res, req){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
			var sNom = req.body.nom;

            bd.connection.query("CALL ps_Insert_Parking('" + sNom + "')",
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
	
	getLogin: function getLogin(res, req){
        
        var bResult = '';
		var email = req.body.email;
		var password = req.body.password;
		if(email == 'undefined' || password == 'undefined'){
			res.status(404).json('0');
		}else{		
			var p = new Promise((resolve, reject) => {

				bd.connection.query("CALL ps_VerifyLogin('"+ email +"','"+ password+"')", function (err, result, fields) {
					if (err) throw err;
					if(result[0][0].result=='0'){
						resolve(result[0]);
					}else{
						bd.connection.query("CALL ps_Utilisateur_By_Email('"+ email +"')", function (err, result, fields) {
							resolve(result[0]);
						});
					}
					
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
		}
            
			
    },
	
	addVehicule: function addVehicule(res, req){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
			var sPlaque = req.body.plaque;
			var iIdUtilisateur = req.body.idUser;

            bd.connection.query("CALL ps_Insert_Vehicule(" + iIdUtilisateur + ",'"+sPlaque+"')",
				function (err, result, fields) {
					if (err){
						resolve(1);
					}else{
						console.log('Message: '+result[0][0].message);
						resolve(result[0][0].result);
					}
					
					
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