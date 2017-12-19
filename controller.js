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

/*var server = require('./server.js');

var bd = require('./connexion BD');*/


module.exports = {

    //---------------------------------
    //  Récupération des données d'une requète de type SELECT dans un tableau JSON.
    //---------------------------------
    testA: function testA(sPlaque, callback){
        
        var bResult;
        
        connection.query("CALL ps_ExistencePlaque('" + sPlaque + "')", function (err, result, fields) {
            if (err) throw err;
            bResult = result[0][0].result;
            console.log("bresult alpha", bResult);
            
        }).then(data => {
            console.log("data", data);
        });
        
        return bResult;
        callback();
    },


    //---------------------------------
    //  Write down or not the access according to sPlaque.
    //  sPlaque:    plate of the car.
    //  idCam:      cam id (1 or 2);
    //---------------------------------
    manageAccess: function manageAccess(sPlaque, idCam) {

        var bResult = 100000;

        //---------------------------------
        // Verify if sPlaque is in DB.
        //---------------------------------
        var p = new Promise((resolve, reject) => {
            var querryRes = 100;
            connection.query("CALL ps_ExistencePlaque('" + sPlaque + "')", function (err, result, fields) {
                if (err) throw err;
                querryRes = result[0][0].result;
                resolve(querryRes);
            });
        })
            .then(data => {
                bResult=data;
                //---------------------------------
                // Log the access if
                //---------------------------------
                server.doAccess(bResult, idCam, sPlaque);
            })
            .catch((error) => {
            console.log("error", error);
            bResult=200000;
            });

    },


    //---------------------------------
    //  Vérifier l'existence et la cohérence des identifiants d'un utilisateur.
    //  Return: un boolean true si vrai sinon false
    //---------------------------------
    verifId: function verifId(sMail, sPassword) {
        
        //  Variable - Résultat de la fonction
        var bResult = 0;
        //  Récupération des données d'une requète de type SELECT dans un tableau JSON.
        connection.connect(function (err) {
            connection.query("CALL ps_VerifyLogin('" + sMail + "', '" + sPassword + "')", function (err, result, fields) {
                if (err) throw err;
                console.log("******DB says: " + result[0][0]['message']);
                bResult = result[0][0]['result'];
            });
        });

        return bResult;
    },

    //---------------------------------
    // Log the passage of the vehicule
    //---------------------------------
    logAccess: function logAccess(direction, plate, idAccess){

        var bResult = 0;

        connection.connect(function (err) {
            connection.query("CALL ps_Insert_Passage('" + direction + "', '" + plate + "', '" + idAccess + "')", function (err, result, fields) {
                if (err) throw err;
                console.log(result[0][0]['result']);
                console.log(result[0][0]['message']);
                bResult = result[0][0]['result'];
            });
        });
        
        return bResult;
    }

};