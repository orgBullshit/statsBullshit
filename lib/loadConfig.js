var yaml = require('js-yaml');
var fs = require('fs');

module.exports = function (configFile) {
	return yaml.safeLoad(fs.readFileSync(configFile, 'utf8'));
};
