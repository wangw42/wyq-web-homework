//var bcrypt = require('bcrypt-as-promised'); 
var bcrypt = require('bcrypt-nodejs');
var validator = require('../public/javascripts/validator');
var debug = require('debug')('signin:user');
var _ = require('lodash');

module.exports = function(db){
	var users = db.collection('users');

	function getQuery(user) {
		var query = new Array();
		query.push({username : user.username});
		query.push({sid: user.sid});
		query.push({tel: user.tel});
		query.push({email: user.email});
		return {
			$or: query
		}
	}

	return {

        findUser: function(username, password, callback) {
            users.findOne({username: username}, function(err, doc) {
            	if (doc == null) {
            		callback("User doesn't exist.", doc);
            	} else {
            		bcrypt.compare(password, doc.password, function(err, res) {
            			if (res) callback(null, doc);
            			else callback("Wrong password", doc);
            		});
            	}
            });
        },

        createUser: function(user) {
            return bcrypt.hash(user.password, null, null, function(error, hash) {
                user.password = hash;
                user.repeatPassword = hash;
                return users.insert(user);
            });
        },

        checkUser: function(user) {
            var formatErrors = validator.findFormatErrors(user);
            return new Promise(function(resolve, reject) {
                var flag = true;
				for (var key in formatErrors) {
					if (formatErrors.hasOwnProperty(key)) {
						if (formatErrors[key] != '') flag = false;
					}
				}
				if (flag == true) resolve(user);
				else reject(formatErrors);
            }).then(function() {
                return users.findOne(getQuery(user))
                .then(function(existedUser) {
                    console.log('Exist: ', existedUser);
                    var errorMessages = formatErrors;
					if (existedUser) {
						if (existedUser.username == user.username) errorMessages.username = "Username is not unique.";
    					if (existedUser.sid == user.sid) errorMessages.sid = "Student id is not unique.";
    					if (existedUser.tel == user.tel) errorMessages.tel = "Tel is not unique.";
    					if (existedUser.email == user.email) errorMessages.email = "E-mail is not unique.";
					}
                    return existedUser ? Promise.reject(errorMessages) : Promise.resolve(user);
                });
            });
        },
    }
}