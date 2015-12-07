define(['jquery', 'backbone', 'text!template/historyStockPriceTemplate.html', 'collection/historyStockPriceCollection'], function($, Backbone, historyStockPriceTemplate, historyStockPriceCollection) {
	$('#container').append(historyStockPriceTemplate);

	var HistoryStockPriceView = Backbone.View.extend({
		initialize: function() {
		},

		el: '#historyStockPriceView',

		events: {
			'click #queryHistoryStockPrice': 'queryHistoryStockPrice'
		},

		render: function() {
		},

		queryHistoryStockPrice: function() {
			console.log('test');
			historyStockPriceCollection.queryHistoryStockPrice();
		}
	});

	return new HistoryStockPriceView();
});