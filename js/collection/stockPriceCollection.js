define(["jquery", "backbone", "model/stockPriceModel"], function($, Backbone, stockPriceModel) {
	var StockPriceCollection = Backbone.Collection.extend({
		initialize: function() {
		},

		model: stockPriceModel,

		queryStockPrice: function() {
			/*$.getJSON("http://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_2330.tw&_=1435210928008", function(result) {
				console.log(result);
			});*/
			$.ajax({
				url: "http://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_2330.tw&_=1435210928008",
				dataType: "json",
				success: function(result) {
        			//console.log(result);
    			},
    			error: function(result) {
        			//console.log(result);
    			}
    		});

		}
	});

	return new StockPriceCollection();
});