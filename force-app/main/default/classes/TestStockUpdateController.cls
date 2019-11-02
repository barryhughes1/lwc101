/**********************************************************************************************
Class Name      :   TestStockUpdateController
Description     :   This Class is used to test functionality of StockUpdateController Class.
                    
Author          :   Balkishan Kachawaa
Date            :   6 August 2015
**********************************************************************************************/

@isTest
public class TestStockUpdateController{
    
    @isTest
    private static void testGetSymbol(){
        //Inserting StockSymbol
        StockSymbol__c symbol = new StockSymbol__c();
        symbol.Company__c = 'Salesforce';
        symbol.StockExchange__c = 'NYSE';
        symbol.Symbol__c = 'CRM';
        
        insert symbol;
        //Fetching records
        List<StockSymbol__c> symList = StockUpdateController.allSymbols();
        //Assert Stock Records
        System.assert(symList.size() > 0);
    
    }
    
    @isTest
    private static void testGetStockData(){
        StockUpdateController.checkTest();
        //Testing Stock Data
        String stockJSON = StockUpdateController.getStockData('CRM');
        //Assert Json Data
        System.assert(stockJSON.contains('Change_PercentChange'));
        System.assert(stockJSON.contains('LastTradeDate'));
        System.assert(stockJSON.contains('DaysLow'));
        System.assert(stockJSON.contains('DaysHigh'));
        System.assert(stockJSON.contains('YearLow'));
        
    }
    
    @isTest
    private static void testGetStockChart(){
        StockUpdateController.checkTest();
        //Testing Historical Data
        String stockJSON = StockUpdateController.getChartData('CRM');
        //Assert Json Data       
        System.assert(stockJSON.contains('Date'));
        System.assert(stockJSON.contains('Close'));
        
    }
    
}