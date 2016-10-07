# theme-editor


> Theme editor and manager for local developing.


### Features

* Built-in sass compiler for CSS files
* Manage multiple themes
* Create a theme from base theme (Skeleton)
* Upload assests to Amazon S3

The project is still under active development, and more features are expected to land in future releases.

## Installation

* Make sure you have node, gulp and bower installed first
* Clone the theme-editor repo
* Run **npm install** & **bower install** in the repo directory to install required dependencies

```
$ npm install && bower install
```

## Getting Started

Add mysql database credentials in **routes/index.js**

```
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : '',
  password : '', 
  database : '' // database name
});
```

```
$ npm start
```


Developing...