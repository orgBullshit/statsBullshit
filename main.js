// SN4T14 2016-01-31
// License: WTFPL
'use strict';

var config = require('./lib/loadConfig')('config.yml');
var database = require('./lib/dal/' + config.database)(config[config.database]);

Object.keys(config.plugins).forEach(function (pluginName) {
    require('./plugins/' + pluginName)(config.pluginGlobals, config.plugins[pluginName], database);
});
