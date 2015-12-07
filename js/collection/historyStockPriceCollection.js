define(['jquery', 'backbone', 'model/historyStockPriceModel'], function($, Backbone, historyStockPriceModel) {
	var HistoryStockPriceCollection = Backbone.Collection.extend({
		initialize: function() {
		},

		model: historyStockPriceModel,

		queryHistoryStockPrice: function() {
			/*var stock = '2330.TW';
			$.getJSON('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3D' + stock + '%26f%3Dnsd1t1l1abhg%22&format=json', function(data) {  
 				console.log(data.query.results.body);
			}); */ 
		}
	});

	return new HistoryStockPriceCollection();
});