var express = require('express');
var app = express();
var socket = require('socket.io');
var ss = require('socket.io-stream');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	ObjectID = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/sandwich';


var findDocuments = function(db, user, callback) {
  var temp = [];
  var len1;
  var collection = db.collection('accounts');
  collection.find({'username': user}).toArray(function(err, docs) {
	if(docs[0].notes != undefined){
		for(var x = docs[0].notes.length-1; x >= 0; x--){
			temp.push(docs[0].notes[x]);
		}
	}
	callback(temp);
  });
}

var findNotes = function(db, arr, callback) {
  var lectures = [];
  var collection = db.collection('notes');
  for(var x = 0; x < arr.length; x++){
	  collection.find({'file': arr[x]}).toArray(function(err, docs) {
		lectures.push(docs[0]);
		if(lectures.length == arr.length){
			callback(lectures);
		}
	  });
	}
}

var findNotesId = function(db, id, callback) {
  var note;
  var text;
  var collection = db.collection('notes');
  collection.find({'_id': id}).toArray(function(err, docs) {
	note = docs[0];
	fs.readFile(docs[0].file, 'utf-8', function(err, data){
		callback(note, data);
	});
  });
}

app.get('/source/*', function(req,res){
	res.sendFile('/home/entp/sandwich.io' + req.path);
});
app.get('*', function(req,res){
	res.sendFile('/home/entp/sandwich.io/test/test.html');
});

var server = app.listen(80);
var io = socket.listen(server);

io.sockets.on('connection', function(client){
	var verified;
	var signedUp;
	var emailSent;
	client.on('login', function(user, password){
		var spawn = require('child_process').spawn,
			check = spawn('python', ['/home/entp/Python/login.py',user,password]);

		check.stdout.on('data', function(data){
			verified = data.readInt8(0)-48;
			client.emit('verification', verified);
		});
	});
	client.on('signup', function(user,password,email){
		var spawn = require('child_process').spawn,
			add = spawn('python', ['/home/entp/Python/addAccount.py', user, password, email]);
	
		add.stdout.on('data', function(data){
			signedUp = data.readInt8(0)-48;
			if(signedUp == 0){
				client.emit('signupStatus', 0, 0);
			}
			else if(signedUp == 1){
				client.emit('signupStatus', 1, 0);
			}
			else if(signedUp == 2){
				client.emit('signupStatus', 0, 1);
			}
			else if(signedUp == 3){
				client.emit('signupStatus', 1, 1);
			}
		});
	});
	client.on('reset', function(email){
		var spawn = require('child_process').spawn,
			reset = spawn('python', ['/home/entp/Python/SMTP.py', email]);

		reset.stdout.on('data', function(data){
			emailSent = data.readInt8(0)-48;
			client.emit('resetStatus', emailSent);
		});
	});
	client.on('setPassword', function(id ,password){
		var spawn = require('child_process').spawn,
			set = spawn('python', ['/home/entp/Python/resetPassword.py', id, password]);

		client.emit('setConfirm');
	});
	ss(client).on('uploadFile', function(stream, data){
		var args = [];
		fs.readdir('/home/entp/lectures/', function(err, files){
			var filename = '/home/entp/lectures/lecture' + files.length + data.ext;
			args.push('/home/entp/Python/newNotes.py');
			args.push(data.user);
			args.push(data.title);
			args.push(data.description);
			args.push(filename);
			for(var x = 0; x < data.subjects.length; x++){
				args.push(data.subjects[x]);
			}
			var tempfile = fs.createWriteStream(filename);
			stream.pipe(tempfile);
			tempfile.on('close', function(){
				var spawn = require('child_process').spawn,
					addUpload = spawn('python', args);

				addUpload.on('close', function(code){
					client.emit('uploadProcessed');
				});
			});
		});
	});
	client.on('getData', function(user){
		MongoClient.connect(url, function(err, db) {
			findDocuments(db, user, function(temp){
				if(temp.length != 0){
					findNotes(db, temp, function(lectures){
						client.emit('resData', lectures);
						db.close();
					});
				}
				else{
					client.emit('resData', []);
					db.close();
				}
			});
		});
	});
	client.on('getNote', function(id){
		MongoClient.connect(url, function(err, db) {
			findNotesId(db, ObjectID(id), function(note, text){
				client.emit('resNote', note, text);
				db.close();
			});
		});
	});
});