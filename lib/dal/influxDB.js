// SN4T14 2016-01-31
// License: WTFPL
'use strict';

var Promise = require('bluebird');
var influx = require('influx');

module.exports = function (config) {
	var client = Promise.promisifyAll(influx(config));

	return {
		writePoint: function (series, point) {
			return Promise.try(function() {
				return client.writePointAsync(series, point.values, point.metadata);
			});
		},
		writePoints: function (series, points) {
			var influxPoints = points.map(function (point) {
				return [point.values, point.metadata];
			});

			return Promise.try(function() {
				return client.writePointsAsync(series, influxPoints);
			});
		}
	};
};
