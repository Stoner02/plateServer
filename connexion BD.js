var server = require('./server.js');
//-----------------------------
//  Récupération de la connexion à la base.
//-----------------------------
var mysql = require('mysql');

module.exports = {
	

	//-----------------------------
	//  Création de la connexion à la base de donnée.
	//-----------------------------
	connection : mysql.createConnection({
		host: '127.0.0.1', 	//'192.168.0.1'
		user: 'admin', 			//'admin'
		password: 'admin', 		//'admin'
		database: 'parking'
	})
}