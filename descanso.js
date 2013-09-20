!function(window, $, undefined) {
    "use strict";
    var D = {};
    D.Utils = {
        extend: $.extend,
        grep: $.grep,
        each: $.each,
        isFunction: $.isFunction,
        toJSON: function(obj) {
            var retVal = {};
            for (var prop in obj) obj.hasOwnProperty(prop) && !$.isFunction(obj[prop]) && null !== obj[prop] && (retVal[prop] = $.isFunction(obj[prop].toJSON) ? obj[prop].toJSON() : "object" == typeof obj[prop] ? D.Utils.toJSON(obj[prop]) : obj[prop]);
            return retVal;
        }
    };
    D.ajax = $.ajax;
    D.get = function(path, query, options) {
        2 === arguments.length && (options = query);
        $.isFunction(options) && (options = {
            success: options
        });
        options = $.extend({
            url: path,
            type: "GET",
            data: query,
            accepts: "application/json"
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
            contentType: "application/json",
            accepts: "application/json"
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
            contentType: "application/json",
            accepts: "application/json"
        }, options);
        return D.ajax(options);
    };
    D.del = function(path, options) {
        $.isFunction(options) && (options = {
            success: options
        });
        options = $.extend({
            url: path,
            type: "DELETE",
            data: query,
            accepts: "application/json"
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
        var collection = {}, collectionProto = Object.create(Array.prototype, {});
        collection.extend = function(protoObj) {
            var child = function(items) {
                this.concat(items);
            }, childProto = Object.create(collectionProto);
            child.prototype = $.extend(childProto, protoObj);
            child.prototype.constructor = child;
            return child;
        };
        return collection;
    }();
    D.Model = function() {
        var model = {}, modelProto = {
            get: function(prop) {
                return this[prop];
            },
            set: function(prop, value) {
                if ("string" == typeof prop) this[prop] = value; else if (null !== prop && "object" == typeof prop) for (var p in prop) this[p] = prop[p];
            },
            isNew: function() {
                return null === this.id || this.id === undefined;
            },
            toJSON: function() {
                return D.Utils.toJSON(this);
            },
            fetch: function() {},
            save: function(options) {
                var method = this.isNew() ? Descanso.post : Descanso.put, self = this;
                $.isFunction(options) && (options = {
                    success: options
                });
                options.success = function() {
                    options.success.call(self);
                };
                return method(this.url, this.toJSON(), options);
            }
        };
        model.extend = function(protoObj) {
            var child = function(props) {
                props && this.set(props);
            };
            $.extend(child, D.CRUD);
            var childProto = Object.create(modelProto);
            child.prototype = $.extend(childProto, protoObj);
            child.prototype.constructor = child;
            child.Collection = D.Collection.extend();
            return child;
        };
        return model;
    }();
    window.Descanso = D;
}(window, jQuery);