var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Task Model
 * =============
 */

var Task = new keystone.List('Task', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Task.add({
	_user: {
		type: Types.Relationship, 
		ref: 'User', 
		// required: true,
		many: false
	},

	_project: {
		type: Types.Relationship, 
		ref: 'Project', 
		// required: true,
		many: false
	},

	isCompleted: {
		type: Boolean,
		default: false
	},

	date: {
		type: String
	},

	content: {
		type: String,
		require: true,
		trim: true
	},

	estimation: {
		type: Number
	},

	createdDate: {
		type: Date,
		default: Date.now
	}
});

Task.schema.statics = {
	getPopulateFields: function() {
		return '_project _user';
	}
};

/**
 * Task
 */
Task.defaultColumns = 'content|40%, date, estimation, isCompleted';
Task.register();
