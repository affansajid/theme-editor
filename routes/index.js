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
	var q = "SELECT * FROM `templates` WHERE theme_asset_id = " + req.params.theme_id + " ORDER BY `template_name`";

	connection.query(q, function(err, results) {
		// connected! (unless `err` is set)
		var rows = {};

		var css_files = [];
		var js_files = [];
		var includes = [];
		var custom_pages = [];
		var regular_files = [];

		// split the files into categories like (js, css, includes...)

		for (var i = 0; i < results.length; i++) {
			
			var t_name = ((results[i].template_name).split("/"))[0];
			console.log(t_name);

			if (t_name === 'css') {
				css_files.push(results[i]);
			}
			else if (t_name === 'js') {
				js_files.push(results[i]);
			}
			else if (t_name === '_includes') {
				includes.push(results[i]);
			}
			else if (t_name === 'custom_pages') {
				custom_pages.push(results[i]);
			}								
			else {
				if (t_name !== 'pages.json' && t_name !== 'variables.json') {
					regular_files.push(results[i]);
				}					
			}
		}

		rows['css_files'] = css_files;
		rows['js_files'] = js_files;
		rows['includes'] = includes;
		rows['custom_pages'] = custom_pages;
		rows['regular_files'] = regular_files;

		res.render('show_theme', {templates: rows });  
	});
});

/* GET single template file. */

router.get('/theme/:theme_id/template/:template_id/edit', function(req, res, next) {
	var q = "SELECT * FROM `templates` WHERE (theme_asset_id = " + req.params.theme_id + " AND id = " + req.params.template_id + ")";

	connection.query(q, function(err, results) {
		// connected! (unless `err` is set)
		var entry = results[0];
		res.render('edit_template', {template: entry }); 
	});      
});

/* Save template file */

router.post('/theme/:theme_id/template/:template_id', function(req, res, next) {
	var t_content = connection.escape(req.body.content);	
	var q = "UPDATE `templates` SET `content` = " + t_content + ", `updated_at` = CURRENT_TIMESTAMP WHERE (theme_asset_id = " + req.params.theme_id + " AND id = " + req.params.template_id + ")";
	
	connection.query(q, function(err, results) {
		// connected! (unless `err` is set)
		if (err) {
			res.status(500).json({message: 'failed to update'});  	
		}
		else {
			res.status(200).json({message: 'sucessfully updated'});  
		}
	});
});

module.exports = router;
