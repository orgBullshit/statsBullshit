// SN4T14 2016-01-31
// License: WTFPL
/* jshint node: true */
'use strict';

var Promise = require('bluebird');
var child_process = Promise.promisifyAll(require('child_process'));

module.exports = function (globalConfig, config, dal) {
	setInterval(function() {
		return Promise.try(function() {
			child_process.exec("uptime", function (err, stdout, stderr) {
				console.log(stdout);
				var loads = stdout.split(',').slice(-3).map(Function.prototype.call, String.prototype.trim); // Dreaded string parsing, this'll break at some point, maybe there's a file in /proc/?
				loads[0] = loads[0].split(' ')[2];

				console.log(loads);

				var points = [
					[Number(loads[0]), {hostname: globalConfig.hostname, resolution: "1min"}],
					[Number(loads[1]), {hostname: globalConfig.hostname, resolution: "5min"}],
					[Number(loads[2]), {hostname: globalConfig.hostname, resolution: "15min"}]
				];

				console.log(points);

				return dal.writePoints("cpu_load_average", points);
			});
		});
	}, 1000 * config.rate);
};
