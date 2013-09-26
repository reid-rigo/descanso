D.Model = (function () {

	var Model = function (props) {
		if(props) this.set(props);		
	}

	Model.prototype = {
		get: function (prop) {
			return this[prop];
		},
		set: function (prop, value) {
			if (typeof prop === 'string') {
				this[prop] = value;
			} else if (prop !== null && typeof prop === 'object') {
				$.extend(true, this, prop);
			}
		},
		isNew: function () {
			return this.id === null || this.id === undefined;
		},
		toJSON: function () {
			return D.Utils.toJSON(this);
		},
		fetch: function (options) {
			if ($.isFunction(options)) options = { success: options };
			var self = this;
			options = options || {};
			var success = options.success;
			options.success = function (data) {
				self.set(data);
			 	if (success) success(arguments);
			};
			return D.get(this.url + '/' + this.id, options);
		},
		save: function (options) {
			if (this.isNew()) return this.update(options);
			if ($.isFunction(options)) options = { success: options };
			options.success = options.success.bind(this, this);
			return D.post(this.url, this.toJSON(), options);
		},
		update: function (options) {
			if ($.isFunction(options)) options = { success: options };
			var self = this;
			options.success = function (data) {
				self.set(data);
				options.success.call(this, this);
			};
			return D.put(this.url + '/' + this.id, this.toJSON(), options);
		}
	};

	$.extend(Model, D.CRUD)

	var normalizeUrl = function (url) {
		if (url[url.length-1] === '/') {
			return url.slice(0, -1);
		} else {
			return url;
		}
	};

	var processProperties = function (props) {
		if (props.url) props.url = normalizeUrl(props.url);
		return props;
	};

	Model.extend = function (proto) {
		var Child = function () {
			Model.apply(this, arguments)
		};
		$.extend(Child, D.CRUD);
		Child.prototype = $.extend({}, Model.prototype, processProperties(proto));
		Child.prototype.constructor = Child;
		Child.Collection = D.Collection.forModel(Child);
		return Child;
	};

	return Model;
})();