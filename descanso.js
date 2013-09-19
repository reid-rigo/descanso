!function(window, $) {
    "use strict";
    var Descanso = {};
    Descanso.Utils = {};
    Descanso.get = function(path, query, options) {
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
        return $.ajax(options);
    };
    Descanso.post = function(path, data, options) {
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
        return $.ajax(options);
    };
    Descanso.put = function(path, data, options) {
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
        return $.ajax(options);
    };
    Descanso.del = function(path, options) {
        $.isFunction(options) && (options = {
            success: options
        });
        options = $.extend({
            url: path,
            type: "DELETE",
            data: query,
            accepts: "application/json"
        }, options);
        return $.ajax(options);
    };
    Descanso.CRUD = {
        create: function(attrs, options) {
            var m = new this(attrs);
            return m.save(options);
        },
        find: function(id) {
            var m = new this({
                id: id
            });
            return m.fetch(options);
        },
        update: function(attrs) {
            var m = new this(attrs);
            return m.save(options);
        },
        del: function(id) {
            var m = new this({
                id: id
            });
            return m.del(options);
        }
    };
    Descanso.Mixins = {};
    Descanso.Mixins.PubSub = {
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
    Descanso.mixin = Descanso.extend = $.extend;
    Descanso.Model = function() {
        var model = {}, modelProto = {
            get: function(attr) {
                return this[attr];
            },
            set: function(attr, value) {
                this[attr] = value;
                this.trigger("change", "change:" + attr);
            },
            getter: function(attr) {
                Object.defineProperty(this, attr, {});
            },
            setter: function(attr) {
                Object.defineProperty(this, attr, {});
            },
            isNew: function() {
                return null !== this.id;
            },
            toJSON: function() {
                var attrs = {}, self = this;
                for (var prop in self) self.hasOwnProperty(prop) && !$.isFunction(prop) && (attrs[prop] = self[prop]);
                return attrs;
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
        Object.defineProperty(modelProto, "url", {});
        var collectionProto = {};
        model.extend = function(objOrFunc) {
            _.isFunction(objOrFunc);
            var child = function() {};
            child.prototype = modelProto;
            child.Collection = function() {};
            child.Collection.prototype = collectionProto;
            return child;
        };
        return model;
    }();
    window.Descanso = window.DS = Descanso;
}(window, jQuery);