public class accountLocationsMapController {
    
    @AuraEnabled(cacheable=true)
    public static List<clientLocationObj> getAccountLocations(String recordId){
        List<clientLocationObj> result = new List<clientLocationObj>();
        
        Account customer = [SELECT ID, Name, BillingStreet, BillingCity, BillingState, 
                            (SELECT ID, firstName, lastName, Title, 
                            MailingStreet, MailingCity, MailingState FROM Contacts) 
                            FROM Account
                            WHERE Id = :recordId];
        
        clientLocationObj accountLocation = new clientLocationObj();
        accountLocation.title = customer.Name;
        accountLocation.description = customer.Name;
        accountLocation.icon = 'standard:account';
        accountLocation.location = new location(customer.BillingStreet, customer.BillingCity, customer.BillingState);
        result.add(accountLocation);

        for(Contact c : customer.contacts) {
            clientLocationObj contactLocation = new clientLocationObj();
            contactLocation.title = c.firstName + ' ' + c.lastName;
            contactLocation.description = c.Title;
            contactLocation.location = new location(c.MailingStreet, c.MailingCity, c.MailingState);
            contactLocation.icon = 'standard:contact';
            result.add(contactLocation);
        }
        return result;
    }


    public class clientLocationObj {
        @AuraEnabled
        public String title { get; set; }
        @AuraEnabled
        public String description { get; set; }
        @AuraEnabled
        public String icon { get; set; }
        @AuraEnabled
        public location location { get; set; }
    }

    public class location {
        @AuraEnabled
        public String Street { get; set; }
        @AuraEnabled
        public String City { get; set; }        
        @AuraEnabled
        public String State { get; set; }   

        public location(String StreetParam, String CityParam, String StateParam) {
            this.Street = StreetParam;
            this.City = CityParam;
            this.State = StateParam;
        }     
    }
}
