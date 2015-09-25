'use strict';

var ES = require('es-abstract/es7');
var keys = require('object-keys');
var has = require('has');

module.exports = function entries(O) {
	var obj = ES.RequireObjectCoercible(O);
	var objKeys = keys(obj);
	var entrys = [];
	for (var i = 0; i < objKeys.length; ++i) {
		if (has(obj, objKeys[i])) {
			entrys.push([objKeys[i], obj[objKeys[i]]]);
		}
	}
	return entrys;
};
