
var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	fullName: { type: String, default: 'Scrum Member' },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'is admin', index: true },
	isActive: { type: Boolean, label: 'is active', default: true }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
 * Relationships
 */

User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
User.relationship({ ref: 'Project', path: 'projects', refPath: '_scrumMaster' });

/**
 * Registration
 */

User.defaultColumns = 'name, email, isActive, isAdmin';
User.register();
