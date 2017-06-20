import DataService from './data.service';

let mockDataService;
describe ("dataService test", () =>{

/*Test data setup*/
	let deals = [
		{
	         "title":"Broadband and Mobile",
	         "id":4509,
	         "speed":{
	            "label":"17",
	            "sortValue":17408
	         },
	          "mobile":{
	            "data":{
	               "label":"5 GB",
	               "sortValue":5
	            }
	         },
	         "productTypes":[
	            "Broadband",
	            "Phone",
	            "Mobile"
	         ],
	         "broadbandType":"Broadband",
	    },
	    {
	         "title":"Mobile only",
	         "id":4509,
	          "mobile":{
	            "data":{
	               "label":"5 GB",
	               "sortValue":5
	            }
	         },
	         "productTypes":[
	            "Mobile"
	         ],
	    },
	    {
	         "title":"BroadBand Only",
	         "id":4509,
	         "speed":{
	            "label":"52",
	            "sortValue":17408
	         },
	         "mobile":null,
	         "productTypes":[
	            "Broadband",
	            "Phone"
	         ],
	         "broadbandType":"Broadband",
	    },

	    {
         "title":"Total Entertainment + Unlimited Infinity 2 + Weekend Calls",
         "id":4138,
         "contractLength":12,
         "tvProduct":"Total entertainment",
         "speed":{
            "label":"76",
            "sortValue":77824
         },
         "mobile":null,
         "newLineCost":0,
         "productTypes":[
            "TV",
            "Phone",
            "Broadband"
         ],
         "premiumFeatures":{
            "BTSport":true,
            "ComedyCentral":true,
            "DiscoveryChannel":true,
            "CartoonNetwork":true,
            "DisneyChannel":true
         },
         "popularChannels":[
            {
               "name":"BT Sport 1",
               "channelCategory":"Sport",
               "logo":"https://bucket.cdndtl.co.uk/Europe/England/priority-channels/bt-sport-1.png"
            },
            {
               "name":"Film4",
               "channelCategory":"Movies",
               "logo":"https://bucket.cdndtl.co.uk/Europe/England/priority-channels/film4.png"
            }
         ]
      	},
      	{
         "title":"TV only",
         "id":4138,
         "contractLength":12,
         "tvProduct":"Total entertainment",
         "productTypes":[
            "TV"
         ],
         "premiumFeatures":{
            "BTSport":true,
            "ComedyCentral":true,
            "DiscoveryChannel":true,
            "CartoonNetwork":true,
            "DisneyChannel":true
         },
         "popularChannels":[
            {
               "name":"BT Sport 1",
               "channelCategory":"Sport",
               "logo":"https://bucket.cdndtl.co.uk/Europe/England/priority-channels/bt-sport-1.png"
            },
            {
               "name":"Film4",
               "channelCategory":"Movies",
               "logo":"https://bucket.cdndtl.co.uk/Europe/England/priority-channels/film4.png"
            }
         ]
      	},
      	 {
	         "title":"Mobile and TV",
	         "id":4509,
	          "mobile":{
	            "data":{
	               "label":"5 GB",
	               "sortValue":5
	            }
	         },
	         "productTypes":[
	            "Mobile",
	            "TV"
	         ],
	    }]

	beforeEach(() =>{
		mockDataService = new DataService();
	})

	it('MobileOnly deal returns 1 deal', () =>{
		var result = mockDataService.mobileOnly(deals, 2);
		expect(result[0].title).toBe('Mobile only');
	});

	it('BroadBandOnly deal with 52MB speed returns 1 deal', () =>{
		var result = mockDataService.broadBandOnly(deals, 52);
		expect(result[0].title).toBe('BroadBand Only');
	});

	it('BroadBand and TV deal returns 1 deal', () =>{
		var result = mockDataService.broadbandAndTV(deals, 52);

		expect(result[0].title).toBe('Total Entertainment + Unlimited Infinity 2 + Weekend Calls');
	});

	it('TVOnly returns 1 deal', () =>{
		var result = mockDataService.tvOnlyDeal(deals);
		expect(result[0].title).toBe('TV only');
	});

	it('BroadBand and Mobile returns 1 deal', () =>{
		var result = mockDataService.broadbandAndMobile(deals, 17, 5);
		expect(result[0].title).toBe('Broadband and Mobile')
	});

	it('TV and Mobile returns 1 deal', () =>{
		var result = mockDataService.tVAndMobile(deals, 5);
		expect(result[0].title).toBe('Mobile and TV');
	});

})
