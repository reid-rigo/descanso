describe('Descanso.Model', function () {

	var Model = Descanso.Model.extend({
		url: '/models',
		greet: function () {
			return this.greeting;
		}
	});

	var m = new Model({
		greeting: 'hi'
	});

	it('should provide methods from protoype', function () {
		assert.isFunction(m.get);
		assert.isFunction(m.set);
		assert.isFunction(m.fetch);
		assert.isFunction(m.save);
	});

	it('should provide user-defined methods', function () {
		assert.equal(m.greet(), 'hi');
	});

	it('should initialize with any user-given properties', function () {
		assert.equal(m.greeting, 'hi');
	});

	it('should be usable without subclassing', function () {
		var m = new Descanso.Model();
		assert.isFunction(m.get);
	});

	it('should be possible to subclass a model', function () {

	});

	it('should normalize input url', function () {
		var MyModel = Descanso.Model.extend({
			url: '/mymodels/'
		});
		assert.equal(MyModel.prototype.url, '/mymodels');
	});

	var server;

	before(function () {
        server = sinon.fakeServer.create();
    });

    after(function () {
       	server.restore();
    });

    var Comment = Descanso.Model.extend({
    	url: '/comments'
    });

	describe('#fetch', function () {

		var data = { id: 1, comment: 'hey there' };

		before(function () {
			server.respondWith('GET', '/comments/1',
							   [200, { 'Content-Type': 'application/json' }, JSON.stringify(data)]);
		});

		it('should return promise', function () {
			var c = new Comment({ id: 1 });
			var spy = sinon.spy();
			var req = c.fetch();
			assert.isFunction(req.done);
			req.then(spy);
			server.respond();
			sinon.assert.calledOnce(spy);
		});

		it('should accept success function', function () {
			var c = new Comment({ id: 1 });
			var spy = sinon.spy();
			var req = c.fetch(spy);
			server.respond();
			sinon.assert.calledOnce(spy);
		});

		it('should accept options object', function () {
			var c = new Comment({ id: 1 });
			var spy = sinon.spy();
			var req = c.fetch({
				success: spy,
				complete: spy
			});
			server.respond();
			sinon.assert.calledTwice(spy);
		});

		it('should update properties based on server data', function () {
			var c = new Comment({ id: 1 });
			var req = c.fetch();
			req.then(function () {
				assert.equal(c.comment, 'hey there');
			});
			server.respond();
		});

	});

	describe('#update', function () {

		before(function () {
			server.respondWith('PUT', '/comments/1',
							   [200, { 'Content-Type': 'application/json' }, JSON.stringify({})]);
		});

		it('should return promise', function () {
			var c = new Comment({ id: 1 });
			var spy = sinon.spy();
			var req = c.update();
			assert.isFunction(req.done);
			req.then(spy);
			server.respond();
			sinon.assert.calledOnce(spy);
		});

		it('should accept success function', function () {
			var c = new Comment({ id: 1 });
			var spy = sinon.spy();
			var req = c.update(spy);
			server.respond();
			sinon.assert.calledOnce(spy);
		});

		it('should accept options object', function () {
			var c = new Comment({ id: 1 });
			var spy = sinon.spy();
			var req = c.update({
				success: spy,
				complete: spy
			});
			server.respond();
			sinon.assert.calledTwice(spy);
		});
	});	

	describe('#save', function () {
		
		before(function () {
			server.respondWith('POST', '/comments',
							   [200, { 'Content-Type': 'application/json' }, JSON.stringify({ url: '/comments/1' })]);
		});

		it('should return promise', function () {
			var c = new Comment({ comment: 'hey there' });
			var spy = sinon.spy();
			var req = c.save();
			assert.isFunction(req.done);
			req.then(spy);
			server.respond();
			sinon.assert.calledOnce(spy);
		});

		it('should accept success function', function () {
			var c = new Comment({ comment: 'hey there' });
			var spy = sinon.spy();
			var req = c.save(spy);
			server.respond();
			sinon.assert.calledOnce(spy);
		});

		it('should accept options object', function () {
			var c = new Comment({ comment: 'hey there' });
			var spy = sinon.spy();
			var req = c.save({
				success: spy,
				complete: spy
			});
			server.respond();
			sinon.assert.calledTwice(spy);
		});
	});

	describe('#isNew', function () {

		it('should return true iff model has id property', function () {
			assert.isTrue(m.isNew(), 'm is new');

			m.id = '293829';
			assert.isFalse(m.isNew(), 'm is now false');
		});

	});

	describe('#toJSON', function () {

		it('should not return anything from protoype', function () {
			assert.isUndefined(m.toJSON().url, 'url from protoype not in JSON');
		});

		it('should not contain functions', function () {
			m.myName = function () { return this.name; };
			assert.isUndefined(m.toJSON().myName, 'function not in JSON');
		});

		it('should contain regular properties', function() {
			m.name = 'Reid';
			assert.equal(m.toJSON().name, 'Reid', 'string property in JSON');
		});

		it('shoud contain nested properties', function () {
			m.car = {
				make: 'Land Rover',
				model: 'Defender 90'
			};
			assert.equal(m.toJSON().car.make, 'Land Rover', 'nested property in JSON');
		});

		it('should not contain nested functions', function () {
			m.utils = {
				size: function () { return this.length; }
			};
			assert.isUndefined(m.toJSON().utils.size, 'nested function not in JSON');
		});

	});

	describe('#get', function () {

		var m = new Model();

		it('should return the given property', function () {
			assert.isUndefined(m.get(null));
			assert.isUndefined(m.get('doesntExist'));
			m.test = 'test';
			assert.equal(m.get('test'), 'test');
			m.obj = { test: 'test' };
			assert.deepEqual(m.get('obj'), { test: 'test' });
		});

	});

	describe('#set', function () {

		var m = new Model();

		it('should work on key value pair', function () {
			m.set('test', 'test');
			assert.equal(m.test, 'test');
			m.set('test', null);
			assert.isNull(m.test);
		});

		it('should work on object', function () {
			m.set('test', { a: 1, b: 2 });
			assert.deepEqual(m.test, { a: 1, b: 2 });
		});

		it('should work on deep object', function () {
			m.set('test', { a: { b: { c: 'd' } } });
			assert.deepEqual(m.test, { a: { b: { c: 'd' } } });
			m.set('test', { a: { b: { c: 'e' } } });
			assert.equal(m.test.a.b.c, 'e');
		});

	});

});