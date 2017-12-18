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
	
	/*editGroup: function editGroup(res, req){
        
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
			
    },*/
	
	editGroup: function editGroup(res, req){
        
        var bResult = '';
		
        var p = new Promise((resolve, reject) => {
			var iIdGroupe = req.body.idGroup;
			var sNom = req.body.nom;
			var bState = Number(req.body.state);
			var privileges = req.body.privileges;
			console.log(iIdGroupe+sNom+bState);	
			console.log(req.body);
			
            bd.connection.query("CALL ps_Update_Groupe(" + iIdGroupe + ",'" + sNom + "',"+ bState + ")",
				function (err, result, fields) {
					if (err) throw err;
					console.log('Message: '+result[0][0].message);
					bd.connection.query("CALL ps_RemoveAll_PrivilegeGroup_ByGroup("+iIdGroupe+")",
						function (err, result, fields) {
							if (err) throw err;
							for(var i = 0; i < privileges.length; i++){
								bd.connection.query("CALL ps_Insert_PrivilegeGroupe(" + privileges[i].idPrivilege + "," + iIdGroupe + ")");					
							}
							console.log('ifdhidfihofoihfsdoihusfdohius');
							resolve(1);
						});	
					
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
			var access = req.body.access;
			console.log(req.body);

            bd.connection.query("CALL ps_Update_Parking(" + iIdParking + ",'" + sNom + "')",
				function (err, result, fields) {
					if (err) throw err;
					console.log('Message: '+result[0][0].message);
					bd.connection.query("CALL ps_Get_AccesByIdParking(" + iIdParking+")", function (err, result, fields) {
						if (err) throw err;
						var dataAccess = result[0];
						console.log("dataAcess: "+dataAccess);
						for(i in dataAccess){
							bd.connection.query("CALL ps_Update_Acces(" + dataAccess[i].idAccess + ",NULL)");
						}
						for(var i = 0; i < access.length; i++){
							bd.connection.query("CALL ps_Update_Acces(" + access[i].idAccess + "," + iIdParking + ")");					
						}
					});
					
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