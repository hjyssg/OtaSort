'use strict';

var defConfig = require("./lib/defaultConfig");
var nameParser = require("./lib/nameParser");
var fileIterator = require("./lib/fileIterator");

var isWindows = process.platform === 'win32';

defConfig["mvCmd"] = isWindows? "move" : "mv";
defConfig["mkdirCmd"] = "mkdir";

var userConfig = require("./userConfig");
var _ = require("underscore");

var config = _.extend({}, defConfig, userConfig)

// console.log("-------------------------------");
// console.log(config);

fileIterator(config, nameParser);
