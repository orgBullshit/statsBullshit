// SN4T14 2015-01-01 (or something like that, idunno, I doubt this is even enough code to be copyrightable)
// License: WTFPL
'use strict';
var yaml = require('js-yaml');
var fs = require('fs');

module.exports = function (configFile) {
	return yaml.safeLoad(fs.readFileSync(configFile, 'utf8'));
};
