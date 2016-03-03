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

function startDBConnection() {
	connection.connect(function(err) {
	  if (err) {
	    console.error('error connecting: ' + err.stack);
	    return;
	  }

	  console.log('connected as id ' + connection.threadId);
	});
}
startDBConnection();


// Close the connection on ctrl + c

process.on('SIGINT', function() {
	connection.end();
	console.log("disconnected now");	
	process.exit();
})


/* GET Themes. */

router.get('/', function(req, res, next) {
	var q = "SELECT * FROM `theme_assets`";

	connection.query(q, function(err, results) {
		// connected! (unless `err` is set)
		var rows = results;
		res.render('index', {themes: rows });  
	});
});

/* GET templates. */

router.get('/theme/:theme_id', function(req, res, next) {
	var q = "SELECT * FROM `templates` WHERE theme_asset_id = " + req.params.theme_id;

	connection.query(q, function(err, results) {
		// connected! (unless `err` is set)
		var rows = results;
		res.render('show_theme', {templates: rows });  
	});
});

/* GET single template file. */

router.get('/theme/:theme_id/template/:template_id/edit', function(req, res, next) {
	var q = "SELECT * FROM `templates` WHERE id = " + req.params.template_id;

	connection.query(q, function(err, results) {
		// connected! (unless `err` is set)
		var rows = results;
		res.render('edit_template', {template: rows }); 
	});  

	    
});

module.exports = router;
