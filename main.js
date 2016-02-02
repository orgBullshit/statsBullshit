// SN4T14 2016-01-31
// License: WTFPL
/* jshint node: true */
'use strict';

var Promise = require('bluebird');
var config = require('./lib/loadConfig')('config.yml');
var database = require('./lib/dal/' + config.database)(config[config.database]);

var plugins = [];

Object.keys(config.plugins).forEach(function (pluginName) {
	plugins.push(require('./plugins/' + pluginName)(config.pluginGlobals, config.plugins[pluginName], database));
});

/*Promise.try(function() {
	return database.writePoint("testSeries", 6, {tagA: "asdf", tagB: "qwerty"});
}).then(function (response) {
	console.log("Success!");
	console.log(response);
}).catch(function (err) {
	console.log("Error!");
	console.log(err);
});*/
