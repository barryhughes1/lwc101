({
	doInit : function(component, event, helper) {
		var action = component.get("c.allSymbols");//Fetching Companies from Controller
        action.setCallback(this, function(a) {
            component.set("v.symbols", a.getReturnValue());
        });
        $A.enqueueAction(action);
	},
    
    stockUpdate : function(component, event, helper) {
        jQuery(".stockInfo").html("");
        jQuery(".tb").html("");
        var symbol = jQuery('#stocksym option:selected').val();//getting selected company's symbol
        //Calling getResult helper method
        helper.getResult(component, symbol);
    }
})