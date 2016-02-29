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

connection.end(function(err) {
	// The connection is terminated now
	if (err) {
		console.error(err.status);
	}
	else {  		
		console.log("disconnected now");
	}
	
});

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
