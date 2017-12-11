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