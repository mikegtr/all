// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var fs     		   = require('fs');
var busboy         = require('connect-busboy');
var path 		   = require('path');
// configuration ===========================================
    
// config files
//var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080; 

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url); 

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 
app.use(busboy());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 


// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/')); 



app.post('/upload', function (req, res) {
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
      var stream = fs.createWriteStream(__dirname + '/upload/' + filename);
      file.pipe(stream);
      stream.on('close', function () {
        console.log('File ' + filename + ' is uploaded');
        res.json({
          filename: filename
        });
      });
    });
  });
// routes ==================================================
//require('./app/routes')(app); // configure our routes
   /*app.get('*', function(req, res) {
        res.sendfile('./index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
*/




   app.get('*',function(req, res){//get,put,post,delete   
      res.sendFile(__dirname + '/index.html');
    });
// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;                         