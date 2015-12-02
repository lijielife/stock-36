define(["jquery", "backbone", "collection/stockPriceCollection"], function($, Backbone, stockPriceCollection) {
	var QueryStockView = Backbone.View.extend({
		initialize: function() {
			var template = $("<div>").attr("id", "queryStockView").append("搜尋");
			this.$el.append(template);
		},

		el: "body",

		events: {
			"click #queryStockView": "queryStockPrice"
		},

		render: function() {
			this.$el.find("div").hide();
			this.$el.find("#queryStockView").show();
		},

		queryStockPrice: function() {
			stockPriceCollection.queryStockPrice();
		}
	});

	return new QueryStockView();
});