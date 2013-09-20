D.ajax = $.ajax;

D.get = function(path, query, options) {
	if (arguments.length === 2) options = query;
	if ($.isFunction(options)) options = { success: options };
	options = $.extend({
		url: path,
		type: 'GET',
		data: query,
		accepts: 'application/json'
	}, options);
	return D.ajax(options);
};

D.post = function(path, data, options) {
	if ($.isFunction(options)) options = { success: options };
	options = $.extend({
		url: path,
		type: 'POST',
		data: data,
		contentType: 'application/json',
		accepts: 'application/json'
	}, options);
	return D.ajax(options);
};

D.put = function(path, data, options) {
	if ($.isFunction(options)) options = { success: options };
	options = $.extend({
		url: path,
		type: 'PUT',
		data: data,
		contentType: 'application/json',
		accepts: 'application/json'
	}, options);
	return D.ajax(options);
};

D.del = function(path, options) {
	if ($.isFunction(options)) options = { success: options };
	options = $.extend({
		url: path,
		type: 'DELETE',
		data: query,
		accepts: 'application/json'
	}, options);
	return D.ajax(options);
};
