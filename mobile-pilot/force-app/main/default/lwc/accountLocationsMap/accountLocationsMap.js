import { LightningElement } from 'lwc';

export default class AccountLocationsMap extends LightningElement {

    mapMarkers = [
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


    renderedCallback() {
        console.log('renderedCallback');
        
    }
      
}