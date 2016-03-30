var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var sass = require('node-sass');

// Enter path to the themes repo folder
var path_to_repo = '../themes-repo';



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


/* GET Themes. */

router.get('/', function(req, res, next) {

	var q = "SELECT * FROM `theme_assets`";

	connection.query(q, function(err, results) {
		// connected! (unless `err` is set)
		var rows = results;
		res.render('index', {themes: rows });  
	});	

	// var themes;	

	// fs.readdir(path_to_repo, function(err, files) {
	// 	if (err) throw err;

 // 		for (var i = 0; i < files.length; i++) {
 // 			if (files[i].indexOf('.') > -1) {
 // 				files.splice(i, 1)
 // 			}
 // 		}

	// 	var themes = files;
	// 	res.render('index', {themes: themes });  
	// });
	
	
});



/* GET templates. */

router.get('/theme/:theme_id', function(req, res, next) {
	var theme = req.params.theme_id;
	var theme_path = path_to_repo + theme;


	// *****
	// Use template.conf to find files and theme settings  
	// *****

	var rows = {};

	rows['css_files'] = [];
	rows['js_files'] = [];
	rows['includes'] = [];
	rows['custom_pages'] = [];
	rows['regular_files'] = [];	


	// Look into the theme folder, retrieve all the files and sub folders
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

		setTimeout(function previewFiles() {
			res.render('show_theme', {theme: theme, templates: rows });  
		}, 250);
		
	});

});

/* GET single template file. */

router.get('/theme/:theme_id/:folder/:template_id', function(req, res, next) {
	var theme = req.params.theme_id;
	var folder = (req.params.folder == 'home' ? '/' : ('/' + req.params.folder + '/')); 
	var folder_nh = req.params.folder; 
	var template = req.params.template_id;
	var entry = {};

	var template_path = path_to_repo + theme + folder + template;

	fs.readFile(template_path, 'utf8', function(err, data) {

		entry['theme'] = theme;
		entry['folder'] = folder_nh;
		entry['template_name'] = template;
		entry['content'] = data;
		res.render('edit_template', {template: entry }); 
	});      
});


/* Save template file */

router.post('/theme/:theme_id/:folder/:template_id', function(req, res, next) {
	var t_content = req.body.content;	

	var theme = req.params.theme_id;
	var folder = req.params.folder; 
	var folder_nh = (req.params.folder == 'home' ? '' : ('/' + req.params.folder)); 
	var template = req.params.template_id;	

	// Check what subfolder the file is from
	

	var file_save_path = path_to_repo + theme + folder_nh + '/' + template;
	var main_sass_fp = path_to_repo + theme + '/sass/main.scss';
	var css_file = path_to_repo + theme + '/css/style.css.liquid';
	

	fs.writeFile(file_save_path, t_content, 'utf8', function(err) {
		if (err) throw err;
		
		// If the file is a sass file, we will build the css file first then update the database. 
		if (folder == 'sass') {
			sass.render({
			  file: main_sass_fp,
			  outputStyle: 'compressed'
			}, function(err, result) { 
				if (err) throw err;

				// Write the compiled css to style.css.liquid
				fs.writeFile(css_file, result.css, function(err) {
					if (err) throw err;
				});

				// Save the CSS data to the database

				var q_id = "SELECT `id` FROM `theme_assets` WHERE name = " + "'" +theme + "'";

				var q = "UPDATE `templates` SET `content` = " + connection.escape(result.css) + ", `updated_at` = CURRENT_TIMESTAMP WHERE (theme_asset_id = (" + q_id + ") AND template_name = " + "'style.css.liquid'" + ")";

				connection.query(q, function(err, results) {
					// connected! (unless `err` is set)
					if (err) {
						console.log(err);
						res.status(500).json({message: 'failed to update'});  	
					}
					else {
						res.status(200).json({message: 'sucessfully updated'});  
					}
				});			

			});		
		}
		// Otherwise, just update the files and database
		else {

			// var db_template_name = folder + '/' + template;
			var db_template_name = (folder == 'home' ? template : (folder + '/' + template));

			var q_id = "SELECT `id` FROM `theme_assets` WHERE name = " + "'" +theme + "'";

			var q = "UPDATE `templates` SET `content` = " + connection.escape(t_content) + ", `updated_at` = CURRENT_TIMESTAMP WHERE (theme_asset_id = (" + q_id + ") AND template_name = " + "'" + db_template_name + "'" + ")";

			connection.query(q, function(err, results) {
				// connected! (unless `err` is set)
				if (err) {
					console.log(err);
					res.status(500).json({message: 'failed to update'});  	
				}
				else {
					res.status(200).json({message: 'sucessfully updated'});  
				}
			});
		}		
	});

});


// Close the connection on ctrl + c

process.on('SIGINT', function() {
	connection.end();
	console.log("disconnected now");	
	process.exit();
})

module.exports = router;
