// @capheshift 2015
// Author: tw

var _ = require('lodash');
var keystone = require('keystone');
var restful = require('../../cores/restful');
var ProjectModel = keystone.list('Project').model;

exports = module.exports = _.assign(restful(ProjectModel), {

});
