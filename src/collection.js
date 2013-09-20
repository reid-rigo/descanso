D.Collection = (function () {

	var collection = {};

	var collectionProto = Object.create(Array.prototype, {

	});

	collection.extend = function (protoObj) {
		var child = function (items) {
			this.concat(items);
		};
		// $.extend(child, D.CRUD);
		var childProto = Object.create(collectionProto);
		child.prototype = $.extend(childProto, protoObj);
		child.prototype.constructor = child;
		return child;
	};

	return collection;
})();