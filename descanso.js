(function(window, $, undefined) {
	'use strict'

	var D = {};
D.Utils = {

	toJSON: function (obj) {
		var retVal = {};
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop) && !$.isFunction(obj[prop]) && obj[prop] !== null) {
		        if ($.isFunction(obj[prop].toJSON)) {
		        	retVal[prop] = obj[prop].toJSON();
		        } else if (typeof obj[prop] === 'object') {
		        	retVal[prop] = D.Utils.toJSON(obj[prop]);
		        } else {
			        retVal[prop] = obj[prop];			        	
		        }
			}
		}
		return retVal;
	}
	
};
D.ajax = function (options) {
	options = $.extend({
		accepts: 'application/json'
	}, options);
	return $.ajax(options);
}

D.get = function(path, query, options) {
	if (arguments.length === 2) {
		options = query;
		query = null;
	}
	if ($.isFunction(options)) options = { success: options };
	options = $.extend({
		url: path,
		type: 'GET',
		data: query
	}, options);
	return D.ajax(options);
};

D.post = function(path, data, options) {
	if ($.isFunction(options)) options = { success: options };
	options = $.extend({
		url: path,
		type: 'POST',
		data: data,
		contentType: 'application/json'
	}, options);
	return D.ajax(options);
};

D.put = function(path, data, options) {
	if ($.isFunction(options)) options = { success: options };
	options = $.extend({
		url: path,
		type: 'PUT',
		data: data,
		contentType: 'application/json'
	}, options);
	return D.ajax(options);
};

D.del = function(path, options) {
	if ($.isFunction(options)) options = { success: options };
	options = $.extend({
		url: path,
		type: 'DELETE'
	}, options);
	return D.ajax(options);
};

D.CRUD = {

	create: function (props, options) {
		var m = new this(props);
		return m.save(options);
	},

	find: function (id, callback) {
		var m = new this({ id: id });
		return m.fetch(options);
	},

	update: function (props, callback) {
		var m = new this(props);
		return m.save(options);
	},

	del: function (id, callback) {
		var m = new this({ id: id });
		return m.del(options);
	}

};
D.Mixins = {};

D.Mixins.PubSub = {
    
    on: function (event, callback) {
        this._subscriptions[event] = this._subscriptions[event] || [];
        this._subscriptions[event].push(callback);
    },

    trigger: function (event) {
    	var self = this;
        (this._subscriptions[event] || []).forEach(function (fn) {
            fn(self);
        });
    }

};


D.mixin = D.Utils.extend;
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
				if (success) success.apply(undefined, arguments);
			};
			return D.get(this.url + '/' + this.id, options);
		},
		save: function (options) {
			if (!this.isNew()) return this.update(options);
			return D.post(this.url, this.toJSON(), options);
		},
		update: function (options) {
			if (this.isNew()) return this.save(options);
			return D.put(this.url + '/' + this.id, this.toJSON(), options);
		}
	};

	$.extend(Model, D.CRUD);

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
			Model.apply(this, arguments);
		};
		$.extend(Child, D.CRUD);
		Child.prototype = $.extend({}, Model.prototype, processProperties(proto));
		Child.prototype.constructor = Child;
		Child.Collection = D.Collection.forModel(Child);
		return Child;
	};

	return Model;
})();
	window.Descanso = D;

})(window, jQuery);
