({
    navigateToDetailsView : function(accountId) {
        var event = $A.get("e.force:navigateToSObject");
        event.setParams({
            "recordId": accountId
        });
        event.fire();
    }
})