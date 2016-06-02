var express = require('express');
var path = require('path');
var app = express();
var serveIndex = require('serve-index');

app.set('port', 3000);

app.use('/', express.static(__dirname + '/public'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/images', serveIndex(__dirname + '/public/images'));
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on localhost:' + port);
});
