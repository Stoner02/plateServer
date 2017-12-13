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
					var idPrivilege = result[0][0].result;
					console.log("IdPrivilege:"+idPrivilege);
					//LIER PRIVILEGE AU PARKING (ACCES 1 PAR DEFAUT)
					connection.query("CALL ps_insert_PrivilegeAcces(" + idPrivilege + ", + " + 1 +")",function (err, result, fields) {
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