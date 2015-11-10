var fs = require('fs');
var express = require('express');
var app = express();


app.get('/stream', function(req,res){
	res.sendFile('/home/entp/test/testStream.html');
});
app.get('/record', function(req,res){
	res.sendFile('/home/entp/test/testRecorder.html');
});
app.get('/recorder.js', function(req,res){
	res.sendFile('/home/entp/source/js/recorder.js');
});
app.get('/recorderWorker.js', function(req,res){
	res.sendFile('/home/entp/source/js/recorderWorker.js');
});
app.get('/socket.io.min.js', function(req,res){
	res.sendFile('/home/entp/source/js/socket.io.min.js');
});
app.get('/socket.io-stream.js', function(req,res){
	res.sendFile('/home/entp/source/js/socket.io-stream.js');
});


var server = app.listen(8080);
var io = require('socket.io').listen(server);
var ss = require('socket.io-stream');
 
io.sockets.on('connection', function(client){
	ss(client).on('file', function(stream, data){
		var filename = '/home/entp/lectures/'+data.name;
		stream.pipe(fs.createWriteStream(filename));
	});
});