({
	getResult : function(component, symbol) {
        //Calling getStockData of Controller
		var action = component.get("c.getStockData");
        var stocks;
        action.setParams({
          "symbol": symbol //Passing Company symbol
        });
      	action.setCallback(this, function(a) {
            var stocks = jQuery.parseJSON(a.getReturnValue()); //getting and parsing json data
            if(stocks.query.results != null){
                var json_parsed = stocks.query.results.quote; //json quotes
                
                //calculating values for stock data
                var stockPrice = parseFloat(Math.round(json_parsed.LastTradePriceOnly * 100) / 100).toFixed(2);
                var arrStockChangePercent = json_parsed.Change_PercentChange.split(" - ");
                var stockChange = arrStockChangePercent[0];
                var stockChangePercent = arrStockChangePercent[1];
                var stockChangeDirection = stockChange.charAt(0);
                if (stockChangeDirection === "+") {
                    stockChangeDirection = "up";
                }
                else {
                    stockChangeDirection = "down";
                }
                
                //Creating stock market information markup
                stockInfoMarkup = "<div class=\"companyTitle\"><a href='#'>" + json_parsed.Name + " (Symbol: " + json_parsed.Symbol + ")</a></div>";
                stockInfoMarkup += "<div class=\"companySymbolDateTime\">" + json_parsed.LastTradeDate + " - " + json_parsed.LastTradeTime + " ET</div>";
                stockInfoMarkup += "<span class=\"companyStockPrice\">" + stockPrice + "</span>";
                if (stockChangeDirection === "up") {
                    stockInfoMarkup += "<span class=\"companyStockUp\">" + stockChange + " (" + stockChangePercent + ")</span>";
                }
                else {
                    stockInfoMarkup += "<span class=\"companyStockDown\">" + stockChange + " (" + stockChangePercent + ")</span>";
                }
                stockInfoMarkup += "<div class=\"mdetails\">";
                stockInfoMarkup += "<div class=\"companyStockLabels\">";
                stockInfoMarkup += "<div>Days High</div>";
                stockInfoMarkup += "<div>Days Low</div>";
                stockInfoMarkup += "<div>52 Week High</div>";
                stockInfoMarkup += "<div>52 Week Low</div>";
                stockInfoMarkup += "<div>Market Capitalization</div>";
                stockInfoMarkup += "</div>";
                stockInfoMarkup += "<div class=\"companyStockValues\">";
                stockInfoMarkup += "<div>" + json_parsed.DaysHigh + "</div>";
                stockInfoMarkup += "<div>" + json_parsed.DaysLow + "</div>";
                stockInfoMarkup += "<div>" + json_parsed.YearHigh + "</div>";
                stockInfoMarkup += "<div>" + json_parsed.YearLow + "</div>";
                stockInfoMarkup += "<div>" + json_parsed.MarketCapitalization + "</div>";
                stockInfoMarkup += "</div>";
                stockInfoMarkup += "</div>";
                
                jQuery('.stockInfo').append(stockInfoMarkup);
                
                //calling chartData method to show stock chart
                this.chartData(component,symbol);
            }else{
                jQuery('#msg').show();
            }
        });
        $A.enqueueAction(action);		
	},
    
    chartData : function(component, symbol) {
        //Calling getChartData method of Controller
        var action = component.get("c.getChartData");
        action.setParams({
          "symbol": symbol //passing symbol as parameter
        });
        action.setCallback(this, function(a) {
            
            var stocks = jQuery.parseJSON(a.getReturnValue()); //getting and parsing json data
            
            var quotes = stocks.query.results.quote; //getting stock quotes
            
            //creating table for stock chart
            var content = "<table class=\"highchart\" style=\"display:none\" data-graph-container-before=\"1\" data-graph-type=\"line\"><thead><tr><th>Date</th><th>Close</th></tr></thead><tbody>";
            jQuery.each(quotes, function(j, v) { 
                content += "<tr><td>"+v.Date+"</td><td>"+v.Close +"</td></tr>";
            });
            content += "</tbody></table>";
            
            jQuery('.tb').append(content);//appending table in div
            
        	//Creating stock chart using Highchart Table Chart
        	//We can not use Highchart for commercial purpose
        	//I used this to show the demo and how we can use these charts.
           	jQuery('table.highchart').highchartTable();
            
        });
        $A.enqueueAction(action);		
    },
    
})