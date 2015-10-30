'use strict';
var path = require('path');
var fs = require("fs");
var _ = require("underscore");

module.exports = function(config, nameParser) {
	var result = {};
	config.src_folders.forEach(function (src) {
		var stat = fs.statSync(src);
		if(stat.isFile()){
			throw "only source folder path"
		}else{
			_iterate(src, config, nameParser, result, null, 0);
		}
	});
}

function isLegalDepth(depth, config){
	if(_.has(config, "depth")){
		if(_.isNumber(config.depth)){
			return depth <= config.depth;
		}else{
			return config.depth[0] <= depth && depth <= config.depth[1];
		}
	}
	return true;	
}

function _iterate(p, config, nameParser, result, parentPath, depth){
	var stat = fs.statSync(p);
	var basename = path.basename(p);
	var extname = path.extname(p);
	
	try{
		if(stat.isFile() || (config.parse_folder && stat.isDirectory()) ){
			// console.log("file", p);
	
			if(config.allowed_types.indexOf(extname) > -1 || stat.isDirectory()){

			}
		}else{
			// console.log("dir", p);
			if(isLegalDepth(depth+1, config)){
				fs.readdirSync(p).forEach(function(e){
					e = path.join(p, e)
					console.log("going to ", e)
					_iterate(e, config, nameParser, result, parentPath, depth+1);
				});
			}
		}

	}catch(e){
		console.err(e);
	}

	
}