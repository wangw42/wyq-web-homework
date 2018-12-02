
var validator = {
	form: {
		username: {
			status: false,
			errorMessage : '6-16 charactors long, and a combination of letters, underscore and numbers .'
		},
		sid: {
			status: false,
			errorMessage : 'Eight digits, can not start with 0.'
		},
		tel: {
			status: false,
			errorMessage : 'Eleven digits, can not start with 0.'
		},
		email: {
			status: false,
			errorMessage : 'Please enter a valid email address.'
		}
	},
	
	isUsernameValid: function(username){
		return this.form.username.status = username.match(/^[a-zA-Z]\w{5,17}$/);
	},

	isSidValid: function(sid){
		return this.form.sid.status = sid.match(/^[1-9]\d{7}$/);
	},

	isTelValid: function(tel){
		return this.form.tel.status = tel.match(/^[1-9]\d{10}$/);
	},

	isEmailValid: function(email){
		return this.form.email.status = email.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/);
	},

	isFieldValid: function(fieldname, value){
		var CapFieldname = fieldname[0].toUpperCase() + fieldname.slice(1, fieldname.length);
		return this["is" + CapFieldname + 'Valid'](value);
	},
	
	getErrorMessage: function(fieldname){
		return this.form[fieldname].errorMessage;
	},

	isAttrValueUnique: function(users, user, attr){
		for(var key in users){
			if(users.hasOwnProperty(key) && users[key][attr] == user[attr]) return false;
		}
		return true;
	}
}

module.exports = validator;

