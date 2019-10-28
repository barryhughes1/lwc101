({
    jsLoaded: function(component, event, helper) {
//        var map = L.map('map', {zoomControl: false, tap: false}).setView([37.784173, -122.401557], 14);
        var map = L.map('map', {zoomControl: false, tap: false}).setView([53.278072, -6.215318], 11);
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
            {
                attribution: 'Tiles © Esri'
            }).addTo(map);
        var popup = L.popup()
        	.setLatLng([53.278072, -6.215318])
        	.setContent("Blue Wave Group")
        	.openOn(map);        
        
        component.set("v.map", map);
    },
    accountsLoaded: function(component, event, helper) {
        // Add markers
        var map = component.get('v.map');
        var accounts = event.getParam('accounts');
        for (var i=0; i<accounts.length; i++) {
            var account = accounts[i];
            var latLng = [account.Location__Latitude__s, account.Location__Longitude__s];
            L.marker(latLng, {account: account}).addTo(map).on('click', function(event) {
                helper.navigateToDetailsView(event.target.options.account.Id);
            });
        }        
    },
    accountSelected: function(component, event, helper) {
        // Center the map on the account selected in the list
        var map = component.get('v.map');
        var account = event.getParam("account");
        map.panTo([account.Location__Latitude__s, account.Location__Longitude__s]);
    }
})