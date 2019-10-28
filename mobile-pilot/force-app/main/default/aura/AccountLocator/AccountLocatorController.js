({
	myNavFunc : function(component, event, helper) {
	    // If it's an iPhone..
	    if( (navigator.platform.indexOf("iPhone") != -1) 
	        || (navigator.platform.indexOf("iPod") != -1)
	        || (navigator.platform.indexOf("iPad") != -1))
	         window.open("maps://maps.google.com/maps?daddr=lat,long&amp;ll=");
	    else
	         window.open("http://maps.google.com/maps?daddr=lat,long&amp;ll=");
	}
})