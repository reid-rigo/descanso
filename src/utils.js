D.Utils = {

	extend: $.extend,

	grep: $.grep,

	each: $.each,

	isFunction: $.isFunction,

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