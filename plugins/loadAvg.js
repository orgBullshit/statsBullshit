// SN4T14 2016-01-31
// License: WTFPL
'use strict';

var Promise = require('bluebird');
var os = require('os');

module.exports = function (config, dal) {
	var hostname = os.hostname();

	setInterval(function() {
		return Promise.try(function() {
			var loads = os.loadavg();

			var points = [
				{values: {value: Number(loads[0])}, metadata: {hostname: hostname, resolution: "1min"}},
				{values: {value: Number(loads[1])}, metadata: {hostname: hostname, resolution: "5min"}},
				{values: {value: Number(loads[2])}, metadata: {hostname: hostname, resolution: "15min"}}
			];

			return dal.writePoints("cpu_load_average", points);
		});
	}, 1000 * config.rate);
};
