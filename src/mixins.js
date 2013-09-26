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