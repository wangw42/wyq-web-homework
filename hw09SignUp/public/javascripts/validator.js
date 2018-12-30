var validator = {
	form: {
		username: {
			status: false,
			errorMessage : '6-16 charactors long, and a combination of letters, underscore and numbers .'
		},
		password: {
			status: false,
			errorMessage : '6-12 charactors long, and support letters, underscore and numbers.'
		},
		repeatPassword: {
			status: false,
			errorMessage : 'Not consistent.'
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

	findFormatErrors: function(user){
		var errorMessages = [];
		for(var key in user){
			if(user.hasOwnProperty(key)){
				if(!validator.isFieldValid(key, user[key])) errorMessages.push(validator.form[key].errorMessage);
			}
			errorMessages.length > 0 ? new Error(errorMessages.join('<br />')) : null;
		}
	},
	
	isUsernameValid: function(username){
		return this.form.username.status = username.match(/^[a-zA-Z]\w{5,17}$/);
	},

	isPasswordValid: function(password){
		this.password=password;
		return this.form.password.status = password.match(/^[a-zA-Z]\w{5,11}$/);
	},

	isRepeatPasswordValid: function (repeatPassword) {
    	return this.form.repeatPassword.status = repeatPassword == this.password;
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

	isFieldValid: function(fieldname, value) {
    	var CapFiledname = fieldname[0].toUpperCase() + fieldname.slice(1, fieldname.length);
    	return this['is' + CapFiledname + 'Valid'](value);
    	/*
    	switch(fieldname){
    		case 'username':
    			return isUsernameValid(value);
    			break;
    		case 'password':
    			return isPasswordValid(value);
    			break;
    		case 'repeatPassword':
    			return isRepeatPasswordValid(value);
    			break;
    		case 'sid':
    			return isSidValid(value);
    			break;
    		case 'tel':
    			return isTelValid(value);
    			break;
    		case 'email':
    			return isEmailValid(value);
    			break;
    	}
    	*/
  	},

	isFormValid: function(){
    	return this.form.username.status && this.form.password.status && this.form.sid.status && this.form.tel.status &&
    	this.form.email.status && ((typeof window !== 'object') || this[repeatPassword].status);
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


if(typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
	module.exports = validator;
}else{
	if(typeof define === 'function' && define.amd){
		define([], function(){
			return validator;
		});
	}else {
		window.validator = validator;
	}
}
