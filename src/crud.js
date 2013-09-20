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