var server = require('./server.js');

var bd = require('./connexion BD');

module.exports = {
	
	editUser: function editUser(res, req){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
			var iIdUtilisateur = req.body.idUser;
			var sNom = req.body.nom;
			var sPrenom = req.body.prenom;
			var sMail = req.body.mail;
			var sPassword = req.body.password;
			var bState = Number(req.body.state);
			var iIdGroupe = Number(req.body.FK_groupe);


            bd.connection.query("CALL ps_Update_Utilisateur(" + iIdUtilisateur + ",'" + sNom + "', '" + sPrenom + "', '" + sMail + "', '" + sPassword + "',"+ bState + "," + iIdGroupe + ")",
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
	
	editGroup: function editGroup(res, req){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
			var iIdGroupe = req.body.idGroup;
			var sNom = req.body.nom;
			var bState = Number(req.body.state);

            bd.connection.query("CALL ps_Update_Groupe(" + iIdGroupe + ",'" + sNom + "',"+ bState + ")",
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
	
	editPrivilege: function editPrivilege(res, req){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
			var iIdPrivilege = req.body.idPrivilege;
			var sNom = req.body.nom;
			var bState = Number(req.body.state);

            bd.connection.query("CALL ps_Update_Privilege(" + iIdPrivilege + ",'" + sNom + "',"+ bState + ")",
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
	
	editParking: function editParking(res, req){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
			var iIdParking = req.body.idParking;
			var sNom = req.body.nom;

            bd.connection.query("CALL ps_Update_Parking(" + iIdParking + ",'" + sNom + "')",
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