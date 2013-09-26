describe('Descanso', function () {

	var server;

	before(function () {
        server = sinon.fakeServer.create();
    });

    after(function () {
       	server.restore();
    });

	describe('Descanso.get', function () {

		var comment = { id: 1, comment: 'hey there' };

		before(function () {
			server.respondWith('GET', '/comments/1',
							   [200, { 'Content-Type': 'application/json' }, JSON.stringify(comment)]);
		});

		it('should return promise', function () {
			var spy = sinon.spy();
			var req = Descanso.get('/comments/1');
			assert.isDefined(req.done);
			req.then(spy);
			server.respond();
			sinon.assert.calledOnce(spy);
			sinon.assert.calledWith(spy, comment);
		});

		it('should accept options object', function () {
			var spy = sinon.spy();
			Descanso.get('/comments/1', {
				complete: spy,
				success: spy
			});
			server.respond();
			sinon.assert.calledTwice(spy);
			sinon.assert.calledWith(spy, comment);
		});

		it('should accept success function', function () {
			var spy = sinon.spy();
			Descanso.get('/comments/1', spy);
			server.respond();
			sinon.assert.calledOnce(spy);
			sinon.assert.calledWith(spy, comment);
		});

		it('should accept query object', function () {
			server.respondWith('GET', '/comments/1?q=searchTerm',
				   [200, { 'Content-Type': 'application/json' }, JSON.stringify(comment)]);
			var spy = sinon.spy();
			Descanso.get('/comments/1', { q: 'searchTerm' }, spy);
			server.respond();
			sinon.assert.calledOnce(spy);
			sinon.assert.calledWith(spy, comment);
		});

	});

	describe('Descanso.post', function () {

		var response = { url: '/comments/1' };
		var comment = { comment: 'hey there' };

		before(function () {
			server.respondWith('POST', '/comments',
							   [200, { 'Content-Type': 'application/json' }, JSON.stringify(response)]);
		});

		it('should return promise', function () {
			var spy = sinon.spy();
			var req = Descanso.post('/comments', comment);
			assert.isDefined(req.done);
			req.then(spy);
			server.respond();
			sinon.assert.calledOnce(spy);
			sinon.assert.calledWith(spy, response);
		});

		it('should accept options object', function () {
			var spy = sinon.spy();
			Descanso.post('/comments', comment, {
				complete: spy,
				success: spy
			});
			server.respond();
			sinon.assert.calledTwice(spy);
			sinon.assert.calledWith(spy, response);
		});

		it('should accept success function', function () {
			var spy = sinon.spy();
			Descanso.post('/comments', comment, spy);
			server.respond();
			sinon.assert.calledOnce(spy);
			sinon.assert.calledWith(spy, response);
		});

	});

	describe('Descanso.put', function () {

		var response = { id: 1, comment: 'hey there' };
		var updates = { comment: 'hey there' };

		before(function () {
			server.respondWith('PUT', '/comments/1',
							   [200, { 'Content-Type': 'application/json' }, JSON.stringify(response)]);
		});

		it('should return promise', function () {
			var spy = sinon.spy();
			var req = Descanso.put('/comments/1', updates);
			assert.isDefined(req.done);
			req.then(spy);
			server.respond();
			sinon.assert.calledOnce(spy);
			sinon.assert.calledWith(spy, response);
		});

		it('should accept options object', function () {
			var spy = sinon.spy();
			Descanso.put('/comments/1', updates, {
				complete: spy,
				success: spy
			});
			server.respond();
			sinon.assert.calledTwice(spy);
			sinon.assert.calledWith(spy, response);
		});

		it('should accept success function', function () {
			var spy = sinon.spy();
			Descanso.put('/comments/1', updates, spy);
			server.respond();
			sinon.assert.calledOnce(spy);
			sinon.assert.calledWith(spy, response);
		});

	});

	describe('Descanso.del', function () {

		var response = 'deleted';

		before(function () {
			server.respondWith('DELETE', '/comments/1',
							   [200, { 'Content-Type': 'application/json' }, JSON.stringify(response)]);
		});

		it('should return promise', function () {
			var spy = sinon.spy();
			var req = Descanso.del('/comments/1');
			assert.isDefined(req.done);
			req.then(spy);
			server.respond();
			sinon.assert.calledOnce(spy);
			sinon.assert.calledWith(spy, response);
		});

		it('should accept options object', function () {
			var spy = sinon.spy();
			Descanso.del('/comments/1', {
				complete: spy,
				success: spy
			});
			server.respond();
			sinon.assert.calledTwice(spy);
			sinon.assert.calledWith(spy, response);
		});

		it('should accept success function', function () {
			var spy = sinon.spy();
			Descanso.del('/comments/1', spy);
			server.respond();
			sinon.assert.calledOnce(spy);
			sinon.assert.calledWith(spy, response);
		});

	});

});
