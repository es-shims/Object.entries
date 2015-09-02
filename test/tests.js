'use strict';

var keys = require('object-keys');
var map = require('array-map');

var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

module.exports = function (entries, t) {
	var a = {};
	var b = {};
	var c = {};
	var obj = { a: a, b: b, c: c };

	t.deepEqual(entries(obj), [['a', a], ['b', b], ['c', c]], 'basic support');
	t.deepEqual(entries({ a: a, b: a, c: c }), [['a', a], ['b', a], ['c', c]], 'duplicate entries are included');

	t.test('entries are in the same order as keys', function (st) {
		var object = { a: a, b: b };
		object[0] = 3;
		object.c = c;
		object[1] = 4;
		delete object[0];
		var objKeys = keys(object);
		var objEntries = map(objKeys, function (key) {
			return [key, object[key]];
		});
		st.deepEqual(entries(object), objEntries, 'entries match key order');
		st.end();
	});

	t.test('non-enumerable properties are omitted', { skip: !Object.defineProperty }, function (st) {
		var object = { a: a, b: b };
		Object.defineProperty(object, 'c', { enumerable: false, value: c });
		st.deepEqual(entries(object), [['a', a], ['b', b]], 'non-enumerable property‘s value is omitted');
		st.end();
	});

	t.test('inherited properties are omitted', function (st) {
		var F = function G() {};
		F.prototype.a = a;
		var f = new F();
		f.b = b;
		st.deepEqual(entries(f), [['b', b]], 'only own properties are included');
		st.end();
	});

	t.test('Symbols are omitted', { skip: !hasSymbols }, function (st) {
		var object = { a: a, b: b, c: c };
		var enumSym = Symbol('enum');
		var nonEnumSym = Symbol('non enum');
		object[enumSym] = enumSym;
		Object.defineProperty(object, nonEnumSym, { enumerable: false, value: nonEnumSym });
		st.deepEqual(entries(object), [['a', a], ['b', b], ['c', c]], 'symbols are omitted');
		st.end();
	});
};
