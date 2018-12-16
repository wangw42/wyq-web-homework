var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var PORT = 3000;

var mime = {
	'.html': 'text/html; charset = UTF-8',
	'.css': 'text/css',
	'.js': 'application/x-javascript',
	'.jpg': "image/jpeg",
    '.gif': "image/gif",
    '.png': "image/png", 
};

http.createServer(function(req, res){
	var pathname = url.parse(req.url).pathname;
	var extname = path.extname(pathname);

	if(!extname){
		if(pathname.substr(-1) != '/'){
			res.writeHead(302, {'Location': pathname + '/'});
		}
		pathname += '/index.html';
	}
	
	fs.readFile('./' + pathname, function(err, data){
		if(err){
			randomNum(req, res);
			return;
		}
		if(mime.hasOwnProperty(extname)){
			res.setHeader('Content-Type', mime[extname]);
		}
		res.end(data);
	})

}).listen(PORT, function(){
	console.log('Server is listening on', PORT);
});

function randomNum(req, res){
	var time = 1000+ getRanNum(2000);
	var ranNum = 1 + getRanNum(9);
	setTimeout(function(){
		res.writeHead(200,{
			'Content-Type': 'text/plain'
		});
		res.end('' + ranNum);
	}, time);
}

function getRanNum(max){
	return Math.round(Math.random() * max);
}
