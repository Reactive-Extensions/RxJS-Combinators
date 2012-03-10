(function (global, undefined) {
	'use strict';
	var root;
	if (typeof exports !== 'undefined') {
		root = exports;
	} else if (typeof global.Rx !== 'undeinfed') {
		root = global.Rx;
	} else {
		root = global.Rx = {};
	}

	var slice = Array.prototype.slice
	, add = function (x, y) {
		return x + y;
	}
	, curry = function (fn) {
		var args = slice.call(arguments, 1)
		, numArgs
		, parent = this;

		if (typeof fn === 'number') {
			numArgs = fn;
			fn = args.shift();
		} else {
			numArgs = fn.length;
		}
		return function () {
			var innerArgs = args.concat(slice.call(arguments));
			return innerArgs.length < numArgs ?
				curry.apply(this, [numArgs, fn].concat(innerArgs)) :
				fn.apply(this, innerArgs);
		};
	};

	root.Combinators = {
		flip: function(fn, x, y) {
			return fn(y, x);
		}, 

		partialApply: function (fn) {
			var args = slice.call(arguments, 1);
			return function () {
				return fn.apply(this, args.concat(slice.call(arguments)));
			};
		},

		curry: curry,
		
		add: curry(add)
	};
})(this);