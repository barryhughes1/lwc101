import { LightningElement, api, track, wire } from 'lwc';
import getAccountLocations from '@salesforce/apex/accountLocationsMapController.getAccountLocations';

export default class AccountLocationsMap2 extends LightningElement {
    
    @api recordId;   // record ID

//    Following sample code
    @track mapMarkers = [
        {
            location: {
                Street: 'Leinster House, Kildare St, Dublin 2',
                City: 'Dublin',
                Country: 'Ireland'
            },
            title: 'Leinster House',
            description: 'Irish Parliament Building',
            icon: 'standard:account'
        },
        {
            location: {
                Street: 'College Green, Dublin 2',
                City: 'Dublin',
                Country: 'Ireland'
            },

            title: 'Trinity College Dublin',
            description:
                'Trinity College Dublin, the University of Dublin - Home of the Book of Kells',
                icon: 'standard:account'
        },
        {
            location: {
                Street: 'O\'Connell Street Lower, North City, Dublin 1',
                City: 'Dublin',
                PostalCode: 'D02 VW29',
                Country: 'Ireland'
            },

            title: 'An Post, General Post Office',
            description: 'Of 1916 fame',
            icon: 'standard:account'
        }
   ];

/*
   @track mapMarkers = [{ location: {} }];
    
   @wire(getAccountLocations, { recordId: '$recordId' }) 
   accountLocations({ data, error }) {
       if (data) {
           console.log(JSON.stringify(data));
           this.mapMarkers = data;
           console.log('this.mapMarkers => ', JSON.stringify(this.mapMarkers));
       } else if (error) {
           console.error('ERROR => ', error);
       }
   }
*/
}