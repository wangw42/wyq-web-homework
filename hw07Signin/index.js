var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var jade = require('jade');
var validator = require('./validator');

var users = {};

exports.start = function(){
	http.createServer((req, res) => {
		var pathname = url.parse(req.url).pathname;
        var ext = pathname.match(/(\.[^.]+|)$/)[0];//取得后缀名
        
        switch(ext){
            case ".css":
            case ".js":
                fs.readFile("."+req.url, 'utf-8',function (err, data) {//读取内容
                    if (err) throw err;
                    res.writeHead(200, {
                        "Content-Type": {
                             ".css":"text/css",
                             ".js":"application/javascript",
                      }[ext]
                    });
                    res.write(data);
                    res.end();
                });
                break;
            default:
            	req.method === 'POST' ? resgistUser(req, res) : sendHtml(req, res);
 
        }
	}).listen(8000, () => {
		console.log('Server running at port8000...');
	});

	function resgistUser(req, res){
		req.on('data', function(chunk){
			try{
				var user = parseUser(chunk.toString());
				checkUser(user);
				users[user.username] = user;
				res.writeHead(301, {Location: '?username=' + user.username});
				console.log(res._header);
				res.end();
			} catch(error){
				console.warn("regist error: ", error);
				//while input nothing
				user = {username: '', sid: '', tel: '', email:''};
				res.writeHead(200, {"Content-Type": "text/html"});
				res.end(jade.renderFile('signup.jade', {user: user, error: error.message}));
			}
		});
	}

	function checkUser(user){
		var errorMessages = [];
		for(var key in user){
			if(!validator.isFieldValid(key, user[key])) errorMessages.push(validator.form[key].errorMessage);
			if(!validator.isAttrValueUnique(users, user, key)) errorMessages.push(
				"key: " + key + "is not unque by value: " + user[key]
			);
		}
		if(errorMessages.length > 0) throw new Error(errorMessages.join('<br />'));
	}

	function parseUser(message){
		params = message.match(/username=(.+)&sid=(.+)&tel=(.+)&email=(.+)&submit=(.+)/);
		var user = {username: params[1], sid: params[2], tel: params[3], email: decodeURIComponent(params[4])};
		console.log(user);
		return user;
	}

	function sendHtml(req, res){
		var username = url.parse(req.url, true).query.username;
		if(!username || !isRegistedUser(username)){
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(jade.renderFile('signup.jade', {user: {username: username}, error: null}));
		}else{
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(jade.renderFile('detail.jade', users[username]));
		}
	}
	
	function isRegistedUser(username){
		return !!users[username];
	}
	
}
