describe('Descanso.Collection', function () {

	var Model = Descanso.Model.extend({
		url: '/models',
		greet: function () {
			return this.greeting;
		}
	});

	var Collection = Model.Collection.extend({

	});

	var c = new Collection();

});