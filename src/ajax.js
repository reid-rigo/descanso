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
