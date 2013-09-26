D.Collection = (function () {

	var Collection = function (Model, items) {
		if (!$.isArray(items)) items = Array.prototype.slice.call(arguments, 1);
		items = $.map(items, function (i) {
			return (i.constructor === Model) ? i : new Model(i);
		});
	};

	Collection.prototype = Object.create(Array.prototype, {

	});

	Collection.forModel = function (Model) {
		var args = arguments;
		var C = Collection.bind(null, args);
		C.extend = Collection.extend.bind(null, args);
		return C;
	};

	Collection.extend = function (Model, proto) {
		var args = arguments;
		var Child = function () {
			Collection.apply(this, args);
		};
		Child.prototype = $.extend(Collection.prototype, proto);
		Child.prototype.constructor = Child;
		return Child;
	};

	return Collection;
})();