// SN4T14 2016-01-31
// License: WTFPL
/* jshint node: true */
'use strict';

var Promise = require('bluebird');
var influx = require('influx');

var client;

var databaseAbstraction = {};

databaseAbstraction.writePoint = function (series, value, tags) {
	return Promise.try(function() {
		return client.writePointAsync(series, value, tags, {});
	});
};

databaseAbstraction.writePoints = function (series, points) {
	return Promise.try(function() {
		return client.writePointsAsync(series, points, {});
	});
};

module.exports = function (config) {
	client = Promise.promisifyAll(influx(config));

	return databaseAbstraction;
};
