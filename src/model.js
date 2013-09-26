D.Model = (function () {

	var model = {};

	var modelProto = {
		get: function (prop) {
			return this[prop];
		},
		set: function (prop, value) {
			var self = this;
			if (typeof prop === 'string') {
				this[prop] = value;
			} else if (prop !== null && typeof prop === 'object') {
				for (var p in prop) {
					this[p] = prop[p];
				}
			}
		},
		isNew: function () {
			return this.id === null || this.id === undefined;
		},
		toJSON: function () {
			return D.Utils.toJSON(this);
		},
		fetch: function (options) {

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

	model.extend = function (protoObj) {
		var child = function (props) {
			if(props) this.set(props);
		};
		$.extend(child, D.CRUD);
		var childProto = Object.create(modelProto);
		child.prototype = $.extend(childProto, protoObj);
		child.prototype.constructor = child;
		child.Collection = D.Collection.extend();
		return child;
	};

	return model;
})();