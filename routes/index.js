/**
 * This file is where you define your application routes and controllers.
 * 
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 * 
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 * 
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 * 
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 * 
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var expressJwt = require('express-jwt');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	services: importRoutes('/services')
};

// Setup Route Bindings
exports = module.exports = function(app) {
	// authorization not incase of debuging
	if (!process.env.DEBUG) {
		app.use('/*', expressJwt({
			secret: process.env.SECRET
		}).unless({
			path: [
				'/api/user/gettoken'
			]
		}));
	}

	// Views
	app.get('/', routes.views.index);
	// app.get('/blog/:category?', routes.views.blog);
	// app.get('/blog/post/:post', routes.views.post);
	// app.all('/contact', routes.views.contact);
	// app.get('/gallery', routes.views.gallery);

	// USER MODEL: function for set of collection
	app.get('/api/user/gettoken', routes.services.users.testSignin); //will remove
	app.post('/api/user/gettoken', routes.services.users.signin);
	app.get('/api/user/all', routes.services.users._all);
	app.get('/api/user/find', routes.services.users._find);
	app.get('/api/user/:_id/detail', routes.services.users._get);
	app.put('/api/user/:_id', routes.services.users._put);
	
	// TASK MODEL: function for set of collection
	app.get('/api/task/all', routes.services.tasks._all);
	app.get('/api/task/find', routes.services.tasks._find);
	app.get('/api/task/:_id/detail', routes.services.tasks._get);
	// functions for special collection
	app.post('/api/task/', routes.services.tasks._post);
	app.put('/api/task/:_id', routes.services.tasks._put);
	app.delete('/api/task/:_id', routes.services.tasks._delete);

	// TASK MODEL: function for set of collection
	app.get('/api/project/all', routes.services.projects._all);
	app.get('/api/project/find', routes.services.projects._find);

	// PROJECT MODEL: functions for special collection
	app.get('/api/project/:_id/detail', routes.services.projects._get);
	app.post('/api/project/', routes.services.projects._post);
	app.put('/api/project/:_id', routes.services.projects._put);
	app.delete('/api/project/:_id', routes.services.projects._delete);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
};
