define(["jquery", "backbone", "model/historyStockPriceModel"], function($, Backbone, HistoryStockPriceModel) {
	var HistoryStockPriceCollection = Backbone.Collection.extend({	

		model: HistoryStockPriceModel,

		queryHistoryStockPrice: function() {
			var self = this;
			var stock = "0050.TW";

			$.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fichart.yahoo.com%2Ftable.csv%3Fs%3D" + stock + "%22&format=json", function(response) {  
 				var historyStockPriceArray = response.query.results.body.split('\n');
 				var stockPriceArray;

 				for (var i = 1; i < historyStockPriceArray.length-1; i++) {
 					stockPriceArray = historyStockPriceArray[i].split(',');

 					if (stockPriceArray[5] != 0) {
 						var historyStockPriceModel = new HistoryStockPriceModel();
	 					historyStockPriceModel.set({date: stockPriceArray[0], open: parseFloat(stockPriceArray[1]), high: parseFloat(stockPriceArray[2]), low: parseFloat(stockPriceArray[3]), close: parseFloat(stockPriceArray[4]), volume: parseFloat(stockPriceArray[5]), adjClose: parseFloat(stockPriceArray[6])});
	 					self.add(historyStockPriceModel);
 					}
				}

				/*for (var i = 0; i < self.length; i++) {
					console.log(JSON.stringify(self.at(i)));
				}*/
				
				self.trigger("querySuccess");
			});
			
			
		}
	});

	return new HistoryStockPriceCollection();
});

/*$.getJSON('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3D' + stock + '%26f%3Dnsd1t1l1abhg%22&format=json', function(data) {  
 	console.log(data.query.results.body);
}); */