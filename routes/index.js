var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');

// Enter path the the scv_themes repo folder
var path_to_repo = '../scv_themes/';

/* GET Themes. */

router.get('/', function(req, res, next) {
	var themes;

	fs.readdir(path_to_repo, function(err, files) {
		if (err) throw err;

 		for (var i = 0; i < files.length; i++) {
 			if (files[i].indexOf('.') > -1) {
 				files.splice(i, 1)
 			}
 		}

		var themes = files;
		res.render('index', {themes: themes });  
	});
	
	
});



/* GET templates. */

router.get('/theme/:theme_id', function(req, res, next) {
	var theme = req.params.theme_id;
	var theme_path = path_to_repo + theme;


	var rows = {};

	rows['css_files'] = [];
	rows['js_files'] = [];
	rows['includes'] = [];
	rows['custom_pages'] = [];
	rows['regular_files'] = [];	

	
	fs.readdir(theme_path, function(err, files) {
		

		// split the files into categories like (js, css, includes...)
		
		for (var i = 0; i < files.length; i++) {
			
			var t_name = ((files[i]).split("/"))[0];


			if (t_name === 'sass') {
				var css_folder = theme_path + '/sass';
				fs.readdir(css_folder, function(err, files) {
					rows['css_files'] = files;
				});	
			}
			else if (t_name === 'js') {
				var js_folder = theme_path + '/js';
				fs.readdir(js_folder, function(err, files) {
					rows['js_files'] = files;
				});					
			}
			else if (t_name === '_includes') {
				var includes_folder = theme_path + '/_includes';
				fs.readdir(includes_folder, function(err, files) {
					rows['includes'] = files;
				});				
			}
			else if (t_name === 'custom_pages') {
				var custom_pages_folder = theme_path + '/custom_pages';
				fs.readdir(custom_pages_folder, function(err, files) {
					rows['custom_pages'] = files;
				});					
			}								
			else {
				if (t_name != 'css') {
					rows['regular_files'].push(files[i]);
				}	
			}
		}

		
		previewFiles();
	});

	function previewFiles() {
		res.render('show_theme', {theme: theme, templates: rows });  
	}
});

/* GET single template file. */

router.get('/theme/:theme_id/:folder/:template_id', function(req, res, next) {
	var theme = req.params.theme_id;
	var folder = (req.params.folder == 'home' ? '/' : ('/' + req.params.folder + '/')); 
	var template = req.params.template_id;
	var entry = {};

	var template_path = path_to_repo + theme + folder + template;
	console.log(template_path);
	fs.readFile(template_path, 'utf8', function(err, data) {

		entry['template_name'] = folder + template;
		entry['content'] = data;
		res.render('edit_template', {template: entry }); 
	});      
});


// // Connect to Database

// var connection = mysql.createConnection({
//   host     : '127.0.0.1',
//   user     : '',
//   password : '', 
//   database : '' // database name
// });

// function startDBConnection() {
// 	connection.connect(function(err) {
// 	  if (err) {
// 	    console.error('error connecting: ' + err.stack);
// 	    return;
// 	  }

// 	  console.log('connected as id ' + connection.threadId);
// 	});
// }
// startDBConnection();





// /* GET Themes. */

// router.get('/', function(req, res, next) {
// 	var q = "SELECT * FROM `theme_assets`";

// 	connection.query(q, function(err, results) {
// 		// connected! (unless `err` is set)
// 		var rows = results;
// 		res.render('index', {themes: rows });  
// 	});
// });

// /* GET templates. */

// router.get('/theme/:theme_id', function(req, res, next) {
// 	var q = "SELECT * FROM `templates` WHERE theme_asset_id = " + req.params.theme_id + " ORDER BY `template_name`";

// 	connection.query(q, function(err, results) {
// 		// connected! (unless `err` is set)
// 		var rows = {};

// 		var css_files = [];
// 		var js_files = [];
// 		var includes = [];
// 		var custom_pages = [];
// 		var regular_files = [];

// 		// split the files into categories like (js, css, includes...)

// 		for (var i = 0; i < results.length; i++) {
			
// 			var t_name = ((results[i].template_name).split("/"))[0];
// 			console.log(t_name);

// 			if (t_name === 'css') {
// 				css_files.push(results[i]);
// 			}
// 			else if (t_name === 'js') {
// 				js_files.push(results[i]);
// 			}
// 			else if (t_name === '_includes') {
// 				includes.push(results[i]);
// 			}
// 			else if (t_name === 'custom_pages') {
// 				custom_pages.push(results[i]);
// 			}								
// 			else {
// 				if (t_name !== 'pages.json' && t_name !== 'variables.json') {
// 					regular_files.push(results[i]);
// 				}					
// 			}
// 		}

// 		rows['css_files'] = css_files;
// 		rows['js_files'] = js_files;
// 		rows['includes'] = includes;
// 		rows['custom_pages'] = custom_pages;
// 		rows['regular_files'] = regular_files;

// 		res.render('show_theme', {templates: rows });  
// 	});
// });

// /* GET single template file. */

// router.get('/theme/:theme_id/template/:template_id/edit', function(req, res, next) {
// 	var q = "SELECT * FROM `templates` WHERE (theme_asset_id = " + req.params.theme_id + " AND id = " + req.params.template_id + ")";

// 	connection.query(q, function(err, results) {
// 		// connected! (unless `err` is set)
// 		var entry = results[0];
// 		res.render('edit_template', {template: entry }); 
// 	});      
// });

// /* Save template file */

// router.post('/theme/:theme_id/template/:template_id', function(req, res, next) {
// 	var t_content = connection.escape(req.body.content);	
// 	var q = "UPDATE `templates` SET `content` = " + t_content + ", `updated_at` = CURRENT_TIMESTAMP WHERE (theme_asset_id = " + req.params.theme_id + " AND id = " + req.params.template_id + ")";
	
// 	connection.query(q, function(err, results) {
// 		// connected! (unless `err` is set)
// 		if (err) {
// 			res.status(500).json({message: 'failed to update'});  	
// 		}
// 		else {
// 			res.status(200).json({message: 'sucessfully updated'});  
// 		}
// 	});
// });


// Close the connection on ctrl + c

process.on('SIGINT', function() {
	connection.end();
	console.log("disconnected now");	
	process.exit();
})

module.exports = router;
