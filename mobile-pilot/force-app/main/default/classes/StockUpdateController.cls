/**********************************************************************************************
Class Name      :   StockUpdateController
Description     :   This Class is used to return Companies with Symbol and StockExchange data.
                    
                    This class has a method to get Stock Data from Yahoo API using YQL.
                    To get data you have to make REST API call with YQL.To do this you need to create
                    a YQL query it is same like we write soql( like select field from yahoo).
                    In this Query we need to paas company's Symbol it will return data of any StockExchange
                    which has this stock Symbol.
                    
                    This class has a method to return historical data of a company.I am using this method to
                    create chart to see performance of company during a particular time.
                    
Author          :   Balkishan Kachawaa
Date            :   6 August 2015
**********************************************************************************************/
public with sharing class StockUpdateController{
    
    public static Boolean isApexTest = false;
    
    @AuraEnabled
    public static List<StockSymbol__c> allSymbols() {
        //Returning Companies with Symbol and StockExchange
        return [SELECT Id,Company__c,StockExchange__c, Symbol__c FROM StockSymbol__c];
    }
    
    //Returning Stock Data
    @AuraEnabled
    public static String getStockData(String symbol){
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        
        System.debug('yahoo apis');
        req.setEndpoint('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol + '&apikey=11Z14MXOMU3YBKDX');
//        req.setEndpoint('https://query.yahooapis.com/v1/public/yql?q=select%20Symbol%2CName%2CDaysLow%2CDaysHigh%2CYearLow%20%2CYearHigh%2CLastTradePriceOnly%2CLastTradeDate%2CLastTradeTime%2CMarketCapitalization%20%2CChange_PercentChange%20%20from%20yahoo.finance.quotes%20where%20symbol%20%20%3D%20%22'+symbol+'%22%09&format=json&diagnostics=true&%20env=http%3A%2F%2Fdatatables.org%20%2Falltables.env%22%3Ehttps://query.yahooapis.com/v1/public/yql?q=select%20Symbol%2CName%20%2CDaysLow%2CDaysHigh%2CYearLow%2CYearHigh%2CLastTradePriceOnly%20%2CLastTradeDate%2CLastTradeTime%20%2CMarketCapitalization%2CChange%20_PercentChange%20from%20yahoo.finance.quotes%20%20where%20symbol%20%3D%20%22'+symbol+'%22%09&format=json&diagnostics=true%20&env=http%3A%2F%2Fdatatables.org%2Falltables.env');
        req.setMethod('GET');
        System.debug('yahoo apis2');
        
        if(!isApexTest){
            HttpResponse res = h.send(req);
        System.debug('RETURNING');
            return res.getBody();
        }else{
            String stockjson = '{'+
                               ' "query": {'+
                                    '"results": {'+
                                        '"quote": {'+
                                            '"Change_PercentChange": +0.04 - +0.08%,'+
                                            '"LastTradeDate": 3:59pm,'+
                                            '"DaysLow":89,'+
                                            '"DaysHigh": 90,'+
                                            '"YearLow": 77,'+
                                            '"YearHigh": 89,'+
                                            '"MarketCapitalization": 90B,'+
                                            '"LastTradePriceOnly": 90,'+
                                            '"Name": Salesforce,'+
                                            '"Symbol": "CRM",'+
                                            '"LastTradeTime": 8/5/2015'+
                                        '}'+
                                    '}'+
                                '}'+
                            '}';
                            
            return stockjson;                        
        }
        
    } 
      
    //Returning Historical Stock Data
    @AuraEnabled
    public static String getChartData(String symbol) {
        //Start date
        DateTime dT = System.now();
        Date myDate = date.newinstance(dT.year(), dT.month(), dT.day());
        String sdate = String.valueOf(myDate);
        //End date
        DateTime dT1 = System.today().addDays(-30);
        Date mDate = date.newinstance(dT1.year(), dT1.month(), dT1.day());
        String edate = String.valueOf(mDate);
        
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        
        req.setEndpoint('https://query.yahooapis.com/v1/public/yql?q=select%20Date,Close%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22'+symbol+'%22%20and%20startDate%20%3D%20%22'+edate+'%22%20and%20endDate%20%3D%20%22'+sdate+'%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys');
        req.setMethod('GET');
        
        if(!isApexTest){
            HttpResponse res = h.send(req);
            System.debug('----> '+res.getBody());
            return res.getBody();
        }else{
            String stockJson = '{'+
                                    '"query": {'+
                                        '"results": {'+
                                            '"quote": ['+
                                                '{'+
                                                    '"Close": "625.609985",'+
                                                    '"Date": "2015-07-31"'+
                                                '},'+
                                                '{'+
                                                    '"Close": "632.590027",'+
                                                    '"Date": "2015-07-30"'+
                                                '}'+
                                            ']'+
                                        '}'+
                                    '}'+
                                '}';
            return stockJson;
        }
    }
    //Check for Test running
    public static void checkTest(){
        isApexTest = true;
    }
}