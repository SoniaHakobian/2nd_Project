
var mongoose = require(‘mongoose’);
var Schema = mongoose.Schema;
var multer = require('multer');
var app = express();


var express = require("express");
var app = express();

/// Include the express body parser
app.configure(function () {
  app.use(express.bodyParser());
});

var form = "<!DOCTYPE HTML><html><body>" +
"<form method='post' action='/upload' enctype='multipart/form-data'>" +
"<input type='file' name='image'/>" +
"<input type='submit' /></form>" +
"</body></html>";

app.get('/', function (req, res){
  res.writeHead(200, {'Content-Type': 'text/html' });
  res.end(form);
});

// Include the node file module
var fs = require('fs');

// Include ImageMagick
var im = require('imagemagick');

// Post files
app.post('/upload', function(req, res) {
  fs.readFile(req.files.image.path, function (err, data) {
    var imageName = req.files.image.name
    /// If there's an error
    if(!imageName){
      console.log("There was an error")
      res.redirect("/");
      res.end();
    } else {
      var newPath = __dirname + "/uploads/fullsize/" + imageName;
      var thumbPath = __dirname + "/uploads/thumbs/" + imageName;
      // write file to uploads/fullsize folder
      fs.writeFile(newPath, data, function (err) {
        // write file to uploads/thumbs folder
        im.resize({
          srcPath: newPath,
          dstPath: thumbPath,
          width:   200
        }, function(err, stdout, stderr){
          if (err) throw err;
          console.log('resized image to fit within 200x200px');
        });
         res.redirect("/uploads/fullsize/" + imageName);
      });
    }
  });
});

// Show files
app.get('/uploads/fullsize/:file', function (req, res){
  file = req.params.file;
  var img = fs.readFileSync(__dirname + "/uploads/fullsize/" + file);
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

app.get('/uploads/thumbs/:file', function (req, res){
  file = req.params.file;
  var img = fs.readFileSync(__dirname + "/uploads/thumbs/" + file);
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});


mongoose.connect('127.0.0.1:27017/mic');

app.listen(3000);
