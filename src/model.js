Descanso.Model = (function () {

	var model = {};
	var modelProto = {
		get: function (attr) {
			return this[attr];
		},
		set: function (attr, value) {
			this[attr] = value;
			this.trigger('change', 'change:' + attr);
		},
		getter: function (attr) {
			Object.defineProperty(this, attr, {

			});
		},
		setter: function (attr, value) {
			Object.defineProperty(this, attr, {

			});
		},
		isNew: function () {
			return this.id !== null;
		},
		toJSON: function () {
			var attrs = {};
			var self = this;
			for (var prop in self) {
 				if (self.hasOwnProperty(prop) && !$.isFunction(prop)) {
			        attrs[prop] = self[prop];
				}
			}
			return attrs;
		},
		fetch: function () {

		},
		save: function (options) {
			var method = this.isNew() ? Descanso.post : Descanso.put;
			var self = this;
			if ($.isFunction(options)) options = { success: options };
			options.success = function (data) {
				options.success.call(self);
			};
			return method(this.url, this.toJSON(), options);
		}
	};
	Object.defineProperty(modelProto, 'url', {

	});
	var modelInit = function (attrs) {

	};
	var collectionProto = {

	};
	var collectionInit = function (items) {

	};
	model.extend = function (objOrFunc) {
		if (_.isFunction(objOrFunc)) {

		} else {

		}
		var child = function () {};
		child.prototype = modelProto;
		child.Collection = function () {};
		child.Collection.prototype = collectionProto;
		return child;
	};
	return model;
})();

window.Descanso = window.DS = Descanso;