var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Project Model
 * =============
 */

var Project = new keystone.List('Project', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Project.add({

	name: {
		type: String,
		require: true,
		trim: true
	},

	description: {
		type: Types.Html, 
		wysiwyg: true, 
		height: 150
	},

	state: { 
		type: Types.Select, 
		options: 'draft, published, archived', 
		default: 'published', 
		index: true 
	},

	_scrumMaster: {
		type: Types.Relationship,
		ref: 'User',
		many: false
	},

	members: { 
		type: Types.Relationship, 
		ref: 'User', 
		many: true 
	},

	totalHours: {
		type: Number,
		default: 0
	},

	createdDate: {
		type: Date,
		default: Date.now
	}
}, 'Settings', {
	isCompleted: {
		type: Boolean, label: 'Is project completed', index: true
	}
});

Project.schema.statics = {
	getPopulateFields: function() {
		return '_scrumMaster members';
	}
};

Project.register();
