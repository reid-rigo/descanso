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

});