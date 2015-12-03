define(['jquery', 'backbone', 'model/stockPriceModel'], function($, Backbone, stockPriceModel) {
	var StockPriceCollection = Backbone.Collection.extend({
		initialize: function() {
		},

		model: stockPriceModel,

		queryStockPrice: function() {
			$.getJSON('https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20html%20%20WHERE%20url%3D%22http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3D2330.TW%26f%3Dnsl1op%22%20%20&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function(data) {  
 				console.log(data.query.results.body);
			});  
		}
	});

	return new StockPriceCollection();
});