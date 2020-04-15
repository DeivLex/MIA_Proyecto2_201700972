var express = require("express");
var app = express();
var router = express.Router();
var bodyparser=require('body-parser');
var oracledb = require('oracledb');
//Authoriser tous les requettes cors)
var cors = require('cors');
app.use(cors());

app.use(bodyparser.json());

///Pour changer le format de la requete 
app.use(bodyparser.urlencoded({
    extended: true
}));

var connAttrs = {
    user: "TEST",
    password: "1234",
    connectString: "172.17.0.2:1521/ORCL18"
}

app.get('/', function (req, res) {
    "use strict";

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute("select * FROM persona", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the dba_tablespaces",
                    detailed_message: err.message
                }));
            } else {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
				
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /sendTablespace : Connection released");
                    }
                });
        });
    });
});

app.get('/',(req,res)=>{
res.send([{message:'Hola a todos'}]);
})

app.listen(8080,'localhost',function(){
console.log("El servidor esta escuchando desde el puerto 8080");
})