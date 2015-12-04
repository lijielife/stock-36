define(['jquery', 'backbone', 'template/queryStockTemplate', 'collection/stockPriceCollection'], function($, Backbone, queryStockTemplate, stockPriceCollection) {
	var QueryStockView = Backbone.View.extend({
		initialize: function() {
			var template = queryStockTemplate.template;
			this.$el.append(template);
		},

		el: 'body',

		events: {
			'click #queryStockView': 'queryStockPrice'
		},

		render: function() {
			//this.$el.find('div').hide();
			//this.$el.find('#queryStockView').show();
		},

		queryStockPrice: function() {
			stockPriceCollection.queryStockPrice();
		}
	});

	return new QueryStockView();
});