define(["jquery", "backbone", "text!template/historyStockPriceTemplate.html", "collection/historyStockPriceCollection"], function($, Backbone, historyStockPriceTemplate, historyStockPriceCollection) {
	$("#container").append(historyStockPriceTemplate);

	var HistoryStockPriceView = Backbone.View.extend({

		initialize: function() {
			this.listenTo(historyStockPriceCollection, "querySuccess", this.bindLineGraph);
		},

		el: "#historyStockPriceView",

		events: {
			"click #queryButton": "queryHistoryStockPrice",
			"mousemove #lineGraphCanvas": "getCoordinate"
		},

		render: function() {
			this.$el.show();
		},

		queryHistoryStockPrice: function() {
			historyStockPriceCollection.queryHistoryStockPrice();
		},

		bindLineGraph: function() {
			$(window).on("resize", this.drawLineGraph);
			this.drawLineGraph();			
		},

		drawLineGraph: function() {
			var lineGraphDivWidth = $("#lineGraphDiv").width();
			$("#lineGraphDiv").html($("<canvas>").attr("id", "lineGraphCanvas").attr("width", lineGraphDivWidth).attr("height", lineGraphDivWidth/2).css("border", "1px solid"));

			var lineGraphCanvasWidth = $("#lineGraphCanvas").width();
			var lineGraphCanvasHeight = $("#lineGraphCanvas").height();

			var c = document.getElementById("lineGraphCanvas");
			var ctx = c.getContext("2d");	

			for (var i = 1; i < 8; i++) {
				ctx.moveTo(0, lineGraphCanvasHeight/8*i);
				ctx.lineTo(lineGraphCanvasWidth, lineGraphCanvasHeight/8*i);
			}
			ctx.stroke();

			var count = 80;
			var drawContent = historyStockPriceCollection.slice(0,count);

			var high = 0;
			var low = 100000;

			for (var i in drawContent) {
				var tempHigh = parseInt(drawContent[i].get("high"));
				var tempLow = parseInt(drawContent[i].get("low"));

				if ( tempHigh > high) {
					high = tempHigh;
				}

				if ( tempLow < low) {
					low = tempLow;
				}
				console.log(JSON.stringify(drawContent[i]));
			}

			console.log(high);
			console.log(low);
			ctx.fillStyle = "#FF0000";
			for (var i in drawContent) {
				
				var a = lineGraphCanvasWidth/count*(count-i-1);
				var b = (high-parseFloat(drawContent[i].get("high")))/(high-low)*(lineGraphCanvasHeight);
				var c = lineGraphCanvasWidth/count;
				var d = (parseFloat(drawContent[i].get("high"))-parseFloat(drawContent[i].get("low")))/(high-low)*(lineGraphCanvasHeight);
				//console.log(a,b,c,d);
				//console.log(drawContent[i].get("high"));
				ctx.fillRect(a, b, c, d);				
			}
		},

		getCoordinate: function(e) {
			var rect = document.getElementById("lineGraphCanvas").getBoundingClientRect();
			var rectX = rect.left;
			var rectY = rect.top; 

			var clientX = e.clientX;
			var clientY = e.clientY;

			//console.log(rectX);
			//console.log(rectY);

			$("#coordinate ").text((clientX-rectX) + "," + (clientY-rectY));
		}	
	});

	return new HistoryStockPriceView();
});