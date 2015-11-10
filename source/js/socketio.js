var socket = io.connect('http://sandwich.billyz.me');
var verified;
var loggedIn = 0;
var user;
var confirm=1;
var nameStatus;
var mailStatus;
var emptyStatus=1;
var success = 0;
var emailSent = 0;
var emailError = 0;
var setStatus = 0;
var resetEmpty = 0;
var resetConfirm = 0;
var uploadExtStatus = 0;
var info;
var lectures;
var n;
var t

function login(){
	if(loggedIn == 0){
		user = document.getElementById('usrname').value;
		socket.emit('login', document.getElementById('usrname').value, document.getElementById('passwd').value);
		socket.on('verification', function(data){
			verified = data;
			loggedIn = 1;
			document.getElementById('dirhome').click()
		});
	}
}

function signup(){
	if((document.getElementById('signname').value!="")&&(document.getElementById('signemail').value!="")&&(document.getElementById('password').value!="")&&(document.getElementById('repassword').value!="")){
		emptyStatus = 1;
		if(document.getElementById('password').value==document.getElementById('repassword').value){
			confirm = 1;
			socket.emit('signup', document.getElementById('signname').value, document.getElementById('password').value, document.getElementById('signemail').value);
			socket.on('signupStatus', function(usernameStatus, emailStatus){
				nameStatus = usernameStatus;
				mailStatus = emailStatus;
				success = confirm&&!nameStatus&&!mailStatus;
				document.getElementById('dir').click();
				document.getElementById('dirsignup').click();
			})
		}
		else{
			confirm = 0;
		}
	}
	else{
		emptyStatus = 0;
	}
}

function resetPassword(){
	socket.emit('reset', document.getElementById('email').value);
	socket.on('resetStatus', function(emailStatus){
		if(emailStatus == 1){
			emailSent = 1;
			emailError = 0;
		}
		else if(emailStatus == 0){
			emailError = 1;
			emailSent = 0;
		}
		document.getElementById('dir').click();
		document.getElementById('dirforgot').click();
	});
}

function setPassword(){
	var urlParams;
	(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
	})();

	if(urlParams.id!=null){
		if(document.getElementById('password').value != "" && document.getElementById('repassword').value != ""){	
			resetEmpty = 0;
			if(document.getElementById('password').value == document.getElementById('repassword').value){
				resetConfirm = 0;
				socket.emit('setPassword', urlParams.id, document.getElementById('password').value);
				socket.on('setConfirm', function(){
					setStatus = 1;
					document.getElementById('dir').click();
					document.getElementById('dirreset').click();
				})
			}
			else{
				setStatus = 0;
				resetConfirm = 1;
			}
		}
		else{
			setStatus = 0;
			resetEmpty = 1;
		}
	}
}

function upload(){
	var uploadSubjects = [];
	var uploadTitle = document.getElementById('uploadTitle').value;
	var uploadDescription = document.getElementById('uploadDescription').value;
	for(var x = 0; x < getTags().length; x++){
		uploadSubjects.push(getTags()[x].text);
	}
	var uploadFile = document.getElementById('uploadFile').files[0];
	var uploadExt = uploadFile.name.substring(uploadFile.name.lastIndexOf('.'));
	var uploadSize = uploadFile.size;
	if(uploadExt==".txt"){
		uploadExtStatus = 0;
		var stream = ss.createStream();
		ss(socket).emit('uploadFile', stream, {user: user, title: uploadTitle, description: uploadDescription, subjects: uploadSubjects, ext: uploadExt, size: uploadSize});
	   	var blobStream = ss.createBlobReadStream(uploadFile);
	   	blobStream.pipe(stream);
	   	document.body.className+= " loading";
	   	socket.on('uploadProcessed', function(){
	   		document.body.className= document.body.className.substring(0, document.body.className.length-8);
	   		document.getElementById('dirmynotesload').click();
	   	})
	}
	else{
		uploadExtStatus = 1;
		document.getElementById('dir').click();
		document.getElementById('dirupload').click();
	}
}

function load(){
	document.body.className+= " loading";
	socket.emit('getData', user);
	socket.on('resData', function(data){
		lectures = data;
		document.body.className= document.body.className.substring(0, document.body.className.length-8);
		document.getElementById('dir').click();
		document.getElementById('dirmynotes').click();
	});
}

function getNote(){
	document.body.className+= " loading";
	var urlParams;
	(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
	})();

	if(urlParams.id!=null){
		socket.emit('getNote', urlParams.id);
		socket.on('resNote', function(note, text){
			n = note;
			t = text;
			document.body.className= document.body.className.substring(0, document.body.className.length-8);
			document.getElementById('dir').click();
			document.getElementById('dirnote').click();
		});
	}
}