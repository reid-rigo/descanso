Descanso.get = function(path, query, options) {
	if (arguments.length === 2) options = query;
	if ($.isFunction(options)) options = { success: options };
	options = $.extend({
		url: path,
		type: 'GET',
		data: query,
		accepts: 'application/json'
	}, options);
	return $.ajax(options);
};

Descanso.post = function(path, data, options) {
	if ($.isFunction(options)) options = { success: options };
	options = $.extend({
		url: path,
		type: 'POST',
		data: data,
		contentType: 'application/json',
		accepts: 'application/json'
	}, options);
	return $.ajax(options);
};

Descanso.put = function(path, data, options) {
	if ($.isFunction(options)) options = { success: options };
	options = $.extend({
		url: path,
		type: 'PUT',
		data: data,
		contentType: 'application/json',
		accepts: 'application/json'
	}, options);
	return $.ajax(options);
};

Descanso.del = function(path, options) {
	if ($.isFunction(options)) options = { success: options };
	options = $.extend({
		url: path,
		type: 'DELETE',
		data: query,
		accepts: 'application/json'
	}, options);
	return $.ajax(options);
};
