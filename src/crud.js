Descanso.CRUD = {

	create: function (attrs, options) {
		var m = new this(attrs);
		return m.save(options);
	},

	find: function (id, callback) {
		var m = new this({ id: id });
		return m.fetch(options);
	},

	update: function (attrs, callback) {
		var m = new this(attrs);
		return m.save(options);
	},

	del: function (id, callback) {
		var m = new this({ id: id });
		return m.del(options);
	}

};