define(['jquery', 'backbone', 'text'], function($, Backbone, text) {
	var Router = Backbone.Router.extend({

		initialize: function() {
			Backbone.history.start();
		},

		routes: {
			':path': 'redirect'
		},

		redirect: function(path) {
			require(['view/' + path], function(view) {
			});
		}
	});

	return new Router();
});