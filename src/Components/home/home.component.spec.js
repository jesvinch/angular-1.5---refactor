describe('<home/>', () =>{

	/*Mock dataService calls*/
	var array  = [{
				     "title":"Mocked deal",
				         "id":4509,
				          "mobile":{
				            "data":{
				               "label":"5 GB",
				               "sortValue":5
				            }
				         },
				         "productTypes":[
				            "Mobile"
				         ]
				    }];

	var mockDataService = {
		mobileOnly: (deals, mobileData) => {
			return array;
		}
	};

    var $componentController;
	beforeEach(angular.mock.module('app'));
	beforeEach(angular.mock.module(function($provide){
		$provide.value('homeService', { getDeals: () => { return { then: (callback)=> callback([{name: 'x'}])  }}} );
		$provide.value('dataService', mockDataService);
	}));
	
	beforeEach(angular.mock.inject(function(_$componentController_) {
		$componentController = _$componentController_;
	}));

	  it('should expose a `hero` object', function() {

		const ctrl = $componentController('home', null, {});

		expect(ctrl.deals).toBeDefined();
		expect(ctrl.deals[0].name).toBe('x');
  }); 

	  /* With further data setup we can test all the possible paths in 'if' loop of displayDeals() function. 
	  	It would just be repetition of below logic*/
	  it('When showMobile is true ensure that only mobile only deals are returned', function() {

		const ctrl = $componentController('home', null, {});
		ctrl.showMobile = true;
		ctrl.displayDeals();

		expect(ctrl.dealsToDisplay[0].title).toBe('Mocked deal');
  });

  
});


  