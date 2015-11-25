// @capheshift 2015
// Author: tw

var _ = require('lodash');
var keystone = require('keystone');
var utils = require('keystone-utils');
var restful = require('../../cores/restful');
var UserModel = keystone.list('User').model;

exports = module.exports = _.assign(restful(UserModel), {
	signin: function(req, res) {
		var User = keystone.list(keystone.get('user model'));
		var email = 'tampham47@live.com';
		var password = '1we23rw4t';
		var emailRegExp = new RegExp('^' + utils.escapeRegExp(email) + '$', 'i');

		User.model.findOne({ email: emailRegExp }).exec(function (err, user) {
			if (user) {
				user._.password.compare(password, function (err, isMatch) {
					if (isMatch) {
						res.json({ status: 'MATCHED' });
					} else if (err) {
						return res.status(500).json({ error: 'bcrypt error', detail: err });
					} else {
						return res.json({ error: 'invalid details' });
					}
				});
			} else if (err) {
				return res.status(500).json({ error: 'database error', detail: err });
			} else {
				return res.json({ error: 'invalid details' });
			}
		});
	}
});
