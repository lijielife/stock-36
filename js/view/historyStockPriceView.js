define(["jquery", "underscore", "backbone", "text!template/historyStockPriceTemplate.html", "collection/historyStockPriceCollection"], function($, _, Backbone, historyStockPriceTemplate, historyStockPriceCollection) {
	$("#container").append(historyStockPriceTemplate);

	var HistoryStockPriceView = Backbone.View.extend({

		lineGraphCanvasWidth: undefined,
		lineGraphCanvasHeight: undefined,
		lineGraphCtx: undefined,
		lineGraphData: undefined,

		drawIndex: undefined,
		drawCount: undefined,
		//drawContent: undefined,
		drawHigh: undefined,
		drawLow: undefined,		

		initialize: function() {
			this.listenTo(historyStockPriceCollection, "querySuccess", this.showLineGraph);
			$(window).on("resize", _.bind(this.resizeCanvas, this));
		},

		el: "#historyStockPriceView",

		events: {
			"click #queryButton": "queryHistoryStockPrice",
			"mousemove #lineGraphCanvas": "drawCrossLine"
		},

		render: function() {
			this.lineGraphCtx = document.getElementById("lineGraphCanvas").getContext("2d");			
			this.$el.show();
			this.resizeCanvas();
		},

		queryHistoryStockPrice: function() {
			historyStockPriceCollection.reset();
			historyStockPriceCollection.queryHistoryStockPrice();
		},

		showLineGraph: function() {
			$("#lineGraphCanvas").css("border", "1px solid");
			this.getDrawContent();
		},

		resizeCanvas: function() {		
			var lineGraphDivWidth = $("#lineGraphDiv").width();
			$("#lineGraphCanvas").attr({width: lineGraphDivWidth, height: lineGraphDivWidth/2});
			
			if (historyStockPriceCollection.length) {
				this.getDrawContent();
			}				
		},

		getDrawContent: function() {
			this.drawIndex = 0;
			this.drawCount = 200;
			this.getDrawHighLow();
		},

		getDrawHighLow: function() {
			this.drawHigh = 0;
			this.drawLow = 100000;

			for (var i = this.drawIndex; i < this.drawIndex + this.drawCount; i++) {
				var tempHigh = historyStockPriceCollection.at(i).get("high");
				var tempLow = historyStockPriceCollection.at(i).get("low");

				if ( tempHigh > this.drawHigh) {
					this.drawHigh = tempHigh;
				}

				if ( tempLow < this.drawLow) {
					this.drawLow = tempLow;
				}
			}

			console.log(this.drawHigh);
			console.log(this.drawLow);
			this.drawLineGraph();
		},

		drawLineGraph: function() {							
			this.lineGraphCanvasWidth = $("#lineGraphCanvas").width();
			this.lineGraphCanvasHeight = $("#lineGraphCanvas").height();							

			for (var i = this.drawIndex; i < this.drawIndex + this.drawCount; i++) {				
				var x = this.lineGraphCanvasWidth / this.drawCount * (this.drawCount-i-1);
				var width = this.lineGraphCanvasWidth / this.drawCount;

				var y = (this.drawHigh - historyStockPriceCollection.at(i).get("high")) / (this.drawHigh - this.drawLow) * this.lineGraphCanvasHeight;	
				var height = (historyStockPriceCollection.at(i).get("high") - historyStockPriceCollection.at(i).get("low")) / (this.drawHigh - this.drawLow) * this.lineGraphCanvasHeight;
				//console.log(x, y, width, height);

				historyStockPriceCollection.at(i).set("crossLineMinX", x);
				historyStockPriceCollection.at(i).set("crossLineMaxX", x + width);
				historyStockPriceCollection.at(i).set("crossLineX", x + width / 2);
				historyStockPriceCollection.at(i).set("crossLineY", y + height / 2);

				if (historyStockPriceCollection.at(i).get("close") > historyStockPriceCollection.at(i+1).get("close")) {
					this.lineGraphCtx.fillStyle = "#FF0000";
				} else if (historyStockPriceCollection.at(i).get("close") < historyStockPriceCollection.at(i+1).get("close")) {
					this.lineGraphCtx.fillStyle = "#00FF00";
				} else {
					this.lineGraphCtx.fillStyle = "#000000";
				}
				this.lineGraphCtx.fillRect(x, y, width, height);				
			}

			this.lineGraphData = this.lineGraphCtx.getImageData(0, 0, this.lineGraphCanvasWidth, this.lineGraphCanvasHeight);

			this.showStockPriceInfo(0);

			for (var i = this.drawIndex; i < this.drawIndex + this.drawCount; i++) {			
				console.log(JSON.stringify(historyStockPriceCollection.at(i)));
			}
		},

		drawCrossLine: function(e) {
			if (historyStockPriceCollection.length) {
				var rect = document.getElementById("lineGraphCanvas").getBoundingClientRect();		
				var canvasX = e.clientX - rect.left;
				var canvasY = e.clientY - rect.top;

				for (var i = this.drawIndex; i < this.drawIndex + this.drawCount; i++) {
					if (historyStockPriceCollection.at(i).get("crossLineMinX") < canvasX && historyStockPriceCollection.at(i).get("crossLineMaxX") > canvasX) {
						this.showStockPriceInfo(i);
						this.lineGraphCtx.putImageData(this.lineGraphData, 0, 0);
						this.lineGraphCtx.beginPath();
						this.lineGraphCtx.moveTo(historyStockPriceCollection.at(i).get("crossLineX"), 0);
						this.lineGraphCtx.lineTo(historyStockPriceCollection.at(i).get("crossLineX"), this.lineGraphCanvasHeight);
						this.lineGraphCtx.moveTo(0, historyStockPriceCollection.at(i).get("crossLineY"));
						this.lineGraphCtx.lineTo(this.lineGraphCanvasWidth, historyStockPriceCollection.at(i).get("crossLineY"));
						this.lineGraphCtx.stroke();
						break;
					}						
				}		
			}	
		},

		showStockPriceInfo: function(i) {
			$("#stockPriceInfo").html("");
			$("#stockPriceInfo")
				.append(historyStockPriceCollection.at(i).get("date"))
				.append("　開盤: " + historyStockPriceCollection.at(i).get("open"))
				.append("　最高價: " + historyStockPriceCollection.at(i).get("high"))
				.append("　最低價: " + historyStockPriceCollection.at(i).get("low"))
				.append("　收盤價: " + historyStockPriceCollection.at(i).get("close"))
				.append("　成交量: " + historyStockPriceCollection.at(i).get("volume"));
			//$("#coordinate").text(canvasX + ", " + canvasY);
		}
	});

	return new HistoryStockPriceView();
});