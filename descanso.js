!function(window, $, undefined) {
    "use strict";
    var D = {};
    D.Utils = {
        toJSON: function(obj) {
            var retVal = {};
            for (var prop in obj) obj.hasOwnProperty(prop) && !$.isFunction(obj[prop]) && null !== obj[prop] && (retVal[prop] = $.isFunction(obj[prop].toJSON) ? obj[prop].toJSON() : "object" == typeof obj[prop] ? D.Utils.toJSON(obj[prop]) : obj[prop]);
            return retVal;
        }
    };
    D.ajax = function(options) {
        options = $.extend({
            accepts: "application/json"
        }, options);
        return $.ajax(options);
    };
    D.get = function(path, query, options) {
        if (2 === arguments.length) {
            options = query;
            query = null;
        }
        $.isFunction(options) && (options = {
            success: options
        });
        options = $.extend({
            url: path,
            type: "GET",
            data: query
        }, options);
        return D.ajax(options);
    };
    D.post = function(path, data, options) {
        $.isFunction(options) && (options = {
            success: options
        });
        options = $.extend({
            url: path,
            type: "POST",
            data: data,
            contentType: "application/json"
        }, options);
        return D.ajax(options);
    };
    D.put = function(path, data, options) {
        $.isFunction(options) && (options = {
            success: options
        });
        options = $.extend({
            url: path,
            type: "PUT",
            data: data,
            contentType: "application/json"
        }, options);
        return D.ajax(options);
    };
    D.del = function(path, options) {
        $.isFunction(options) && (options = {
            success: options
        });
        options = $.extend({
            url: path,
            type: "DELETE"
        }, options);
        return D.ajax(options);
    };
    D.CRUD = {
        create: function(props, options) {
            var m = new this(props);
            return m.save(options);
        },
        find: function(id) {
            var m = new this({
                id: id
            });
            return m.fetch(options);
        },
        update: function(props) {
            var m = new this(props);
            return m.save(options);
        },
        del: function(id) {
            var m = new this({
                id: id
            });
            return m.del(options);
        }
    };
    D.Mixins = {};
    D.Mixins.PubSub = {
        on: function(event, callback) {
            this._subscriptions[event] = this._subscriptions[event] || [];
            this._subscriptions[event].push(callback);
        },
        trigger: function(event) {
            var self = this;
            (this._subscriptions[event] || []).forEach(function(fn) {
                fn(self);
            });
        }
    };
    D.mixin = D.Utils.extend;
    D.Collection = function() {
        var Collection = function(Model, items) {
            $.isArray(items) || (items = Array.prototype.slice.call(arguments, 1));
            items = $.map(items, function(i) {
                return i.constructor === Model ? i : new Model(i);
            });
        };
        Collection.prototype = Object.create(Array.prototype, {});
        Collection.forModel = function() {
            var args = arguments, C = Collection.bind(null, args);
            C.extend = Collection.extend.bind(null, args);
            return C;
        };
        Collection.extend = function(Model, proto) {
            var args = arguments, Child = function() {
                Collection.apply(this, args);
            };
            Child.prototype = $.extend(Collection.prototype, proto);
            Child.prototype.constructor = Child;
            return Child;
        };
        return Collection;
    }();
    D.Model = function() {
        var Model = function(props) {
            props && this.set(props);
        };
        Model.prototype = {
            get: function(prop) {
                return this[prop];
            },
            set: function(prop, value) {
                "string" == typeof prop ? this[prop] = value : null !== prop && "object" == typeof prop && $.extend(!0, this, prop);
            },
            isNew: function() {
                return null === this.id || this.id === undefined;
            },
            toJSON: function() {
                return D.Utils.toJSON(this);
            },
            fetch: function(options) {
                $.isFunction(options) && (options = {
                    success: options
                });
                var self = this;
                options = options || {};
                var success = options.success;
                options.success = function(data) {
                    self.set(data);
                    success && success.apply(undefined, arguments);
                };
                return D.get(this.url + "/" + this.id, options);
            },
            save: function(options) {
                return this.isNew() ? D.post(this.url, this.toJSON(), options) : this.update(options);
            },
            update: function(options) {
                return this.isNew() ? this.save(options) : D.put(this.url + "/" + this.id, this.toJSON(), options);
            }
        };
        $.extend(Model, D.CRUD);
        var normalizeUrl = function(url) {
            return "/" === url[url.length - 1] ? url.slice(0, -1) : url;
        }, processProperties = function(props) {
            props.url && (props.url = normalizeUrl(props.url));
            return props;
        };
        Model.extend = function(proto) {
            var Child = function() {
                Model.apply(this, arguments);
            };
            $.extend(Child, D.CRUD);
            Child.prototype = $.extend({}, Model.prototype, processProperties(proto));
            Child.prototype.constructor = Child;
            Child.Collection = D.Collection.forModel(Child);
            return Child;
        };
        return Model;
    }();
    window.Descanso = D;
}(window, jQuery);