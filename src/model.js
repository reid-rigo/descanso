D.Model = (function () {

	var Model = function (props) {
		if(props) this.set(props);		
	}

	Model.prototype = {
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

	$.extend(Model, D.CRUD)

	Model.extend = function (proto) {
		var Child = function () {
			Model.apply(this, arguments)
		};
		$.extend(Child, D.CRUD);
		Child.prototype = $.extend(Model.prototype, proto);
		Child.prototype.constructor = Child;
		Child.Collection = D.Collection.forModel(Child);
		return Child;
	};

	return Model;
})();