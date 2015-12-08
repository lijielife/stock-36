define(['jquery', 'backbone', 'text!template/historyStockPriceTemplate.html', 'collection/historyStockPriceCollection'], function($, Backbone, historyStockPriceTemplate, historyStockPriceCollection) {
	$('#container').append(historyStockPriceTemplate);

	var HistoryStockPriceView = Backbone.View.extend({

		initialize: function() {
			this.listenTo(historyStockPriceCollection, 'drawLineGraph', this.drawLineGraph);
		},

		el: '#historyStockPriceView',

		events: {
			'click button': 'queryHistoryStockPrice'
		},

		render: function() {
			this.$el.show();
		},

		queryHistoryStockPrice: function() {
			historyStockPriceCollection.queryHistoryStockPrice();
		},

		drawLineGraph: function() {
			alert('drawLineGraph');
		}
	});

	return new HistoryStockPriceView();
});