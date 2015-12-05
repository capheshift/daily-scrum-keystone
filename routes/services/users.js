// @capheshift 2015
// Author: tw

var _ = require('lodash');
var debug = require('debug')('user-api');
var keystone = require('keystone');
var kutils = require('keystone-utils');
var restful = require('../../cores/restful');
var utils = require('../../cores/utilities');
var jwt = require('jsonwebtoken');

var UserModel = keystone.list('User').model;

exports = module.exports = _.assign(restful(UserModel), {
	testSignin: function(req, res) {
		var User = keystone.list(keystone.get('user model'));
		var email = 'tampham47@live.com';
		var password = '1we23rw4t';
		var emailRegExp = new RegExp('^' + kutils.escapeRegExp(email) + '$', 'i');

		User.model.findOne({ email: emailRegExp }).exec(function (err, user) {
			if (user) {
				user._.password.compare(password, function (err, isMatch) {
					if (err) {
						return res.status(500).json(utils.response(false, { error: 'bcrypt error', detail: err }));
					}
					if (isMatch) {
						var token = jwt.sign(user, process.env.SECRET);
						res.jsonp(utils.response(true, { 
							user: user,
							token: token
						}));
					} else {
						return res.json(utils.response(false, { error: 'invalid details' }));
					}
				});
			} else if (err) {
				return res.status(500).json(utils.response(false, { error: 'database error', detail: err }));
			} else {
				return res.json(utils.response(false, { error: 'invalid details' }));
			}
		});
	},

	signin: function(req, res) {
		var User = keystone.list(keystone.get('user model'));
		var email = req.body.username;
		var password = req.body.password;
		var emailRegExp = new RegExp('^' + kutils.escapeRegExp(email) + '$', 'i');
		debug('user-api', email, password);

		User.model.findOne({ email: emailRegExp }).exec(function (err, user) {
			if (user) {
				user._.password.compare(password, function (err, isMatch) {
					if (err) {
						return res.status(500).json(utils.response(false, { error: 'bcrypt error', detail: err }));
					}
					if (isMatch) {
						var token = jwt.sign(user, process.env.SECRET);
						user.token = token;
						res.jsonp(utils.response(true, user));
					} else {
						return res.json(utils.response(false, { error: 'invalid details' }));
					}
				});
			} else if (err) {
				return res.status(500).json(utils.response(false, { error: 'database error', detail: err }));
			} else {
				return res.json(utils.response(false, { error: 'invalid details' }));
			}
		});
	}
});
