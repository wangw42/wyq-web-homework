var express = require('express');
var router = express.Router(); 
var validator = require('../public/javascripts/validator');
var debug = require('debug')('signin:index');

module.exports = function(db){
	var userManager = require('../models/users')(db);

	router.get('/signin', function(req, res, next) {
	  res.render('signin');
	});

	router.post('/signin', function(req, res, next) {
    	try {
      		userManager.findUser(req.body.username, req.body.password, function(err, user) {
        		if (err) {
          			res.render('signin', {username: req.body.username, error : err});
        		} else {
          			req.session.user = user;
          			console.log("Sign in succeed:" + user);
          			res.redirect('/detail');
        		}  
      		});
    	} catch(error) {
        	console.log("Sign in error:" + error);
        	res.render('signin', {error : "Wrong username and password."});
      	};
    });

	router.get('/signout', function(req, res, next){
		delete req.session.user;
		res.redirect('/signin');
	});

	router.get('/regist', function(req, res, next) {
	  res.render('signup', { title: 'Sign up' , user: {}, error: {}});
	});

	router.post('/regist', function(req, res, next) {
		var user = req.body;
    	userManager.checkUser(user)
      		.then(userManager.createUser)
      		.then(function(){
        		req.session.user = user;
        		debug("User session", user);
        		res.redirect('/detail');
      		})
      		.catch(function(error){
       			console.log("Signup Error:" + error);
        		res.render('signup', {user: user, error: error});
      		});
	});

	router.all('*', function(req, res, next){
		req.session.user? next() : res.redirect('/signin');
	});

	router.get('/detail', function(req, res, next) {
	    res.render('detail', { title: 'Detial' , user: req.session.user});
	});

	router.get('/', function(req, res, next) {
      res.render('detail', { user: req.session.user });
  });

  
  return router;
}