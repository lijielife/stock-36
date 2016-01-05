define(["jquery", "backbone", "text!template/historyStockPriceTemplate.html", "collection/historyStockPriceCollection"], function($, Backbone, historyStockPriceTemplate, historyStockPriceCollection) {
	$("#container").append(historyStockPriceTemplate);

	var HistoryStockPriceView = Backbone.View.extend({

		initialize: function() {
			this.listenTo(historyStockPriceCollection, "drawLineGraph", this.drawLineGraph);
		},

		el: "#historyStockPriceView",

		events: {
			"click button": "queryHistoryStockPrice",
			"mousemove canvas": "getCoordinate"
		},

		render: function() {
			this.$el.show();
		},

		queryHistoryStockPrice: function() {
			historyStockPriceCollection.queryHistoryStockPrice();
		},

		drawLineGraph: function() {
			var lineGraphDivWidth = $("#lineGraphDiv").width();
			$("#lineGraphDiv").append($("<canvas>").attr("id", "lineGraphCanvas").attr("width", lineGraphDivWidth).attr("height", lineGraphDivWidth/2).css("border", "1px solid"));

			var lineGraphCanvasWidth = $("#lineGraphCanvas").width();
			var lineGraphCanvasHeight = $("#lineGraphCanvas").height();

			var c = document.getElementById("lineGraphCanvas");
			var ctx = c.getContext("2d");			
			ctx.moveTo(10, 10);
			ctx.lineTo(lineGraphCanvasWidth-10, lineGraphCanvasHeight-10);
			ctx.stroke();
		},

		getCoordinate: function(e) {
			var x = e.clientX;
			var y = e.clientY;
			$("#coordinate ").text(x + "," + y);
		}
	});

	return new HistoryStockPriceView();
});