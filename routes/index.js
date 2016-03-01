var express = require('express');
var router = express.Router();
var mysql = require('mysql');


// Connect to Database

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : '',
  password : '', 
  database : '' // database name
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});


// Close the connection

function closeDBConnection() {
	connection.end(function(err) {
		// The connection is terminated now
		if (err) {
			console.error(err.status);
		}
		else {  		
			console.log("disconnected now");
		}
		
	});	
}

/* GET templates. */

router.get('/', function(req, res, next) {
	connection.query("SELECT * FROM `templates`", function(err, results) {
		// connected! (unless `err` is set)
		var rows = results;
		res.render('index', {templates: rows });  
	});
	closeDBConnection();    
});



module.exports = router;
