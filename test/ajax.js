var assert = chai.assert;

describe('Descanso', function () {

	describe('Descanso.get', function () {

		it('should return promise', function () {
			var get = Descanso.get();
			assert.isDefined(get.done);
			assert.isDefined(get.then);
		});

	});

	describe('Descanso.post', function () {


	});

	describe('Descanso.put', function () {


	});

	describe('Descanso.del', function () {


	});

});
